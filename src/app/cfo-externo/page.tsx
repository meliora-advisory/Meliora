import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  alternates: { canonical: "/cfo-externo/" },
  title: "CFO Externo para Pymes en Chile: Qué Hace y Cuánto Cuesta | Meliora Advisory",
  description:
    "Un CFO externo dirige las finanzas de tu pyme sin el costo de un gerente de planta: reportería gerencial en tiempo y forma, flujo de caja, presupuesto y una sesión mensual de análisis. Cotización a la medida tras un diagnóstico gratuito.",
  keywords: [
    "cfo externo",
    "cfo externo chile",
    "cfo externo pymes",
    "cfo externo precio",
    "cfo as a service",
    "gerente de finanzas externo",
    "director financiero externo",
    "cfo part time",
  ],
  openGraph: {
    title: "CFO externo para pymes en Chile",
    description:
      "La dirección financiera que tu pyme necesita, sin el costo de un CFO de planta.",
    url: "https://melioraadvisory.cl/cfo-externo/",
  },
};

const tareas = [
  {
    title: "Reportería gerencial cada mes",
    desc: "Estado de resultados por línea de negocio, análisis de variaciones y los indicadores que importan, listos con cada cierre y no cuando sobra tiempo.",
  },
  {
    title: "Flujo de caja proyectado",
    desc: "Una proyección de 8 a 12 semanas que se actualiza cada semana, para ver un déficit antes de que llegue y decidir con tiempo.",
  },
  {
    title: "Presupuesto y seguimiento",
    desc: "Presupuesto anual armado contigo y una revisión mensual de cuánto se cumplió, dónde te desviaste y por qué.",
  },
  {
    title: "Margen y cobranza bajo control",
    desc: "Margen por producto o línea, días de cobro (DSO) y estado real de la cartera, para saber qué vende bien y quién te debe.",
  },
  {
    title: "Una sesión mensual de análisis",
    desc: "Revisamos tus números contigo: resultados, proyecciones y las decisiones que vienen. No solo recibes un informe.",
  },
  {
    title: "Dashboards sobre tu sistema",
    desc: "Trabajamos sobre Softland, Softland Cloud, Odoo, Nubox, Defontana u otro ERP, sin obligarte a migrar, sujeto a factibilidad técnica.",
  },
];

const comparacion = [
  {
    aspecto: "Qué te entrega",
    contador: "Registro contable e impuestos al día",
    planta: "Dirección financiera completa",
    externo: "Dirección financiera completa",
  },
  {
    aspecto: "Información para decidir",
    contador: "Lo que hay que pagar",
    planta: "Reportería e indicadores",
    externo: "Reportería e indicadores en cada cierre",
  },
  {
    aspecto: "Costo fijo",
    contador: "Bajo",
    planta: "Alto: sueldo, cargas e indemnizaciones",
    externo: "Ajustado al tamaño de tu empresa",
  },
  {
    aspecto: "Tiempo para partir",
    contador: "Inmediato",
    planta: "Meses de búsqueda y adaptación",
    externo: "Semanas",
  },
  {
    aspecto: "Experiencia",
    contador: "Tributaria",
    planta: "La de una persona",
    externo: "La de un equipo con años en finanzas de empresas",
  },
];

const factores = [
  "El tamaño de la empresa y el volumen de movimientos de cada mes.",
  "Cuántas sociedades o unidades de negocio hay que consolidar.",
  "El ERP que usas y qué tan ordenada está la información de partida.",
  "El alcance: solo reportería y caja, o también presupuesto, procesos y contabilidad.",
  "La frecuencia de las sesiones y de las proyecciones de caja.",
];

const senales = [
  "Vendes más que antes, pero no sabes si ganas más.",
  "Te enteras de un problema de caja cuando ya no hay margen para reaccionar.",
  "Tu contador cumple con los impuestos, pero nadie te explica los números.",
  "No sabes qué producto, cliente o línea deja más margen.",
  "Un banco o un socio te pide proyecciones y no las tienes.",
  "Contratar un gerente de finanzas de planta todavía no se justifica.",
];

const pasos = [
  {
    n: "1",
    title: "Diagnóstico gratuito",
    desc: "Conversamos sobre tu operación y revisamos dónde están las brechas de información.",
  },
  {
    n: "2",
    title: "Propuesta a la medida",
    desc: "Te enviamos el alcance y la cotización según lo que tu empresa necesita, sin permanencia mínima.",
  },
  {
    n: "3",
    title: "Puesta en marcha",
    desc: "Ordenamos la información de partida en tu sistema y definimos contigo los indicadores.",
  },
  {
    n: "4",
    title: "Cierre y sesión mensual",
    desc: "Cada mes recibes tu reportería en tiempo y forma y la revisamos juntos.",
  },
];

const faqs = [
  {
    q: "¿Qué es un CFO externo?",
    a: "Es un servicio en que un equipo externo asume la dirección financiera de tu empresa: reportería gerencial, flujo de caja, presupuesto, control de margen y cobranza, y apoyo en las decisiones. Funciona como un gerente de finanzas, pero con dedicación parcial y sin contrato de planta.",
  },
  {
    q: "¿Cuánto cuesta un CFO externo en Chile?",
    a: "Depende del tamaño de la empresa, del número de sociedades, del sistema que usas y del alcance del servicio. En general cuesta una fracción de un gerente de finanzas de planta, que además del sueldo suma cargas legales e indemnizaciones. En Meliora la cotización es a la medida, después de un diagnóstico gratuito.",
  },
  {
    q: "¿Cuál es la diferencia entre un CFO externo y un contador?",
    a: "El contador registra las operaciones y declara los impuestos. El CFO externo usa esa información para dirigir el negocio: te dice cuánto ganas por línea, cuánta caja tendrás en las próximas semanas y qué decisiones conviene tomar. Son complementarios.",
  },
  {
    q: "¿Cuándo conviene contratar un CFO externo?",
    a: "Cuando la empresa crece y las decisiones ya no se pueden tomar mirando solo la cuenta corriente, pero todavía no se justifica un gerente de finanzas de planta. Es habitual en pymes que venden sobre CLP 1.000 MM al año.",
  },
  {
    q: "¿Tengo que cambiar de sistema contable?",
    a: "No. Trabajamos sobre el ERP que ya usas, como Softland, Softland Cloud, Odoo, Nubox o Defontana, o te implementamos uno si no tienes.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "CFO externo para pymes",
    serviceType: "CFO as a Service",
    url: "https://melioraadvisory.cl/cfo-externo/",
    areaServed: { "@type": "Country", name: "Chile" },
    provider: {
      "@type": "ProfessionalService",
      name: "Meliora Advisory",
      url: "https://melioraadvisory.cl",
    },
    description:
      "Dirección financiera externa para pymes en Chile: reportería gerencial mensual, flujo de caja proyectado, presupuesto y sesión mensual de análisis.",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  },
];

function Check() {
  return (
    <svg
      className="h-5 w-5 text-emerald flex-shrink-0 mt-0.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

export default function CfoExternoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="bg-navy py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-emerald font-semibold text-sm tracking-wide uppercase mb-4">
            CFO as a Service
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white max-w-3xl">
            CFO externo para pymes en Chile
          </h1>
          <p className="mt-6 text-lg text-slate-300 max-w-2xl">
            La dirección financiera que tu pyme necesita, sin el costo de un
            gerente de finanzas de planta: reportería en tiempo y forma, caja
            proyectada y un equipo que revisa tus números contigo cada mes.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center rounded-lg bg-emerald px-8 py-3.5 text-base font-semibold text-white hover:bg-emerald-dark transition-colors"
            >
              Agendar reunión gratuita
            </Link>
            <Link
              href="/diagnostico"
              className="inline-flex items-center justify-center rounded-lg border border-white/30 px-8 py-3.5 text-base font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Diagnóstico gratis en 3 minutos
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-4">
            Qué hace un CFO externo
          </h2>
          <p className="text-base text-slate-500 max-w-3xl mb-12">
            Tu contador registra y declara. Un CFO externo toma esa información
            y la convierte en lo que necesita quien dirige la empresa.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tareas.map((t) => (
              <div key={t.title} className="rounded-2xl border border-slate-200 p-6">
                <h3 className="text-base font-semibold text-navy mb-2">{t.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-10">
            CFO externo, CFO de planta o contador
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="w-full min-w-[640px] text-sm text-left">
              <thead className="bg-navy/5 text-navy">
                <tr>
                  <th className="p-4 font-semibold"></th>
                  <th className="p-4 font-semibold">Contador externo</th>
                  <th className="p-4 font-semibold">CFO de planta</th>
                  <th className="p-4 font-semibold text-emerald">CFO externo</th>
                </tr>
              </thead>
              <tbody>
                {comparacion.map((c) => (
                  <tr key={c.aspecto} className="border-t border-slate-100">
                    <td className="p-4 font-semibold text-navy">{c.aspecto}</td>
                    <td className="p-4 text-slate-500">{c.contador}</td>
                    <td className="p-4 text-slate-500">{c.planta}</td>
                    <td className="p-4 text-slate-700 font-medium">{c.externo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-4">
              ¿Cuánto cuesta un CFO externo?
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              No hay un precio único, porque dos pymes del mismo tamaño pueden
              necesitar cosas muy distintas. Lo que sí es constante: cuesta una
              fracción de un gerente de finanzas de planta, que además del
              sueldo suma cargas legales, indemnizaciones y meses de búsqueda.
              Revisa{" "}
              <Link
                href="/recursos/cuanto-cuesta-contratar-trabajador-chile"
                className="text-emerald font-semibold"
              >
                cuánto cuesta realmente contratar en Chile
              </Link>
              .
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              En Meliora la cotización es a la medida, después de un diagnóstico
              gratuito, y sin permanencia mínima.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-8">
            <h3 className="text-sm font-semibold text-navy uppercase tracking-wider mb-6">
              Qué define el valor
            </h3>
            <ul className="space-y-4">
              {factores.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check />
                  <span className="text-sm text-slate-600">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-10">
            Señales de que tu pyme necesita un CFO externo
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl">
            {senales.map((s) => (
              <li key={s} className="flex items-start gap-3 rounded-xl bg-white p-5 border border-slate-200">
                <Check />
                <span className="text-sm text-slate-600">{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-10">
            Cómo trabajamos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pasos.map((p) => (
              <div key={p.n} className="rounded-2xl border border-slate-200 p-6">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald text-white text-sm font-bold mb-4">
                  {p.n}
                </span>
                <h3 className="text-base font-semibold text-navy mb-2">{p.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-sm text-slate-500">
            ¿Quieres ver el detalle del servicio?{" "}
            <Link href="/servicios#cfo" className="text-emerald font-semibold">
              Revisa qué incluye CFO as a Service
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-navy text-center mb-12">
            Preguntas frecuentes sobre el CFO externo
          </h2>
          <div className="max-w-3xl mx-auto space-y-8">
            {faqs.map((faq) => (
              <div key={faq.q}>
                <h3 className="text-base font-semibold text-navy mb-2">{faq.q}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-navy">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            ¿Listo para tener tus números a la vista?
          </h2>
          <p className="text-slate-300 max-w-lg mx-auto mb-8">
            Agenda una reunión gratuita. Revisamos tu operación y te proponemos
            un alcance a la medida de tu pyme.
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center rounded-lg bg-emerald px-8 py-3.5 text-base font-semibold text-white hover:bg-emerald-dark transition-colors"
          >
            Agendar reunión gratuita
          </Link>
        </div>
      </section>
    </>
  );
}
