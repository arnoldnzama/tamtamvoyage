
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Instagram, Mail, Phone, MapPin, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-experience-dark pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <img 
              src="/public/lovable-uploads/ba0c5184-6267-4ef1-8142-7f6914d7e9fc.png" 
              alt="TamtamVoyage" 
              className="h-14 mb-4 max-w-full"
            />
            <p className="text-experience-light/70 mb-6">
              Location de véhicules de qualité pour tous vos besoins de déplacement. Découvrez notre flotte moderne et diversifiée.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-experience-light/70 hover:text-experience-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
                </svg>
              </a>
              <a href="#" className="text-experience-light/70 hover:text-experience-primary">
                <Youtube size={20} color="#0dbb00" />
              </a>
              <a href="#" className="text-experience-light/70 hover:text-experience-primary">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-medium mb-6">Liens rapides</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-experience-light/70 hover:text-experience-primary transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-experience-light/70 hover:text-experience-primary transition-colors">
                  À propos de nous
                </Link>
              </li>
              <li>
                <Link to="/reservation" className="text-experience-light/70 hover:text-experience-primary transition-colors">
                  Réservation
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-experience-light/70 hover:text-experience-primary transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white text-lg font-medium mb-6">Nos services</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-experience-light/70 hover:text-experience-primary transition-colors">
                  Location courte durée
                </a>
              </li>
              <li>
                <a href="#" className="text-experience-light/70 hover:text-experience-primary transition-colors">
                  Location longue durée
                </a>
              </li>
              <li>
                <a href="#" className="text-experience-light/70 hover:text-experience-primary transition-colors">
                  Location avec chauffeur
                </a>
              </li>
              <li>
                <a href="#" className="text-experience-light/70 hover:text-experience-primary transition-colors">
                  Transport d'entreprise
                </a>
              </li>
              <li>
                <a href="#" className="text-experience-light/70 hover:text-experience-primary transition-colors">
                  Événements spéciaux
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-lg font-medium mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-experience-primary mr-3 mt-0.5" />
                <span className="text-experience-light/70">
                  123 Rue de la République<br />75001 Paris, France
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-experience-primary mr-3" />
                <a href="tel:+33123456789" className="text-experience-light/70 hover:text-experience-primary">
                  +33 1 23 45 67 89
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-experience-primary mr-3" />
                <a href="mailto:contact@tamtamvoyage.com" className="text-experience-light/70 hover:text-experience-primary">
                  contact@tamtamvoyage.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-experience-light/60">
          <p>&copy; {currentYear} TamtamVoyage. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
