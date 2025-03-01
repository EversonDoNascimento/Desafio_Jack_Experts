import { z } from "zod";

export const TaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  id_user: z.string().min(1),
});

export const TaskSchemaEdit = z.object({
  title: z.string(),
  description: z.string(),
});
