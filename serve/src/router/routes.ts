import { FastifyInstance } from 'fastify';
import { RegisterPollController } from '../controller/pollController';
import { getPollByIdController } from '../controller/getPollByIdController';
import { ListPollAllController } from '../controller/listPollAllController';
import { voteOnPollController } from '../controller/voteOnPollController';

export async function eventRoutes(app: FastifyInstance) {
  app.post('/poll', RegisterPollController);
  app.get('/poll', ListPollAllController);
  app.get('/poll/:pollId', getPollByIdController)

  app.post('/poll/:pollId/votes', voteOnPollController);
}
