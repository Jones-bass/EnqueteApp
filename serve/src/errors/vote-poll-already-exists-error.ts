export class PollAlreadyExistsError extends Error {
  constructor() {
    super('There is already a poll.')
  }
}
