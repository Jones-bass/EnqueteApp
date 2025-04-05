import { Prisma, Poll } from '@prisma/client'

export interface CreatePollData {
  title: string
  options: string[] | Prisma.OptionsCreateInput[]
}

export interface PollRepository {
  findByTitle(title: string): Promise<Poll | null>
  findAllPoll(): Promise<Poll[]>
  create(data: CreatePollData): Promise<Poll>
  findPollById(pollId: string): Promise<Poll | null> 
}