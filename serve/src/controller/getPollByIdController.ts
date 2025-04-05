// src/controllers/get-poll-controller.ts
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeListPollIdUseCase } from '../usecases/factories/make-list-pollId-case'

export async function getPollByIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getPollParams = z.object({
    pollId: z.string().uuid()
  })

  const { pollId } = getPollParams.parse(request.params)

  try {
    const getPollUseCase = makeListPollIdUseCase()
    const { poll } = await getPollUseCase.execute(pollId)

    if (!poll) {
      return reply.status(404).send({ message: 'Poll not found' })
    }

    return reply.status(200).send({ poll })
  } catch (err) {
    return reply.status(500).send({ message: 'Internal server error' })
  }
}