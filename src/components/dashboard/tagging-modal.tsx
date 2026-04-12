import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Report } from "@/types";
import { taggingSchema, TaggingFormValues } from "@/lib/validations/tagging";
import { TOXICITY_TYPES } from "@/constants"

interface TaggingModalProps {
    report: Report | null;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (id: string, values: TaggingFormValues) => void;
}

export function TaggingModal({ report, isOpen, onClose, onSubmit }: TaggingModalProps) {

    const [toxicityType, setToxicityType] = useState<any>(TOXICITY_TYPES);
    const form = useForm<TaggingFormValues>({
        resolver: zodResolver(taggingSchema),
        defaultValues: {
            types: [],
            impact: "Medium",
            comment: "",
        },
    });

    // Reset form when modal opens with a specific report (handles Edit mode)
    useEffect(() => {
        if (report) {
            form.reset({
                types: report.taggingDetails?.types || [],
                impact: report.taggingDetails?.impact || "Medium",
                comment: report.taggingDetails?.comment || "",
            });
        }
    }, [report, form]);


    /**
     * Processes form submission by merging standard selections and custom labels.
     * * This handler performs three key actions:
     * 1. Appends the 'customType' input to the selected types array if provided.
     * 2. Updates the local UI state to include the new custom label as a persistent checkbox.
     * 3. Triggers the parent onSubmit callback and resets the form state.
     * * @param values - The validated form data from React Hook Form.
     */
    const handleInternalSubmit = (values: TaggingFormValues) => {
        if (report) {
            let finalTypes = [...values.types];

            // If the moderator types a custom type, add that to the 
            // array of custom types we have
            if (values.customType && values.customType.trim() !== "") {
                finalTypes.push(values.customType.trim())
                setToxicityType((prev: any) => [...prev, values?.customType?.trim()])
            }

            const submissionData = {
                ...values,
                types: finalTypes
            }
            onSubmit(report.id, submissionData);
            onClose();
            form.reset();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] bg-card border-border sm:max-h-2/3 overflow-y-scroll">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold tracking-tight">
                        {report?.taggingDetails ? "Edit Review" : "Tag Message"}
                    </DialogTitle>
                    <div className="mt-4">
                        <label className="text-xs font-bold uppercase tracking-wider">Message</label>
                        <div className="p-3 rounded-lg bg-muted/50 border border-border italic text-sm text-foreground/90">
                            "{report?.message}"
                        </div>
                    </div>
                    <div className="mt-4">
                        <label className="text-xs font-bold uppercase tracking-wider">Raised By</label>
                        <div className="p-3 rounded-lg bg-muted/50 border border-border italic text-sm text-foreground/90">
                            "{report?.loggedBy}"
                        </div>
                    </div>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleInternalSubmit)} className="space-y-6 py-4">
                        {/* Toxicity Types */}
                        <FormField
                            control={form.control}
                            name="types"
                            render={() => (
                                <FormItem>
                                    <FormLabel className="text-xs font-bold uppercase tracking-wider">Violation Types</FormLabel>
                                    <div className="grid grid-cols-2 gap-2 mt-2">
                                        {toxicityType.map((type: any) => (
                                            <FormField
                                                key={type}
                                                control={form.control}
                                                name="types"
                                                render={({ field }: any) => (
                                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value?.includes(type)}
                                                                onCheckedChange={(checked) => {
                                                                    return checked
                                                                        ? field.onChange([...field.value, type])
                                                                        : field.onChange(field.value?.filter((value: any) => value !== type));
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="text-sm font-normal cursor-pointer">{type}</FormLabel>
                                                    </FormItem>
                                                )}
                                            />
                                        ))}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/** Custom type */}
                        <FormField
                            control={form.control}
                            name="customType"
                            render={({ field }) => (
                                <FormItem className="mt-4">
                                    <FormLabel className="text-[10px] font-bold text-muted-foreground uppercase">
                                        Or add custom label
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="e.g., Stream Sniping, Griefing..."
                                            className="h-8 text-sm"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />



                        {/* Impact Level */}
                        <FormField
                            control={form.control}
                            name="impact"
                            render={({ field }: any) => (
                                <FormItem>
                                    <FormLabel className="text-xs font-bold uppercase tracking-wider">Severity Impact</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select impact level" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Low">Low - Minor annoyance</SelectItem>
                                            <SelectItem value="Medium">Medium - Standard violation</SelectItem>
                                            <SelectItem value="High">High - Aggressive behavior</SelectItem>
                                            <SelectItem value="Critical">Critical - Immediate threat</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Justification */}
                        <FormField
                            control={form.control}
                            name="comment"
                            render={({ field }: any) => (
                                <FormItem>
                                    <FormLabel className="text-xs font-bold uppercase tracking-wider">Moderator Comment</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Why did you choose these tags?"
                                            className="resize-none h-24"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter className="pt-4 border-t border-border/50">
                            <Button type="button" variant="ghost" onClick={onClose} className="font-semibold cursor-pointer">
                                Cancel
                            </Button>
                            <Button type="submit" className="font-bold px-8 cursor-pointer">
                                {report?.taggingDetails ? "Update Tag" : "Confirm Tag"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}