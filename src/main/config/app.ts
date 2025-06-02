import express, { type Express } from 'express'
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'
import dotenvFlow from 'dotenv-flow'

dotenvFlow.config()

export const setupApp = (): Express => {
  const app = express()
  setupMiddlewares(app)
  setupRoutes(app)
  return app
}
