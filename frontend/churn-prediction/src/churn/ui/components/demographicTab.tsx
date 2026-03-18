import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TabsContent } from "@/components/ui/tabs";
import type { CustomerData } from "@/interfaces/CustomerData";

interface DemographicTabProps {
    customer: CustomerData;
    handleGenderChange: (value: string) => void;
    handleBinaryChange: (field: keyof CustomerData, value: string) => void;
    handleSeniorCitizenChange: (value: string) => void;
    handleNumberChange: (field: keyof CustomerData, value: string) => void;
}


export function DemographicTab({ customer, handleGenderChange, handleBinaryChange, handleSeniorCitizenChange, handleNumberChange }: DemographicTabProps) {
    return (
        <TabsContent value="demograficos" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Gender</Label>
                    <Select
                        value={customer.gender === 0 ? 'Male' : 'Female'}
                        onValueChange={handleGenderChange}
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>Senior Citizen</Label>
                    <Select
                        value={customer.SeniorCitizen.toString()}
                        onValueChange={handleSeniorCitizenChange}
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="0">No</SelectItem>
                            <SelectItem value="1">Yes</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Partner</Label>
                    <Select
                        value={customer.Partner === 0 ? 'No' : 'Yes'}
                        onValueChange={(v) => handleBinaryChange('Partner', v)}
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="No">No</SelectItem>
                            <SelectItem value="Yes">Yes</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>Dependents</Label>
                    <Select
                        value={customer.Dependents === 0 ? 'No' : 'Yes'}
                        onValueChange={(v) => handleBinaryChange('Dependents', v)}
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="No">No</SelectItem>
                            <SelectItem value="Yes">Yes</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="space-y-2">
                <Label>Tenure (months as customer)</Label>
                <Input
                    type="number"
                    min="0"
                    max="100"
                    value={customer.tenure}
                    onChange={(e) => handleNumberChange('tenure', e.target.value)}
                />
            </div>
        </TabsContent>
    )
}