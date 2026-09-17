import { ShieldCheck, Clock, MapPin, type LucideIcon } from "lucide-react";
import Reveal from "./Reveal";

const reasons: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: ShieldCheck,
    title: "Serviço de confiança",
    description: "Trabalho cuidado, transparente e garantido em cada intervenção.",
  },
  {
    icon: Clock,
    title: "Resposta rápida",
    description: "Agendamos e respondemos com rapidez, sem deixar o cliente à espera.",
  },
  {
    icon: MapPin,
    title: "Portimão e arredores",
    description: "Cobrimos Portimão e toda a região envolvente do Algarve.",
  },
];

export default function WhyUs() {
  return (
    <section id="porque-nos" className="bg-brand-light py-20 sm:py-28">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-brand-orange">
            Porquê a PortiAr
          </span>
          <h2 className="section-title mt-3">
            O seu conforto é a nossa prioridade
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <Reveal key={reason.title} delay={i * 0.1}>
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-navy shadow-card">
                    <Icon className="h-7 w-7" strokeWidth={2} />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-navy">
                    {reason.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    {reason.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center text-sm font-bold uppercase tracking-widest text-navy/70">
            <span>Ar Condicionado</span>
            <span className="text-brand-orange">•</span>
            <span>Conforto</span>
            <span className="text-brand-orange">•</span>
            <span>Eficiência</span>
            <span className="text-brand-orange">•</span>
            <span>Bem-Estar</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
