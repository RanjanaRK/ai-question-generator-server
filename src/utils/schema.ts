import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(2).optional(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
