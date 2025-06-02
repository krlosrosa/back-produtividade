export default interface FinalizarProdutividade {
  finalizar: (params: FinalizarParams) => Promise<boolean>;
}

export type FinalizarParams = {
  idPallet: string;
  transporte: string;
  processo:string
};
