import { DBRawSchema } from "@/types";
import { z } from "zod";

export const createDbSchema = <T extends DBRawSchema>(
  input: T
) => z.object({
    ...input,
    id: z.string(),
  });
