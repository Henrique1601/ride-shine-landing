import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useRef, useState } from "react";
import {
  ArrowUpRight,
  Clock,
  Download,
  MapPin,
  Phone,
  ShieldCheck,
  Wrench,
  BadgeDollarSign,
  Bike,
  Menu,
  X,
  Star,
  MessageSquare,
  Calculator,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";
import { ReviewsCarousel } from "../components/ReviewsCarousel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JM Motors Santos | Motos Novas e Seminovas na Vila Mathias" },
      {
        name: "description",
        content:
          "Honda PCX, ADV, Kawasaki e motos seminovas revisadas na JM Motors em Santos - SP. Financiamento facilitado e avaliação da sua moto na troca. Av. Senador Feijó, 455.",
      },
      {
        name: "keywords",
        content:
          "motos santos, motos seminovas santos, loja de motos santos sp, concessionária vila mathias, honda santos, kawasaki santos, comprar moto santos",
      },
      { property: "og:site_name", content: "JM Motors Santos" },
      { property: "og:title", content: "JM Motors Santos | Motos Novas e Seminovas" },
      {
        property: "og:description",
        content:
          "Catálogo de motos, financiamento facilitado e avaliação de usados na troca. Av. Senador Feijó, 455 - Santos.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://jmmotorssantos.com.br/" },
      { property: "og:image", content: "https://jmmotorssantos.com.br/og-image.jpg" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "JM Motors Santos | Motos Novas e Seminovas" },
      {
        name: "twitter:description",
        content:
          "Motos novas e seminovas revisadas com garantia e financiamento em Santos - SP.",
      },
      { name: "twitter:image", content: "https://jmmotorssantos.com.br/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://jmmotorssantos.com.br/" }],
  }),
  component: Index,
});

const WA =
  "https://wa.me/5513976007271?text=" +
  encodeURIComponent("Olá, JM Motors! Vim pelo site e quero saber mais sobre as motos.");
const waFor = (m: string) =>
  "https://wa.me/5513976007271?text=" +
  encodeURIComponent(`Olá, JM Motors! Tenho interesse na ${m}.`);
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

const faqs = [
  {
    q: "A JM Motors aceita minha moto usada na troca?",
    a: "Sim! Aceitamos motos de diversas marcas e cilindradas como parte do pagamento na compra da sua próxima moto. Você pode solicitar uma pré-avaliação rápida pelo WhatsApp ou trazer sua moto diretamente em nossa loja na Av. Senador Feijó, 455.",
  },
  {
    q: "Como funciona o financiamento e quais são as condições?",
    a: "Trabalhamos em parceria com as principais instituições financeiras do Brasil (como Santander, BV, Pan e Bradesco). Oferecemos planos com ou sem entrada, prazos de até 48 meses e aprovação ágil de crédito.",
  },
  {
    q: "As motos seminovas possuem garantia e laudo cautelar?",
    a: "Com certeza. Todas as nossas motos passam por rigorosa checagem mecânica de mais de 40 itens, laudo cautelar estrutural e contam com garantia legal de motor e câmbio, além de documentação 100% desembaraçada.",
  },
  {
    q: "Onde a loja fica localizada e como agendar uma visita?",
    a: "Estamos situados na Av. Senador Feijó, 455, no bairro Vila Mathias em Santos - SP (CEP 11015-505). Não é necessário agendamento prévio, mas caso prefira, pode nos chamar no WhatsApp para já deixar a moto do seu interesse separada para você conferir.",
  },
];

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
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

  // Mobile navigation drawer state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Financing simulator state
  const [financePrice, setFinancePrice] = useState(25000);
  const [financeEntry, setFinanceEntry] = useState(5000);
  const [financeMonths, setFinanceMonths] = useState(36);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Calculate estimated monthly installment
  const financedAmount = Math.max(0, financePrice - financeEntry);
  const interestRate = 0.0179; // ~1.79% a.m. estimativa referencial
  const calculatedInstallment =
    financedAmount > 0
      ? Math.round(
          (financedAmount * interestRate) / (1 - Math.pow(1 + interestRate, -financeMonths)),
        )
      : 0;

  const financeWaLink =
    "https://wa.me/5513976007271?text=" +
    encodeURIComponent(
      `Olá, JM Motors! Fiz uma simulação de financiamento no site:\n- Valor estimado: R$ ${financePrice.toLocaleString("pt-BR")}\n- Entrada: R$ ${financeEntry.toLocaleString("pt-BR")}\n- Prazo: ${financeMonths}x\n- Parcela estimada: R$ ${calculatedInstallment.toLocaleString("pt-BR")}/mês.\nGostaria de consultar as condições oficiais para o meu CPF!`,
    );

  const tradeWaLink =
    "https://wa.me/5513976007271?text=" +
    encodeURIComponent(
      "Olá, JM Motors! Tenho interesse em dar minha moto usada como entrada na troca. Como funciona a avaliação?",
    );

  const navLinks = [
    ["Catálogo", "#catalogo"],
    ["Troca", "#troca"],
    ["Financiamento", "#financiamento"],
    ["A Loja", "#sobre"],
    ["Avaliações", "#depoimentos"],
    ["Dúvidas", "#faq"],
    ["Visite", "#contato"],
  ];

  return (
    <main className="bg-background font-sans text-foreground antialiased selection:bg-primary selection:text-primary-foreground">
      {/* Nav */}
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease }}
        className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a
            href="#"
            className="font-display text-2xl font-black tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          >
            JM<span className="text-primary">/</span>MOTORS
          </a>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground lg:flex">
            {navLinks.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded py-1"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={WA}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <WhatsIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Falar agora</span>
              <span className="sm:hidden">WhatsApp</span>
            </a>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground hover:bg-muted lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="border-b border-border bg-background/95 px-6 py-6 backdrop-blur-2xl lg:hidden"
            >
              <nav className="flex flex-col gap-4 text-base">
                {navLinks.map(([label, href]) => (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between border-b border-border/50 py-2 font-medium text-muted-foreground hover:text-foreground"
                  >
                    <span>{label}</span>
                    <ArrowUpRight className="h-4 w-4 text-primary" />
                  </a>
                ))}
                <a
                  href={WA}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-2 flex items-center justify-center gap-2 rounded-full bg-whatsapp py-3 font-semibold text-primary-foreground"
                >
                  <WhatsIcon className="h-5 w-5" /> Atendimento via WhatsApp
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero */}
      <section
        ref={heroRef}
        className="grain relative flex min-h-screen items-end overflow-hidden px-6 pb-16 pt-32"
      >
        <div className="pointer-events-none absolute -right-40 top-20 h-[38rem] w-[38rem] rounded-full bg-primary/20 blur-[140px]" />
        <motion.div style={{ y, opacity: op }} className="relative mx-auto w-full max-w-7xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="mb-6 flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-muted-foreground"
          >
            <span className="h-px w-10 bg-primary" /> Santos · SP · Vila Mathias · Baixada Santista
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.9, ease }}
            className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <p className="max-w-md text-lg text-muted-foreground">
              Scooters, nakeds e esportivas — Honda, Kawasaki e seminovas revisadas com procedência
              em Santos. Atendimento direto e sem burocracia.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#catalogo"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 font-medium text-background transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Ver catálogo{" "}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
              </a>
              <a
                href={PDF}
                download
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-medium transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
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
            [
              "PCX",
              "ADV",
              "Kawasaki",
              "Ninja",
              "Z400",
              "Honda",
              "Financiamento",
              "Seminovas",
              "Vila Mathias",
              "Santos - SP",
            ].map((w) => (
              <span key={w + k} className="flex items-center gap-12">
                {w} <span>✦</span>
              </span>
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
              <h2 className="font-display text-6xl font-black uppercase md:text-8xl">
                Escolha a sua
              </h2>
            </div>
            <div className="flex gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`relative rounded-full px-5 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    filter === f
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {filter === f && (
                    <motion.span
                      layoutId="pill"
                      className="absolute inset-0 rounded-full bg-primary"
                      transition={{ type: "spring", bounce: 0.2 }}
                    />
                  )}
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
                  <Bike
                    className="h-16 w-16 text-muted-foreground/30 transition-transform duration-700 group-hover:scale-125 group-hover:text-primary/50"
                    strokeWidth={1}
                  />
                  <span className="absolute left-4 top-4 rounded-full border border-border bg-background/60 px-3 py-1 text-xs backdrop-blur">
                    {b.cat}
                  </span>
                  <span className="absolute bottom-4 right-4 text-xs text-muted-foreground">
                    Foto em breve
                  </span>
                </div>
                <div className="flex items-end justify-between p-6">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                      {b.brand}
                    </p>
                    <h3 className="font-display text-3xl font-extrabold uppercase">{b.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{b.spec}</p>
                  </div>
                  <a
                    href={waFor(b.name)}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Consultar ${b.name}`}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
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
                <p className="text-muted-foreground">
                  Todos os modelos, versões e condições em um só arquivo.
                </p>
              </div>
              <a
                href={PDF}
                download
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 font-medium text-primary-foreground transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Download className="h-5 w-5" /> Baixar catálogo (PDF)
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Troca / Avaliação de Usada */}
      <section id="troca" className="border-t border-border px-6 py-28 bg-card/40">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-14">
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-primary">02 — Troca</p>
            <h2 className="font-display text-6xl font-black uppercase md:text-8xl">
              Avalie sua moto usada
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Quer trocar de moto? Na JM Motors seu veículo usado entra como parte do pagamento com a
              avaliação mais justa e transparente da Baixada Santista.
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: MessageSquare,
                step: "01. Envie fotos",
                desc: "Mande fotos da sua moto, ano, modelo e quilometragem diretamente no nosso WhatsApp.",
              },
              {
                icon: ShieldCheck,
                step: "02. Pré-avaliação ágil",
                desc: "Nossos consultores realizam a análise de mercado em poucos minutos com proposta competitiva.",
              },
              {
                icon: Bike,
                step: "03. Saia de moto nova",
                desc: "Traga a moto para vistoria final na loja na Vila Mathias e saia pilotando sua nova conquista.",
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal
                  key={item.step}
                  delay={index * 0.1}
                  className="rounded-lg border border-border bg-card p-8 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-display text-2xl font-bold uppercase">{item.step}</h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-border/60 flex items-center gap-2 text-xs text-primary font-medium">
                    <CheckCircle2 className="h-4 w-4" /> Avaliação sem burocracia
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-12 text-center md:text-left">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-lg border border-primary/30 bg-primary/5 p-8">
              <div>
                <p className="font-display text-3xl font-extrabold uppercase">
                  Deseja saber quanto vale a sua moto hoje?
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Atendimento instantâneo com nossos avaliadores de plantão em Santos.
                </p>
              </div>
              <a
                href={tradeWaLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-8 py-4 font-semibold text-primary-foreground transition-transform hover:scale-105 shrink-0"
              >
                <WhatsIcon className="h-5 w-5" /> Avaliar moto pelo WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Financiamento Interativo */}
      <section id="financiamento" className="border-t border-border px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-14">
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-primary">03 — Financiamento</p>
            <h2 className="font-display text-6xl font-black uppercase md:text-8xl">
              Simule suas parcelas
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Aprovação ágil com os principais bancos do país. Escolha as condições ideais para o seu
              bolso e solicite análise sem compromisso.
            </p>
          </Reveal>

          <div className="grid gap-8 lg:grid-cols-12 items-start">
            {/* Controles de Simulação */}
            <Reveal className="lg:col-span-7 rounded-lg border border-border bg-card p-8 space-y-8">
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold block mb-3">
                  1. Valor estimado da moto:{" "}
                  <span className="text-foreground text-base font-bold">
                    R$ {financePrice.toLocaleString("pt-BR")}
                  </span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[16000, 25000, 38000, 52000].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setFinancePrice(val)}
                      className={`rounded-lg py-2.5 px-3 text-sm font-medium border transition-colors ${
                        financePrice === val
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      R$ {val.toLocaleString("pt-BR")}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold block mb-3">
                  2. Valor de entrada:{" "}
                  <span className="text-foreground text-base font-bold">
                    R$ {financeEntry.toLocaleString("pt-BR")}
                  </span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[0, 3000, 5000, 10000].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setFinanceEntry(val)}
                      className={`rounded-lg py-2.5 px-3 text-sm font-medium border transition-colors ${
                        financeEntry === val
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {val === 0 ? "Sem entrada" : `R$ ${val.toLocaleString("pt-BR")}`}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold block mb-3">
                  3. Prazo do financiamento:
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[24, 36, 48].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setFinanceMonths(m)}
                      className={`rounded-lg py-3 text-sm font-bold border transition-colors ${
                        financeMonths === m
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {m} meses
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-muted-foreground pt-2">
                <Calculator className="h-4 w-4 text-primary shrink-0" />
                <span>Trabalhamos com Santander, BV Financeira, Banco Pan e Bradesco.</span>
              </div>
            </Reveal>

            {/* Resultado do Financiamento */}
            <Reveal delay={0.15} className="lg:col-span-5 rounded-lg border border-primary/40 bg-card p-8">
              <span className="text-xs uppercase tracking-widest text-primary font-bold">
                Estimativa de Parcela
              </span>
              <div className="mt-4">
                <p className="font-display text-5xl sm:text-6xl font-black text-foreground">
                  R$ {calculatedInstallment.toLocaleString("pt-BR")}
                  <span className="text-lg font-sans text-muted-foreground font-normal"> / mês</span>
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Em <strong className="text-foreground">{financeMonths}x</strong> com entrada de{" "}
                  <strong className="text-foreground">
                    R$ {financeEntry.toLocaleString("pt-BR")}
                  </strong>
                </p>
              </div>

              <div className="mt-8 space-y-3 border-t border-border pt-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Valor Financiado:</span>
                  <span className="font-semibold text-foreground">
                    R$ {financedAmount.toLocaleString("pt-BR")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Análise de Crédito:</span>
                  <span className="text-primary font-semibold">100% Online e Gratuita</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Aprovação:</span>
                  <span className="font-semibold text-foreground">Em até 30 minutos</span>
                </div>
              </div>

              <a
                href={financeWaLink}
                target="_blank"
                rel="noreferrer"
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-4 font-semibold text-primary-foreground transition-transform hover:scale-105"
              >
                <WhatsIcon className="h-5 w-5" /> Simular no WhatsApp
              </a>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                *Valores estimados com taxa média de mercado. O valor exato pode variar conforme o
                score e a análise de crédito de cada banco.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Sobre a Loja */}
      <section id="sobre" className="border-t border-border px-6 py-28">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2">
          <Reveal>
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-primary">04 — A loja</p>
            <h2 className="font-display text-6xl font-black uppercase leading-none md:text-7xl">
              Paixão por duas rodas em Santos
            </h2>
            <p className="mt-8 max-w-lg text-lg text-muted-foreground">
              Na JM Motors você encontra a moto ideal para o seu dia a dia ou para a estrada, com
              atendimento próximo, transparente e sem pegadinhas do primeiro contato até a entrega da chave.
            </p>
          </Reveal>
          <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
            {[
              [Bike, "Novas e seminovas", "Modelos rigorosamente revisados e prontos para rodar."],
              [BadgeDollarSign, "Financiamento", "Condições facilitadas e aceitamos sua usada na troca."],
              [ShieldCheck, "Procedência", "Laudo cautelar aprovado e documentação 100% em dia."],
              [Wrench, "Pós-venda", "Suporte e garantia de verdade depois da compra."],
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

      {/* Depoimentos & Avaliações */}
      <section id="depoimentos" className="border-t border-border px-6 py-28 bg-card/30">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-14">
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-primary">05 — Confiança</p>
            <h2 className="font-display text-6xl font-black uppercase md:text-8xl">
              Quem compra, recomenda
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Confira os relatos de clientes de Santos e região que conquistaram sua moto na JM Motors.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ReviewsCarousel />
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-border px-6 py-28">
        <div className="mx-auto max-w-4xl">
          <Reveal className="mb-14 text-center">
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-primary">06 — Dúvidas</p>
            <h2 className="font-display text-6xl font-black uppercase md:text-7xl">
              Perguntas Frequentes
            </h2>
            <p className="mt-4 text-muted-foreground">
              Tire suas principais dúvidas sobre compra, troca e financiamento na JM Motors.
            </p>
          </Reveal>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <Reveal key={faq.q} delay={index * 0.05}>
                  <div className="rounded-lg border border-border bg-card overflow-hidden transition-colors">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full flex items-center justify-between p-6 text-left font-display text-2xl font-bold uppercase tracking-tight hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`h-5 w-5 text-primary transition-transform duration-300 shrink-0 ml-4 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed border-t border-border/40 pt-4"
                        >
                          {faq.a}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contato / Visite */}
      <section id="contato" className="border-t border-border px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-primary">07 — Visite</p>
            <h2 className="font-display text-6xl font-black uppercase md:text-8xl">Passa aqui</h2>
          </Reveal>
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            <Reveal className="rounded-lg border border-border bg-card p-8">
              <MapPin className="mb-6 h-6 w-6 text-primary" />
              <p className="font-display text-2xl font-extrabold uppercase">Endereço</p>
              <p className="mt-2 text-muted-foreground">
                Av. Senador Feijó, 455
                <br />
                Vila Mathias, Santos - SP
                <br />
                11015-505
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Av.+Senador+Feij%C3%B3,+455,+Santos+-+SP"
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-1 text-sm text-primary hover:underline"
              >
                Abrir no mapa <ArrowUpRight className="h-4 w-4" />
              </a>
            </Reveal>
            <Reveal delay={0.1} className="rounded-lg border border-border bg-card p-8">
              <Clock className="mb-6 h-6 w-6 text-primary" />
              <p className="font-display text-2xl font-extrabold uppercase">Horário</p>
              <ul className="mt-2 space-y-2">
                {hours.map(([d, h]) => (
                  <li key={d} className="flex justify-between border-b border-border pb-2 text-sm">
                    <span className="text-muted-foreground">{d}</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.2} className="rounded-lg border border-border bg-card p-8">
              <Phone className="mb-6 h-6 w-6 text-primary" />
              <p className="font-display text-2xl font-extrabold uppercase">Contato</p>
              <a
                href="tel:+5513976007271"
                className="mt-2 block text-muted-foreground hover:text-foreground"
              >
                (13) 97600-7271
              </a>
              <a
                href={WA}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-3 font-medium text-primary-foreground transition-transform hover:scale-105"
              >
                <WhatsIcon className="h-5 w-5" /> Chamar no WhatsApp
              </a>
            </Reveal>
          </div>
          <Reveal className="mt-5 overflow-hidden rounded-lg border border-border">
            <iframe
              title="Mapa JM Motors - Av. Senador Feijó, 455, Vila Mathias, Santos - SP"
              className="h-80 w-full grayscale invert-[0.9]"
              loading="lazy"
              src="https://www.google.com/maps?q=Av.+Senador+Feij%C3%B3,+455,+Santos+-+SP&output=embed"
            />
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-muted-foreground md:flex-row items-center">
          <span className="font-display text-xl font-black text-foreground">
            JM<span className="text-primary">/</span>MOTORS
          </span>
          <span>Av. Senador Feijó, 455 — Vila Mathias, Santos/SP</span>
          <span>© {new Date().getFullYear()} JM Motors · Todos os direitos reservados.</span>
        </div>
      </footer>

      {/* WhatsApp flutuante */}
      <motion.a
        href={WA}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar no WhatsApp"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-primary-foreground shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-whatsapp opacity-30" />
        <WhatsIcon className="relative h-7 w-7" />
      </motion.a>
    </main>
  );
}
