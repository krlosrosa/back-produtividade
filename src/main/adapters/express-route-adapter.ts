import { type Controller } from '../../presentation/protocols'

import { type Response } from 'express'
import { type CustomRequest } from './custom-accountId'

export const adaptRoute = (controller: Controller) => {
  return async (req: CustomRequest, res: Response) => {
    const request = {
      ...(req.body || {}),
      ...(req.params || {}),
      ...(req.query || {}),
      ...(req.file ? { file: req.file } : {}),
      ...(req.files ? { files: req.files } : {}),
      accountId: req.accountId
    }

    const httpResponse = await controller.handle(request)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
