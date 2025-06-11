export interface AddFuncionarioEmMassa {
  addFuncionarioEmMassa: (params: AddFuncionarioEmMassa.Params) => Promise<AddFuncionarioEmMassa.Result>
}

export namespace AddFuncionarioEmMassa {
  export type Params = {
    funcionarios:Funcionarios[]
  }
  export type Result = boolean
}


type Funcionarios = {
  id: string
  name: string
  centerId: string
}