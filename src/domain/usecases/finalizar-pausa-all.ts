export interface FinalizarPausaAll {
  finalizarPausaAll: (account: FinalizarPausaAll.Params) => Promise<FinalizarPausaAll.Result>
}

export namespace FinalizarPausaAll {
  export type Params = {
    centerId: string
    data: Date
    processo: string
  }

  export type Result = boolean
}
