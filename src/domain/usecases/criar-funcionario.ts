export interface CriarFunctionario {
  criarFuncionario: (
    params: CriarFunctionario.Params
  ) => Promise<CriarFunctionario.Result>;
}

export namespace CriarFunctionario {
  export type Params = {
    id: string;
    name: string
    centerId: string
  };

  export type Result = boolean
}