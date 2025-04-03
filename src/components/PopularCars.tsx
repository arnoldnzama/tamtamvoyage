
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Star, Users, Fuel, GaugeCircle, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const cars = [
  {
    id: 1,
    name: 'Citroën C3',
    image: '/public/lovable-uploads/eb25b91c-070d-4643-91d0-a3454461db37.png',
    price: 29,
    rating: 4.8,
    seats: 5,
    transmission: 'Manuelle',
    fuel: 'Essence',
    year: 2022
  },
  {
    id: 2,
    name: 'Mercedes V-Class',
    image: '/public/lovable-uploads/074ec851-1b61-4d75-817c-f7c392000189.png',
    price: 89,
    rating: 4.9,
    seats: 8,
    transmission: 'Automatique',
    fuel: 'Diesel',
    year: 2023
  },
  {
    id: 3,
    name: 'Opel Insignia',
    image: '/public/lovable-uploads/deb5a7eb-0ee5-4335-be49-f123ad4ad536.png',
    price: 49,
    rating: 4.7,
    seats: 5,
    transmission: 'Automatique',
    fuel: 'Diesel',
    year: 2021
  },
  {
    id: 4,
    name: 'Peugeot 3008',
    image: '/public/lovable-uploads/0f2c488c-cc17-4ee2-b3d5-8f924230f9a3.png',
    price: 59,
    rating: 4.9,
    seats: 5,
    transmission: 'Automatique',
    fuel: 'Hybride',
    year: 2023
  },
  {
    id: 5,
    name: 'Renault Clio',
    image: '/public/lovable-uploads/39b4cfae-75b6-4e30-a061-4b29380fdace.png',
    price: 25,
    rating: 4.6,
    seats: 5,
    transmission: 'Manuelle',
    fuel: 'Essence',
    year: 2022
  }
];

const PopularCars = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-[#121212]">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-[#f5f5f5]">
            {t('Nos voitures populaires')}
          </h2>
          <p className="text-[#f5f5f5]/80 font-inter">
            {t('Découvrez notre sélection de véhicules les plus demandés par nos clients.')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map(car => (
            <div key={car.id} className="glass-card rounded-xl overflow-hidden transition-transform hover:scale-105 duration-300">
              <div className="relative h-52 bg-white">
                <img src={car.image} alt={car.name} className="w-full h-full object-contain" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-medium font-playfair">{car.name}</h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-experience-secondary text-experience-secondary mr-1" />
                    <span className="font-inter">{car.rating}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center text-sm font-inter">
                    <Users className="h-4 w-4 mr-2 text-[#f5f5f5]/60" />
                    <span>{car.seats} sièges</span>
                  </div>
                  <div className="flex items-center text-sm font-inter">
                    <GaugeCircle className="h-4 w-4 mr-2 text-[#f5f5f5]/60" />
                    <span>{car.transmission}</span>
                  </div>
                  <div className="flex items-center text-sm font-inter">
                    <Fuel className="h-4 w-4 mr-2 text-[#f5f5f5]/60" />
                    <span>{car.fuel}</span>
                  </div>
                  <div className="flex items-center text-sm font-inter">
                    <Calendar className="h-4 w-4 mr-2 text-[#f5f5f5]/60" />
                    <span>{car.year}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold font-inter">{car.price}€</span>
                    <span className="text-[#f5f5f5]/60 text-sm font-inter"> {t('par jour')}</span>
                  </div>
                  <Link to="/reservation">
                    <Button className="bg-experience-primary hover:bg-experience-primary/90 text-[#f5f5f5] font-inter">
                      {t('Réserver')}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/reservation">
            <Button variant="outline" className="border-experience-primary text-experience-primary hover:bg-experience-primary hover:text-white transition-transform hover:scale-105 duration-300 font-inter">
              {t('Voir tous les véhicules')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularCars;
