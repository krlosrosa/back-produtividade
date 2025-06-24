import { DateTime } from "luxon";

export function formatToBrazilianTimezone(date: Date | null): string | null {
  if (!date) return null;

  // Converte para o timezone do Brasil (America/Sao_Paulo)
  const brasilDateTime = DateTime.fromJSDate(date, { zone: "utc" }).setZone(
    "America/Sao_Paulo"
  );

  console.log(brasilDateTime.toFormat("dd/MM/yyyy HH:mm:ss"))

  return brasilDateTime.toFormat("dd/MM/yyyy HH:mm:ss");
}
