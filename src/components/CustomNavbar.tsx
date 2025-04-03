
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CustomNavbar = () => {
  const { t, language, setLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  return (
    <nav className="py-4 bg-experience-dark/95 backdrop-blur-md fixed w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <img 
                src="/public/lovable-uploads/47d0f654-c151-416d-a0b8-052c1a78c9f2.png" 
                alt="TamtamVoyage" 
                className="h-14"
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-experience-primary transition-colors">{t('Accueil')}</Link>
            <a href="#" className="text-white hover:text-experience-primary transition-colors">{t('Véhicules')}</a>
            <a href="#" className="text-white hover:text-experience-primary transition-colors">{t('À propos')}</a>
            <a href="#" className="text-white hover:text-experience-primary transition-colors">{t('Contact')}</a>
          </div>

          {/* Language and Mobile Menu Controls */}
          <div className="flex items-center space-x-4">
            <Button
              onClick={toggleLanguage}
              variant="ghost"
              className="text-white hover:text-experience-primary"
            >
              {language === 'fr' ? 'EN' : 'FR'}
            </Button>
            
            <Link to="/reservation">
              <Button 
                variant="outline" 
                className="hidden md:inline-flex border-experience-primary text-experience-primary hover:bg-experience-primary hover:text-white"
              >
                {t('Réserver')}
              </Button>
            </Link>
            
            <button className="md:hidden text-white" onClick={toggleMenu}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-white hover:text-experience-primary transition-colors">{t('Accueil')}</Link>
              <a href="#" className="text-white hover:text-experience-primary transition-colors">{t('Véhicules')}</a>
              <a href="#" className="text-white hover:text-experience-primary transition-colors">{t('À propos')}</a>
              <a href="#" className="text-white hover:text-experience-primary transition-colors">{t('Contact')}</a>
              <Link to="/reservation">
                <Button 
                  variant="outline" 
                  className="border-experience-primary text-experience-primary hover:bg-experience-primary hover:text-white w-full"
                >
                  {t('Réserver')}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default CustomNavbar;
