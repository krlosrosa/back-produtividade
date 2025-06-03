export interface AddPauseProdutividade {
  addPausa: (
    params: AddPauseProdutividade.Params
  ) => Promise<AddPauseProdutividade.Result>;
}
export namespace AddPauseProdutividade {
  export type Params = {
    id: number;
  };

  export type Result = boolean;
}
