
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
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
              src="/public/lovable-uploads/af8a1637-7516-4d93-b2bf-40092ec1e07e.png" 
              alt="TamtamVoyage" 
              className="h-14 mb-4 max-w-full"
            />
            <p className="text-experience-light/70 mb-6">
              Location de véhicules de qualité pour tous vos besoins de déplacement. Découvrez notre flotte moderne et diversifiée.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-experience-light/70 hover:text-experience-primary">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-experience-light/70 hover:text-experience-primary">
                <Twitter size={20} />
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
