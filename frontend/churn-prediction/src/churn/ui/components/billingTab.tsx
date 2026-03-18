import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TabsContent } from "@/components/ui/tabs";
import type { CustomerData } from "@/interfaces/CustomerData";


interface BillingTabProps {
    customer: CustomerData;
    handleStringChange: (field: keyof CustomerData, value: string) => void;
    handleBinaryChange: (field: keyof CustomerData, value: string) => void;
    handleNumberChange: (field: keyof CustomerData, value: string) => void;
}

export function BillingTab({ customer, handleStringChange, handleBinaryChange, handleNumberChange }: BillingTabProps) {
    return (<TabsContent value="facturacion" className="space-y-4 mt-4">
        <div className="space-y-2">
            <Label>Contract</Label>
            <Select
                value={customer.Contract}
                onValueChange={(v) => handleStringChange('Contract', v)}
            >
                <SelectTrigger>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Month-to-month">Month-to-month</SelectItem>
                    <SelectItem value="One year">One year</SelectItem>
                    <SelectItem value="Two year">Two year</SelectItem>
                </SelectContent>
            </Select>
        </div>

        <div className="space-y-2">
            <Label>Paperless Billing</Label>
            <Select
                value={customer.PaperlessBilling === 0 ? 'No' : 'Yes'}
                onValueChange={(v) => handleBinaryChange('PaperlessBilling', v)}
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
            <Label>Payment Method</Label>
            <Select
                value={customer.PaymentMethod}
                onValueChange={(v) => handleStringChange('PaymentMethod', v)}
            >
                <SelectTrigger>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Electronic check">Electronic check</SelectItem>
                    <SelectItem value="Mailed check">Mailed check</SelectItem>
                    <SelectItem value="Bank transfer (automatic)">Bank transfer (automatic)</SelectItem>
                    <SelectItem value="Credit card (automatic)">Credit card (automatic)</SelectItem>
                </SelectContent>
            </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label>Monthly Charges ($)</Label>
                <Input
                    type="number"
                    step="0.01"
                    min="0"
                    value={customer.MonthlyCharges}
                    onChange={(e) => handleNumberChange('MonthlyCharges', e.target.value)}
                />
            </div>

            <div className="space-y-2">
                <Label>Total Charges ($)</Label>
                <Input
                    type="number"
                    step="0.01"
                    min="0"
                    value={customer.TotalCharges}
                    onChange={(e) => handleNumberChange('TotalCharges', e.target.value)}
                />
            </div>
        </div>
    </TabsContent>);
}