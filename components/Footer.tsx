import { MessageCircle, MapPin } from "lucide-react";
import Logo from "./Logo";
import Reveal from "./Reveal";

const PHONE_DISPLAY = "+351 935 545 270";
const WHATSAPP_LINK = "https://wa.me/351935545270";

export default function Footer() {
  return (
    <footer className="border-t border-brand-light bg-white py-12">
      <Reveal once y={12} className="container-page">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
          <div className="flex flex-col items-center gap-3 sm:items-start">
            <Logo />
            <p className="max-w-xs text-center text-sm text-slate-500 sm:text-left">
              Conforto em todas as estações. Instalação, manutenção e
              assistência técnica de ar condicionado em Portimão e arredores.
            </p>
          </div>

          <div className="flex flex-col items-center gap-2 text-sm text-slate-600 sm:items-end">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-bold text-navy"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={2.5} />
              {PHONE_DISPLAY}
            </a>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" strokeWidth={2.5} />
              Portimão e arredores
            </span>
            <span>&copy; {new Date().getFullYear()} PortiAr Climatização</span>
          </div>
        </div>
      </Reveal>
    </footer>
  );
}
