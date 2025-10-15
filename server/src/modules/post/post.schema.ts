import { z } from "zod";

const OPERAND_REGEX = /^[-+]?\d{1,10}(?:\.\d{1,2})?$/;

export const postSchema = z.object({
  value: z
    .string()
    .min(1)
    .refine((s) => OPERAND_REGEX.test(s.trim()), {
      message:
        "post must be a number with up to 10 integer digits and up to 2 decimals",
    }),
});

const operationEnum = ["ADD", "SUB", "MUL", "DIV"];

export const operationSchema = z.object({
  parentId: z.string().optional(),
  operation: z.enum(
    operationEnum,
    `Please choose among these operations only ${operationEnum}`
  ),
  operand: z
    .string()
    .min(1)
    .refine((s) => OPERAND_REGEX.test(s.trim()), {
      message:
        "operand must be a number with up to 10 integer digits and up to 2 decimals",
    }),
});
