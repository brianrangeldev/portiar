import { MessageCircle } from "lucide-react";
import Logo from "./Logo";

const PHONE_DISPLAY = "+351 935 545 270";
const WHATSAPP_LINK = "https://wa.me/351935545270";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-brand-light bg-white/90 backdrop-blur">
      <div className="container-page flex h-20 items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm font-semibold text-navy md:flex">
          <a href="#servicos" className="transition-colors hover:text-brand-orange">
            Serviços
          </a>
          <a href="#airwell" className="transition-colors hover:text-brand-orange">
            Airwell
          </a>
          <a href="#porque-nos" className="transition-colors hover:text-brand-orange">
            Porquê a PortiAr
          </a>
          <a href="#contacto" className="transition-colors hover:text-brand-orange">
            Contacto
          </a>
        </nav>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-bold text-white transition-transform hover:scale-105 sm:inline-flex"
        >
          <MessageCircle className="h-4 w-4" strokeWidth={2.5} />
          {PHONE_DISPLAY}
        </a>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-navy p-3 text-white sm:hidden"
          aria-label="Falar no WhatsApp"
        >
          <MessageCircle className="h-5 w-5" strokeWidth={2.5} />
        </a>
      </div>
    </header>
  );
}
