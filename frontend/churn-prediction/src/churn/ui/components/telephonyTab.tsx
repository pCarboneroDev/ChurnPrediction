import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TabsContent } from "@/components/ui/tabs";
import type { CustomerData } from "@/interfaces/CustomerData";


interface TelephonyTabProps {
    customer: CustomerData;
    handleBinaryChange: (field: keyof CustomerData, value: string) => void;
    handleStringChange: (field: keyof CustomerData, value: string) => void;
}


export function TelephonyTab({ customer, handleBinaryChange, handleStringChange }: TelephonyTabProps) {
    return (
        <TabsContent value="telefonia" className="space-y-4 mt-4">
            <div className="space-y-2">
                <Label>Phone Service</Label>
                <Select
                    value={customer.PhoneService === 0 ? 'No' : 'Yes'}
                    onValueChange={(v) => handleBinaryChange('PhoneService', v)}
                >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label>Multiple Lines</Label>
                <Select
                    value={customer.MultipleLines}
                    onValueChange={(v) => handleStringChange('MultipleLines', v)}
                >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="No">No</SelectItem>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No phone service">No phone service</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </TabsContent>
    );
}