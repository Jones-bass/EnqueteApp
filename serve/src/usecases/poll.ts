import { Poll } from '@prisma/client';
import { PollRepository } from '../repositories/pollRepository';

interface PollUseCaseRequest {
  title: string;
}

interface PollUseCaseResponse {
  poll: Poll;
}

export class PollUseCase {
  constructor(private patientRepository: PollRepository) { }

  async execute({
    title,
  }: PollUseCaseRequest): Promise<PollUseCaseResponse> {

  
    const poll = await this.patientRepository.create({
      title,
    });

    return { poll };
  }
}
