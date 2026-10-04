import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "JM Motors Santos | Motos Novas e Seminovas na Vila Mathias" },
      {
        name: "description",
        content:
          "JM Motors: motos novas e seminovas revisadas com procedência e garantia em Santos - SP. Financiamento facilitado e avaliação da sua usada. Av. Senador Feijó, 455.",
      },
      {
        name: "keywords",
        content:
          "motos santos, motos seminovas santos, loja de motos santos, concessionária motos vila mathias, honda pcx santos, kawasaki santos, financiamento moto santos, comprar moto baixada santista",
      },
      { name: "theme-color", content: "#171412" },
      { property: "og:site_name", content: "JM Motors Santos" },
      { property: "og:title", content: "JM Motors Santos | Motos Novas e Seminovas" },
      {
        property: "og:description",
        content:
          "Catálogo de motos revisadas, financiamento facilitado e avaliação da sua usada em Santos - SP. Av. Senador Feijó, 455.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://jmmotorssantos.com.br/" },
      { property: "og:image", content: "https://jmmotorssantos.com.br/og-image.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "JM Motors Santos - Showroom de Motos" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "JM Motors Santos | Motos Novas e Seminovas" },
      {
        name: "twitter:description",
        content:
          "Honda, Kawasaki e seminovas revisadas com garantia e financiamento facilitado em Santos - SP.",
      },
      { name: "twitter:image", content: "https://jmmotorssantos.com.br/og-image.jpg" },
    ],
    links: [
      { rel: "canonical", href: "https://jmmotorssantos.com.br/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@600;800;900&family=DM+Sans:wght@400;500;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "MotorcycleDealer",
              "@id": "https://jmmotorssantos.com.br/#dealership",
              "name": "JM Motors",
              "description":
                "Loja de motos novas e seminovas em Santos - SP. Financiamento com as melhores taxas e aceitação de veículos usados na troca.",
              "url": "https://jmmotorssantos.com.br",
              "image": "https://jmmotorssantos.com.br/og-image.jpg",
              "logo": "https://jmmotorssantos.com.br/apple-touch-icon.png",
              "telephone": "+5513976007271",
              "priceRange": "$$",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Av. Senador Feijó, 455",
                "addressLocality": "Santos",
                "addressRegion": "SP",
                "postalCode": "11015-505",
                "addressCountry": "BR",
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -23.95155,
                "longitude": -46.3312,
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "09:00",
                  "closes": "18:30",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": "Saturday",
                  "opens": "09:00",
                  "closes": "13:00",
                },
              ],
              "areaServed": [
                { "@type": "City", "name": "Santos" },
                { "@type": "City", "name": "São Vicente" },
                { "@type": "City", "name": "Praia Grande" },
                { "@type": "City", "name": "Guarujá" },
                { "@type": "City", "name": "Cubatão" },
              ],
            },
            {
              "@type": "FAQPage",
              "@id": "https://jmmotorssantos.com.br/#faq",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "A JM Motors aceita moto usada na troca?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text":
                      "Sim! Aceitamos sua moto usada como parte do pagamento na compra da sua próxima moto, com avaliação justa e rápida pelo WhatsApp ou diretamente na loja.",
                  },
                },
                {
                  "@type": "Question",
                  "name": "Como funciona o financiamento de motos na JM Motors?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text":
                      "Trabalhamos com os principais bancos e financeiras do mercado automotivo. Oferecemos opções com e sem entrada, com parcelamento em até 48x e aprovação ágil.",
                  },
                },
                {
                  "@type": "Question",
                  "name": "As motos têm procedência e garantia?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text":
                      "Sim, todas as motos seminovas passam por rigorosa inspeção mecânica e laudo cautelar, com documentação em dia e garantia de motor e câmbio.",
                  },
                },
                {
                  "@type": "Question",
                  "name": "Onde fica localizada a JM Motors em Santos?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text":
                      "A loja está localizada na Av. Senador Feijó, 455, no bairro Vila Mathias em Santos - SP (CEP 11015-505), com fácil acesso e estacionamento.",
                  },
                },
              ],
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
