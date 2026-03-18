import type { CustomerData } from "@/interfaces/CustomerData";
import type { PredictionResponse } from "@/interfaces/PredictionResponse";


export const call = async (data: CustomerData): Promise<PredictionResponse> => {
    try {
        const res = await fetch('http://127.0.0.1:8000/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })

        if (!res.ok) {
            const errorData = await res.json()
            throw new Error(errorData.detail || 'An error occurred during the prediction')
        }

        const response: PredictionResponse = await res.json()
        return response
    } catch (error) {
        throw new Error('Error trying to connect to the server')
    }
}