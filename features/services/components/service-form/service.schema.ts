import { z } from "zod";

export const serviceSchema = z.object({
    name: z.object({
        az: z.string().min(1),
        en: z.string().min(1),
        ru: z.string().min(1),
    }),
    description: z.object({
        az: z.string().min(1),
        en: z.string().min(1),
        ru: z.string().min(1),
    })
}).refine((data) => {
    return data.name.az && data.name.en && data.name.ru && data.description.az && data.description.en && data.description.ru;
}, {
    message: "All fields are required",
    path: ["name", "description"]
});

export type ServiceSchema = z.infer<typeof serviceSchema>;