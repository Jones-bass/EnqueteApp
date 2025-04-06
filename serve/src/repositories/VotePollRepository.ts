import { VotePoll } from '@prisma/client';

export interface VotePollRepository {
  create(data: { sessionId: string; pollId: string; pollOptionId: string }): Promise<VotePoll>;
  findBySessionIdAndPollId(sessionId: string, pollId: string): Promise<VotePoll | null>;
  delete(id: number): Promise<void>; 
}