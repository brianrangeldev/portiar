import Image from "next/image";
import Reveal from "./Reveal";
import { getTrabalhos } from "@/lib/trabalhos";

// Fotos originais (fazem parte do código do site). Continuam visíveis
// mesmo antes de o cliente adicionar alguma foto pelo painel /admin.
const staticWorks = [
  {
    src: "/trabalhos/exterior-unidades-airwell.jpg",
    alt: "Duas unidades exteriores Airwell instaladas lado a lado numa varanda",
  },
  {
    src: "/trabalhos/interior-cassete-sala.jpg",
    alt: "Ar condicionado tipo cassete instalado no teto de uma sala",
  },
  {
    src: "/trabalhos/interior-split-quarto.jpg",
    alt: "Unidade interior split montada na parede de um quarto",
  },
  {
    src: "/trabalhos/exterior-unidade-teto.jpg",
    alt: "Unidade exterior instalada no teto de uma varanda",
  },
];

export default async function Works() {
  // Fotos adicionadas pelo cliente através do painel /admin (Vercel Blob).
  const trabalhosDoCliente = await getTrabalhos();

  const works = [
    ...staticWorks,
    ...trabalhosDoCliente.map((trabalho) => ({
      src: trabalho.url,
      alt: "Foto de instalação de ar condicionado realizada pela PortiAr",
    })),
  ];

  return (
    <section id="trabalhos" className="bg-brand-light py-20 sm:py-28">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-brand-orange">
            Trabalhos realizados
          </span>
          <h2 className="section-title mt-3">Instalações feitas por nós</h2>
          <p className="mt-4 text-lg text-slate-600">
            Alguns exemplos reais de instalações de ar condicionado
            concluídas em casas na nossa área de atuação.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {works.map((work, i) => (
            <Reveal key={work.src} delay={(i % 4) * 0.1} y={16}>
              <div className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-white shadow-card">
                <Image
                  src={work.src}
                  alt={work.alt}
                  fill
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 45vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
