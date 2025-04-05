
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

interface CarSelectionProps {
  cars: any[];
  selectedCar: string | null;
  onSelect: (carId: string) => void;
}

const CarSelection: React.FC<CarSelectionProps> = ({ 
  cars, 
  selectedCar, 
  onSelect 
}) => {
  const { t } = useLanguage();

  return (
    <div className="mt-8">
      <h3 className="text-xl font-medium mb-4 text-[#f5f5f5] font-playfair">
        {t('Sélectionnez un véhicule')}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cars.map((car) => (
          <div 
            key={car.id}
            className={`rounded-lg p-4 transition-all duration-300 cursor-pointer hover:scale-105 border ${selectedCar === car.id ? 'border-[#FF5A5F]' : 'border-white/10'}`}
            onClick={() => onSelect(car.id)}
          >
            <div className="bg-white p-2 rounded-lg mb-3">
              <img src={car.image} alt={car.name} className="h-32 w-full object-contain" />
            </div>
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-[#f5f5f5] font-inter">{car.name}</h4>
              <span className="text-[#FF5A5F] font-bold">{car.price}€ / {t('par jour')}</span>
            </div>
            <div className="flex mt-2 gap-2">
              <span className="bg-[#1A1F2C] text-[#f5f5f5]/80 text-xs px-2 py-1 rounded font-inter">
                {car.transmission}
              </span>
              <span className="bg-[#1A1F2C] text-[#f5f5f5]/80 text-xs px-2 py-1 rounded font-inter">
                {car.fuel}
              </span>
              <span className="bg-[#1A1F2C] text-[#f5f5f5]/80 text-xs px-2 py-1 rounded font-inter">
                {car.seats} places
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarSelection;
