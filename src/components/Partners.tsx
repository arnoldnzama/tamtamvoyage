
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

// Marques de voitures partenaires
const partners = [
  { name: 'Renault', logo: '/placeholder.svg' },
  { name: 'Peugeot', logo: '/placeholder.svg' },
  { name: 'Citroën', logo: '/placeholder.svg' },
  { name: 'Mercedes', logo: '/placeholder.svg' },
  { name: 'BMW', logo: '/placeholder.svg' },
  { name: 'Audi', logo: '/placeholder.svg' }
];

const Partners = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-experience-dark/95">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4 text-white">
            {t('Nos partenaires')}
          </h2>
          <p className="text-experience-light/80">
            {t('Nous travaillons avec les meilleurs pour vous offrir un service de qualité.')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {partners.map((partner, index) => (
            <div key={index} className="flex items-center justify-center">
              <div className="h-16 w-16 bg-white/10 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-white">{partner.name.charAt(0)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
