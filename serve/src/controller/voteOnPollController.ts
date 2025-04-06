import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function voteOnPollController(request: FastifyRequest, reply: FastifyReply) {
  try {
    let { sessionId } = request.cookies;

    return reply.status(201).send({ sessionId });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        success: false,
        message: 'Validation error',
        errors: error.errors,
      });
    }
    
    console.error('Vote error:', error);
    return reply.status(500).send({ 
      success: false,
      message: 'Internal server error' 
    });
  }
}