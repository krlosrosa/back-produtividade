export interface GetProdutividadeByCenterAndData {
  getProdutivicidade: (
    params: GetProdutividadeByCenterAndData.Params
  ) => Promise<GetProdutividadeByCenterAndData.Result[]>;
}

export namespace GetProdutividadeByCenterAndData {
  export type Params = {
    centerId: string;
    data: Date;
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
    produtividade?: number
    segmento?: string
  };
}
