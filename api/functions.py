from http.client import HTTPException

import pandas as pd
from api.schemas import PredictionResponse
from api.utils.maps import GENDER_MAP, YES_NO_INTERNET_MAP, YES_NO_MAP


def create_input_dataframe(data: dict) -> pd.DataFrame:
    """Convierte los datos a DataFrame aplicando mapeos"""
    input_dict = {
        'gender': GENDER_MAP.get(data.get('gender'), 0),
        'SeniorCitizen': int(data.get('SeniorCitizen', 0)),
        'Partner': YES_NO_MAP.get(data.get('Partner', 'No'), 0),
        'Dependents': YES_NO_MAP.get(data.get('Dependents', 'No'), 0),
        'tenure': int(data.get('tenure', 0)),
        'PhoneService': YES_NO_MAP.get(data.get('PhoneService', 'No'), 0),
        'MultipleLines': data.get('MultipleLines', 'No'),
        'InternetService': data.get('InternetService', 'DSL'),
        'OnlineSecurity': data.get('OnlineSecurity', 'No'),
        'OnlineBackup': data.get('OnlineBackup', 'No'),
        'DeviceProtection': data.get('DeviceProtection', 'No'),
        'TechSupport': data.get('TechSupport', 'No'),
        'StreamingTV': data.get('StreamingTV', 'No'),
        'StreamingMovies': data.get('StreamingMovies', 'No'),
        'Contract': data.get('Contract', 'Month-to-month'),
        'PaperlessBilling': YES_NO_MAP.get(data.get('PaperlessBilling', 'No'), 0),
        'PaymentMethod': data.get('PaymentMethod', 'Electronic check'),
        'MonthlyCharges': float(data.get('MonthlyCharges', 0)),
        'TotalCharges': float(data.get('TotalCharges', 0))
    }
    return pd.DataFrame([input_dict])

def apply_feature_engineering(df: pd.DataFrame) -> pd.DataFrame:
    """Aplica el feature engineering del entrenamiento"""
    # Crear copia para no modificar original
    df_fe = df.copy()
    
    # Calcular features derivados (ajusta según tu código original)
    df_fe['avg_monthly'] = df_fe['TotalCharges'] / (df_fe['tenure'] + 1)
    df_fe['charges_ratio'] = df_fe['MonthlyCharges'] / (df_fe['avg_monthly'] + 1)
    df_fe['tenure_squared'] = df_fe['tenure'] ** 2
    df_fe['charges_tenure_interaction'] = df_fe['MonthlyCharges'] * df_fe['tenure']
    
    # Crear variables binarias para servicios (ejemplo - ajusta según tu código)
    service_cols = ['OnlineSecurity', 'OnlineBackup', 'DeviceProtection',
                   'TechSupport', 'StreamingTV', 'StreamingMovies']
    
    for col in service_cols:
        if col in df_fe.columns:
            df_fe[col + '_bin'] = df_fe[col].map(YES_NO_INTERNET_MAP).fillna(0)
    
    # Calcular total de servicios
    bin_cols = [col + '_bin' for col in service_cols if col + '_bin' in df_fe.columns]
    if bin_cols:
        df_fe['total_services'] = df_fe[bin_cols].sum(axis=1)
    
    # Identificar tipo de internet
    df_fe['fiber'] = (df_fe['InternetService'] == 'Fiber optic').astype(int)
    df_fe['dsl'] = (df_fe['InternetService'] == 'DSL').astype(int)
    
    # Interacciones importantes
    if 'OnlineSecurity_bin' in df_fe.columns:
        df_fe['fiber_no_security'] = df_fe['fiber'] * (1 - df_fe['OnlineSecurity_bin'])
    
    return df_fe

def get_risk_level(probability: float) -> str:
    """Determina nivel de riesgo"""
    if probability > 0.7:
        return "ALTO"
    elif probability > 0.4:
        return "MEDIO"
    else:
        return "BAJO"

def get_recommendation(probability: float, data: dict) -> str:
    """Genera recomendación según perfil"""
    if probability > 0.7:
        return "🚨 Contactar urgentemente: Ofrecer descuento especial del 20% por 6 meses"
    elif probability > 0.4:
        if data.get('InternetService') == 'Fiber optic':
            return "📡 Revisar calidad de internet: Ofrecer upgrade de velocidad gratis por 3 meses"
        elif data.get('Contract') == 'Month-to-month':
            return "📝 Ofrecer contrato anual: 2 meses gratis al firmar contrato"
        elif data.get('TechSupport') == 'No':
            return "🛠️ Ofrecer soporte técnico premium con 50% de descuento el primer año"
        else:
            return "📧 Enviar encuesta de satisfacción con incentivo ($10 de descuento)"
    else:
        return "✅ Cliente leal: Mantener servicio regular, ofrecer programa de referidos"
    


async def make_prediction(data: dict, model, preprocessor, column_names) -> PredictionResponse:
    """Función común para hacer predicciones"""
    if model is None or preprocessor is None:
        raise HTTPException(status_code=500, detail="Modelo no disponible")
    
    # Crear DataFrame
    input_df = create_input_dataframe(data)
    
    # Aplicar feature engineering
    input_df = apply_feature_engineering(input_df)
    
    # Asegurar que tenemos todas las columnas
    for col in column_names:
        if col not in input_df.columns:
            input_df[col] = 0
    
    input_df = input_df[column_names]
    
    # Aplicar preprocesamiento
    input_processed = preprocessor.transform(input_df)
    
    # Predecir
    prediction_proba = model.predict_proba(input_processed)[0]
    prediction = int(model.predict(input_processed)[0])
    
    # Interpretar
    churn_probability = float(prediction_proba[1])
    
    return PredictionResponse(
        customer_id=data.get('customerID', 'N/A'),
        churn_prediction=prediction,
        churn_prediction_label="Alto riesgo de Churn" if prediction == 1 else "Bajo riesgo de Churn",
        churn_probability=churn_probability,
        churn_probability_percentage=round(churn_probability * 100, 2),
        risk_level=get_risk_level(churn_probability),
        recommendation=get_recommendation(churn_probability, data)
    )