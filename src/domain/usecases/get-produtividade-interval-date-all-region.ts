export interface GetProdutividadeIntervalDataAllRegion {
  getProdutividadeIntervalAllRegions: (
    params: GetProdutividadeIntervalDataAllRegion.Params
  ) => Promise<GetProdutividadeIntervalDataAllRegion.Result[]>;
}

export namespace GetProdutividadeIntervalDataAllRegion {
  export type Params = {
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
    nomeFuncionario: string;
    produtividade?: number
    segmento?: string
    intervaloTrabalhado?: number
  };
}
