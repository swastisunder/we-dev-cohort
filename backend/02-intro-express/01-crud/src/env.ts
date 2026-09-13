import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  PORT: z.string().default("8080"),
});

function createEnv(env: NodeJS.ProcessEnv) {
  const safeParseResult = envSchema.safeParse(env);

  if (!safeParseResult.success)
    throw new Error(
      `Invalid environment variables: ${safeParseResult.error.message}`,
    );

  return safeParseResult.data;
}

export { createEnv };

export const env = createEnv(process.env);
