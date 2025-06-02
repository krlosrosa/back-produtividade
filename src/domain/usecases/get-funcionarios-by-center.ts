export interface GetFuncionariosByCenter {
  getFuncionarios: (
    params: GetFuncionariosByCenter.Params
  ) => Promise<GetFuncionariosByCenter.Result[]>;
}

export namespace GetFuncionariosByCenter {
  export type Params = {
    centerId: string;
  };

  export type Result = {
    id: string;
    name: string;
    centerId: string;
  };
}
