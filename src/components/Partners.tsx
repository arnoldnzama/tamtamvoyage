
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

// Hôtels partenaires
const partners = [
  { name: 'Marriott Hotels', logo: '/placeholder.svg', description: 'Chaîne hôtelière internationale de luxe' },
  { name: 'Hilton Hotels', logo: '/placeholder.svg', description: 'Réseau mondial d\'hôtels et resorts' },
  { name: 'Accor Hotels', logo: '/placeholder.svg', description: 'Groupe hôtelier français leader en Europe' },
  { name: 'Holiday Inn', logo: '/placeholder.svg', description: 'Chaîne d\'hôtels abordables et confortables' },
  { name: 'Novotel', logo: '/placeholder.svg', description: 'Hôtels milieu de gamme pour voyageurs d\'affaires' },
  { name: 'Radisson Blu', logo: '/placeholder.svg', description: 'Hôtels de luxe avec services premium' }
];

const Partners = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visiblePartners, setVisiblePartners] = useState<typeof partners>([]);
  
  // Détermine le nombre d'éléments à afficher en fonction de la taille de l'écran
  const getVisibleCount = () => {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };
  
  useEffect(() => {
    const handleResize = () => {
      updateVisiblePartners(getVisibleCount());
    };
    
    window.addEventListener('resize', handleResize);
    updateVisiblePartners(getVisibleCount());
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const updateVisiblePartners = (count: number) => {
    const newVisiblePartners = [];
    for (let i = 0; i < count; i++) {
      const index = (currentIndex + i) % partners.length;
      newVisiblePartners.push(partners[index]);
    }
    setVisiblePartners(newVisiblePartners);
  };
  
  const handlePrev = () => {
    const newIndex = (currentIndex - 1 + partners.length) % partners.length;
    setCurrentIndex(newIndex);
    updateVisiblePartners(getVisibleCount());
  };
  
  const handleNext = () => {
    const newIndex = (currentIndex + 1) % partners.length;
    setCurrentIndex(newIndex);
    updateVisiblePartners(getVisibleCount());
  };

  return (
    <section className="py-16 bg-experience-dark/95">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4 text-white">
            {t('Nos partenaires hôteliers')}
          </h2>
          <p className="text-experience-light/80">
            {t('Nous collaborons avec les meilleurs établissements pour vous offrir des tarifs préférentiels lors de vos séjours.')}
          </p>
        </div>

        <div className="relative">
          <div className="flex justify-between items-center gap-8 px-10">
            <button 
              onClick={handlePrev}
              className="absolute left-0 z-10 p-2 rounded-full bg-experience-primary/20 hover:bg-experience-primary/50 text-white transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className="flex flex-1 justify-center gap-8 overflow-hidden">
              {visiblePartners.map((partner, index) => (
                <div key={index} className="glass-card rounded-xl p-6 text-center w-full md:w-64 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="h-16 w-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-white">{partner.name.charAt(0)}</span>
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">{partner.name}</h3>
                  <p className="text-sm text-experience-light/80">{partner.description}</p>
                </div>
              ))}
            </div>
            
            <button 
              onClick={handleNext}
              className="absolute right-0 z-10 p-2 rounded-full bg-experience-primary/20 hover:bg-experience-primary/50 text-white transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
