
import React from 'react';
import CustomNavbar from '@/components/CustomNavbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-experience-dark">
      <CustomNavbar />
      
      {/* Hero Banner */}
      <div 
        className="pt-32 pb-20 relative" 
        style={{
          backgroundImage: "linear-gradient(rgba(18, 18, 18, 0.7), rgba(18, 18, 18, 0.8)), url('/placeholder.svg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-6">À propos de TamtamVoyage</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Découvrez notre histoire, notre mission et les valeurs qui nous animent au quotidien.
          </p>
        </div>
      </div>
      
      {/* Notre histoire */}
      <section className="py-16 bg-experience-dark/95">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-playfair font-bold text-white mb-8 text-center">Notre histoire</h2>
            <div className="glass-card rounded-xl p-8 md:p-10">
              <p className="text-experience-light/90 mb-6 leading-relaxed">
                Fondée en 2020 à Paris, TamtamVoyage est née d'une vision simple : rendre la location de voitures accessible, transparente et agréable. Notre fondateur, après des années d'expérience dans le tourisme et la mobilité, a constaté que le secteur de la location de véhicules était souvent source de frustration pour les clients. Trop de paperasse, des frais cachés et un service client défaillant étaient monnaie courante.
              </p>
              <p className="text-experience-light/90 leading-relaxed">
                Il a donc décidé de créer une alternative centrée sur la satisfaction client et la simplicité. Aujourd'hui, TamtamVoyage est présent dans plus de 50 villes à travers la France, la Belgique et l'Espagne, et continue de grandir avec le même engagement pour l'excellence et la transparence.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Notre mission */}
      <section className="py-16 bg-experience-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-playfair font-bold text-white mb-8 text-center">Notre mission</h2>
            <div className="glass-card rounded-xl p-8 md:p-10">
              <p className="text-experience-light/90 leading-relaxed">
                Chez TamtamVoyage, notre mission est de vous offrir une expérience de location de voiture sans tracas, vous permettant de vous concentrer sur ce qui compte vraiment : vivre pleinement chaque moment de votre voyage. Nous croyons qu'une voiture n'est pas simplement un moyen de transport, mais la clé pour découvrir des lieux extraordinaires et créer des souvenirs inoubliables.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Nos valeurs */}
      <section className="py-16 bg-experience-dark/95">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-playfair font-bold text-white mb-12 text-center">Nos valeurs</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="glass-card rounded-xl p-8">
              <h3 className="text-xl font-bold text-experience-primary mb-4">Transparence</h3>
              <p className="text-experience-light/90">
                Pas de frais cachés. Pas de surprises désagréables. Chez TamtamVoyage, ce que vous voyez est ce que vous payez.
              </p>
            </div>
            
            <div className="glass-card rounded-xl p-8">
              <h3 className="text-xl font-bold text-experience-primary mb-4">Qualité</h3>
              <p className="text-experience-light/90">
                Notre flotte est composée exclusivement de véhicules récents, régulièrement entretenus et nettoyés, pour vous garantir confort et sécurité.
              </p>
            </div>
            
            <div className="glass-card rounded-xl p-8">
              <h3 className="text-xl font-bold text-experience-primary mb-4">Service client</h3>
              <p className="text-experience-light/90">
                Notre équipe dédiée est disponible 7j/7 pour répondre à vos questions et vous assister en cas de besoin.
              </p>
            </div>
            
            <div className="glass-card rounded-xl p-8">
              <h3 className="text-xl font-bold text-experience-primary mb-4">Durabilité</h3>
              <p className="text-experience-light/90">
                Nous investissons continuellement dans des véhicules hybrides et électriques pour réduire notre empreinte environnementale.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Notre équipe */}
      <section className="py-16 bg-experience-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-playfair font-bold text-white mb-8 text-center">Notre équipe</h2>
            <div className="glass-card rounded-xl p-8 md:p-10">
              <p className="text-experience-light/90 leading-relaxed">
                Derrière TamtamVoyage, il y a une équipe passionnée et dévouée de professionnels du tourisme, de la technologie et du service client. Chaque membre apporte son expertise unique pour vous offrir la meilleure expérience possible. Notre équipe multiculturelle et multilingue est prête à vous accueillir et à vous servir dans votre langue, où que vous soyez.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;
