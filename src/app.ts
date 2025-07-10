import Fastify from 'fastify';
import { authRoutes } from './routes/auth.route';
import { env } from './config/env';

const app = Fastify({
  logger: true
});

// Register routes
app.register(authRoutes);

// Global error handler
app.setErrorHandler((error, request, reply) => {
  app.log.error(error);
  reply.status(500).send({ error: 'Something went wrong!' });
});

// Health check endpoint
app.get('/api/health', async (request, reply) => {
  return { status: 'OK', message: 'Server is running' };
});

export default app;