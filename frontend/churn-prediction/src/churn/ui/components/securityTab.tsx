import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TabsContent } from "@/components/ui/tabs";
import type { CustomerData } from "@/interfaces/CustomerData";

interface SecurityTabProps {
    customer: CustomerData;
    handleStringChange: (field: keyof CustomerData, value: string) => void;
}

export function SecurityTab({ customer, handleStringChange }: SecurityTabProps) {
    return (
        <TabsContent value="seguridad" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Online Security</Label>
                    <Select
                        value={customer.OnlineSecurity}
                        onValueChange={(v) => handleStringChange('OnlineSecurity', v)}
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="No">No</SelectItem>
                            <SelectItem value="Yes">Yes</SelectItem>
                            <SelectItem value="No internet service">No internet service</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>Online Backup</Label>
                    <Select
                        value={customer.OnlineBackup}
                        onValueChange={(v) => handleStringChange('OnlineBackup', v)}
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="No">No</SelectItem>
                            <SelectItem value="Yes">Yes</SelectItem>
                            <SelectItem value="No internet service">No internet service</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Device Protection</Label>
                    <Select
                        value={customer.DeviceProtection}
                        onValueChange={(v) => handleStringChange('DeviceProtection', v)}
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="No">No</SelectItem>
                            <SelectItem value="Yes">Yes</SelectItem>
                            <SelectItem value="No internet service">No internet service</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>Tech Support</Label>
                    <Select
                        value={customer.TechSupport}
                        onValueChange={(v) => handleStringChange('TechSupport', v)}
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="No">No</SelectItem>
                            <SelectItem value="Yes">Yes</SelectItem>
                            <SelectItem value="No internet service">No internet service</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </TabsContent>
    );
}    