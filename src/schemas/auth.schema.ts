import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

// Login request schema
const loginZod = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required')
});

// Login response schema
const loginResponseZod = z.object({
  message: z.string(),
  user: z.object({
    id: z.string(),
    email: z.string().email()
  }),
  token: z.string()
});

// Export Fastify-compatible schemas
export const loginSchema = {
  body: zodToJsonSchema(loginZod),
  response: {
    200: zodToJsonSchema(loginResponseZod),
    401: zodToJsonSchema(z.object({
      error: z.string()
    }))
  }
};