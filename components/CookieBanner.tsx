import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Cookie } from 'lucide-react';

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Delay pequeno para não aparecer imediatamente ao carregar
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-[60] p-4 animate-in slide-in-from-bottom-10 duration-500">
      <div className="max-w-5xl mx-auto bg-[#0f0f13]/90 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
        <div className="flex gap-4">
          <div className="p-3 bg-primary-900/20 rounded-xl border border-primary-500/20 hidden sm:block">
            <Cookie className="w-6 h-6 text-primary-400" />
          </div>
          <div>
            <h3 className="text-white font-bold mb-1">A sua privacidade importa</h3>
            <p className="text-sm text-gray-400 leading-relaxed max-w-2xl">
              Utilizamos cookies para melhorar a sua experiência de navegação, analisar o tráfego do site e personalizar conteúdos. 
              Ao continuar a navegar, concorda com a nossa política de privacidade.
            </p>
          </div>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button 
            variant="secondary" 
            className="flex-1 md:flex-none text-sm py-2 px-6"
            onClick={acceptCookies}
          >
            Recusar
          </Button>
          <Button 
            variant="primary" 
            className="flex-1 md:flex-none text-sm py-2 px-6 shadow-none"
            onClick={acceptCookies}
          >
            Aceitar Cookies
          </Button>
        </div>
      </div>
    </div>
  );
};