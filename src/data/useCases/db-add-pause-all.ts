import { AddPausaAll } from "@/domain/usecases/add-pause-all";
import { AddPausaAllRepository } from "../protocols/add-pause-all-repository";

export class DbAddPausaAll implements AddPausaAll {
  constructor(private readonly addPausa: AddPausaAllRepository) {}

  async addPausaAll(params: AddPausaAll.Params): Promise<boolean> {
    const add = await this.addPausa.addPausaAll(params);
    return add;
  }
}
