import { PrismaVoteRepository } from '../../repositories/prisma/prismaVotePollRepository'
import { VoteOnPollUseCase } from '../voteOnPollUseCase'

export function makeVoteOnPollUseCase() {
  const pollVoteRepository = new PrismaVoteRepository()
  const votePollUseCase = new VoteOnPollUseCase(pollVoteRepository)

  return votePollUseCase
}

