
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Clock, DollarSign, Car, Ban } from 'lucide-react';

const features = [
  {
    icon: <Clock className="h-8 w-8 text-experience-primary" />,
    title: 'Service client 24/7',
    description: 'Notre équipe est disponible jour et nuit pour répondre à vos questions et vous assister.'
  },
  {
    icon: <DollarSign className="h-8 w-8 text-experience-primary" />,
    title: 'Prix compétitifs',
    description: 'Nous proposons les meilleurs tarifs du marché, avec des offres adaptées à tous les budgets.'
  },
  {
    icon: <Car className="h-8 w-8 text-experience-primary" />,
    title: 'Véhicules récents',
    description: 'Notre flotte est constamment renouvelée pour vous offrir des véhicules de qualité et fiables.'
  },
  {
    icon: <Ban className="h-8 w-8 text-experience-primary" />,
    title: 'Annulation gratuite',
    description: 'Annulez ou modifiez votre réservation jusqu\'à 24h avant le début de votre location sans frais.'
  }
];

const WhyTamtamVoyage = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-gradient-to-b from-experience-dark to-experience-dark/95">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-white">
            {t('Pourquoi choisir TamtamVoyage')}
          </h2>
          <p className="text-experience-light/80">
            Nous mettons tout en œuvre pour que votre expérience de location soit simple, agréable et sans souci.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="glass-card rounded-xl p-8 text-center">
              <div className="inline-flex items-center justify-center bg-white/10 rounded-full p-4 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium mb-3">{t(feature.title)}</h3>
              <p className="text-experience-light/80">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyTamtamVoyage;
