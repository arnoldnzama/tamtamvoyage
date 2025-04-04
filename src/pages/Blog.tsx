
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import CustomNavbar from '@/components/CustomNavbar';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet';

interface VideoProps {
  id: string;
  title: string;
  description: string;
}

const videos: VideoProps[] = [
  {
    id: "yQ0ywMdjMYY",
    title: "Découvrez la nouvelle Citroën C3",
    description: "Notre client partage son expérience avec la nouvelle Citroën C3, un véhicule compact idéal pour la ville."
  },
  {
    id: "G-lXZfW-LL0",
    title: "Roadtrip avec la Mercedes V-Class",
    description: "Une famille nous raconte son voyage en Mercedes V-Class à travers les magnifiques paysages de la France."
  },
  {
    id: "C76OJh8DpZo",
    title: "L'Opel Insignia sur autoroute",
    description: "Un client d'affaires partage son expérience avec l'Opel Insignia lors de ses déplacements professionnels."
  },
  {
    id: "uE6v8x_Im3w",
    title: "Test de la Peugeot 3008",
    description: "Découvrez les impressions d'un client sur le confort et les performances du SUV Peugeot 3008."
  },
  {
    id: "4Yh31WML_HQ",
    title: "La Renault Clio en milieu urbain",
    description: "Une étudiante nous montre comment la Renault Clio s'adapte parfaitement à son quotidien en ville."
  }
];

const VideoCard: React.FC<VideoProps> = ({ id, title, description }) => {
  return (
    <div className="video-card bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden transition-all hover:scale-101 hover:shadow-xl duration-300">
      <div className="aspect-video w-full">
        <iframe 
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${id}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        ></iframe>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-medium font-playfair text-white mb-2">{title}</h3>
        <p className="text-white/70 font-inter">{description}</p>
      </div>
    </div>
  );
};

const Blog = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-experience-dark">
      <Helmet>
        <title>Blog | TamtamVoyage</title>
      </Helmet>
      <CustomNavbar />
      
      <main className="pt-32 pb-24">
        <section className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-6 text-white">
              {t('Blog TamtamVoyage')}
            </h1>
            <p className="text-white/80 text-lg font-inter">
              {t('Découvrez les témoignages vidéo de nos clients et leurs expériences avec nos véhicules.')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeIn">
            {videos.map((video, index) => (
              <VideoCard 
                key={video.id} 
                id={video.id} 
                title={video.title} 
                description={video.description} 
              />
            ))}
          </div>
        </section>
        
        <section className="container mx-auto px-4 mt-20">
          <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-6 text-white">
              {t('Partagez votre expérience')}
            </h2>
            <p className="text-white/80 font-inter mb-8">
              {t('Vous avez récemment loué un véhicule chez TamtamVoyage ? Partagez votre expérience en vidéo et elle pourrait être présentée sur notre blog !')}
            </p>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                <h3 className="text-xl font-medium font-playfair text-white mb-4">Comment participer</h3>
                <ol className="text-white/80 font-inter space-y-3 list-decimal list-inside">
                  <li>Filmez une courte vidéo (2-3 minutes) de votre expérience</li>
                  <li>Publiez-la sur YouTube avec le hashtag #TamtamVoyageExperience</li>
                  <li>Envoyez-nous le lien via notre formulaire de contact</li>
                  <li>Nous examinerons votre vidéo et pourrons la présenter sur notre blog</li>
                </ol>
              </div>
              
              <div className="flex-1 bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                <h3 className="text-xl font-medium font-playfair text-white mb-4">Ce que nous recherchons</h3>
                <ul className="text-white/80 font-inter space-y-3 list-disc list-inside">
                  <li>Des témoignages authentiques sur votre expérience</li>
                  <li>Des avis sur le confort, la performance et la facilité d'utilisation</li>
                  <li>Des recommandations pour d'autres clients</li>
                  <li>Des images des lieux que vous avez visités avec votre véhicule</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      <style>
        {`
        @keyframes pulse-border {
          0% {
            box-shadow: 0 0 0 0 rgba(13, 187, 0, 0.4);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(13, 187, 0, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(13, 187, 0, 0);
          }
        }
        
        .video-card {
          animation: pulse-border 2s infinite;
        }
        
        .video-card:hover {
          animation: none;
          box-shadow: 0 0 15px rgba(13, 187, 0, 0.6);
        }
        `}
      </style>
    </div>
  );
};

export default Blog;
