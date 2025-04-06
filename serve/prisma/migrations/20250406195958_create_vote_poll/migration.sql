-- CreateTable
CREATE TABLE "VotePoll" (
    "id" SERIAL NOT NULL,
    "sessionId" TEXT NOT NULL,
    "pollId" TEXT NOT NULL,
    "pollOptionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VotePoll_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VotePoll_sessionId_pollId_key" ON "VotePoll"("sessionId", "pollId");

-- AddForeignKey
ALTER TABLE "VotePoll" ADD CONSTRAINT "VotePoll_pollOptionId_fkey" FOREIGN KEY ("pollOptionId") REFERENCES "Options"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VotePoll" ADD CONSTRAINT "VotePoll_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "Poll"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
