import {z} from 'zod';

export const project_schema = z.object({
    name: z.string().min(3, {message: "Name must be more than 3 characters"}),
    url: z.string(),
    description: z.string().min(5, {message: "Description must be more than 5 characters"})
})

export type project_schema_type = z.infer<typeof project_schema>

