import { z } from "zod";

const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]{4,10}$/;

export const authSchema = z.object({
  username: z
    .string(
      "Username must be at least 4 characters long and include uppercase, lowercase, number"
    )
    .regex(usernameRegex)
    .min(4, "Username must be at least 4 characters long.")
    .max(10, "Username must not exceed 10 characters"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters long.")
    .max(16, "Password must not exceed 16 characters."),
});
