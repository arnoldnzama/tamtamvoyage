
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Calendar, Car, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="hero-gradient pt-28 pb-20 md:pt-40 md:pb-32 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-6 text-white">
            TamtamVoyage
          </h1>
          <p className="text-xl text-[#f5f5f5]/80 font-inter mb-8">
            Découvrez des expériences uniques à vivre près de chez vous
          </p>
          <p className="text-lg text-[#f5f5f5]/70 font-inter mb-8">
            Des aventures locales, des moments inoubliables et des rencontres authentiques. Explorez notre sélection d'activités soigneusement choisies pour vous faire découvrir votre région autrement.
          </p>
          <div className="flex justify-center">
            <Link to="/reservation">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-6 py-3 rounded-md font-inter">
                {t('home.hero.book')}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Search form */}
      <div className="container mx-auto px-4 -mb-16 relative z-10">
        <div className="glass-card rounded-xl p-6 max-w-4xl mx-auto mt-12">
          <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="block text-[#f5f5f5]/80 text-sm font-medium font-inter">
                <Car className="inline-block mr-2 h-4 w-4" />
                {t('Type de véhicule')}
              </label>
              <select className="w-full bg-black/30 border border-white/20 rounded-md p-3 text-white font-inter">
                <option>Sélectionnez un véhicule</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="block text-[#f5f5f5]/80 text-sm font-medium font-inter">
                <Calendar className="inline-block mr-2 h-4 w-4" />
                {t('Date de début')}
              </label>
              <input type="date" className="w-full bg-black/30 border border-white/20 rounded-md p-3 text-white font-inter" />
            </div>
            
            <div className="space-y-2">
              <label className="block text-[#f5f5f5]/80 text-sm font-medium font-inter">
                <Calendar className="inline-block mr-2 h-4 w-4" />
                {t('Date de fin')}
              </label>
              <input type="date" className="w-full bg-black/30 border border-white/20 rounded-md p-3 text-white font-inter" />
            </div>
            
            <div className="md:col-span-3">
              <Link to="/reservation">
                <Button className="w-full bg-experience-primary hover:bg-experience-primary/90 text-black font-medium rounded-md p-3 font-inter transition-transform hover:scale-105 duration-300">
                  <Search className="mr-2 h-4 w-4" />
                  {t('Rechercher un véhicule')}
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
