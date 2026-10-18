import type { ParametrosPeriodo } from "../tipos.ts";

/**
 * Indicadores previsionales y tributarios — remuneraciones de OCTUBRE 2026.
 *
 * Respecto de septiembre solo cambian la UF y la UTM: los topes imponibles, las
 * tasas de AFP, el ingreso mínimo y las tasas de la reforma previsional se
 * mantienen (octubre cierra el trimestre del SIS de 1,78%).
 *
 * UF y UTM cuadran con una liquidación real de octubre: la UF impresa
 * ($41.247,63) da el tope de 90 UF ($3.712.287) y el plan isapre, y la UTM
 * es la única que reproduce su impuesto único al peso.
 */
export const parametros202610: ParametrosPeriodo = {
  clave: "2026-10",
  etiqueta: "Octubre 2026",
  uf: 41247.63, // UF al 31-10-2026
  utm: 72151,
  ingresoMinimo: 553553,
  topeImponibleUF: 90, // $3.712.287
  topeCesantiaUF: 135.2, // $5.576.680
  jornadaSemanal: 42,
  afps: {
    capital: { nombre: "Capital", tasa: 11.44 },
    cuprum: { nombre: "Cuprum", tasa: 11.44 },
    habitat: { nombre: "Habitat", tasa: 11.27 },
    modelo: { nombre: "Modelo", tasa: 10.58 },
    planvital: { nombre: "PlanVital", tasa: 11.16 },
    provida: { nombre: "Provida", tasa: 11.45 },
    uno: { nombre: "Uno", tasa: 10.46 },
  },
  cesantia: {
    indefinido: { trabajador: 0.6, empleador: 2.4 },
    plazo_fijo: { trabajador: 0, empleador: 3.0 },
  },
  mutualBase: 0.93, // 0,90% básica ley 16.744 + 0,03% ley SANNA (ISL/mutual)
  aportesPension: [
    // Previred, octubre 2026: último mes del SIS de 1,78% (trimestre
    // agosto-octubre). SIS + expectativa de vida suman 2,5%.
    // Total reforma: 3,5%.
    { nombre: "SIS (Seguro Social)", tasa: 1.78 },
    { nombre: "Expectativa de vida", tasa: 0.72 },
    { nombre: "Capitalización individual", tasa: 0.1 },
    { nombre: "Rentabilidad protegida", tasa: 0.9 },
  ],
  retencionHonorarios: 15.25, // año 2026 (Ley 21.133; 16% en 2027, 17% en 2028)
  tramosImpuesto: [
    { hastaUTM: 13.5, factor: 0, rebajaUTM: 0 },
    { hastaUTM: 30, factor: 0.04, rebajaUTM: 0.54 },
    { hastaUTM: 50, factor: 0.08, rebajaUTM: 1.74 },
    { hastaUTM: 70, factor: 0.135, rebajaUTM: 4.49 },
    { hastaUTM: 90, factor: 0.23, rebajaUTM: 11.14 },
    { hastaUTM: 120, factor: 0.304, rebajaUTM: 17.8 },
    { hastaUTM: 310, factor: 0.35, rebajaUTM: 23.32 },
    { hastaUTM: Infinity, factor: 0.4, rebajaUTM: 38.82 },
  ],
};
