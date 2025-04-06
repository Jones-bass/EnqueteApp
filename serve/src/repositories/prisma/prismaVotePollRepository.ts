import { prisma } from '../../lib/prisma';
import { VotePollRepository } from '../VotePollRepository';

export class PrismaVoteRepository implements VotePollRepository {
  async create(data: { sessionId: string; pollId: string; pollOptionId: string }) {
    return await prisma.votePoll.create({
      data: {
        sessionId: data.sessionId,
        pollId: data.pollId,
        pollOptionId: data.pollOptionId,
      }
    });
  }

  async findBySessionIdAndPollId(sessionId: string, pollId: string) {
    return await prisma.votePoll.findUnique({
      where: {
        sessionId_pollId: {
          sessionId,
          pollId,
        }
      }
    });
  }

  async delete(id: number) { 
    await prisma.votePoll.delete({
      where: { id }
    });
  }
}