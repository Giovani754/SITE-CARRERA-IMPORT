import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Gauge,
  Calendar,
  Zap,
  Fuel,
  MessageCircle,
  ChevronLeft,
  ShieldCheck,
  MapPin,
  Palette,
  Activity,
} from "lucide-react";
import { getVehicleBySlug, getRelatedVehicles } from "@/lib/vehicles";
import { Breadcrumb } from "@/components/premium/breadcrumb";
import { CarCard } from "@/components/premium/car-card";
import { VehicleJsonLd } from "@/components/seo/json-ld";
import { LeadForm } from "@/components/premium/lead-form";
import { SITE_CONFIG } from "@/data/constants";

// Next.js 16: params is a Promise
type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);

  if (!vehicle) {
    return { title: "Veículo não encontrado" };
  }

  const mainImage = vehicle.images?.[0] || "";

  return {
    title: `${vehicle.brand} ${vehicle.model} ${vehicle.year}`,
    description: `${vehicle.brand} ${vehicle.model} ${vehicle.year} — ${vehicle.mileage}, ${vehicle.transmission}. Consultoria automotiva premium em São Paulo.`,
    openGraph: {
      title: `${vehicle.brand} ${vehicle.model} ${vehicle.year} | Carrera Imports`,
      description: vehicle.description?.substring(0, 160),
      images: [{ url: mainImage, alt: vehicle.model }],
    },
  };
}

export default async function VehiclePage({ params }: PageProps) {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);

  if (!vehicle) {
    notFound();
  }

  const relatedVehicles = await getRelatedVehicles(vehicle, 3);

  return (
    <>
      <VehicleJsonLd 
        vehicle={{
          ...vehicle,
          image: vehicle.images?.[0] || '',
        }} 
      />

      <div className="pt-28 lg:pt-36 px-6 lg:px-12 pb-24">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb
            items={[
              { name: "Estoque", href: "/estoque" },
              {
                name: `${vehicle.brand} ${vehicle.model}`,
                href: `/estoque/${vehicle.slug}`,
              },
            ]}
          />

          <Link
            href="/estoque"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-white/30 hover:text-brand-gold transition-colors mb-10"
          >
            <ChevronLeft size={14} />
            Voltar ao Acervo
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">
            {/* Gallery Column */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="relative aspect-[16/9] bg-[#080808] border border-white/5 overflow-hidden rounded-sm">
                {vehicle.images?.[0] ? (
                  <Image
                    src={vehicle.images[0]}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    fill
                    priority
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/10 uppercase tracking-widest text-xs">Sem Imagem Principal</div>
                )}
              </div>
              <div className="grid grid-cols-3 gap-4">
                {vehicle.images?.slice(1, 4).map((img: string, i: number) => (
                  <div
                    key={i}
                    className="aspect-[4/3] bg-[#080808] border border-white/5 relative overflow-hidden group rounded-sm"
                  >
                    <Image
                      src={img}
                      alt={`${vehicle.model} - foto ${i + 1}`}
                      fill
                      className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="py-10 border-t border-white/5 mt-4">
                <h2 className="text-xl font-serif italic mb-6 text-white/90">
                  Sobre este exemplar
                </h2>
                <p className="text-white/45 leading-[1.8] font-sans font-light text-sm max-w-3xl">
                  {vehicle.description}
                </p>
              </div>

              {/* Highlights */}
              {vehicle.highlights && vehicle.highlights.length > 0 && (
                <div className="py-8 border-t border-white/5">
                  <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-gold/60 mb-6">
                    Destaques
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {vehicle.highlights.map((h: string) => (
                      <li
                        key={h}
                        className="flex items-center gap-3 text-sm text-white/60"
                      >
                        <div className="w-1 h-1 bg-brand-gold/50 rounded-full shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sticky Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 space-y-8">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-brand-gold text-[9px] uppercase tracking-[0.4em] font-bold opacity-60">
                      {vehicle.brand}
                    </span>
                    {vehicle.status !== 'available' && (
                      <span className="bg-white/5 text-white/40 text-[8px] uppercase tracking-[0.2em] px-2 py-1 rounded-[2px] font-bold">
                        {vehicle.status === 'sold' ? 'Vendido' : 'Reservado'}
                      </span>
                    )}
                  </div>
                  <h1 className="text-3xl xl:text-4xl font-serif italic mb-4 leading-tight text-white/90">
                    {vehicle.model}
                  </h1>
                  <p className="text-2xl font-sans tracking-tight text-white/80">
                    {vehicle.price}
                  </p>
                </div>

                {/* Specs List */}
                <div className="grid grid-cols-1 gap-4 py-8 border-y border-white/5">
                  {[
                    {
                      icon: Calendar,
                      label: "Ano",
                      value: String(vehicle.year),
                    },
                    { icon: Gauge, label: "Km", value: vehicle.mileage },
                    {
                      icon: Zap,
                      label: "Câmbio",
                      value: vehicle.transmission || 'N/A',
                    },
                    { icon: Fuel, label: "Combustível", value: vehicle.fuel || 'N/A' },
                    { icon: Palette, label: "Cor", value: vehicle.color || 'N/A' },
                    {
                      icon: Activity,
                      label: "Versão",
                      value: vehicle.version || 'Premium',
                    },
                  ].map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3 text-white/30">
                        <spec.icon size={15} strokeWidth={1.5} />
                        <span className="text-[10px] uppercase tracking-[0.2em]">
                          {spec.label}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/70">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-4">
                  <Link
                    href={`${SITE_CONFIG.whatsapp.urlClean}?text=${encodeURIComponent(`Olá! Tenho interesse no ${vehicle.brand} ${vehicle.model} ${vehicle.year}. Gostaria de mais informações.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-brand-gold text-black py-5 text-center text-[10px] uppercase tracking-[0.3em] font-bold shadow-xl shadow-brand-gold/10 hover:scale-[1.02] transition-transform rounded-sm flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={14} />
                    Tenho Interesse
                  </Link>
                  <p className="text-[9px] text-white/20 text-center uppercase tracking-[0.3em]">
                    Disponível para visualização em {vehicle.city || SITE_CONFIG.location.label}{" "}
                    sob agendamento.
                  </p>
                </div>

                <div className="p-6 bg-[#080808] border border-white/5 flex flex-col gap-5 rounded-sm">
                  <div className="flex items-start gap-3">
                    <ShieldCheck
                      className="text-brand-gold/60 shrink-0"
                      size={18}
                    />
                    <div>
                      <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-0.5 text-white/70">
                        Garantia de Procedência
                      </h4>
                      <p className="text-[9px] text-white/30 leading-normal uppercase tracking-[0.2em]">
                        Veículo inspecionado pela equipe Carrera.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin
                      className="text-brand-gold/60 shrink-0"
                      size={18}
                    />
                    <div>
                      <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-0.5 text-white/70">
                        Localização
                      </h4>
                      <p className="text-[9px] text-white/30 leading-normal uppercase tracking-[0.2em]">
                        {SITE_CONFIG.location.full}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Inline Lead Form */}
                <LeadForm
                  variant="default"
                  title="Solicite mais informações"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Vehicles */}
      {relatedVehicles.length > 0 && (
        <section className="py-20 px-6 lg:px-12 bg-[#050505] border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <header className="mb-14 text-center">
              <span className="text-brand-gold text-[9px] uppercase tracking-[0.8em] font-medium mb-6 block opacity-50">
                Veja Também
              </span>
              <h2 className="text-2xl md:text-3xl font-serif italic tracking-tight text-white/90">
                Veículos Relacionados
              </h2>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {relatedVehicles.map((rv, idx) => (
                <CarCard key={rv.id} vehicle={rv} index={idx} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
