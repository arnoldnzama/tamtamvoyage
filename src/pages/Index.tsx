
import React from "react";
import CustomNavbar from "@/components/CustomNavbar";
import Hero from "@/components/Hero";
import PopularCars from "@/components/PopularCars";
import Partners from "@/components/Partners";
import WhyTamtamVoyage from "@/components/WhyTamtamVoyage";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

const Index = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-experience-dark">
      <CustomNavbar />
      <main>
        <Hero />
        
        {/* How it works section */}
        <section className="py-24 bg-experience-dark/95">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-white">
                {t('Comment ça marche')}
              </h2>
              <p className="text-experience-light/80">
                {t('Réserver une voiture n\'a jamais été aussi simple. Suivez ces quelques étapes et préparez-vous à vivre des moments inoubliables.')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="glass-card rounded-xl p-8 text-center relative">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-experience-primary text-black w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-medium mt-4 mb-3">{t('Explorez nos voitures')}</h3>
                <p className="text-experience-light/80">
                  {t('Parcourez notre sélection de véhicules et trouvez celui qui vous convient.')}
                </p>
              </div>
              
              {/* Step 2 */}
              <div className="glass-card rounded-xl p-8 text-center relative">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-experience-primary text-black w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-medium mt-4 mb-3">{t('Réservez en quelques clics')}</h3>
                <p className="text-experience-light/80">
                  {t('Choisissez vos dates, indiquez le nombre de participants et confirmez votre réservation.')}
                </p>
              </div>
              
              {/* Step 3 */}
              <div className="glass-card rounded-xl p-8 text-center relative">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-experience-primary text-black w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-medium mt-4 mb-3">{t('Profitez de votre voiture')}</h3>
                <p className="text-experience-light/80">
                  {t('Présentez-vous au lieu de rendez-vous et partez explorer à votre rythme.')}
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <PopularCars />
        
        <Partners />
        
        <WhyTamtamVoyage />
        
        {/* Testimonials section */}
        <section className="py-24 bg-gradient-to-b from-experience-dark/95 to-experience-dark">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-white">
                {t('Ce que nos clients disent')}
              </h2>
              <p className="text-experience-light/80">
                {t('Découvrez les témoignages de ceux qui ont déjà utilisé nos services.')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="glass-card rounded-xl p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-experience-primary flex items-center justify-center text-black">
                    SM
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-100">Sophie Martin</h4>
                    <p className="text-sm text-experience-light/80">Location de Renault Clio</p>
                  </div>
                </div>
                <p className="text-experience-light/80 italic">
                  "Service impeccable ! La voiture était propre et en parfait état. Je recommande vivement !"
                </p>
              </div>
              
              {/* Testimonial 2 */}
              <div className="glass-card rounded-xl p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-experience-primary flex items-center justify-center text-black">
                    TD
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-100">Thomas Durand</h4>
                    <p className="text-sm text-experience-light/80">Location de SUV Peugeot</p>
                  </div>
                </div>
                <p className="text-experience-light/80 italic">
                  "Le processus de réservation était très simple et le personnel était très serviable. La voiture était parfaite pour notre voyage en famille."
                </p>
              </div>
              
              {/* Testimonial 3 */}
              <div className="glass-card rounded-xl p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-experience-primary flex items-center justify-center text-black">
                    JM
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-100">Julie Moreau</h4>
                    <p className="text-sm text-experience-light/80">Location de berline Mercedes</p>
                  </div>
                </div>
                <p className="text-experience-light/80 italic">
                  "Un service de qualité supérieure. La voiture était élégante et confortable. J'utiliserai certainement ce service à nouveau lors de mon prochain voyage."
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
