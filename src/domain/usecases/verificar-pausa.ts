export interface VerificarPausa {
  verificarPausa: (
    params: VerificarPausa.Params
  ) => Promise<VerificarPausa.Result>;
}

export namespace VerificarPausa {
  export type Params = {
    centerId: string;
    data: Date;
    processo: string;
  };
  export type Result = boolean;
}
