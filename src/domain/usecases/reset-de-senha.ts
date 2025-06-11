export interface ResetDeSenha {
  reset: (params: ResetDeSenha.Params) => Promise<ResetDeSenha.Result>;
}

export namespace ResetDeSenha {
  export type Params = {
    userId: string;
    newPassword: string;
  };
  export type Result = boolean;
}
