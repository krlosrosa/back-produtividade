import { PinoLogger } from "@/infra/observability/logger/logger-instances/logger-pino";
import { WinstonLogger } from "@/infra/observability/logger/logger-instances/logger-winstson";
import { LoggerProtocol } from "@/infra/observability/protocols/logger.protocol";

export const makeLogger = (): LoggerProtocol => {
  return new PinoLogger();
};
