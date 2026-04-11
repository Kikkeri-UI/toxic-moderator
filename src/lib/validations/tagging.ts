import * as z from "zod";

export const taggingSchema = z.object({
    types: z.array(z.string()).min(1, "Select at least one toxicity type"),
    impact: z.enum(["Low", "Medium", "High", "Critical"]),
    comment: z.string().optional(),
});

export type TaggingFormValues = z.infer<typeof taggingSchema>;