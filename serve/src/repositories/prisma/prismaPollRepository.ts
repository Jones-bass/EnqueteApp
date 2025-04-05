import { Poll, Prisma } from '@prisma/client';
import { prisma } from '../../lib/prisma';
import { PollRepository } from '../pollRepository';

export class PrismaPollRepository implements PollRepository {
  async create(data: Prisma.PollCreateInput): Promise<Poll> {
    const createPoll = await prisma.poll.create({ data });
    return createPoll;
  }
}
