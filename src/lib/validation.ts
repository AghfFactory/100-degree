import { z } from 'zod';

export const loginFormSchema = z.object({
  phone: z.string()
    .min(11, "Phone number must be 11 digits")
    .max(11, "Phone number must be 11 digits")
    .regex(/^09/, "Phone number must start with '09'")
    .refine(val => /^\d+$/.test(val), {
      message: "Phone number must contain only digits"
    })
});

export type LoginFormData = z.infer<typeof loginFormSchema>;