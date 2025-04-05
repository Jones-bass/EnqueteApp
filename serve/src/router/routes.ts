import { FastifyInstance } from 'fastify';
import { RegisterPollController } from '../controller/pollController';

export async function eventRoutes(app: FastifyInstance) {
  app.post('/poll', RegisterPollController);
}
