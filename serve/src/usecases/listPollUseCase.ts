import { Poll } from '@prisma/client'
import { PollRepository } from '../repositories/pollRepository'

interface ListDoctorsResponse {
  allPollList: Poll[]
}

export class ListPollUsersUseCase {
  constructor(private pollRepository: PollRepository) {}

  async execute(): Promise<ListDoctorsResponse> {
    const allPollList = await this.pollRepository.findAllPoll()
    return { allPollList }
  }
}
