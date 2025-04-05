import { Poll } from '@prisma/client'
import { PollRepository } from '../repositories/pollRepository'
import { PollAlreadyExistsError } from '../errors/poll-already-exists-error'

export interface CreatePollRequest {
  title: string
  options: string[]
}

export interface CreatePollResponse {
  poll: Poll
}

export class PollUseCase {
  constructor(private pollRepository: PollRepository) {}

  async execute({ title, options }: CreatePollRequest): Promise<CreatePollResponse> {
    const patientWithSameEmail =
    await this.pollRepository.findByTitle(title)

  if (patientWithSameEmail) {
    throw new PollAlreadyExistsError()
  }

  const poll = await this.pollRepository.create({
      title,
      options
    })

    return { poll }
  }
}