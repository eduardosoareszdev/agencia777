import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Smartphone, 
  MessageCircle, 
  Globe, 
  Menu,
  X,
  Star,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Zap,
  Layout,
  Send,
  Mail,
  Target
} from 'lucide-react';
import { PLANS, TESTIMONIALS, FAQS, PORTFOLIO, STEPS, WHATSAPP_LINK } from './constants';
import { Button } from './components/Button';
import { LegalModal } from './components/LegalModal';
import { CookieBanner } from './components/CookieBanner';
import { PrivacyPolicyContent, TermsContent } from './legalContent';
import { PricingPlan } from './types';

// Componente para animação "Reveal on Scroll" com variantes
const Reveal = ({ 
  children, 
  className = "", 
  delay = 0, 
  variant = 'up',
  duration = 1000
}: { 
  children: React.ReactNode, 
  className?: string, 
  delay?: number,
  variant?: 'up' | 'fade' | 'zoom' | 'left' | 'right',
  duration?: number
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" // Dispara quando o elemento está um pouco mais dentro da tela
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const getVariantStyles = () => {
    if (!isVisible) {
      switch (variant) {
        case 'up': return 'opacity-0 translate-y-20 blur-[2px]'; // Adicionado blur e aumentado slide
        case 'fade': return 'opacity-0 blur-[4px]';
        case 'zoom': return 'opacity-0 scale-90 translate-y-4 blur-[2px]';
        case 'left': return 'opacity-0 -translate-x-12 blur-[2px]';
        case 'right': return 'opacity-0 translate-x-12 blur-[2px]';
        default: return 'opacity-0 translate-y-20 blur-[2px]';
      }
    }
    return 'opacity-100 translate-y-0 translate-x-0 scale-100 blur-0';
  };

  const style = {
    transitionDelay: `${delay}ms`,
    transitionDuration: `${duration}ms`
  };

  return (
    <div 
      ref={ref} 
      style={style}
      className={`transition-all cubic-bezier(0.2, 0.8, 0.2, 1) transform will-change-transform ${getVariantStyles()} ${className}`}
    >
      {children}
    </div>
  );
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  
  // Billing Cycle State: 'monthly' | 'quarterly' | 'annual'
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly' | 'annual'>('quarterly');
  
  // State for Legal Modals
  const [isPrivacyOpen, setPrivacyOpen] = useState(false);
  const [isTermsOpen, setTermsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Alterado para 0: Transparente APENAS no topo absoluto.
      // Qualquer scroll (1px que seja) ativa o fundo.
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  // Lógica de Redirecionamento para Pagamento
  const handleSubscribe = (plan: PricingPlan) => {
    const currentPriceDetails = plan.prices[billingCycle];
    
    // Se existir um link do Stripe configurado para este plano/ciclo, abrir
    if (currentPriceDetails.stripeLink && !currentPriceDetails.stripeLink.includes('test_')) {
      window.open(currentPriceDetails.stripeLink, '_blank');
    } else {
      // Fallback: Se não houver link do Stripe, abrir WhatsApp com mensagem personalizada
      const message = encodeURIComponent(`Olá! Gostaria de subscrever o plano ${plan.name} com faturação ${billingCycle}.`);
      window.open(`${WHATSAPP_LINK}?text=${message}`, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-[#020204] text-gray-100 font-sans selection:bg-accent-500/30 overflow-hidden relative">
      
      {/* Cookie Consent Banner */}
      <CookieBanner />

      {/* Legal Modals */}
      <LegalModal 
        isOpen={isPrivacyOpen} 
        onClose={() => setPrivacyOpen(false)} 
        title="Política de Privacidade" 
        content={<PrivacyPolicyContent />} 
      />
      <LegalModal 
        isOpen={isTermsOpen} 
        onClose={() => setTermsOpen(false)} 
        title="Termos e Condições" 
        content={<TermsContent />} 
      />
      
      {/* Navbar - Z-INDEX AUMENTADO PARA 90 */}
      <nav className={`fixed top-0 w-full z-[90] transition-all duration-300 ${scrolled ? 'bg-[#030014]/95 backdrop-blur-xl border-b border-white/5 py-2 md:py-3 shadow-[0_4px_30px_-10px_rgba(139,92,246,0.2)]' : 'bg-transparent py-4 md:py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img 
                src="https://i.postimg.cc/qMJF7Zg3/LOGO.png" 
                alt="Agência 777" 
                className={`w-auto object-contain transition-all duration-300 drop-shadow-[0_0_15px_rgba(139,92,246,0.5)] ${scrolled ? 'h-10 md:h-14' : 'h-16 md:h-24'}`} 
              />
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <NavButton onClick={() => scrollToSection('benefits')}>Vantagens</NavButton>
              <NavButton onClick={() => scrollToSection('how-it-works')}>Como Funciona</NavButton>
              <NavButton onClick={() => scrollToSection('portfolio')}>Exemplos</NavButton>
              <NavButton onClick={() => scrollToSection('pricing')}>Planos</NavButton>
              <Button 
                variant="primary" 
                className="!py-2 !px-6 text-sm !rounded-full shadow-lg shadow-primary-500/20 hover:shadow-accent-500/40 transition-shadow duration-300"
                onClick={() => window.open(WHATSAPP_LINK, '_blank')}
              >
                WhatsApp
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white p-2"
              >
                {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#030014]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 space-y-4 animate-[slideDown_0.3s_ease-out]">
            <button onClick={() => scrollToSection('benefits')} className="block w-full text-left py-3 text-lg font-medium text-gray-300 border-b border-white/5">Vantagens</button>
            <button onClick={() => scrollToSection('how-it-works')} className="block w-full text-left py-3 text-lg font-medium text-gray-300 border-b border-white/5">Como Funciona</button>
            <button onClick={() => scrollToSection('portfolio')} className="block w-full text-left py-3 text-lg font-medium text-gray-300 border-b border-white/5">Exemplos</button>
            <button onClick={() => scrollToSection('pricing')} className="block w-full text-left py-3 text-lg font-medium text-gray-300 border-b border-white/5">Planos</button>
            <Button fullWidth onClick={() => window.open(WHATSAPP_LINK, '_blank')} className="mt-4">Falar no WhatsApp</Button>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-28 pb-12 md:pt-48 md:pb-24 overflow-hidden">
        
        {/* Fundo Gradiente Animado Intenso (Roxo + Ciano) - Z-INDEX 0 */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950 via-[#0a0a1a] to-black animate-gradient-xy opacity-90 z-0"></div>
        
        {/* Overlay de Blobs e Luzes - Z-INDEX 0 */}
        <div className="absolute inset-0 overflow-hidden z-0">
             {/* Grande brilho central */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-primary-600/20 to-accent-500/20 rounded-full blur-[120px] animate-pulse-slow mix-blend-screen"></div>
             
             {/* Blob Roxo em cima */}
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-600/20 rounded-full blur-[100px] animate-blob"></div>
             {/* Blob Ciano em baixo */}
             <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-500/20 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>

             {/* Grid Tecnológico */}
             <div className="absolute inset-0 bg-grid-moving opacity-[0.25] mix-blend-overlay"></div>
        </div>

        {/* CONTENT WRAPPER - Z-INDEX 50 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-50 w-full">
          <div className="text-center max-w-5xl mx-auto">
            
            {/* Tag Animada */}
            <Reveal variant="fade" className="inline-block mb-4 md:mb-6">
              <div className="inline-flex items-center gap-2 bg-[#13131f] border border-white/10 rounded-full px-4 py-2 md:px-5 shadow-lg">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-500"></span>
                </span>
                <span className="text-sm font-semibold text-gray-200 tracking-wide uppercase text-[10px] md:text-xs">
                  Web Design Profissional em Portugal
                </span>
              </div>
            </Reveal>
            
            <Reveal variant="up" delay={100} className="mb-6 md:mb-8">
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tight drop-shadow-2xl">
                O seu site pronto em <br className="hidden md:block"/>
                {/* Gradiente de Texto */}
                <span className="bg-gradient-to-r from-white via-primary-300 to-accent-400 text-transparent bg-clip-text animate-gradient-text drop-shadow-[0_0_30px_rgba(34,211,238,0.4)]">
                  72 horas
                </span>
              </h1>
            </Reveal>
            
            <Reveal variant="up" delay={200} className="mb-8 md:mb-10">
              <p className="text-base md:text-2xl text-gray-300 leading-relaxed max-w-2xl mx-auto font-light">
                Criação, alojamento e manutenção. Tudo o que o seu negócio precisa para crescer online, com mensalidades acessíveis desde <span className="text-accent-300 font-bold bg-accent-500/10 px-2 py-0.5 rounded border border-accent-500/20 whitespace-nowrap">13€/mês</span>.
              </p>
            </Reveal>
            
            <Reveal variant="up" delay={300} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10 md:mb-12">
              <Button 
                onClick={() => window.open(WHATSAPP_LINK, '_blank')} 
                icon={<Smartphone className="w-5 h-5" />}
                className="w-full sm:w-auto text-lg px-8 py-4 shadow-2xl shadow-primary-500/30 hover:shadow-accent-500/50 hover:-translate-y-1"
              >
                Começar Agora
              </Button>
              <Button 
                variant="secondary"
                onClick={() => scrollToSection('pricing')}
                className="w-full sm:w-auto text-lg px-8 py-4 bg-[#13131f] hover:bg-[#1c1c2e] border border-white/10 hover:border-white/20 hover:-translate-y-1 hover:text-white transition-all shadow-lg"
              >
                Ver planos e preços
              </Button>
            </Reveal>

            {/* Feature Pills - Solid for High Contrast */}
            <Reveal variant="fade" delay={400}>
              <div className="flex flex-wrap justify-center gap-2 md:gap-6 text-sm text-gray-300 mt-4 md:mt-8 max-w-4xl mx-auto relative z-50">
                <FeaturePill text="Sem taxa de criação" />
                <FeaturePill text="Tudo incluído" />
                <FeaturePill text="Suporte Próximo" />
                <FeaturePill text="Cancelamento fácil" />
              </div>
            </Reveal>
          </div>
        </div>
        
        {/* Gradient Fade */}
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#0f1221] via-[#0f1221]/80 to-transparent z-20 pointer-events-none"></div>
      </section>

      {/* Benefits Section - Compacted Spacing */}
      <section id="benefits" className="py-12 md:py-24 relative bg-[#0f1221] overflow-hidden">
        {/* Moving Gradient Orb */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-900/10 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-900/10 rounded-full blur-[80px] animate-blob"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal variant="up">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 pb-2 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-500">Porquê a Agência 777?</h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">Esqueça as dores de cabeça técnicas. Nós tratamos de tudo para que se foque no seu negócio.</p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            <BenefitCard 
              icon={<Clock className="w-6 h-6 text-white" />}
              title="Rapidez Incrível"
              description="Site pronto e configurado em até 72h úteis. Não perca meses à espera do seu programador."
              delay={0}
            />
            <BenefitCard 
              icon={<ShieldCheck className="w-6 h-6 text-white" />}
              title="Zero Preocupações"
              description="Segurança SSL, backups e manutenção técnica. O seu site está sempre protegido e atualizado."
              delay={100}
            />
             <BenefitCard 
              icon={<Zap className="w-6 h-6 text-white" />}
              title="Investimento Inteligente"
              description="Comece com apenas 19€/mês. Sem taxas de setup de centenas de euros."
              delay={200}
            />
             <BenefitCard 
              icon={<Globe className="w-6 h-6 text-white" />}
              title="Otimizado para Google"
              description="Estrutura correta para que os clientes o encontrem quando pesquisam pelos seus serviços."
              delay={300}
            />
             <BenefitCard 
              icon={<Layout className="w-6 h-6 text-white" />}
              title="Visual Premium"
              description="Design limpo, moderno e que transmite confiança imediata a quem visita."
              delay={400}
            />
             <BenefitCard 
              icon={<Mail className="w-6 h-6 text-white" />}
              title="Suporte Especializado"
              description="Apoio técnico dedicado por e-mail. A nossa equipa resolve as suas dúvidas com rapidez e eficiência."
              delay={500}
            />
          </div>

          {/* CTA STRATEGIC PLACEMENT 1 */}
          <Reveal variant="fade" delay={600} className="flex justify-center mt-12 md:mt-16">
            <Button 
              variant="secondary" 
              onClick={() => scrollToSection('pricing')}
              className="px-8 py-3 text-base md:text-lg border-white/20 hover:bg-white/10"
            >
              Ver planos disponíveis
            </Button>
          </Reveal>
        </div>
      </section>

      {/* How It Works Section - Compacted Spacing */}
      <section id="how-it-works" className="py-12 md:py-24 bg-[#161226] relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-primary-900/10 to-accent-900/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal variant="up">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Como funciona na prática?</h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                Em poucos passos, o seu negócio passa a ter um site profissional. Simples, sem burocracia.
              </p>
            </div>
          </Reveal>

          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary-500/50 to-transparent z-0"></div>

            <div className="grid md:grid-cols-4 gap-8 relative z-10">
              {STEPS.map((step, idx) => (
                <Reveal key={idx} delay={idx * 200} variant="up" className="flex flex-col items-center text-center group">
                  
                  {/* Step Number Bubble */}
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-[#0a0a0c] border-2 border-white/10 rounded-full flex items-center justify-center text-xl md:text-2xl font-bold text-white shadow-[0_0_20px_rgba(0,0,0,0.5)] mb-4 md:mb-6 transition-all duration-500 group-hover:border-accent-500 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] group-hover:scale-110 relative">
                     <div className="absolute inset-0 bg-accent-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                     <span className="bg-gradient-to-br from-white to-gray-500 bg-clip-text text-transparent group-hover:text-accent-400 transition-colors">{step.number}</span>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-white mb-2 md:mb-3 group-hover:text-accent-300 transition-colors">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                  
                  {/* Mobile connector line */}
                  {idx < STEPS.length - 1 && (
                    <div className="md:hidden w-0.5 h-8 bg-gradient-to-b from-primary-500/50 to-transparent mt-6 mb-2"></div>
                  )}
                  
                </Reveal>
              ))}
            </div>
            
            {/* Call to action for next step */}
             <div className="text-center mt-12 md:mt-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700">
               <Button 
                variant="primary"
                onClick={() => window.open(WHATSAPP_LINK, '_blank')}
                icon={<Send className="w-4 h-4" />}
                className="shadow-lg shadow-accent-500/20"
               >
                 Começar o meu projeto
               </Button>
               <p className="text-xs text-gray-500 mt-3">Basta enviar os dados e nós tratamos do resto!</p>
             </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - Compacted Spacing */}
      <section id="pricing" className="py-12 md:py-24 relative bg-[#0c0c12] overflow-hidden">
        {/* Efeito de luz de fundo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] bg-gradient-to-b from-primary-900/5 via-accent-900/5 to-transparent opacity-50 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <Reveal variant="fade">
             <div className="text-center mb-12"> 
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Planos Transparentes</h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">Sem fidelização obrigatória. Escolha o ciclo que melhor se adapta ao seu negócio.</p>
            </div>

            {/* BILLING CYCLE TOGGLE */}
            <div className="flex justify-center mb-10 md:mb-16">
              <div className="bg-[#13131f] p-1 md:p-1.5 rounded-2xl border border-white/10 flex flex-wrap justify-center gap-1 sm:gap-2 relative z-20 shadow-2xl">
                
                {/* Monthly */}
                <button 
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-3 py-2 md:px-4 md:py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 ${
                    billingCycle === 'monthly' 
                    ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Mensal
                </button>

                {/* Quarterly */}
                <button 
                  onClick={() => setBillingCycle('quarterly')}
                  className={`px-3 py-2 md:px-4 md:py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 flex items-center gap-1.5 md:gap-2 ${
                    billingCycle === 'quarterly' 
                    ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Trimestral
                  <span className={`text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wider ${billingCycle === 'quarterly' ? 'bg-white/20 text-white' : 'bg-accent-500/20 text-accent-400'}`}>
                    -14%
                  </span>
                </button>

                {/* Annual */}
                <button 
                  onClick={() => setBillingCycle('annual')}
                  className={`px-3 py-2 md:px-4 md:py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 flex items-center gap-1.5 md:gap-2 ${
                    billingCycle === 'annual' 
                    ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Anual
                  <span className={`text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wider ${billingCycle === 'annual' ? 'bg-white/20 text-white' : 'bg-accent-500/20 text-accent-400'}`}>
                    -30%
                  </span>
                </button>
              </div>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto items-stretch pt-4 md:pt-8">
            {PLANS.map((plan, index) => {
              const currentPrice = plan.prices[billingCycle];
              
              return (
                <Reveal key={plan.id} delay={index * 200} variant="zoom" className="h-full">
                  <div 
                    className={`
                      relative rounded-3xl p-5 md:p-8 border backdrop-blur-xl transition-all duration-500 flex flex-col h-full group
                      ${plan.highlight 
                        ? 'bg-[#131226] border-primary-500/80 shadow-[0_0_60px_-10px_rgba(124,58,237,0.25)] md:-mt-8 md:-mb-8 z-10 scale-100 md:scale-105 hover:scale-[1.02] md:hover:scale-110 hover:shadow-[0_0_80px_-10px_rgba(139,92,246,0.5)] hover:border-primary-400' 
                        : 'bg-[#050505]/60 border-white/5 hover:border-white/20 hover:bg-white/[0.03] hover:shadow-lg'}
                    `}
                  >
                    {plan.highlight && (
                      <div className="absolute -top-4 md:-top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary-600 to-accent-500 text-white text-[10px] md:text-xs font-bold uppercase px-4 py-1.5 md:px-6 md:py-2 rounded-full tracking-wider shadow-xl shadow-primary-900/50 animate-pulse">
                        Recomendado
                      </div>
                    )}
                    
                    <div className="mb-6 text-center md:text-left">
                      <h3 className={`text-xl font-bold mb-3 ${plan.highlight ? 'text-accent-300' : 'text-white'}`}>{plan.name}</h3>
                      
                      {/* Price Display */}
                      <div className="flex items-end justify-center md:justify-start gap-1 mb-2">
                        <span className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-none">{currentPrice.amount}</span>
                        <span className="text-gray-500 font-medium mb-1">{currentPrice.label}</span>
                      </div>
                      
                      {/* Billed info */}
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">{currentPrice.billed}</p>
                      
                      {/* Savings Badge for non-monthly */}
                      {currentPrice.savings && (
                        <div className="inline-block bg-green-500/10 text-green-400 text-xs font-bold px-2 py-1 rounded border border-green-500/20 mt-1">
                          {currentPrice.savings}
                        </div>
                      )}

                      <p className="text-gray-400 text-sm mt-4 min-h-[40px] leading-relaxed border-t border-white/5 pt-4 text-left">{plan.headline}</p>
                    </div>

                    <ul className="space-y-3 mb-6 flex-1">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-300 group-hover:text-gray-200 transition-colors">
                          <div className={`mt-0.5 rounded-full p-0.5 shrink-0 ${plan.highlight ? 'bg-accent-500 text-white' : 'bg-white/10 text-gray-400'}`}>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Ideal For Section */}
                    {plan.idealFor && (
                      <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/5 text-left mt-auto">
                        <div className="flex items-center gap-2 mb-2 text-accent-400 text-xs font-bold uppercase tracking-wider">
                          <Target className="w-4 h-4" /> Ideal para:
                        </div>
                        <p className="text-xs text-gray-300 leading-relaxed italic">
                          "{plan.idealFor}"
                        </p>
                      </div>
                    )}

                    <Button 
                      variant={plan.highlight ? 'primary' : 'outline'} 
                      fullWidth
                      className={plan.highlight ? 'shadow-lg shadow-accent-500/20 py-3.5 text-base' : 'py-3'}
                      onClick={() => handleSubscribe(plan)}
                    >
                      {plan.cta}
                    </Button>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portfolio Section - Compacted Spacing */}
      <section id="portfolio" className="py-12 md:py-24 bg-[#020204] relative">
         <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-900/30 to-transparent"></div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <Reveal variant="up">
             <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Exemplos Reais</h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">Adaptamos o estilo, as cores e o conteúdo à identidade do seu negócio.</p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {PORTFOLIO.map((item, idx) => (
              <Reveal key={idx} delay={idx * 150} variant="up">
                <div className="group cursor-pointer rounded-2xl bg-[#0a0a0c] border border-white/5 overflow-hidden hover:border-accent-500/50 transition-all duration-500 hover:shadow-[0_0_40px_-10px_rgba(34,211,238,0.2)] hover:-translate-y-2">
                  <div className="h-48 md:h-52 overflow-hidden relative">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all z-10 duration-500"></div>
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute bottom-4 right-4 z-20 translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="bg-white text-black text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                        Ver demo <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                  <div className="p-5 md:p-6">
                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-accent-400 transition-colors">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* CTA STRATEGIC PLACEMENT 2 */}
          <Reveal variant="fade" delay={500} className="flex justify-center mt-12 md:mt-16">
            <Button 
              variant="primary" 
              onClick={() => window.open(WHATSAPP_LINK, '_blank')}
              icon={<Smartphone className="w-5 h-5" />}
              className="shadow-xl shadow-accent-500/20 px-8 py-3"
            >
              Quero um site profissional assim
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Testimonials - Compacted Spacing */}
      <section className="py-12 md:py-24 relative bg-gradient-to-b from-[#020204] to-[#0a0a0e] overflow-hidden">
        {/* Subtle glowing orbs */}
        <div className="absolute top-1/4 left-10 w-40 h-40 bg-primary-800/10 rounded-full blur-[80px]"></div>
        <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-accent-800/10 rounded-full blur-[80px]"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal variant="fade">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">O que dizem os clientes</h2>
            </div>
          </Reveal>
          
          <div className="grid md:grid-cols-3 gap-4 md:gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <Reveal key={t.id} delay={idx * 150} variant="up">
                <div className="bg-[#111116] border border-white/5 p-6 md:p-8 rounded-2xl hover:bg-[#16161e] transition-all duration-300 hover:border-primary-500/20 hover:-translate-y-2 hover:shadow-xl h-full flex flex-col">
                  <div className="flex gap-1 mb-4 md:mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-accent-500 fill-accent-500" />
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm mb-6 md:mb-8 italic leading-relaxed flex-1">"{t.text}"</p>
                  <div className="mt-auto flex items-center gap-4 border-t border-white/5 pt-4 md:pt-6">
                    <img 
                      src={t.imageUrl} 
                      alt={t.author} 
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-white/10"
                    />
                    <div>
                      <p className="font-bold text-white text-sm">{t.author}</p>
                      <p className="text-xs text-accent-400">{t.role}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ - Compacted Spacing */}
      <section className="py-12 md:py-24 bg-[#050508] relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
           <Reveal variant="up">
             <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Dúvidas Comuns</h2>
            </div>
          </Reveal>

          <div className="space-y-3 md:space-y-4">
            {FAQS.map((faq, idx) => (
              <Reveal key={idx} delay={idx * 100} variant="up">
                <div className="border border-white/5 rounded-2xl overflow-hidden bg-[#0a0a0c] transition-all duration-300 hover:border-accent-500/30">
                  <button 
                    className="w-full flex items-center justify-between p-5 md:p-6 text-left transition-colors focus:outline-none hover:bg-white/5"
                    onClick={() => toggleFaq(idx)}
                  >
                    <span className={`font-semibold transition-colors text-sm md:text-base ${openFaq === idx ? 'text-accent-400' : 'text-gray-200'}`}>{faq.question}</span>
                    {openFaq === idx ? <ChevronUp className="text-accent-500 flex-shrink-0" /> : <ChevronDown className="text-gray-600 flex-shrink-0" />}
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="p-5 md:p-6 pt-0 text-gray-400 text-sm leading-relaxed border-t border-white/5 mt-2 bg-black/20">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* CTA STRATEGIC PLACEMENT 3 */}
          <Reveal variant="fade" delay={300} className="text-center mt-12">
            <p className="text-gray-400 mb-4 text-sm">Não encontrou a resposta que procurava?</p>
            <Button 
              variant="outline" 
              onClick={() => window.open(WHATSAPP_LINK, '_blank')}
              icon={<MessageCircle className="w-4 h-4" />}
            >
              Falar com um especialista
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Final CTA - Compacted Spacing */}
      <section className="py-20 md:py-32 relative overflow-hidden flex items-center justify-center bg-[#020204]">
        {/* Background glow animated */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/10 to-accent-900/10 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-600/20 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-grid-moving opacity-[0.1]"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Reveal variant="zoom">
            <h2 className="text-3xl md:text-7xl font-bold mb-6 md:mb-8 text-white tracking-tight leading-tight">
              Vamos criar o seu site?
            </h2>
            <p className="text-lg md:text-xl text-gray-300 font-medium mb-8 md:mb-12 max-w-2xl mx-auto">
              Peça agora a sua pré-visualização gratuita. <br/>Sem custos, sem compromisso, sem risco.
            </p>
            
            <div className="flex flex-col items-center gap-6 md:gap-8">
              <Button 
                 className="text-base md:text-lg px-8 py-4 md:px-12 md:py-5 shadow-2xl shadow-accent-500/20 hover:shadow-accent-500/40 scale-100 md:scale-105 hover:scale-105 md:hover:scale-110 transition-transform duration-300 hover:ring-2 hover:ring-accent-400/50 w-full md:w-auto"
                 onClick={() => window.open(WHATSAPP_LINK, '_blank')}
                 icon={<Smartphone className="w-5 h-5 md:w-6 md:h-6" />}
              >
                Pedir pré-visualização gratuita
              </Button>
              
              <p className="text-xs md:text-sm text-gray-300 flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-4 md:mt-6 font-medium">
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> Resposta em minutos</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> Garantia de satisfação</span>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
             <img src="https://i.postimg.cc/qMJF7Zg3/LOGO.png" alt="Agência 777" className="h-16 md:h-20 w-auto opacity-90 transition-all duration-300" />
             <span className="text-gray-400 text-sm">© {new Date().getFullYear()} Agência 777.</span>
          </div>
          <div className="flex gap-4 md:gap-8 text-sm text-gray-400 flex-wrap justify-center">
            <button onClick={() => setTermsOpen(true)} className="hover:text-accent-400 transition-colors">Termos e Condições</button>
            <button onClick={() => setPrivacyOpen(true)} className="hover:text-accent-400 transition-colors">Política de Privacidade</button>
            <button onClick={() => window.open(WHATSAPP_LINK, '_blank')} className="hover:text-accent-400 transition-colors">Contactos</button>
          </div>
        </div>
      </footer>

      {/* Sticky Whatsapp Button */}
      <a 
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white p-3 md:p-4 rounded-full shadow-[0_0_30px_rgba(37,211,102,0.4)] hover:shadow-[0_0_40px_rgba(37,211,102,0.6)] transition-all duration-300 hover:scale-110 flex items-center justify-center animate-bounce-slow group border border-green-400/20"
        aria-label="Falar no WhatsApp"
      >
        <MessageCircle className="w-6 h-6 md:w-8 md:h-8 group-hover:rotate-12 transition-transform" />
      </a>
    </div>
  );
}

// Sub-componentes para limpeza do código

const NavButton = ({ onClick, children }: { onClick: () => void, children: React.ReactNode }) => (
  <button 
    onClick={onClick} 
    className="relative text-sm font-medium text-gray-300 hover:text-white transition-colors py-2 group overflow-hidden"
  >
    {children}
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-500 transition-all duration-300 group-hover:w-full"></span>
  </button>
);

// FeaturePill Atualizado: SOLID DARK BACKGROUND for High Contrast
const FeaturePill = ({ text }: { text: string }) => (
  <div className="flex items-center gap-2 bg-[#0f0f13] px-3 py-2 md:px-5 md:py-2.5 rounded-full border border-white/10 shadow-lg z-50 relative hover:border-accent-500/50 transition-all hover:scale-105">
     <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-accent-400" />
     <span className="text-gray-200 font-semibold tracking-wide text-xs md:text-base">{text}</span>
  </div>
);

const BenefitCard = ({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) => (
  <Reveal delay={delay} variant="zoom">
    <div 
      className="group bg-[#0a0a0c] p-5 md:p-8 rounded-3xl border border-white/5 hover:border-accent-500/40 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden h-full hover:shadow-[0_10px_40px_-10px_rgba(34,211,238,0.1)]"
    >
      {/* Glow Effect on Hover */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-600/10 rounded-full blur-3xl group-hover:bg-accent-600/20 transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
      
      <div className="mb-4 md:mb-6 bg-[#13131a] w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center border border-white/5 group-hover:scale-110 group-hover:bg-accent-600 group-hover:border-transparent transition-all duration-300 shadow-lg shadow-black/50 relative z-10">
        <div className="group-hover:text-white transition-colors duration-300 transform scale-90 md:scale-100">
          {icon}
        </div>
      </div>
      <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-white group-hover:text-accent-300 transition-colors relative z-10">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed relative z-10 group-hover:text-gray-300 transition-colors">{description}</p>
    </div>
  </Reveal>
);