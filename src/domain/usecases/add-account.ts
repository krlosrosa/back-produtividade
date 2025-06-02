export interface AddAccount {
  addAccount: (account: AddAccount.Params) => Promise<AddAccount.Result>
}

export namespace AddAccount {
  export type Params = {
    name: string
    id: string
    password: string
    centerId: string
  }

  export type Result = boolean
}
