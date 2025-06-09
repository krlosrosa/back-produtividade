export interface AddPausaAll {
  addPausaAll: (account: AddPausaAll.Params) => Promise<AddPausaAll.Result>
}

export namespace AddPausaAll {
  export type Params = {
    centerId: string
    data: Date
    processo: string
  }

  export type Result = boolean
}
