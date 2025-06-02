import winston from 'winston'
import { type LoggerProtocol } from '../../protocols/logger.protocol'
import LokiTransport from 'winston-loki'

export class WinstonLogger implements LoggerProtocol {
  private readonly logger = winston.createLogger({
    level: 'info',
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple()
        )
      }),
      new LokiTransport({
        host: 'http://173.212.193.209:3100'
      })
    ]
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
