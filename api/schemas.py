from typing import List, Optional

from pydantic import BaseModel, EmailStr, Field, field_validator

# numbers= ['gender', 'SeniorCitizen', 'Partner', 'Dependents', 'tenure', 'PhoneService', 'PaperlessBilling', 'MonthlyCharges', 'TotalCharges']
#cat = ['MultipleLines', 'InternetService', 'OnlineSecurity', 'OnlineBackup', 'DeviceProtection', 'TechSupport', 'StreamingTV', 'StreamingMovies','Contract', 'PaymentMethod']
class CustomerData(BaseModel):
    gender: int = Field(..., ge=0, le=1, description="Client gender", example="0 for Male, 1 for Female")
    SeniorCitizen: int = Field(..., ge=0, le=1, description="If is senior citizen (0/1)")
    Partner: int = Field(..., ge=0, le=1, description="Has partner (0/1)")
    Dependents: int = Field(..., ge=0, le=1, description="Has dependents (0/1)")
    tenure: int = Field(..., ge=0, le=100, description="Months as customer")
    PhoneService: int = Field(..., ge=0, le=1, description="Has phone service (0/1)")
    MultipleLines: str = Field(..., description="Multiple lines (Yes/No/No phone service)")
    InternetService: str = Field(..., description="Internet service type (DSL/Fiber optic/No)")
    OnlineSecurity: str = Field(..., description="Online security (Yes/No/No internet service)")
    OnlineBackup: str = Field(..., description="Online backup (Yes/No/No internet service)")
    DeviceProtection: str = Field(..., description="Device protection (Yes/No/No internet service)")
    TechSupport: str = Field(..., description="Technical support (Yes/No/No internet service)")
    StreamingTV: str = Field(..., description="Streaming TV (Yes/No/No internet service)")
    StreamingMovies: str = Field(..., description="Streaming Movies (Yes/No/No internet service)")
    Contract: str = Field(..., description="Contract type (Month-to-month/One year/Two year)")
    PaperlessBilling: int = Field(..., ge=0, le=1, description="Paperless billing (0/1)")
    PaymentMethod: str = Field(..., description="Payment method")
    MonthlyCharges: float = Field(..., ge=0, description="Monthly charges")
    TotalCharges: float = Field(..., ge=0, description="Total charges")

    @field_validator('InternetService')
    def validate_internet(cls, v):
        if v not in ['DSL', 'Fiber optic', 'No']:
            raise ValueError('InternetService must be DSL, Fiber optic, or No')
        return v

class PredictionResponse(BaseModel):
    customer_id: Optional[str]
    churn_prediction: int
    churn_prediction_label: str
    churn_probability: float
    churn_probability_percentage: float
    risk_level: str
    recommendation: str