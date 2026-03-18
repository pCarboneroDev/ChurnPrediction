import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TabsContent } from "@/components/ui/tabs";
import type { CustomerData } from "@/interfaces/CustomerData";


interface InternetTabProps {
    customer: CustomerData;
    handleStringChange: (field: keyof CustomerData, value: string) => void;
}

export function InternetTab({ customer, handleStringChange }: InternetTabProps) {
    return (
        <TabsContent value="internet" className="space-y-4 mt-4">
            <div className="space-y-2">
                <Label>Internet Service</Label>
                <Select
                    value={customer.InternetService}
                    onValueChange={(v) => handleStringChange('InternetService', v)}
                >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="DSL">DSL</SelectItem>
                        <SelectItem value="Fiber optic">Fiber optic</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Streaming TV</Label>
                    <Select
                        value={customer.StreamingTV}
                        onValueChange={(v) => handleStringChange('StreamingTV', v)}
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
                    <Label>Streaming Movies</Label>
                    <Select
                        value={customer.StreamingMovies}
                        onValueChange={(v) => handleStringChange('StreamingMovies', v)}
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