import { envsafe, str, port } from 'envsafe';
import dotenv from 'dotenv';

dotenv.config();

export const env = envsafe({
  PORT: port({ default: 3000 }),
  JWT_SECRET: str({ default: 'your-secret-key' })
});