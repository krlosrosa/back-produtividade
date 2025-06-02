export interface GetFunctionarioById {
  getFuncionario: (
    params: GetFunctionarioById.Params
  ) => Promise<GetFunctionarioById.Result>;
}

export namespace GetFunctionarioById {
  export type Params = {
    id: string;
    centerId: string
  };

  export type Result = {
    id: string;
    name: string
    centerId: string
  };
}