// src/usecases/voteOnPollUseCase.ts
import { randomUUID } from 'node:crypto';
import { VotePollRepository } from '../repositories/VotePollRepository';
import { AlreadyVotedError } from '../errors/vote-poll-already-exists-error';

export interface VoteOnPollRequest {
  pollId: string;
  pollOptionId: string;
  sessionId?: string;
  setCookie: (name: string, value: string) => void;
}

export interface VoteOnPollResponse {
  sessionId: string;
}

export class VoteOnPollUseCase {
  constructor(private voteRepository: VotePollRepository) {}

  async execute(request: VoteOnPollRequest): Promise<VoteOnPollResponse> {
    const { pollId, pollOptionId, sessionId, setCookie } = request;
    let newSessionId = sessionId;

    if (newSessionId) {
      const userPreviousVote = await this.voteRepository.findBySessionIdAndPollId(newSessionId, pollId);

      if (userPreviousVote) {
        if (userPreviousVote.pollOptionId !== pollOptionId) {
          await this.voteRepository.delete(userPreviousVote.id); // Now matches number type
        } else {
          throw new AlreadyVotedError();
        }
      }
    }

    if (!newSessionId) {
      newSessionId = randomUUID();
      setCookie('sessionId', newSessionId);
    }

    await this.voteRepository.create({
      sessionId: newSessionId,
      pollId,
      pollOptionId
    });

    return { sessionId: newSessionId };
  }
}