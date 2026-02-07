import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(2).optional(),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export type RegisterInput = z.infer<typeof registerSchema>;
