export default interface FinalizarProdutividade {
  finalizar: (params: FinalizarParams) => Promise<boolean>;
}

export type FinalizarParams = {
  transporte: string;
  idPallet: string
};
