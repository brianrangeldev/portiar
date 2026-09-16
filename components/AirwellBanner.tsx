export default function AirwellBanner() {
  return (
    <section id="airwell" className="bg-navy-gradient py-16 sm:py-20">
      <div className="container-page grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr]">
        <div className="text-white">
          <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold text-brand-orange">
            Parceiro oficial
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Airwell
          </h2>
          <p className="mt-2 text-lg font-semibold text-white/80">
            Qualidade e tecnologia em climatização
          </p>
        </div>

        <div className="hidden h-24 w-px bg-white/15 lg:block" />

        <div>
          <p className="text-xl font-bold italic text-white sm:text-2xl">
            &ldquo;Mais conforto, mais qualidade de vida!&rdquo;
          </p>
          <p className="mt-3 text-white/70">
            Trabalhamos com equipamentos Airwell para garantir desempenho,
            durabilidade e eficiência energética em cada instalação.
          </p>
        </div>
      </div>
    </section>
  );
}
