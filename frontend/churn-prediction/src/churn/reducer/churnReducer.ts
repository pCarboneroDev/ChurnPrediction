import type { ChurnState } from "@/interfaces/ChurnState"
import type { CustomerData } from "@/interfaces/CustomerData"
import type { PredictionResponse } from "@/interfaces/PredictionResponse"


export const getInitialState = (): ChurnState => {
    return {
        customer: {
            gender: 0,
            SeniorCitizen: 0,
            Partner: 0,
            Dependents: 0,
            tenure: 12,
            PhoneService: 1,
            MultipleLines: 'No',
            InternetService: 'DSL',
            OnlineSecurity: 'No',
            OnlineBackup: 'No',
            DeviceProtection: 'No',
            TechSupport: 'No',
            StreamingTV: 'No',
            StreamingMovies: 'No',
            Contract: 'Month-to-month',
            PaperlessBilling: 0,
            PaymentMethod: 'Electronic check',
            MonthlyCharges: 65.0,
            TotalCharges: 780.0
        },
        response: null,
        isLoading: false,
        error: null
    }
}


export type ChurnAction =
    | { type: 'GENDER_CHANGE', payload: number }
    | { type: 'BINARY_CHANGE', payload: { [key: string]: number } }
    | { type: 'SENIOR_CITIZEN_CHANGE', payload: number }
    | { type: 'NUMBER_CHANGE', payload: { [key: string]: number } }
    | { type: 'STRING_CHANGE', payload: { [key: string]: string } }
    | { type: 'PREDICT' }
    | { type: 'UPLOAD_SUCCESS', payload: PredictionResponse }
    | { type: 'UPLOAD_ERROR', payload: string }
    


export const churnReducer = (state: ChurnState, action: ChurnAction) => {
    switch (action.type) {
        case ('GENDER_CHANGE'): {
            return {
                ...state,
                customer: {
                    ...state.customer,
                    gender: action.payload
                }
            }
        }
        case ('BINARY_CHANGE'): {
            const key = Object.keys(action.payload)[0] as keyof CustomerData;
            return {
                ...state,
                customer: {
                    ...state.customer,
                    [key]: action.payload[key]
                }
            }
        }
        case ('NUMBER_CHANGE'): {
            const key = Object.keys(action.payload)[0] as keyof CustomerData;
            return {
                ...state,
                customer: {
                    ...state.customer,
                    [key]: action.payload[key]
                }
            }
        }
        case ('SENIOR_CITIZEN_CHANGE'): {
            return {
                ...state,
                customer: {
                    ...state.customer,
                    SeniorCitizen: action.payload
                }
            }
        }
        case ('STRING_CHANGE'): {
            const key = Object.keys(action.payload)[0] as keyof CustomerData;
            return {
                ...state,
                customer: {
                    ...state.customer,
                    [key]: action.payload[key]
                }
            }
        }

        case('PREDICT'): {
            return {
                ...state,
                isLoading: true,
                response: null,
                error: null
            }
        }

        case('UPLOAD_SUCCESS'): {
            return {
                ...state,
                isLoading: false,
                response: action.payload,
                error: null
            }
        }

        case('UPLOAD_ERROR'): {
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                response: null
            }
        }

        default:
            return state
    }
}