import { PrismaPollRepository } from '../../repositories/prisma/prismaPollRepository'
import { ListPollUsersUseCase } from '../listPollUseCase'

export function makeListPollUseCase() {
  const pollRepository = new PrismaPollRepository()
  const listPollUseCase = new ListPollUsersUseCase(pollRepository)

  return listPollUseCase
}
