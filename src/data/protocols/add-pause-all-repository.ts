import { AddPausaAll } from "@/domain/usecases/add-pause-all";

export interface AddPausaAllRepository {
  addPausaAll: (account: AddPausaAll.Params) => Promise<AddPausaAll.Result>
}
