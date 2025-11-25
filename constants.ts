import { PricingPlan, Testimonial, FaqItem, PortfolioItem, Step } from './types';

export const WHATSAPP_LINK = "https://wa.me/351910000000"; // Placeholder number

export const PLANS: PricingPlan[] = [
  {
    id: 'essential',
    name: 'Essencial',
    prices: {
      monthly: {
        amount: '19€',
        label: '/mês',
        billed: 'Cobrado mensalmente',
        stripeLink: 'https://buy.stripe.com/test_essential_monthly'
      },
      quarterly: {
        amount: '16€',
        label: '/mês',
        billed: '48€ a cada 3 meses',
        savings: 'Poupe 16%',
        stripeLink: 'https://buy.stripe.com/test_essential_quarterly'
      },
      annual: {
        amount: '13€',
        label: '/mês',
        billed: '156€ por ano',
        savings: 'Poupe 32%',
        stripeLink: 'https://buy.stripe.com/test_essential_annual'
      }
    },
    headline: 'Para quem quer um site simples, profissional e rápido, sem complicações.',
    features: [
      '1 página (landing page completa)',
      '1 template optimizado',
      'Entrega em até 72 horas',
      'Sem taxa de criação',
      '1 alteração mensal (texto/horários)',
      'Subdomínio gratuito',
      'Alojamento e SSL incluídos',
      'Integração com WhatsApp',
      'Suporte por e-mail'
    ],
    cta: 'Começar com Essencial',
    highlight: false,
    idealFor: 'O profissional ou negócio local que só precisa de um site rápido e económico para estar presente no Google.'
  },
  {
    id: 'professional',
    name: 'Profissional',
    prices: {
      monthly: {
        amount: '29€',
        label: '/mês',
        billed: 'Cobrado mensalmente',
        stripeLink: 'https://buy.stripe.com/test_professional_monthly'
      },
      quarterly: {
        amount: '25€',
        label: '/mês',
        billed: '75€ a cada 3 meses',
        savings: 'Poupe 14%',
        stripeLink: 'https://buy.stripe.com/test_professional_quarterly'
      },
      annual: {
        amount: '20,75€',
        label: '/mês',
        billed: '249€ por ano',
        savings: 'Poupe 28%',
        stripeLink: 'https://buy.stripe.com/test_professional_annual'
      }
    },
    headline: 'Para negócios que querem um site mais completo e com domínio próprio.',
    features: [
      'Tudo do Plano Essencial',
      'Configuração de domínio próprio (cliente fornece)',
      'SEO básico (títulos, descrições)',
      'Google Analytics e Pixel Meta',
      '2 alterações mensais (texto)',
      '1 ferramenta extra (WhatsApp Business ou Form)',
      'Suporte por e-mail'
    ],
    cta: 'Quero o plano Profissional',
    highlight: true,
    idealFor: 'Negócios que desejam dar um passo a mais na credibilidade e profissionalização da presença online.'
  },
  {
    id: 'premium',
    name: 'Premium',
    prices: {
      monthly: {
        amount: '45€',
        label: '/mês',
        billed: 'Cobrado mensalmente',
        stripeLink: 'https://buy.stripe.com/test_premium_monthly'
      },
      quarterly: {
        amount: '40€',
        label: '/mês',
        billed: '120€ a cada 3 meses',
        savings: 'Poupe 11%',
        stripeLink: 'https://buy.stripe.com/test_premium_quarterly'
      },
      annual: {
        amount: '33,25€',
        label: '/mês',
        billed: '399€ por ano',
        savings: 'Poupe 26%',
        stripeLink: 'https://buy.stripe.com/test_premium_annual'
      }
    },
    headline: 'Para quem busca o melhor: site bonito, rápido, personalizado e totalmente optimizado.',
    features: [
      'Tudo do Plano Profissional',
      'Design premium personalizado',
      'Copywriting optimizado para conversão',
      'SEO avançado (velocidade, estrutura)',
      '3 alterações mensais (texto)',
      'Até 3 ferramentas extra (Agenda, CRM...)',
      'Suporte prioritário por e-mail'
    ],
    cta: 'Falar sobre o plano Premium',
    highlight: false,
    idealFor: 'Empresas que querem máxima credibilidade, performance e um site capaz de converter muito melhor.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    text: "Em dois dias tinha o site pronto e já com pedidos de orçamento a chegar pelo formulário. Foi muito simples.",
    author: "João Silva",
    role: "Canalizador em Lisboa",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: 2,
    text: "Antes só tinha a ficha do Google. Agora, com o site, os clientes vêem fotos, menu e conseguem reservar mais facilmente.",
    author: "Marta Rodrigues",
    role: "Restaurante em Cascais",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: 3,
    text: "Gostei de não ter de pagar tudo de uma vez. A mensalidade é baixa e sempre que preciso de mudar algo, resolvem rápido.",
    author: "Ana Costa",
    role: "Clínica de Estética no Porto",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80"
  }
];

export const FAQS: FaqItem[] = [
  {
    question: "Preciso de pagar alguma taxa inicial?",
    answer: "Não. O nosso modelo é por mensalidade. Criamos o site, alojamos e mantemos tudo incluído no valor mensal."
  },
  {
    question: "Existe fidelização ou período mínimo?",
    answer: "Não há fidelização obrigatória. Pode cancelar quando quiser, bastando avisar com 15 dias de antecedência."
  },
  {
    question: "Como faço o pagamento todos os meses?",
    answer: "Trabalhamos com pagamento recorrente através de cartão (crédito ou débito) ou MB Way, via uma plataforma segura (Stripe). O valor é debitado automaticamente todos os meses."
  },
  {
    question: "O site é meu?",
    answer: "Enquanto o serviço estiver activo, o site fica alojado e mantido pela Agência 777. Se um dia quiser comprar o site em definitivo, podemos fazer uma proposta de transferência completa."
  },
  {
    question: "Posso usar o meu próprio domínio (.pt, .com)?",
    answer: "Sim. Nos planos Profissional e Premium tratamos da configuração do seu domínio próprio. O custo do domínio é pago directamente ao registador que escolher."
  },
  {
    question: "Em quanto tempo o site fica pronto?",
    answer: "Normalmente apresentamos a pré-visualização em até 24 horas e o site final pode ficar pronto em 72 horas, dependendo da rapidez com que nos envia os conteúdos."
  }
];

export const PORTFOLIO: PortfolioItem[] = [
  {
    title: "Canalizador Lisboa",
    description: "Site simples com lista de serviços, urgências 24h e botão directo para WhatsApp.",
    imageUrl: "https://picsum.photos/600/400?random=1"
  },
  {
    title: "Restaurante em Cascais",
    description: "Página com menu, localização, fotos do espaço e botão para reservas.",
    imageUrl: "https://picsum.photos/600/400?random=2"
  },
  {
    title: "Clínica de Estética no Porto",
    description: "Secção de serviços, antes e depois, testemunhos e formulário de pedido de contacto.",
    imageUrl: "https://picsum.photos/600/400?random=3"
  }
];

export const STEPS: Step[] = [
  {
    number: "01",
    title: "Envia os dados do seu negócio",
    description: "Nome, contactos, serviços que presta, localidade e, se tiver, logótipo e cores preferidas."
  },
  {
    number: "02",
    title: "Criamos uma pré-visualização",
    description: "Em até 24 horas preparamos um modelo de site já com a sua marca, para ver como poderá ficar."
  },
  {
    number: "03",
    title: "Ajustamos até ficar do seu agrado",
    description: "Fazemos pequenos ajustes de texto, fotos e secções para alinhar com a imagem do seu negócio."
  },
  {
    number: "04",
    title: "Activa o plano e fica online",
    description: "Escolhe o plano, faz o pagamento recorrente e o site fica online 24/7."
  }
];