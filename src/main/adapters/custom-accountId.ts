import { type Request } from 'express'

export interface CustomRequest extends Request {
  accountId?: string // Pode ser opcional se nem todas as rotas usarem
  file?: any
  files?: any
}
