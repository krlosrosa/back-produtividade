export interface GetProdutividadeByTransporteAndId {
  getProdutividadeByTransporte: (params: GetProdutividadeByTransporteAndId.Params) => Promise<GetProdutividadeByTransporteAndId.Result>;
}

export namespace GetProdutividadeByTransporteAndId {
  export type Params = {
  transporte: string;
  idPallet: string;
  processo: string
  };

  export type Result = {
  id: number;
  transporte: string;
  empresa: string;
  processo: string;
  caixas: number;
  unidade: number;
  visitado: number;
  horaInicio: Date;
  horaFim?: Date | null;
  centerId: string;
  userId: string;
  dataRegistro: Date;
  funcionarioId: string;
  produtividade: number
  };
}
