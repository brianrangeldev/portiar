import { Snowflake, MessageCircle, ShieldCheck, Clock, MapPin } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/351935545270";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient pb-16 pt-14 sm:pb-24 sm:pt-20">
      {/* soft decorative blobs simulating a cold (blue) / warm (orange) air
          presence breathing gently on each side of the section */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 animate-breathe rounded-full bg-brand-blue/10 blur-3xl motion-reduce:animate-none" />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 animate-breathe rounded-full bg-brand-orange/10 blur-3xl [animation-delay:2.5s] motion-reduce:animate-none"
      />

      <div className="container-page relative grid items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-navy/5 px-4 py-1.5 text-sm font-bold text-navy">
            <Snowflake className="h-4 w-4 text-brand-blue" />
            Instalação · Manutenção · Assistência técnica
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-navy sm:text-5xl lg:text-[3.25rem]">
            Ar condicionado para a{" "}
            <span className="text-brand-blue">sua casa</span> ou{" "}
            <span className="text-brand-orange">negócio</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-slate-600">
            O seu conforto é a nossa prioridade! Instalação, manutenção e
            assistência técnica de ar condicionado, com a qualidade e
            tecnologia Airwell. Mais conforto, mais qualidade de vida.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <MessageCircle className="h-5 w-5" strokeWidth={2.5} />
              Pedir orçamento agora
            </a>
            <a href="#servicos" className="btn-secondary">
              Ver serviços
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold text-navy/80">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-brand-orange" />
              Serviço de confiança
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4 text-brand-orange" />
              Resposta rápida
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-brand-orange" />
              Portimão e arredores
            </span>
          </div>
        </div>

        {/* AC unit illustration built with CSS/SVG so there is zero dependency
            on external image assets until Brian sends brand photography.
            The vents continuously blow animated air ribbons: blue (frio) on
            the left, orange (calor) on the right. */}
        <div className="relative mx-auto flex w-full max-w-md items-center justify-center">
          <div className="absolute inset-0 rounded-[3rem] bg-navy-gradient opacity-5" />
          <div className="relative w-full overflow-hidden rounded-[2.5rem] border border-brand-light bg-white p-8 shadow-card">
            {/* ambient glow behind the unit, breathing cold/warm */}
            <div className="pointer-events-none absolute -left-8 top-4 h-28 w-28 animate-breathe rounded-full bg-brand-blue/20 blur-2xl motion-reduce:animate-none" />
            <div className="pointer-events-none absolute -right-8 top-4 h-28 w-28 animate-breathe rounded-full bg-brand-orange/20 blur-2xl [animation-delay:2.5s] motion-reduce:animate-none" />

            {/* wall unit body */}
            <div className="relative mx-auto w-64 animate-sway rounded-2xl bg-slate-50 p-5 shadow-inner motion-reduce:animate-none">
              <div className="h-3 w-24 rounded-full bg-brand-blue/30" />
              <div className="mt-4 flex items-center justify-between">
                <div className="h-2 w-2 rounded-full bg-brand-orange" />
                <div className="h-2 w-2 rounded-full bg-brand-blue" />
                <div className="h-2 w-2 rounded-full bg-slate-300" />
              </div>
              {/* vent slats */}
              <div className="mt-6 space-y-1.5 opacity-70">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-1.5 rounded-full bg-brand-blue/40"
                    style={{ width: `${90 - i * 8}%` }}
                  />
                ))}
              </div>
            </div>

            {/* animated air ribbons blowing down from the vent: frio (azul)
                à esquerda, calor (laranja) à direita */}
            <div className="relative mx-auto -mt-1 flex w-64 justify-between px-3">
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <span
                    key={`frio-${i}`}
                    className="h-12 w-1.5 rounded-full bg-gradient-to-b from-brand-blue/80 to-transparent animate-airflow motion-reduce:animate-none motion-reduce:opacity-40"
                    style={{ animationDelay: `${i * 0.3}s` }}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <span
                    key={`calor-${i}`}
                    className="h-12 w-1.5 rounded-full bg-gradient-to-b from-brand-orange/80 to-transparent animate-airflow motion-reduce:animate-none motion-reduce:opacity-40"
                    style={{ animationDelay: `${0.15 + i * 0.3}s` }}
                  />
                ))}
              </div>
            </div>

            <p className="mt-6 text-center text-sm font-bold text-navy">
              Sistemas de climatização frio e calor
            </p>
            <p className="text-center text-xs text-slate-500">
              Qualidade e tecnologia Airwell
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
