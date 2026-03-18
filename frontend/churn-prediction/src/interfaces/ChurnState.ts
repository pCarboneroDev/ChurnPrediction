import type { CustomerData } from "./CustomerData";
import type { PredictionResponse } from "./PredictionResponse";

export interface ChurnState {
    customer: CustomerData,
    response: PredictionResponse | null,
    isLoading: boolean,
    error: string | null
}