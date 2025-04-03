
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
    'Réservation': 'Réservation',
    'Trouvez la voiture idéale pour votre prochain voyage': 'Trouvez la voiture idéale pour votre prochain voyage',
    'Trouver une voiture de location': 'Trouver une voiture de location',
    'Pays': 'Pays',
    'Sélectionnez un pays': 'Sélectionnez un pays',
    'Ville': 'Ville',
    'Sélectionnez une ville': 'Sélectionnez une ville',
    'Lieu de prise en charge': 'Lieu de prise en charge',
    'Adresse ou point de rencontre': 'Adresse ou point de rencontre',
    'Date de début': 'Date de début',
    'Sélectionner une date': 'Sélectionner une date',
    'Heure de début': 'Heure de début',
    'Date de fin': 'Date de fin',
    'Heure de fin': 'Heure de fin',
    'Nombre de participants': 'Nombre de participants',
    'Âge du conducteur': 'Âge du conducteur',
    'Rechercher des véhicules disponibles': 'Rechercher des véhicules disponibles',
    'Type de véhicule': 'Type de véhicule',
    'Toutes catégories': 'Toutes catégories',
    'Rechercher un véhicule': 'Rechercher un véhicule',
    'Prix': 'Prix',
    'Nom complet': 'Nom complet',
    'Téléphone': 'Téléphone',
    'Email': 'Email',
    'Sélectionnez une langue': 'Sélectionnez une langue',
    'Français': 'Français',
    'Anglais': 'Anglais',
    'Espagnol': 'Espagnol',
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
    'Réservation': 'Reservation',
    'Trouvez la voiture idéale pour votre prochain voyage': 'Find the ideal car for your next trip',
    'Trouver une voiture de location': 'Find a rental car',
    'Pays': 'Country',
    'Sélectionnez un pays': 'Select a country',
    'Ville': 'City',
    'Sélectionnez une ville': 'Select a city',
    'Lieu de prise en charge': 'Pick-up location',
    'Adresse ou point de rencontre': 'Address or meeting point',
    'Date de début': 'Start date',
    'Sélectionner une date': 'Select a date',
    'Heure de début': 'Start time',
    'Date de fin': 'End date',
    'Heure de fin': 'End time',
    'Nombre de participants': 'Number of participants',
    'Âge du conducteur': 'Driver age',
    'Rechercher des véhicules disponibles': 'Search for available vehicles',
    'Type de véhicule': 'Vehicle type',
    'Toutes catégories': 'All categories',
    'Rechercher un véhicule': 'Search for a vehicle',
    'Prix': 'Price',
    'Nom complet': 'Full name',
    'Téléphone': 'Phone',
    'Email': 'Email',
    'Sélectionnez une langue': 'Select a language',
    'Français': 'French',
    'Anglais': 'English',
    'Espagnol': 'Spanish',
  },
  es: {
    'home.hero.title': 'Alquiler de coches de calidad',
    'home.hero.subtitle': 'Descubra nuestra amplia selección de vehículos para todos sus desplazamientos',
    'home.hero.explore': 'Explorar nuestros vehículos',
    'home.hero.book': 'Reservar ahora',
    'Comment ça marche': 'Cómo funciona',
    'Réserver une voiture n\'a jamais été aussi simple. Suivez ces quelques étapes et préparez-vous à vivre des moments inoubliables.': 'Reservar un coche nunca ha sido tan fácil. Siga estos sencillos pasos y prepárese para vivir momentos inolvidables.',
    'Explorez nos voitures': 'Explore nuestros coches',
    'Parcourez notre sélection de véhicules et trouvez celui qui vous convient.': 'Explore nuestra selección de vehículos y encuentre el que más le convenga.',
    'Réservez en quelques clics': 'Reserve en pocos clics',
    'Choisissez vos dates, indiquez le nombre de participants et confirmez votre réservation.': 'Elija sus fechas, indique el número de participantes y confirme su reserva.',
    'Profitez de votre voiture': 'Disfrute de su coche',
    'Présentez-vous au lieu de rendez-vous et partez explorer à votre rythme.': 'Preséntese en el punto de encuentro y salga a explorar a su ritmo.',
    'Nos voitures populaires': 'Nuestros coches populares',
    'Découvrez notre sélection de véhicules les plus demandés par nos clients.': 'Descubra nuestra selección de vehículos más solicitados por nuestros clientes.',
    'Voir tous les véhicules': 'Ver todos los vehículos',
    'Nos partenaires': 'Nuestros socios',
    'Nous travaillons avec les meilleurs pour vous offrir un service de qualité.': 'Trabajamos con los mejores para ofrecerle un servicio de calidad.',
    'Pourquoi choisir TamtamVoyage': 'Por qué elegir TamtamVoyage',
    'Ce que nos clients disent': 'Lo que dicen nuestros clientes',
    'Découvrez les témoignages de ceux qui ont déjà utilisé nos services.': 'Descubra los testimonios de quienes ya han utilizado nuestros servicios.',
    'Service client 24/7': 'Servicio al cliente 24/7',
    'Prix compétitifs': 'Precios competitivos',
    'Véhicules récents': 'Vehículos recientes',
    'Annulation gratuite': 'Cancelación gratuita',
    'Accueil': 'Inicio',
    'Véhicules': 'Vehículos',
    'À propos': 'Acerca de',
    'Contact': 'Contacto',
    'par jour': 'por día',
    'Réserver': 'Reservar',
    'Réservation': 'Reserva',
    'Trouvez la voiture idéale pour votre prochain voyage': 'Encuentre el coche ideal para su próximo viaje',
    'Trouver une voiture de location': 'Encontrar un coche de alquiler',
    'Pays': 'País',
    'Sélectionnez un pays': 'Seleccione un país',
    'Ville': 'Ciudad',
    'Sélectionnez une ville': 'Seleccione una ciudad',
    'Lieu de prise en charge': 'Lugar de recogida',
    'Adresse ou point de rencontre': 'Dirección o punto de encuentro',
    'Date de début': 'Fecha de inicio',
    'Sélectionner une date': 'Seleccionar una fecha',
    'Heure de début': 'Hora de inicio',
    'Date de fin': 'Fecha de fin',
    'Heure de fin': 'Hora de fin',
    'Nombre de participants': 'Número de participantes',
    'Âge du conducteur': 'Edad del conductor',
    'Rechercher des véhicules disponibles': 'Buscar vehículos disponibles',
    'Type de véhicule': 'Tipo de vehículo',
    'Toutes catégories': 'Todas las categorías',
    'Rechercher un véhicule': 'Buscar un vehículo',
    'Prix': 'Precio',
    'Nom complet': 'Nombre completo',
    'Téléphone': 'Teléfono',
    'Email': 'Correo electrónico',
    'Sélectionnez une langue': 'Seleccione un idioma',
    'Français': 'Francés',
    'Anglais': 'Inglés',
    'Espagnol': 'Español',
  }
};

type Language = 'fr' | 'en' | 'es';
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
