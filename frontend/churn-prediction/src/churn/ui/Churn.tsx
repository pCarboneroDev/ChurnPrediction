import { useReducer } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { CustomerData } from '@/interfaces/CustomerData'
import { churnReducer, getInitialState } from '../reducer/churnReducer'
import { call } from '@/service/api'
import { DemographicTab } from './components/demographicTab'
import { TelephonyTab } from './components/telephonyTab'
import { InternetTab } from './components/internetTab'
import { SecurityTab } from './components/securityTab'
import { BillingTab } from './components/billingTab'


function Churn() {
    const [state, dispatch] = useReducer(churnReducer, getInitialState());

    const {
        customer,
        response,
        isLoading,
        error
    } = state;


    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            dispatch({ type: 'PREDICT' });

            const res = await call(customer);

            if (res) {
                dispatch({ type: 'UPLOAD_SUCCESS', payload: res })
            }
            else{
                console.error('Error en la predicción:', res)
                dispatch({ type: 'UPLOAD_ERROR', payload: 'Error en la predicción' })
            }
        } catch (error) {
            dispatch({ type: 'UPLOAD_ERROR', payload: 'Error al conectar con la API' })
        }
    }


    const handleGenderChange = (value: string) => {
        dispatch({ type: 'GENDER_CHANGE', payload: value === 'Male' ? 0 : 1 })
    }

    const handleBinaryChange = (field: keyof CustomerData, value: string) => {
        dispatch({ type: 'BINARY_CHANGE', payload:{ [field]: value === 'Yes' ? 1 : 0 } })
    }

    const handleSeniorCitizenChange = (value: string) => {
        dispatch({ type: 'SENIOR_CITIZEN_CHANGE', payload: parseInt(value) })
    }

    const handleStringChange = (field: keyof CustomerData, value: string) => {
        dispatch({ type: 'STRING_CHANGE', payload: { [field]: value } })
    }

    const handleNumberChange = (field: keyof CustomerData, value: string) => {
        dispatch({ type: 'NUMBER_CHANGE', payload: { [field]: parseFloat(value) || 0 } })
    }

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Churn Prediction</CardTitle>
                    <p className="text-sm text-muted-foreground">
                        Complete the form below to predict the likelihood of a customer churning. 
                        The prediction will be based on the provided demographic, telephony, internet, security, and billing information. 
                    </p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Tabs defaultValue="demograficos" className="w-full">
                            <TabsList className="grid w-full grid-cols-5">
                                <TabsTrigger value="demograficos">Demographic</TabsTrigger>
                                <TabsTrigger value="telefonia">Telephony</TabsTrigger>
                                <TabsTrigger value="internet">Internet</TabsTrigger>
                                <TabsTrigger value="seguridad">Security</TabsTrigger>
                                <TabsTrigger value="facturacion">Billing</TabsTrigger>
                            </TabsList>

                            <DemographicTab
                                customer={customer}
                                handleGenderChange={handleGenderChange}
                                handleBinaryChange={handleBinaryChange}
                                handleSeniorCitizenChange={handleSeniorCitizenChange}
                                handleNumberChange={handleNumberChange}
                            />

                            <TelephonyTab
                                customer={customer}
                                handleBinaryChange={handleBinaryChange}
                                handleStringChange={handleStringChange}
                            />

                            <InternetTab
                                customer={customer}
                                handleStringChange={handleStringChange}
                            />

                            <SecurityTab
                                customer={customer}
                                handleStringChange={handleStringChange}
                            />

                            <BillingTab
                                customer={customer}
                                handleStringChange={handleStringChange}
                                handleBinaryChange={handleBinaryChange}
                                handleNumberChange={handleNumberChange}
                            />
                        </Tabs>

                        <Button type="submit" disabled={isLoading} className="w-full mt-6">
                            {isLoading ? 'Processing...' : 'Predict Churn'}
                        </Button>
                    </form>

                    {response && (
                        <Card className="mt-6">
                            <CardContent className="pt-6 space-y-2">
                                <div className={`p-4 rounded-lg ${response.prediction === 'Alto riesgo'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-green-100 text-green-800'
                                    }`}>
                                    <p className="font-bold text-lg">{response.prediction}</p>
                                </div>
                                <p><span className="font-semibold">Probabilidad:</span> {response.probability}%</p>
                                <p><span className="font-semibold">Recomendación:</span> {response.recommendation}</p>
                            </CardContent>
                        </Card>
                    )}

                    {error && (
                        <Card className="mt-6">
                            <CardContent className="pt-6 space-y-2">
                                <div className="p-4 rounded-lg bg-red-100 text-red-800">
                                    <p className="font-bold text-lg">Error</p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default Churn