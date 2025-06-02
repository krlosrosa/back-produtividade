import pino from 'pino'
import { type LoggerProtocol } from '../../protocols/logger.protocol'

export class PinoLogger implements LoggerProtocol {
  private readonly logger = pino({
    level: 'info' // Defina o nível de log aqui
  })

  info (message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args)
  }

  warn (message: string, ...args: unknown[]): void {
    this.logger.warn(message, ...args)
  }

  error (message: string, ...args: unknown[]): void {
    this.logger.error(message, ...args)
  }

  debug (message: string, ...args: unknown[]): void {
    this.logger.debug(message, ...args)
  }
}
