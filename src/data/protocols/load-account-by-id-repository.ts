export interface LoadAccountByIdRepository {
  loadByEmail: (id: string) => Promise<LoadAccountByEmailRepository.Result>
}

export namespace LoadAccountByEmailRepository {
  export type Result = {
    id: string
    name: string
    password: string
    center: string
    resetSenha: boolean
  }
}
