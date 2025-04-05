import { FastifyReply, FastifyRequest } from 'fastify'
import { makeListPollUseCase } from '../usecases/factories/make-list-poll-case'

export async function ListPollAllController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const listPatientsUseCase = makeListPollUseCase()

  const { allPollList } = await listPatientsUseCase.execute()

  return reply.status(200).send({ allPollList })
}
