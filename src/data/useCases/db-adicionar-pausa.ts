import { FinalizarParams } from "@/domain/usecases/finalizarProdutividade";
import { AddPauseProdutividade } from "@/domain/usecases/add-pause-produtividade";
import AddPauseProdutividadeRepository from "../protocols/add-pause-repository";

export class DbAddPausaProdutividade implements AddPauseProdutividade {
  constructor(
    private readonly addPauseProdutividade: AddPauseProdutividadeRepository
  ) {}

  async addPausa(params: AddPauseProdutividade.Params): Promise<boolean> {
    const add = await this.addPauseProdutividade.addPausa(params);
    return add;
  }
}
