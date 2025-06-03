import { AddPauseProdutividade } from "@/domain/usecases/add-pause-produtividade";

export default interface AddPauseProdutividadeRepository {
  addPausa: (
    params: AddPauseProdutividade.Params
  ) => Promise<AddPauseProdutividade.Result>;
}
