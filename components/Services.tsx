import {
  Snowflake,
  Wrench,
  Sparkles,
  DoorOpen,
  ThermometerSun,
  type LucideIcon,
} from "lucide-react";

const services: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: Snowflake,
    title: "Instalação de ar condicionado",
    description:
      "Instalação profissional para casas e negócios, com equipamento e materiais de qualidade.",
  },
  {
    icon: Wrench,
    title: "Manutenção preventiva e corretiva",
    description:
      "Revisões periódicas que prolongam a vida útil do seu equipamento e evitam avarias.",
  },
  {
    icon: Sparkles,
    title: "Limpeza de equipamentos",
    description:
      "Limpeza técnica que garante ar mais saudável e melhor eficiência energética.",
  },
  {
    icon: DoorOpen,
    title: "Desinstalação e reinstalação",
    description:
      "Mudou de casa ou de espaço? Tratamos da remoção e reinstalação com segurança.",
  },
  {
    icon: ThermometerSun,
    title: "Sistemas de climatização (frio e calor)",
    description:
      "Soluções completas para manter o conforto ideal em todas as estações do ano.",
  },
];

export default function Services() {
  return (
    <section id="servicos" className="bg-white py-20 sm:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-brand-orange">
            O que fazemos
          </span>
          <h2 className="section-title mt-3">
            Instalação, manutenção e assistência técnica
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Tudo o que precisa para o ar condicionado da sua casa ou negócio,
            num único parceiro de confiança.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group rounded-2xl border border-brand-light bg-white p-7 shadow-card transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-navy text-white transition-colors group-hover:bg-brand-orange">
                  <Icon className="h-6 w-6" strokeWidth={2} />
                </div>
                <h3 className="mt-5 text-lg font-bold text-navy">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
