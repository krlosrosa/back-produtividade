export default interface AddProdutividade {
  add: (params: DadosTransporte) => Promise<boolean>;
}

type Item = {
  empresa: string;
  idPallet: string;
  linhasPickingVisitadas: number;
  quantidadeCaixa: number;
  quantidadeUnidade: number;
  transporte: string;
  segmento: string
};

export type DadosTransporte = {
  dataRegistro: Date;
  transporte: string;
  empresa: string;
  processo: string;
  caixas: number;
  unidade: number;
  visitado: number;
  items: Item[];
  horaInicio: Date
  centerId: string
  funcionarioId: string,
  registradoPor: string
  segmento: string
};
