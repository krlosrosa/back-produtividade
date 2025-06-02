import { FinalizarParams } from "@/domain/usecases/finalizarProdutividade";

export default interface FinalizarProdutividadeRepository {
  finalizar: (params: FinalizarParams) => Promise<boolean>;
}