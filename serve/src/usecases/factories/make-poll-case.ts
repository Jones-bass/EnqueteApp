import { PrismaPollRepository } from "../../repositories/prisma/prismaPollRepository"
import { PollUseCase } from "../poll"


export function makePollUseCase() {
  const usersRepository = new PrismaPollRepository()
  const pollUseCase = new PollUseCase(usersRepository)

  return pollUseCase
}
