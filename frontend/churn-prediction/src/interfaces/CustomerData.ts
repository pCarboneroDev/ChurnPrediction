//! I don't know why I put names in caps, for properties I usually use camelCase but whatever
export interface CustomerData {
  gender: number;
  SeniorCitizen: number;
  Partner: number;
  Dependents: number;
  tenure: number;
  PhoneService: number;
  MultipleLines: string;
  InternetService: string;
  OnlineSecurity: string;
  OnlineBackup: string;
  DeviceProtection: string;
  TechSupport: string;
  StreamingTV: string;
  StreamingMovies: string;
  Contract: string;
  PaperlessBilling: number;
  PaymentMethod: string;
  MonthlyCharges: number;
  TotalCharges: number;
}