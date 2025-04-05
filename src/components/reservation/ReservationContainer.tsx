
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSelector from "./LanguageSelector";
import ReservationForm from "./ReservationForm";

// Cars data with updated images
const cars = [
  {
    id: "citroen-c3",
    name: "Citroën C3",
    category: "Économique",
    image: "/public/lovable-uploads/b033696d-4eb2-4eb3-b601-2306188f23e3.png",
    price: 29,
    rating: 4.8,
    seats: 5,
    transmission: "Manuelle",
    fuel: "Essence",
    year: 2022
  },
  {
    id: "mercedes-v",
    name: "Mercedes V-Class",
    category: "Van",
    image: "/public/lovable-uploads/56cbfb0e-d9c4-4825-b262-98f78d8c49bc.png",
    price: 89,
    rating: 4.9,
    seats: 8,
    transmission: "Automatique",
    fuel: "Diesel",
    year: 2023
  },
  {
    id: "opel-insignia",
    name: "Opel Insignia",
    category: "Berline",
    image: "/public/lovable-uploads/24777eab-759d-4fa6-b797-327e1a8751f5.png",
    price: 49,
    rating: 4.7,
    seats: 5,
    transmission: "Automatique",
    fuel: "Diesel",
    year: 2021
  },
  {
    id: "peugeot-3008",
    name: "Peugeot 3008",
    category: "SUV",
    image: "/public/lovable-uploads/1c1d840c-cd92-4a29-887c-73bd43b8b6e5.png",
    price: 59,
    rating: 4.9,
    seats: 5,
    transmission: "Automatique",
    fuel: "Hybride",
    year: 2023
  },
  {
    id: "renault-clio",
    name: "Renault Clio",
    category: "Économique",
    image: "/public/lovable-uploads/760b7a91-7066-4718-97db-46e3d93ce3b4.png",
    price: 25,
    rating: 4.6,
    seats: 5,
    transmission: "Manuelle",
    fuel: "Essence",
    year: 2022
  }
];

const ReservationContainer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto bg-[#1A1F2C]/90 rounded-xl p-8 glass-card">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-playfair font-bold mb-2 text-[#f5f5f5]">
          {t('Réservation')}
        </h1>
        <p className="text-[#f5f5f5]/80 font-inter">
          {t('Trouvez la voiture idéale pour votre prochain voyage')}
        </p>
      </div>

      <LanguageSelector />
      <ReservationForm cars={cars} />
    </div>
  );
};

export default ReservationContainer;
