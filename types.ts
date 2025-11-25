import React from 'react';

export interface PriceDetail {
  amount: string; // Ex: "13,25€" (valor mostrado grande)
  label: string;  // Ex: "/mês"
  billed: string; // Ex: "159€ cobrado anualmente"
  savings?: string; // Ex: "Poupe 30%"
  stripeLink?: string; // URL do Stripe Payment Link
}

export interface PricingPlan {
  id: string;
  name: string;
  prices: {
    monthly: PriceDetail;
    quarterly: PriceDetail;
    annual: PriceDetail;
  };
  headline: string;
  features: string[];
  cta: string;
  highlight?: boolean;
  idealFor?: string; // Descrição do público-alvo
}

export interface Testimonial {
  id: number;
  text: string;
  author: string;
  role: string;
  imageUrl: string; // Foto do cliente
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PortfolioItem {
  title: string;
  description: string;
  imageUrl: string;
}

export interface Step {
  number: string;
  title: string;
  description: string;
}

export interface Benefit {
  title: string;
  description: string;
  icon: React.ElementType;
}