/**
 * Abre un mes en la calculadora de remuneraciones.
 *
 *   node scripts/abrir-mes.mjs            → abre el mes en curso (hora de Chile)
 *   node scripts/abrir-mes.mjs 2026-11    → abre ese mes
 *
 * Copia los parámetros del último mes abierto y cambia solo la UF (del último
 * día del mes, la que usa Previred) y la UTM del mes, tomadas de mindicador.cl.
 * Topes, tasas de AFP, SIS e ingreso mínimo quedan iguales: cuando cambian
 * (enero, alza del IMM, cambio de trimestre del SIS) hay que corregirlos a mano.
 *
 * Se puede saltar la consulta con las variables UF y UTM.
 * Si el mes ya existe, no hace nada. Escribe en GITHUB_OUTPUT si existe.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync, appendFileSync } from "node:fs";
import { join } from "node:path";

const DIR = "src/lib/remuneraciones/parametros";
const MESES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
  "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

function salida(clave, valor) {
  if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `${clave}=${valor}\n`);
}

function mesEnCurso() {
  // en-CA da AAAA-MM-DD
  return new Date().toLocaleDateString("en-CA", { timeZone: "America/Santiago" }).slice(0, 7);
}

async function indicador(codigo, fecha) {
  const url = `https://mindicador.cl/api/${codigo}/${fecha}`;
  for (let intento = 1; intento <= 3; intento++) {
    try {
      const r = await fetch(url, { signal: AbortSignal.timeout(20000) });
      const j = await r.json();
      const v = j?.serie?.[0]?.valor;
      if (typeof v === "number" && v > 0) return v;
      throw new Error(`sin valor en la respuesta: ${JSON.stringify(j).slice(0, 200)}`);
    } catch (e) {
      if (intento === 3) throw new Error(`${url}: ${e.message}`);
      await new Promise((ok) => setTimeout(ok, 3000 * intento));
    }
  }
}

const pesos = (n) => "$" + Math.round(n).toLocaleString("es-CL");

const mes = process.argv[2] ?? mesEnCurso();
if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(mes)) {
  console.error(`Mes inválido: ${mes} (formato AAAA-MM)`);
  process.exit(1);
}
const [anio, m] = mes.split("-").map(Number);
const destino = join(DIR, `${mes}.ts`);
salida("mes", mes);

if (existsSync(destino)) {
  console.log(`${mes} ya está abierto (${destino}). Nada que hacer.`);
  salida("creado", "false");
  process.exit(0);
}

const anteriores = readdirSync(DIR)
  .filter((f) => /^\d{4}-\d{2}\.ts$/.test(f) && f.slice(0, 7) < mes)
  .sort();
if (anteriores.length === 0) {
  console.error("No hay un mes anterior desde el cual copiar.");
  process.exit(1);
}
const base = anteriores.at(-1).slice(0, 7);
const fuente = readFileSync(join(DIR, `${base}.ts`), "utf8");

const ultimoDia = new Date(Date.UTC(anio, m, 0)).getUTCDate();
const dd = String(ultimoDia).padStart(2, "0");
const mm = String(m).padStart(2, "0");
const uf = process.env.UF ? Number(process.env.UF) : await indicador("uf", `${dd}-${mm}-${anio}`);
const utm = process.env.UTM ? Number(process.env.UTM) : await indicador("utm", `01-${mm}-${anio}`);

// Control de cordura: de un mes a otro la UF y la UTM se mueven poco.
const num = (re) => Number(fuente.match(re)?.[1]);
const ufAnt = num(/\buf:\s*([\d.]+)/);
const utmAnt = num(/\butm:\s*([\d.]+)/);
const topeUF = num(/topeImponibleUF:\s*([\d.]+)/);
const topeCesUF = num(/topeCesantiaUF:\s*([\d.]+)/);
for (const [nombre, nuevo, ant] of [["UF", uf, ufAnt], ["UTM", utm, utmAnt]]) {
  const variacion = Math.abs(nuevo / ant - 1);
  if (!Number.isFinite(variacion) || variacion > 0.03) {
    console.error(`${nombre} sospechosa: ${nuevo} contra ${ant} en ${base}. No se abre el mes.`);
    process.exit(1);
  }
}

const etiqueta = `${MESES[m - 1]} ${anio}`;
const nombreBase = `parametros${base.replace("-", "")}`;
const nombreNuevo = `parametros${mes.replace("-", "")}`;
const encabezado = `/**
 * Indicadores previsionales y tributarios — remuneraciones de ${etiqueta.toUpperCase()}.
 *
 * Generado por scripts/abrir-mes.mjs a partir de ${base}: cambian la UF (al
 * ${dd}-${mm}-${anio}) y la UTM del mes. Topes, tasas de AFP, SIS e ingreso
 * mínimo se copiaron del mes anterior; si cambiaron, corrígelos acá.
 */`;

let nuevo = fuente
  .replace(/^\/\*\*[\s\S]*?\*\/\s*\n(?=export const)/m, encabezado + "\n")
  .replace(`export const ${nombreBase}`, `export const ${nombreNuevo}`)
  .replace(/clave: "[^"]+"/, `clave: "${mes}"`)
  .replace(/etiqueta: "[^"]+"/, `etiqueta: "${etiqueta}"`)
  .replace(/\buf: [\d.]+,.*$/m, `uf: ${uf}, // UF al ${dd}-${mm}-${anio}`)
  .replace(/\butm: [\d.]+,.*$/m, `utm: ${utm},`)
  .replace(/(topeImponibleUF: [\d.]+,).*$/m, `$1 // ${pesos(topeUF * uf)}`)
  .replace(/(topeCesantiaUF: [\d.]+,).*$/m, `$1 // ${pesos(topeCesUF * uf)}`);

if (!nuevo.includes(`export const ${nombreNuevo}`) || !nuevo.includes(`clave: "${mes}"`)) {
  console.error("No se pudo adaptar la plantilla del mes anterior.");
  process.exit(1);
}
writeFileSync(destino, nuevo);

const indice = join(DIR, "index.ts");
let idx = readFileSync(indice, "utf8");
const lineaBase = `import { ${nombreBase} } from "./${base}.ts";`;
if (!idx.includes(lineaBase)) {
  console.error(`index.ts no importa ${base}; revisa el archivo a mano.`);
  process.exit(1);
}
idx = idx
  .replace(lineaBase, `${lineaBase}\nimport { ${nombreNuevo} } from "./${mes}.ts";`)
  .replace(/(export const periodos: ParametrosPeriodo\[\] = \[\n)/, `$1  ${nombreNuevo},\n`);
writeFileSync(indice, idx);

console.log(`Abierto ${etiqueta}: UF ${uf}, UTM ${utm} (copiado de ${base}).`);
salida("creado", "true");
salida("etiqueta", etiqueta);
salida("uf", String(uf));
salida("utm", String(utm));
salida("base", base);
