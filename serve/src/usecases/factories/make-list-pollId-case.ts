import { PrismaPollRepository } from "../../repositories/prisma/prismaPollRepository"
import { GetPollByIdUseCase } from "../GetPollByIdUseCase"

export function makeListPollIdUseCase() {
  const pollIdRepository = new PrismaPollRepository()
  const listPollIdUseCase = new GetPollByIdUseCase(pollIdRepository)

  return listPollIdUseCase
}
