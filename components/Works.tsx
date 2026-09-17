import Image from "next/image";
import Reveal from "./Reveal";
import { getTrabalhos } from "@/lib/trabalhos";

export default async function Works() {
  // Fotos adicionadas pelo cliente através do painel /admin (Vercel Blob).
  const works = await getTrabalhos();

  // Sem fotos ainda: a secção fica escondida em vez de aparecer vazia.
  // Assim que o cliente adicionar a primeira foto no painel, aparece
  // automaticamente aqui.
  if (works.length === 0) {
    return null;
  }

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
            <Reveal key={work.url} delay={(i % 4) * 0.1} y={16}>
              <div className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-white shadow-card">
                <Image
                  src={work.url}
                  alt="Foto de instalação de ar condicionado realizada pela PortiAr"
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
