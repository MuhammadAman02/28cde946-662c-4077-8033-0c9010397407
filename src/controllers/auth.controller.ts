import { FastifyRequest, FastifyReply } from 'fastify';
import { authenticateUser } from '../services/auth.service';
import { AppError } from '../utils/AppError';

export async function loginHandler(
  req: FastifyRequest<{ Body: { email: string; password: string } }>,
  res: FastifyReply
) {
  try {
    const { user, token } = await authenticateUser(req.body);
    
    res.status(200).send({
      message: 'Logged in successfully',
      user,
      token
    });
  } catch (err) {
    if (err instanceof AppError) {
      res.status(err.statusCode).send({ error: err.message });
    } else {
      res.status(500).send({ error: 'Internal Server Error' });
    }
  }
}