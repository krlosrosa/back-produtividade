import { FinalizarPausaAll } from "@/domain/usecases/finalizar-pausa-all";
import { FinalizarPausaAllRepository } from "../protocols/finalizar-pausa-all-repository";

export class DbFinalizarPausaAll implements FinalizarPausaAll {
  constructor(private readonly addPausa: FinalizarPausaAllRepository) {}

  async finalizarPausaAll(params: FinalizarPausaAll.Params): Promise<boolean> {
    const add = await this.addPausa.finalizarPausaAll(params);
    return add;
  }
}
