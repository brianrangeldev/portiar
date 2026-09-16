import { MessageCircle } from "lucide-react";

const PHONE_DISPLAY = "+351 935 545 270";
const WHATSAPP_LINK = "https://wa.me/351935545270";

export default function ContactCta() {
  return (
    <section id="contacto" className="bg-white py-20 sm:py-28">
      <div className="container-page">
        <div className="overflow-hidden rounded-3xl bg-navy-gradient px-6 py-14 text-center shadow-card sm:px-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Fale connosco
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
            Instalação, manutenção ou assistência técnica — estamos prontos
            para ajudar. Resposta rápida em Portimão e arredores.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full sm:w-auto"
            >
              <MessageCircle className="h-5 w-5" strokeWidth={2.5} />
              Falar no WhatsApp
            </a>
          </div>

          <p className="mt-6 text-sm font-semibold text-white/60">
            {PHONE_DISPLAY} · Ar-condicionado · Energia renovável
          </p>
        </div>
      </div>
    </section>
  );
}
