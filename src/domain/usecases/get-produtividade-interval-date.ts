export interface GetProdutividadeIntervalData {
  getProdutividadeInterval: (
    params: GetProdutividadeIntervalData.Params
  ) => Promise<GetProdutividadeIntervalData.Result[]>;
}

export namespace GetProdutividadeIntervalData {
  export type Params = {
    centerId: string;
    dataInicio: Date;
    dataFim: Date;
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
    inicioPausa?: Date | null;
    terminoPause?: Date | null;
    centerId: string;
    userId: string;
    dataRegistro: Date;
    funcionarioId: string;
    produtividade?: number
    segmento?: string
    nomeFuncionario: string;
    intervaloTrabalhado?: number
  };
}
