export class TokenInvalidError extends Error {
  constructor () {
    super('Token Invalido')
    this.name = 'tokenInvalido'
  }
}
