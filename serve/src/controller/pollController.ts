import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makePollUseCase } from '../usecases/factories/make-poll-case';
import { PollAlreadyExistsError } from '../errors/poll-already-exists-error';

export async function RegisterPollController(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    title: z.string(),
    options: z.string(), 
  });

  const { title, options } = registerBodySchema.parse(request.body);

  const optionsArray = options.split(',').map((option) => option.trim()); 
  
  try {
    const pollUseCase = makePollUseCase();

    const { poll } = await pollUseCase.execute({
      title,
      options: optionsArray, 
    });

    return reply.status(200).send({ poll });
  } catch (err) {
    if (err instanceof PollAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }

    return reply.status(500).send({ message: 'Internal Server Error' });
  }
}
