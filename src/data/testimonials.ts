export interface Testimonial {
  id: string;
  name: string;
  city: string;
  bike: string;
  rating: number;
  date: string;
  text: string;
}

/**
 * Lista de avaliações da JM Motors no Google Meu Negócio.
 * Para adicionar novas avaliações, basta incluir um novo objeto nesta lista.
 */
export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Lucas Moreira",
    city: "Santos - SP",
    bike: "Honda PCX 160",
    rating: 5,
    date: "Há 1 semana",
    text: "Atendimento impecável na Vila Mathias! Comprei minha PCX e o financiamento foi aprovado super rápido no mesmo dia. Equipe transparente e a moto veio impecavelmente revisada.",
  },
  {
    id: "2",
    name: "Rodrigo Silveira",
    city: "São Vicente - SP",
    bike: "Kawasaki Z400",
    rating: 5,
    date: "Há 2 semanas",
    text: "Dei minha 250cc usada na troca e peguei a Z400. Fizeram uma avaliação justa da minha moto, sem enrolação ou pegadinhas. Recomendo de olhos fechados em toda a Baixada Santista.",
  },
  {
    id: "3",
    name: "Camila Fernandes",
    city: "Praia Grande - SP",
    bike: "Honda ADV 160",
    rating: 5,
    date: "Há 3 semanas",
    text: "Fiz questão da procedência e do laudo cautelar. A JM Motors passou total segurança desde o primeiro contato no WhatsApp até a entrega da chave na loja. Nota 10!",
  },
  {
    id: "4",
    name: "Felipe Nogueira",
    city: "Santos - SP",
    bike: "Kawasaki Ninja 400",
    rating: 5,
    date: "Há 1 mês",
    text: "A melhor loja de motos esportivas da região. Peguei a Ninja 400 em estado de zero km. Pós-venda atencioso e suporte rápido para tirar todas as dúvidas de documentação.",
  },
  {
    id: "5",
    name: "Juliana Castro",
    city: "Guarujá - SP",
    bike: "Honda CG 160",
    rating: 5,
    date: "Há 1 mês",
    text: "Moro no Guarujá e fui até Santos após indicação de um amigo. Condições de financiamento imbatíveis com o Banco Pan, sem complicação e parcelas que cabem no bolso.",
  },
  {
    id: "6",
    name: "Marcelo Albuquerque",
    city: "Cubatão - SP",
    bike: "Kawasaki Versys-X 300",
    rating: 5,
    date: "Há 2 meses",
    text: "Profissionais sérios e apaixonados por motos. Transparência do início ao fim e atendimento nota mil na Senador Feijó. Minha próxima moto certamente será com a JM Motors.",
  },
];
