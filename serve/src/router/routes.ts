import { FastifyInstance } from 'fastify';
import { RegisterPollController } from '../controller/pollController';
import { getPollByIdController } from '../controller/getPollByIdController';
import { ListPollAllController } from '../controller/listPollAllController';

export async function eventRoutes(app: FastifyInstance) {
  app.post('/poll', RegisterPollController);
  app.get('/poll', ListPollAllController);
  app.get('/poll/:pollId', getPollByIdController)

}
