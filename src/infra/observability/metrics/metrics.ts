import { NodeSDK } from '@opentelemetry/sdk-node'
import {
  PeriodicExportingMetricReader
} from '@opentelemetry/sdk-metrics'
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http'
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http'
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express'

const metricExporter = new OTLPMetricExporter({
  url: 'https://opel.ragde.app/:4318/v1/metrics'
})

// Configuração do OpenTelemetry SDK
export const sdk = new NodeSDK({
  metricReader: new PeriodicExportingMetricReader({
    exporter: metricExporter, // Expor as métricas no console
    exportIntervalMillis: 10000
  }),
  instrumentations: [getNodeAutoInstrumentations(), new HttpInstrumentation(), new ExpressInstrumentation()] // Instrumentação automática
})

// Iniciar o SDK
sdk.start()
