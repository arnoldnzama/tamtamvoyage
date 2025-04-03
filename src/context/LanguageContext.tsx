
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Définition des traductions
const translations = {
  fr: {
    'home.hero.title': 'Location de voitures de qualité',
    'home.hero.subtitle': 'Découvrez notre large sélection de véhicules pour tous vos déplacements',
    'home.hero.explore': 'Explorer nos véhicules',
    'home.hero.book': 'Réserver maintenant',
    'Comment ça marche': 'Comment ça marche',
    'Réserver une voiture n\'a jamais été aussi simple. Suivez ces quelques étapes et préparez-vous à vivre des moments inoubliables.': 'Réserver une voiture n\'a jamais été aussi simple. Suivez ces quelques étapes et préparez-vous à vivre des moments inoubliables.',
    'Explorez nos voitures': 'Explorez nos voitures',
    'Parcourez notre sélection de véhicules et trouvez celui qui vous convient.': 'Parcourez notre sélection de véhicules et trouvez celui qui vous convient.',
    'Réservez en quelques clics': 'Réservez en quelques clics',
    'Choisissez vos dates, indiquez le nombre de participants et confirmez votre réservation.': 'Choisissez vos dates, indiquez le nombre de participants et confirmez votre réservation.',
    'Profitez de votre voiture': 'Profitez de votre voiture',
    'Présentez-vous au lieu de rendez-vous et partez explorer à votre rythme.': 'Présentez-vous au lieu de rendez-vous et partez explorer à votre rythme.',
    'Nos voitures populaires': 'Nos voitures populaires',
    'Découvrez notre sélection de véhicules les plus demandés par nos clients.': 'Découvrez notre sélection de véhicules les plus demandés par nos clients.',
    'Voir tous les véhicules': 'Voir tous les véhicules',
    'Nos partenaires': 'Nos partenaires',
    'Nous travaillons avec les meilleurs pour vous offrir un service de qualité.': 'Nous travaillons avec les meilleurs pour vous offrir un service de qualité.',
    'Pourquoi choisir TamtamVoyage': 'Pourquoi choisir TamtamVoyage',
    'Ce que nos clients disent': 'Ce que nos clients disent',
    'Découvrez les témoignages de ceux qui ont déjà utilisé nos services.': 'Découvrez les témoignages de ceux qui ont déjà utilisé nos services.',
    'Service client 24/7': 'Service client 24/7',
    'Prix compétitifs': 'Prix compétitifs',
    'Véhicules récents': 'Véhicules récents',
    'Annulation gratuite': 'Annulation gratuite',
    'Accueil': 'Accueil',
    'Véhicules': 'Véhicules',
    'À propos': 'À propos',
    'Contact': 'Contact',
    'par jour': 'par jour',
    'Réserver': 'Réserver',
  },
  en: {
    'home.hero.title': 'Quality Car Rental',
    'home.hero.subtitle': 'Discover our wide selection of vehicles for all your journeys',
    'home.hero.explore': 'Explore our vehicles',
    'home.hero.book': 'Book now',
    'Comment ça marche': 'How it works',
    'Réserver une voiture n\'a jamais été aussi simple. Suivez ces quelques étapes et préparez-vous à vivre des moments inoubliables.': 'Booking a car has never been easier. Follow these simple steps and get ready for unforgettable moments.',
    'Explorez nos voitures': 'Explore our cars',
    'Parcourez notre sélection de véhicules et trouvez celui qui vous convient.': 'Browse our selection of vehicles and find the one that suits you.',
    'Réservez en quelques clics': 'Book in a few clicks',
    'Choisissez vos dates, indiquez le nombre de participants et confirmez votre réservation.': 'Choose your dates, specify the number of participants and confirm your reservation.',
    'Profitez de votre voiture': 'Enjoy your car',
    'Présentez-vous au lieu de rendez-vous et partez explorer à votre rythme.': 'Show up at the meeting point and start exploring at your own pace.',
    'Nos voitures populaires': 'Our popular cars',
    'Découvrez notre sélection de véhicules les plus demandés par nos clients.': 'Discover our selection of vehicles most requested by our customers.',
    'Voir tous les véhicules': 'View all vehicles',
    'Nos partenaires': 'Our partners',
    'Nous travaillons avec les meilleurs pour vous offrir un service de qualité.': 'We work with the best to offer you quality service.',
    'Pourquoi choisir TamtamVoyage': 'Why choose TamtamVoyage',
    'Ce que nos clients disent': 'What our customers say',
    'Découvrez les témoignages de ceux qui ont déjà utilisé nos services.': 'Discover testimonials from those who have already used our services.',
    'Service client 24/7': '24/7 Customer Service',
    'Prix compétitifs': 'Competitive Prices',
    'Véhicules récents': 'Recent Vehicles',
    'Annulation gratuite': 'Free Cancellation',
    'Accueil': 'Home',
    'Véhicules': 'Vehicles',
    'À propos': 'About',
    'Contact': 'Contact',
    'par jour': 'per day',
    'Réserver': 'Book',
  }
};

type Language = 'fr' | 'en';
type TranslationKey = keyof typeof translations.fr;

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    return (translations[language] as Record<string, string>)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
