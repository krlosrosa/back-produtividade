import 'module-alias/register'
import { setupApp } from './config/app'
import env from './config/env'
import { loggerWraper } from '@/infra/observability/logger/logger-provider'

const app = setupApp()

app.listen(env.port, async () => {
  loggerWraper.info(`rodando na porta ${env.port}`)
})
