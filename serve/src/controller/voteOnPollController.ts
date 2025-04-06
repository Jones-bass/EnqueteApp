import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { PollAlreadyExistsError } from '../errors/poll-already-exists-error';
import { makeVoteOnPollUseCase } from '../usecases/factories/make-vote-poll-case';

export async function voteOnPollController(request: FastifyRequest, reply: FastifyReply) {
  const voteOnPollBody = z.object({
    pollOptionId: z.string().uuid(),
  });

  const voteOnPollParams = z.object({
    pollId: z.string().uuid(),
  });

  try {
    const { pollId } = voteOnPollParams.parse(request.params);
    const { pollOptionId } = voteOnPollBody.parse(request.body);
    let { sessionId } = request.cookies;

    const voteOnPollUseCase = makeVoteOnPollUseCase();

    const result = await voteOnPollUseCase.execute({
      pollId,
      pollOptionId,
      sessionId,
      setCookie: (name: string, value: string) => {
        reply.setCookie(name, value, {
          path: '/',
          maxAge: 60 * 60 * 24 * 30, // 30 days
          signed: true,
          httpOnly: true,
        });
      }
    });

    return reply.status(201).send({ sessionId: result.sessionId });
  } catch (err) {
    if (err instanceof PollAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }

    return reply.status(500).send({ message: 'Internal Server Error' });
  }
}

