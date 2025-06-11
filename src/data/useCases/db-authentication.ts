import { Authentication } from '@/domain/usecases/authentication'
import { HashComparer } from '../protocols/hash-comparer'
import { Encrypter } from '../protocols/encrypter'
import { LoadAccountByIdRepository } from '../protocols/load-account-by-id-repository'
import { UpdateAccessTokenRepository } from '../protocols/update-access-token-repository'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByIdRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth (authenticationParams: Authentication.Params): Promise<Authentication.Result> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authenticationParams.email)
    if (account) {
      const isValid = await this.hashComparer.compare(authenticationParams.password, account.password)
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(account.id)
        await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken)
        return {
          accessToken,
          name: account.name,
          center: account.center,
          resetSenha: account.resetSenha
        }
      }
    }
    return null
  }
}
