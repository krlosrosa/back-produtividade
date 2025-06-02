import { DadosTransporte } from "@/domain/usecases/addProdutividade";

export default interface AddProdutividadeRepository {
  add: (params: DadosTransporte) => Promise<boolean>;
}