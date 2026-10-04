import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, ChevronLeft, ChevronRight, MessageSquareQuote, CheckCircle2, ArrowUpRight } from "lucide-react";
import { testimonials, type Testimonial } from "../data/testimonials";

export function ReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [cardsPerView, setCardsPerView] = useState(3);

  // Determina quantos cards aparecem por tela
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - cardsPerView);

  // Navegação
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Autoplay a cada 5 segundos se o usuário não estiver com o mouse em cima
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered, nextSlide]);

  // Suporte a swipe em smartphones
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
  };

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Controles do Carrossel e Selo Google */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-amber-400" />
            ))}
          </div>
          <span className="text-sm font-semibold text-foreground">
            4.9 / 5.0 no Google Avaliações
          </span>
          <span className="hidden sm:inline text-xs text-muted-foreground">
            • {testimonials.length} avaliações reais
          </span>
        </div>

        {/* Botões Prev / Next */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Avaliação anterior"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-all hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Próxima avaliação"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-all hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Trilha do Carrossel */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
          }}
        >
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="shrink-0 px-2 sm:px-3"
              style={{ width: `${100 / cardsPerView}%` }}
            >
              <article className="h-full flex flex-col justify-between rounded-lg border border-border bg-card p-7 transition-all hover:border-border/80 hover:shadow-lg">
                <div>
                  {/* Cabeçalho do Card */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex text-amber-400">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">{item.date}</span>
                  </div>

                  {/* Texto do depoimento */}
                  <p className="text-muted-foreground text-sm leading-relaxed italic">
                    "{item.text}"
                  </p>
                </div>

                {/* Rodapé com autor e detalhes da moto */}
                <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-display text-lg font-bold uppercase text-foreground">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.city} • <span className="text-primary font-medium">{item.bike}</span>
                    </p>
                  </div>
                  <div
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary"
                    title="Avaliação Verificada no Google"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      {/* Indicadores de Pontos (Dots) */}
      <div className="mt-8 flex items-center justify-center gap-2">
        {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Ir para slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              currentIndex === idx ? "w-8 bg-primary" : "w-2 bg-border hover:bg-muted-foreground"
            }`}
          />
        ))}
      </div>

      {/* Chamada para Avaliar no Google */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-lg border border-border/80 bg-background/60 p-5 text-sm">
        <div className="flex items-center gap-3">
          <MessageSquareQuote className="h-5 w-5 text-primary shrink-0" />
          <span className="text-muted-foreground">
            Já comprou ou trocou de moto conosco? Conte como foi sua experiência!
          </span>
        </div>
        <a
          href="https://www.google.com/maps/search/?api=1&query=Av.+Senador+Feij%C3%B3,+455,+Santos+-+SP"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline shrink-0"
        >
          Avaliar no Google <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
