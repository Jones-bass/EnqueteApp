import { Prisma, Poll } from '@prisma/client'

export interface CreatePollData {
  title: string
  options: string[] | Prisma.OptionsCreateInput[]
}

export interface PollRepository {
  findByTitle(title: string): Promise<Poll | null>
  create(data: CreatePollData): Promise<Poll>
}