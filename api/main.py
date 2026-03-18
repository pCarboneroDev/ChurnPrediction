import pickle
from fastapi import FastAPI, HTTPException, Request
import joblib

from api.functions import make_prediction
from api.functions import make_prediction
from api.schemas import CustomerData, PredictionResponse
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title="Churn Prediction API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins= ["*"],#["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"], 
)

numerical_cols = ['gender', 'SeniorCitizen', 'Partner', 'Dependents', 'tenure',
       'PhoneService', 'PaperlessBilling', 'MonthlyCharges', 'TotalCharges']

categorical_cols = ['MultipleLines', 'InternetService', 'OnlineSecurity', 'OnlineBackup',
       'DeviceProtection', 'TechSupport', 'StreamingTV', 'StreamingMovies',
       'Contract', 'PaymentMethod']

try:
    model = joblib.load('./models/xgboost_churn_model.pkl')
    preprocessor = joblib.load('./models/preprocessor.pkl')
    with open('./models/column_names.pkl', 'rb') as f:
        column_names = pickle.load(f)
    print("Correct loading of model, preprocessor, and column names.")
except Exception as e:
    print(f"Error loading models: {e}")
    model, preprocessor, column_names = None, None, None

@app.get("/")
def read_root():
    return {
        "mensaje": "API funcionando",
        "documentacion": "/docs",
        "endpoints_disponibles": [
            "/usuarios",
            "/categories",
            "/transactions"
        ]
    }

@app.get("/health")
def health_check():
    """Endpoint para verificar que la API está viva"""
    return {"status": "healthy"}

# @app.post("/predict", response_model=PredictionResponse)
# async def predict(request: Request):
#     """Endpoint para predicciones desde formulario"""
#     try:
#         form_data = await request.form()
#         data = dict(form_data)
#         return await make_prediction(data, model, preprocessor, column_names)
#     except Exception as e:
#         raise HTTPException(status_code=400, detail=str(e))


@app.post("/predict")
def predict(customer: CustomerData):
    try:
        print("Datos recibidos:", customer)  # Debug
        # Convertir a DataFrame
        df = pd.DataFrame([customer.model_dump()])

        column_order = numerical_cols + categorical_cols

        df = df[column_order]

        # Transformar
        X_processed = preprocessor.transform(df)
        print(f"✅ Transformación exitosa. Shape: {X_processed.shape}")

        
        proba = model.predict_proba(X_processed)[0][1]
        pred = int(proba > 0.5)

        proba_float = float(proba)
        pred_int = int(pred)
        
        return {
            "prediction": "High risk" if pred_int == 1 else "Low risk",
            "probability": round(proba_float * 100, 2),
            "recommendation": "Offer discount" if proba_float > 0.7 else "Monitor" if proba_float > 0.4 else "OK"
        }
    except Exception as e:
        print(f"Error during prediction: {e}")
        raise HTTPException(status_code=400, detail=str(e))