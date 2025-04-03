
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Star, Users, Fuel, GaugeCircle, Calendar } from 'lucide-react';

const cars = [
  {
    id: 1,
    name: 'Citroën C3',
    category: 'Économique',
    image: '/public/lovable-uploads/a4dc6bd3-2d64-4ca6-bb38-bbf3ece74a3f.png',
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
    category: 'Van',
    image: '/public/lovable-uploads/649c55c0-eaaf-4f22-a82c-b5e958ee916e.png',
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
    category: 'Berline',
    image: '/public/lovable-uploads/2bd8ee9a-4304-41f6-bdff-45ba60db59fe.png',
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
    category: 'SUV',
    image: '/public/lovable-uploads/d4d23797-c3c0-4e9a-a861-5922edb56ae7.png',
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
    category: 'Économique',
    image: '/public/lovable-uploads/40a7e7a9-5752-461f-aa22-bc76864b6cf8.png',
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
    <section className="py-24 bg-experience-dark">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-white">
            {t('Nos voitures populaires')}
          </h2>
          <p className="text-experience-light/80">
            {t('Découvrez notre sélection de véhicules les plus demandés par nos clients.')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map(car => (
            <div key={car.id} className="glass-card rounded-xl overflow-hidden">
              <div className="relative h-52 bg-white">
                <img src={car.image} alt={car.name} className="w-full h-full object-contain" />
                <div className="absolute top-3 left-3 bg-experience-primary text-black px-3 py-1 rounded-full text-sm font-medium">
                  {car.category}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-medium">{car.name}</h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-experience-primary text-experience-primary mr-1" />
                    <span>{car.rating}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 mr-2 text-experience-light/60" />
                    <span>{car.seats} sièges</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <GaugeCircle className="h-4 w-4 mr-2 text-experience-light/60" />
                    <span>{car.transmission}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Fuel className="h-4 w-4 mr-2 text-experience-light/60" />
                    <span>{car.fuel}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-experience-light/60" />
                    <span>{car.year}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold">{car.price}€</span>
                    <span className="text-experience-light/60 text-sm"> {t('par jour')}</span>
                  </div>
                  <Button className="bg-experience-primary hover:bg-experience-primary/90 text-black">
                    {t('Réserver')}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="border-white text-white hover:bg-white/10">
            {t('Voir tous les véhicules')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PopularCars;
