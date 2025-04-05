import { Poll } from '@prisma/client'
import { PollRepository } from '../repositories/pollRepository'

interface GetPollResponse {
  poll: Poll | null
}

export class GetPollByIdUseCase {
  constructor(private pollRepository: PollRepository) {}

  async execute(pollId: string): Promise<GetPollResponse> {
    const poll = await this.pollRepository.findPollById(pollId)
    return { poll }
  }
}