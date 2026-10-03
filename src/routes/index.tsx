import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { ArrowUpRight, Clock, Download, MapPin, Phone, ShieldCheck, Wrench, BadgeDollarSign, Bike } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JM Motors — Motos novas e seminovas em Santos" },
      { name: "description", content: "Honda PCX, ADV, Kawasaki e muito mais. Visite a JM Motors na Vila Mathias, Santos - SP, ou fale no WhatsApp." },
      { property: "og:title", content: "JM Motors — Motos em Santos" },
      { property: "og:description", content: "Catálogo de motos, financiamento e atendimento pelo WhatsApp. Av. Senador Feijó, 455 - Santos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const WA = "https://wa.me/5513976007271?text=" + encodeURIComponent("Olá, JM Motors! Vim pelo site e quero saber mais sobre as motos.");
const waFor = (m: string) => "https://wa.me/5513976007271?text=" + encodeURIComponent(`Olá, JM Motors! Tenho interesse na ${m}.`);
const PDF = "/catalogo-jm-motors.pdf";
const ease = [0.22, 1, 0.36, 1] as const;

const bikes = [
  { name: "Honda PCX 160", brand: "Honda", cat: "Scooter", spec: "160cc · ABS · Smart Key" },
  { name: "Honda ADV 160", brand: "Honda", cat: "Scooter", spec: "160cc · Aventura urbana" },
  { name: "Kawasaki Ninja 400", brand: "Kawasaki", cat: "Esportiva", spec: "399cc · Bicilíndrica" },
  { name: "Kawasaki Z400", brand: "Kawasaki", cat: "Naked", spec: "399cc · Street fighter" },
  { name: "Honda CG 160", brand: "Honda", cat: "Street", spec: "160cc · Econômica" },
  { name: "Kawasaki Versys-X 300", brand: "Kawasaki", cat: "Trail", spec: "296cc · Big trail" },
];
const filters = ["Todas", "Honda", "Kawasaki"];

const hours = [
  ["Segunda a Sexta", "09:00 – 18:30"],
  ["Sábado", "09:00 – 13:00"],
  ["Domingo", "Fechado"],
];

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

function WhatsIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 2.5 1 3 .8 3.6.7.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
    </svg>
  );
}

function Index() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const op = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const [filter, setFilter] = useState("Todas");
  const list = filter === "Todas" ? bikes : bikes.filter((b) => b.brand === filter);

  return (
    <main className="bg-background font-sans text-foreground antialiased">
      {/* Nav */}
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease }}
        className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#" className="font-display text-2xl font-black tracking-tight">
            JM<span className="text-primary">/</span>MOTORS
          </a>
          <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
            {[["Catálogo", "#catalogo"], ["Sobre", "#sobre"], ["Visite", "#contato"]].map(([l, h]) => (
              <a key={h} href={h} className="transition-colors hover:text-foreground">{l}</a>
            ))}
          </nav>
          <a href={WA} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-105">
            <WhatsIcon className="h-4 w-4" /> Falar agora
          </a>
        </div>
      </motion.header>

      {/* Hero */}
      <section ref={heroRef} className="grain relative flex min-h-screen items-end overflow-hidden px-6 pb-16 pt-32">
        <div className="pointer-events-none absolute -right-40 top-20 h-[38rem] w-[38rem] rounded-full bg-primary/20 blur-[140px]" />
        <motion.div style={{ y, opacity: op }} className="relative mx-auto w-full max-w-7xl">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1 }} className="mb-6 flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-muted-foreground">
            <span className="h-px w-10 bg-primary" /> Santos · SP · Vila Mathias
          </motion.p>
          <h1 className="font-display text-[clamp(4rem,14vw,13rem)] font-black uppercase leading-[0.85] tracking-tight">
            {["Sua próxima", "moto está", "aqui."].map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  className={`block ${i === 2 ? "text-primary" : ""}`}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, delay: 0.15 * i + 0.2, ease }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.9, ease }} className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-lg text-muted-foreground">
              Scooters, nakeds e esportivas — Honda, Kawasaki e mais. Atendimento direto, sem enrolação.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#catalogo" className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 font-medium text-background transition-transform hover:scale-105">
                Ver catálogo <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
              </a>
              <a href={PDF} download className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-medium transition-colors hover:border-primary hover:text-primary">
                <Download className="h-4 w-4" /> Baixar PDF
              </a>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-y border-border bg-primary py-4 text-primary-foreground">
        <div className="animate-marquee flex w-max gap-12 whitespace-nowrap font-display text-3xl font-extrabold uppercase">
          {Array.from({ length: 2 }).flatMap((_, k) =>
            ["PCX", "ADV", "Kawasaki", "Ninja", "Z400", "Honda", "Financiamento", "Seminovas"].map((w) => (
              <span key={w + k} className="flex items-center gap-12">{w} <span>✦</span></span>
            )),
          )}
        </div>
      </div>

      {/* Catálogo */}
      <section id="catalogo" className="px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm uppercase tracking-[0.3em] text-primary">01 — Catálogo</p>
              <h2 className="font-display text-6xl font-black uppercase md:text-8xl">Escolha a sua</h2>
            </div>
            <div className="flex gap-2">
              {filters.map((f) => (
                <button key={f} onClick={() => setFilter(f)} className={`relative rounded-full px-5 py-2 text-sm transition-colors ${filter === f ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                  {filter === f && <motion.span layoutId="pill" className="absolute inset-0 rounded-full bg-primary" transition={{ type: "spring", bounce: 0.2 }} />}
                  <span className="relative">{f}</span>
                </button>
              ))}
            </div>
          </Reveal>

          <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((b, i) => (
              <motion.article
                layout
                key={b.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease }}
                className="group relative overflow-hidden rounded-lg border border-border bg-card"
              >
                <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-muted">
                  <Bike className="h-16 w-16 text-muted-foreground/30 transition-transform duration-700 group-hover:scale-125 group-hover:text-primary/50" strokeWidth={1} />
                  <span className="absolute left-4 top-4 rounded-full border border-border bg-background/60 px-3 py-1 text-xs backdrop-blur">{b.cat}</span>
                  <span className="absolute bottom-4 right-4 text-xs text-muted-foreground">Foto em breve</span>
                </div>
                <div className="flex items-end justify-between p-6">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">{b.brand}</p>
                    <h3 className="font-display text-3xl font-extrabold uppercase">{b.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{b.spec}</p>
                  </div>
                  <a href={waFor(b.name)} target="_blank" rel="noreferrer" aria-label={`Consultar ${b.name}`} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                    <ArrowUpRight className="h-5 w-5" />
                  </a>
                </div>
              </motion.article>
            ))}
          </motion.div>

          <Reveal className="mt-14">
            <div className="flex flex-col items-start justify-between gap-6 rounded-lg border border-border bg-card p-8 md:flex-row md:items-center">
              <div>
                <h3 className="font-display text-4xl font-extrabold uppercase">Catálogo completo</h3>
                <p className="text-muted-foreground">Todos os modelos, versões e condições em um só arquivo.</p>
              </div>
              <a href={PDF} download className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 font-medium text-primary-foreground transition-transform hover:scale-105">
                <Download className="h-5 w-5" /> Baixar catálogo (PDF)
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="border-t border-border px-6 py-28">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2">
          <Reveal>
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-primary">02 — A loja</p>
            <h2 className="font-display text-6xl font-black uppercase leading-none md:text-7xl">Paixão por duas rodas em Santos</h2>
            <p className="mt-8 max-w-lg text-lg text-muted-foreground">
              Na JM Motors você encontra a moto certa para o seu dia a dia ou para a estrada, com atendimento próximo e transparente do primeiro contato até a entrega da chave.
            </p>
          </Reveal>
          <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
            {[
              [Bike, "Novas e seminovas", "Modelos revisados e prontos para rodar."],
              [BadgeDollarSign, "Financiamento", "Condições facilitadas e aceitamos sua usada."],
              [ShieldCheck, "Procedência", "Documentação em dia e total transparência."],
              [Wrench, "Pós-venda", "Suporte de verdade depois da compra."],
            ].map(([Icon, t, d], i) => {
              const I = Icon as typeof Bike;
              return (
                <Reveal key={t as string} delay={i * 0.08} className="bg-background p-8">
                  <I className="mb-6 h-7 w-7 text-primary" strokeWidth={1.5} />
                  <h3 className="font-display text-2xl font-extrabold uppercase">{t as string}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{d as string}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="border-t border-border px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-primary">03 — Visite</p>
            <h2 className="font-display text-6xl font-black uppercase md:text-8xl">Passa aqui</h2>
          </Reveal>
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            <Reveal className="rounded-lg border border-border bg-card p-8">
              <MapPin className="mb-6 h-6 w-6 text-primary" />
              <p className="font-display text-2xl font-extrabold uppercase">Endereço</p>
              <p className="mt-2 text-muted-foreground">Av. Senador Feijó, 455<br />Vila Mathias, Santos - SP<br />11015-505</p>
              <a href="https://www.google.com/maps/search/?api=1&query=Av.+Senador+Feij%C3%B3,+455,+Santos+-+SP" target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-1 text-sm text-primary hover:underline">Abrir no mapa <ArrowUpRight className="h-4 w-4" /></a>
            </Reveal>
            <Reveal delay={0.1} className="rounded-lg border border-border bg-card p-8">
              <Clock className="mb-6 h-6 w-6 text-primary" />
              <p className="font-display text-2xl font-extrabold uppercase">Horário</p>
              <ul className="mt-2 space-y-2">
                {hours.map(([d, h]) => (
                  <li key={d} className="flex justify-between border-b border-border pb-2 text-sm">
                    <span className="text-muted-foreground">{d}</span><span>{h}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.2} className="rounded-lg border border-border bg-card p-8">
              <Phone className="mb-6 h-6 w-6 text-primary" />
              <p className="font-display text-2xl font-extrabold uppercase">Contato</p>
              <a href="tel:+5513976007271" className="mt-2 block text-muted-foreground hover:text-foreground">(13) 97600-7271</a>
              <a href={WA} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-3 font-medium text-primary-foreground transition-transform hover:scale-105">
                <WhatsIcon className="h-5 w-5" /> Chamar no WhatsApp
              </a>
            </Reveal>
          </div>
          <Reveal className="mt-5 overflow-hidden rounded-lg border border-border">
            <iframe title="Mapa JM Motors" className="h-80 w-full grayscale invert-[0.9]" loading="lazy" src="https://www.google.com/maps?q=Av.+Senador+Feij%C3%B3,+455,+Santos+-+SP&output=embed" />
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-border px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-muted-foreground md:flex-row">
          <span className="font-display text-xl font-black text-foreground">JM<span className="text-primary">/</span>MOTORS</span>
          <span>© {new Date().getFullYear()} JM Motors · Santos - SP</span>
        </div>
      </footer>

      {/* WhatsApp flutuante */}
      <motion.a
        href={WA}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-primary-foreground shadow-2xl"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-whatsapp opacity-30" />
        <WhatsIcon className="relative h-7 w-7" />
      </motion.a>
    </main>
  );
}
