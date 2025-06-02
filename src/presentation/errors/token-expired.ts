export class TokenExpiredError extends Error {
  constructor () {
    super('Token Expirado')
    this.name = 'tokenExpirado'
  }
}
