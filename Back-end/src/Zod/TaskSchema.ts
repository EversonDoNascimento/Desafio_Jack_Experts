import { z } from "zod";

export const TaskSchema = z.object({
  title: z.string(),
  description: z.string(),
  id_user: z.string(),
});
