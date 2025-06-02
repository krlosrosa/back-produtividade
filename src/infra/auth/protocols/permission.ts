export interface VerifyPermission {
  validate: (params: ParamsPermission) => Promise<boolean>
}

type ParamsPermission = {
  center: string
  user: string
  action: string
  subject: string
}
