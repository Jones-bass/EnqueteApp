import { Prisma, Poll } from '@prisma/client'

export interface PollRepository {
  create(data: Prisma.PollCreateInput): Promise<Poll>
}
