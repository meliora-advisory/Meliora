/**
 * Tests del motor de remuneraciones. Sin dependencias:
 *   npm run test:remuneraciones
 */
import {
  calcularEmpleador,
  calcularTrabajador,
  impuestoUnico,
  resolverDesdeLiquido,
} from "./motor.ts";
import { boletaDesdeBruto, boletaDesdeLiquido } from "./honorarios.ts";
import { parametros202607 as julio } from "./parametros/2026-07.ts";
import { parametros202608 as agosto } from "./parametros/2026-08.ts";
import { parametros202609 as septiembre } from "./parametros/2026-09.ts";
import { parametros202610 as octubre } from "./parametros/2026-10.ts";

let fallas = 0;

function eq(nombre: string, actual: number, esperado: number) {
  if (actual === esperado) {
    console.log(`  ✓ ${nombre}: ${actual.toLocaleString("es-CL")}`);
  } else {
    fallas++;
    console.error(
      `  ✗ ${nombre}: se obtuvo ${actual.toLocaleString("es-CL")}, se esperaba ${esperado.toLocaleString("es-CL")}`
    );
  }
}

function ok(nombre: string, cond: boolean) {
  if (cond) {
    console.log(`  ✓ ${nombre}`);
  } else {
    fallas++;
    console.error(`  ✗ ${nombre}`);
  }
}

// ── Caso obligatorio: liquidación real de julio 2026 ──
console.log("\nCaso obligatorio — liquidación real julio 2026 (isapre en UF)");
{
  const liq = calcularTrabajador(
    {
      sueldoBase: 5161047,
      modoGratificacion: "manual",
      gratificacionManual: 219115,
      afpKey: "provida", // 11,45%
      salud: "isapre",
      planIsapreUF: 6.958,
      contrato: "indefinido",
      colacion: 300000,
      movilizacion: 250000,
    },
    julio
  );
  eq("Total imponible", liq.totalImponible, 5380162);
  eq("Base topeada (90 UF)", liq.baseCotizacion, 3676031);
  eq("AFP (11,45%)", liq.afp, 420906);
  eq("Salud 7%", liq.salud7, 257322);
  eq("Adicional isapre", liq.adicionalIsapre, 26876);
  eq("Seguro de cesantía", liq.cesantiaTrabajador, 32281);
  eq("Base afecta a impuesto", liq.baseTributable, 4669653);
  eq("Impuesto único", liq.impuesto, 308699);
  eq("Líquido", liq.liquido, 4884078);

  // La gratificación del caso real coincide con el tope legal del período:
  const liqLegal = calcularTrabajador(
    {
      sueldoBase: 5161047,
      modoGratificacion: "legal",
      afpKey: "provida",
      salud: "isapre",
      planIsapreUF: 6.958,
      contrato: "indefinido",
      colacion: 300000,
      movilizacion: 250000,
    },
    julio
  );
  eq("Gratificación (tope legal)", liqLegal.gratificacion, 219115);
  eq("Líquido (gratificación legal)", liqLegal.liquido, 4884078);
}

// ── Modo empleador sobre el caso obligatorio ──
console.log("\nModo empleador — caso obligatorio (julio: SIS vía AFP + reforma 1%)");
{
  const c = calcularEmpleador(
    {
      sueldoBase: 5161047,
      modoGratificacion: "manual",
      gratificacionManual: 219115,
      afpKey: "provida",
      salud: "isapre",
      planIsapreUF: 6.958,
      contrato: "indefinido",
      colacion: 300000,
      movilizacion: 250000,
    },
    julio
  );
  eq("Cesantía empleador (2,4%)", c.cesantiaEmpleador, 129124);
  eq("ISL/Mutual (0,93%)", c.mutual, 34187);
  eq("SIS vía AFP (1,62%)", c.aportesPension[0].monto, 59552);
  eq("Capitalización individual (0,1%)", c.aportesPension[1].monto, 3676);
  eq("Expectativa de vida (0,9%)", c.aportesPension[2].monto, 33084);
  eq("Costo total de contratación", c.costoTotal, 6189785);
}

// ── Aporte patronal agosto 2026: replica planilla real (Previred) ──
console.log("\nAporte patronal agosto 2026 — planilla real, imponible 2.218.375");
{
  const c = calcularEmpleador(
    {
      sueldoBase: 2218375,
      modoGratificacion: "ninguna",
      afpKey: "modelo",
      salud: "fonasa",
      contrato: "indefinido",
    },
    agosto
  );
  eq("Aporte ISL (0,93%)", c.mutual, 20631);
  eq("Aporte Seg Cesantía (2,4%)", c.cesantiaEmpleador, 53241);
  eq("Aporte SIS (1,78%)", c.aportesPension[0].monto, 39487);
  eq("Aporte Expectativa de vida (0,72%)", c.aportesPension[1].monto, 15972);
  eq("Aporte AFP Adicional (0,10%)", c.aportesPension[2].monto, 2218);
  eq("Aporte Rentabilidad Protegida (0,90%)", c.aportesPension[3].monto, 19965);
  eq("Total aportes (6,83%)", c.totalAportes, 151514);
  // SIS + expectativa de vida deben sumar 2,5%
  const sisMasExp = agosto.aportesPension[0].tasa + agosto.aportesPension[1].tasa;
  eq("SIS + Expectativa de vida (×100)", Math.round(sisMasExp * 100), 250);
}

// ── Caso obligatorio: liquidación real de septiembre 2026 ──
//
// Es el complemento del caso de julio. Allá la remuneración está sobre las
// 90 UF y el adicional de isapre NO rebaja la base del impuesto; acá está bajo
// el tope y el plan completo sí la rebaja. Los dos salen de liquidaciones que
// la empresa pagó, así que entre ambos dejan fijada la regla del art. 42 N°1.
console.log("\nCaso obligatorio — liquidación real septiembre 2026 (isapre bajo el tope)");
{
  const liq = calcularTrabajador(
    {
      sueldoBase: 1668310,
      modoGratificacion: "legal",
      afpKey: "capital", // 11,44%
      salud: "isapre",
      planIsapreUF: 3.321,
      contrato: "indefinido",
      colacion: 150000,
      movilizacion: 100000,
      otrosDescuentos: 74509,
    },
    septiembre
  );
  eq("Total imponible", liq.totalImponible, 1887425);
  eq("AFP Capital (11,44%)", liq.afp, 215921);
  eq("Salud 7%", liq.salud7, 132120);
  eq("Plan isapre (3,321 UF)", liq.planIsapre, 136351);
  eq("Adicional isapre", liq.adicionalIsapre, 4231);
  eq("Seguro de cesantía", liq.cesantiaTrabajador, 11325);
  eq("Salud que rebaja la base", liq.saludRebajable, 136351);
  eq("Base afecta a impuesto", liq.baseTributable, 1523828);
  eq("Impuesto único", liq.impuesto, 22224);
  eq("Total descuentos", liq.totalDescuentos, 460330);
  eq("Líquido", liq.liquido, 1677095);
}

// ── Caso obligatorio: liquidación real de octubre 2026 ──
//
// El mismo contrato del caso de julio, con la UF y la UTM de octubre.
console.log("\nCaso obligatorio — liquidación real octubre 2026 (sobre el tope)");
{
  const liq = calcularTrabajador(
    {
      sueldoBase: 5161047,
      modoGratificacion: "legal",
      afpKey: "provida", // 11,45%
      salud: "isapre",
      planIsapreUF: 6.958,
      contrato: "indefinido",
      colacion: 300000,
      movilizacion: 250000,
    },
    octubre
  );
  eq("Gratificación (tope legal)", liq.gratificacion, 219115);
  eq("Total imponible", liq.totalImponible, 5380162);
  eq("Base topeada (90 UF)", liq.baseCotizacion, 3712287);
  eq("AFP Provida (11,45%)", liq.afp, 425057);
  eq("Salud 7%", liq.salud7, 259860);
  eq("Plan isapre (6,958 UF)", liq.planIsapre, 287001);
  eq("Adicional isapre", liq.adicionalIsapre, 27141);
  eq("Seguro de cesantía", liq.cesantiaTrabajador, 32281);
  eq("Base afecta a impuesto", liq.baseTributable, 4662964);
  eq("Impuesto único", liq.impuesto, 305542);
  eq("Total descuentos", liq.totalDescuentos, 1049881);
  eq("Líquido", liq.liquido, 4880281);
}

// ── El tope de la rebaja de salud: 7% del límite imponible ──
console.log("\nRebaja de salud topeada en 6,3 UF");
{
  // Sobre las 90 UF el plan completo ya no cabe en la rebaja: el caso real de
  // julio rebaja 257.322 (7% de 90 UF) y no los 284.198 que pagó a la isapre.
  const sobreTope = calcularTrabajador(
    {
      sueldoBase: 5161047,
      modoGratificacion: "manual",
      gratificacionManual: 219115,
      afpKey: "provida",
      salud: "isapre",
      planIsapreUF: 6.958,
      contrato: "indefinido",
    },
    julio
  );
  eq("Plan pagado a la isapre", sobreTope.planIsapre, 284198);
  eq("Rebaja topeada (7% de 90 UF)", sobreTope.saludRebajable, 257322);
  ok(
    "Sobre el tope, el adicional no rebaja la base",
    sobreTope.saludRebajable === sobreTope.salud7
  );

  // En Fonasa el 7% sale de una base ya topeada, así que nunca supera el tope.
  const fonasa = calcularTrabajador(
    {
      sueldoBase: 1000000,
      modoGratificacion: "legal",
      afpKey: "modelo",
      salud: "fonasa",
      contrato: "indefinido",
    },
    julio
  );
  ok("En Fonasa la rebaja es el 7% legal", fonasa.saludRebajable === fonasa.salud7);
}

// ── Sueldo bajo el tope imponible, gratificación legal topeada, Fonasa ──
console.log("\nSueldo bajo el tope — Fonasa, AFP Modelo, indefinido");
{
  const liq = calcularTrabajador(
    {
      sueldoBase: 1000000,
      modoGratificacion: "legal",
      afpKey: "modelo", // 10,58%
      salud: "fonasa",
      contrato: "indefinido",
    },
    julio
  );
  eq("Gratificación topeada", liq.gratificacion, 219115);
  eq("Total imponible", liq.totalImponible, 1219115);
  eq("Base = imponible (sin tope)", liq.baseCotizacion, 1219115);
  eq("AFP", liq.afp, 128982);
  eq("Salud 7%", liq.salud7, 85338);
  eq("Cesantía", liq.cesantiaTrabajador, 7315);
  eq("Base tributable", liq.baseTributable, 997480);
  eq("Impuesto (tramo 4%)", liq.impuesto, 1209);
  eq("Líquido", liq.liquido, 996271);
}

// ── Plazo fijo: trabajador no cotiza cesantía, empleador paga 3% ──
console.log("\nPlazo fijo — Fonasa, AFP Uno, sin gratificación");
{
  const c = calcularEmpleador(
    {
      sueldoBase: 800000,
      modoGratificacion: "ninguna",
      afpKey: "uno", // 10,46%
      salud: "fonasa",
      contrato: "plazo_fijo",
    },
    julio
  );
  const liq = c.liquidacion;
  eq("Cesantía trabajador (0%)", liq.cesantiaTrabajador, 0);
  eq("AFP", liq.afp, 83680);
  eq("Salud 7%", liq.salud7, 56000);
  eq("Impuesto (exento)", liq.impuesto, 0);
  eq("Líquido", liq.liquido, 660320);
  eq("Cesantía empleador (3%)", c.cesantiaEmpleador, 24000);
  eq("ISL/Mutual (0,93%)", c.mutual, 7440);
  eq("SIS vía AFP (1,62%)", c.aportesPension[0].monto, 12960);
  eq("Capitalización individual (0,1%)", c.aportesPension[1].monto, 800);
  eq("Expectativa de vida (0,9%)", c.aportesPension[2].monto, 7200);
  eq("Costo total", c.costoTotal, 852400);
}

// ── Un caso en cada tramo del impuesto único ──
console.log("\nImpuesto único — un caso por tramo (base en UTM de julio)");
{
  const utm = julio.utm;
  const casos: [number, number, number][] = [
    // [base en UTM, factor, rebaja en UTM]
    [10, 0, 0],
    [20, 0.04, 0.54],
    [40, 0.08, 1.74],
    [60, 0.135, 4.49],
    [80, 0.23, 11.14],
    [100, 0.304, 17.8],
    [200, 0.35, 23.32],
    [400, 0.4, 38.82],
  ];
  for (const [enUTM, factor, rebaja] of casos) {
    const base = Math.round(enUTM * utm);
    const esperado = Math.max(0, Math.round(base * factor - rebaja * utm));
    eq(`Tramo hasta ${enUTM} UTM`, impuestoUnico(base, julio), esperado);
  }
}

// ── Boleta de honorarios 2026 (retención 15,25%) ──
console.log("\nBoleta de honorarios — ejemplo oficial SII y cálculo inverso");
{
  const b = boletaDesdeBruto(1000000, agosto);
  eq("Retención de boleta $1.000.000", b.retencion, 152500);
  eq("Líquido de boleta $1.000.000", b.liquido, 847500);

  const inv = boletaDesdeLiquido(1000000, agosto);
  eq("Bruto para recibir $1.000.000", inv.bruto, 1179941);
  eq("Líquido resultante", inv.liquido, 1000000);

  const inv2 = boletaDesdeLiquido(847500, agosto);
  eq("Bruto para recibir $847.500", inv2.bruto, 1000000);
}

// ── Camino inverso: líquido objetivo → variable despejada ──
console.log("\nDesde el líquido — despejar sueldo base, bono o no imponible");
{
  const basePyme = {
    sueldoBase: 0,
    modoGratificacion: "legal" as const,
    afpKey: "modelo",
    salud: "fonasa" as const,
    contrato: "indefinido" as const,
  };

  // 1) Despejando el sueldo base para un líquido de $1.000.000
  const porSueldo = resolverDesdeLiquido(basePyme, agosto, 1000000, "sueldoBase");
  ok("Sueldo base despejado alcanza el objetivo", porSueldo.liquidoObtenido >= 1000000);
  ok(
    "Y es el mínimo: con un peso menos ya no alcanza",
    calcularTrabajador({ ...basePyme, sueldoBase: porSueldo.valor - 1 }, agosto).liquido <
      1000000
  );

  // 2) El caso de Israel: sueldo base fijo en $700.000, ¿cuánto bono para $1.200.000?
  const conBase700 = {
    ...basePyme,
    sueldoBase: 700000,
    otrosImponibles: 0,
  };
  const porBono = resolverDesdeLiquido(conBase700, agosto, 1200000, "otrosImponibles");
  ok("Bono despejado alcanza el objetivo", porBono.liquidoObtenido >= 1200000);
  ok(
    "Y es el mínimo: con un peso menos ya no alcanza",
    calcularTrabajador(
      { ...conBase700, otrosImponibles: porBono.valor - 1 },
      agosto
    ).liquido < 1200000
  );

  // 3) Al subir el sueldo base, el bono necesario baja
  const porBonoConBaseMayor = resolverDesdeLiquido(
    { ...conBase700, sueldoBase: 900000 },
    agosto,
    1200000,
    "otrosImponibles"
  );
  ok(
    "Más sueldo base exige menos bono para el mismo líquido",
    porBonoConBaseMayor.valor < porBono.valor
  );

  // 4) El no imponible entra peso a peso: no paga cotizaciones ni impuesto
  const sinColacion = calcularTrabajador(conBase700, agosto).liquido;
  const porNoImponible = resolverDesdeLiquido(
    conBase700,
    agosto,
    sinColacion + 50000,
    "noImponible"
  );
  eq("Colación necesaria para $50.000 más de líquido", porNoImponible.valor, 50000);

  // 5) Si el objetivo ya se supera sin la variable, devuelve cero
  const yaSuperado = resolverDesdeLiquido(conBase700, agosto, 100000, "otrosImponibles");
  eq("Objetivo ya superado: no hace falta bono", yaSuperado.valor, 0);
}


// ── Asignación familiar y días sin trabajar ──
console.log("\nAsignación familiar (octubre 2026, vigente desde 01-05-2026)");
{
  const base = {
    modoGratificacion: "ninguna" as const,
    afpKey: "modelo",
    salud: "fonasa" as const,
    contrato: "indefinido" as const,
  };
  const af = (sueldo: number, cargas: number) =>
    calcularTrabajador({ ...base, sueldoBase: sueldo, cargasFamiliares: cargas }, octubre);

  const l = af(600000, 2);
  eq("Tramo A, 2 cargas: 2 × 22.601", l.asignacionFamiliar, 45202);
  ok("Tramo A", l.tramoAsignacion === "A");
  eq("Líquido suma la asignación sin cotizarla", l.liquido, af(600000, 0).liquido + 45202);
  eq("Total imponible no cambia con cargas", l.totalImponible, 600000);
  eq("Base tributable no cambia con cargas", l.baseTributable, af(600000, 0).baseTributable);

  eq("Tope tramo A (649.039)", af(649039, 1).asignacionFamiliar, 22601);
  eq("Pasa a tramo B (649.040)", af(649040, 1).asignacionFamiliar, 13870);
  eq("Tope tramo B (947.990)", af(947990, 3).asignacionFamiliar, 41610);
  eq("Tramo C (947.991)", af(947991, 1).asignacionFamiliar, 4382);
  eq("Tope tramo C (1.478.539)", af(1478539, 2).asignacionFamiliar, 8764);
  eq("Tramo D (1.478.540): sin asignación", af(1478540, 2).asignacionFamiliar, 0);
  ok("Tramo D rotulado", af(1478540, 2).tramoAsignacion === "D");
  eq("Sin cargas no hay asignación", af(600000, 0).asignacionFamiliar, 0);

  // Costo empleador: la asignación se paga, así que entra al costo total
  const e0 = calcularEmpleador({ ...base, sueldoBase: 600000 }, octubre);
  const e2 = calcularEmpleador({ ...base, sueldoBase: 600000, cargasFamiliares: 2 }, octubre);
  eq("Costo total sube lo que paga de asignación", e2.costoTotal - e0.costoTotal, 45202);
  eq("Aportes patronales no cambian", e2.totalAportes, e0.totalAportes);
}

console.log("\nDías ausentes y licencia médica");
{
  const base = {
    sueldoBase: 900000,
    modoGratificacion: "legal" as const,
    afpKey: "modelo",
    salud: "fonasa" as const,
    contrato: "indefinido" as const,
  };
  const completo = calcularTrabajador(base, octubre);
  eq("Sin ausencias: 30 días", completo.diasTrabajados, 30);
  eq("Sin ausencias: sin descuento", completo.descuentoDias, 0);

  const a = calcularTrabajador({ ...base, diasAusentes: 3 }, octubre);
  eq("3 ausentes: sueldo base 27/30", a.sueldoBase, 810000);
  eq("3 ausentes: gratificación topeada proporcional (27/30)", a.gratificacion, 197204);
  eq("3 ausentes: descuento base + gratificación", a.descuentoDias, 90000 + (219115 - 197204));
  eq("Pactado se conserva", a.sueldoBasePactado, 900000);

  const sinTope = calcularTrabajador({ ...base, sueldoBase: 700000, diasAusentes: 3 }, octubre);
  eq("Gratificación 25% del proporcional (bajo el tope)", sinTope.gratificacion, 157500);

  const l = calcularTrabajador({ ...base, diasLicencia: 10 }, octubre);
  eq("10 de licencia: sueldo base 20/30", l.sueldoBase, 600000);
  eq("10 de licencia: días trabajados", l.diasTrabajados, 20);

  const m = calcularTrabajador({ ...base, diasAusentes: 2, diasLicencia: 3 }, octubre);
  eq("Ausentes + licencia suman: 25/30", m.sueldoBase, 750000);

  // Tope de la gratificación legal proporcional a los días
  const alto = { ...base, sueldoBase: 3000000 };
  const topeCompleto = calcularTrabajador(alto, octubre).gratificacion;
  eq("Gratificación topeada completa", topeCompleto, 219115);
  eq(
    "Tope de gratificación proporcional (15/30)",
    calcularTrabajador({ ...alto, diasAusentes: 15 }, octubre).gratificacion,
    Math.round(219115 / 2)
  );

  const man = calcularTrabajador(
    { ...base, modoGratificacion: "manual", gratificacionManual: 100000, diasAusentes: 6 },
    octubre
  );
  eq("Gratificación pactada proporcional (24/30)", man.gratificacion, 80000);

  // Horas extra siguen valorizadas sobre el sueldo pactado
  eq(
    "Hora extra sobre sueldo pactado",
    calcularTrabajador({ ...base, horasExtra: 4, diasAusentes: 5 }, octubre).horasExtra,
    calcularTrabajador({ ...base, horasExtra: 4 }, octubre).horasExtra
  );

  // Asignación familiar proporcional a los días trabajados
  const conAsig = calcularTrabajador(
    { ...base, sueldoBase: 500000, modoGratificacion: "ninguna", cargasFamiliares: 2, diasAusentes: 15 },
    octubre
  );
  eq("Asignación proporcional (15/30): 45.202 / 2", conAsig.asignacionFamiliar, 22601);

  // Límites: no pasa de 30 ni queda en negativo
  const todo = calcularTrabajador({ ...base, diasAusentes: 40, diasLicencia: 5 }, octubre);
  eq("Más de 30 días ausentes: 0 trabajados", todo.diasTrabajados, 0);
  eq("Mes completo ausente: sin sueldo", todo.sueldoBase, 0);
  ok("Mes completo ausente: líquido no negativo", todo.liquido >= 0);
}

// Los tests del motor de finiquito viven en finiquito.test.ts (npm run test:finiquito).

if (fallas > 0) {
  console.error(`\n${fallas} prueba(s) fallaron`);
  process.exit(1);
}
console.log("\nTodas las pruebas pasaron ✔");
