// src/repositories/prisma-poll-repository.ts
import { Poll } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { CreatePollData, PollRepository } from '../pollRepository'

export class PrismaPollRepository implements PollRepository {
  async create({ title, options }: CreatePollData): Promise<Poll> {
    const optionsData = options.map(option => {
      if (typeof option === 'string') {
        return { title: option }
      }
      return option
    })

    return await prisma.poll.create({
      data: {
        title,
        options: {
          createMany: {
            data: optionsData
          }
        }
      },
      include: {
        options: true
      }
    }) 
  }

  async findByTitle(title: string): Promise<Poll | null> {
    const poolTitle = await prisma.poll.findUnique({
      where: { title },
    })

    return poolTitle
  }

  async findAllPoll(): Promise<Poll[]> {
    const pollList = await prisma.poll.findMany()
    return pollList
  }

  async findPollById(pollId: string): Promise<Poll | null> {
    return await prisma.poll.findUnique({
      where: { id: pollId },
      include: {
        options: true 
      }
    })
  }
}