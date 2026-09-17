import type { Metadata } from "next";
import { getTrabalhos } from "@/lib/trabalhos";
import AdminTrabalhos from "@/components/admin/AdminTrabalhos";

export const metadata: Metadata = {
  title: "Painel de Fotos",
  robots: { index: false, follow: false },
};

// Página interna: sempre atualizada, nunca em cache estática.
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const trabalhos = await getTrabalhos();
  const blobConfigured = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

  return (
    <main className="min-h-screen bg-brand-light py-12">
      <div className="container-page">
        <header className="mb-10">
          <span className="text-sm font-bold uppercase tracking-wider text-brand-orange">
            Painel PortiAr
          </span>
          <h1 className="section-title mt-2">Fotos de trabalhos realizados</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Aqui podes adicionar novas fotos de instalações concluídas ou
            remover fotos antigas. As alterações aparecem no site
            automaticamente, sem precisar de mais nada — não é preciso
            avisar ninguém nem esperar por uma atualização.
          </p>
        </header>

        {!blobConfigured && (
          <div className="mb-8 rounded-2xl border-2 border-brand-orange bg-white p-5 text-sm text-slate-700">
            <strong className="text-brand-orange">Atenção:</strong> o
            armazenamento de imagens ainda não está ligado a este projeto.
            Contacta quem geriu o site para ativar o Vercel Blob antes de
            usar este painel.
          </div>
        )}

        <AdminTrabalhos initialTrabalhos={trabalhos} />
      </div>
    </main>
  );
}
