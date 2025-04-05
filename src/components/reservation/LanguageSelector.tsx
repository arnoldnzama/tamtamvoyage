
import React from "react";
import { Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LanguageSelector: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();

  return (
    <div className="flex justify-end mb-6">
      <div className="relative">
        <Select
          value={language}
          onValueChange={(value) => setLanguage(value as 'fr' | 'en' | 'es')}
        >
          <SelectTrigger className="w-[180px] bg-black/30 border-white/20 text-[#f5f5f5] font-inter">
            <Globe className="mr-2 h-4 w-4" />
            <SelectValue placeholder={t('Sélectionnez une langue')} />
          </SelectTrigger>
          <SelectContent className="bg-[#1A1F2C] border-white/20">
            <SelectItem value="fr" className="text-[#f5f5f5] hover:bg-white/10">
              {t('Français')}
            </SelectItem>
            <SelectItem value="en" className="text-[#f5f5f5] hover:bg-white/10">
              {t('Anglais')}
            </SelectItem>
            <SelectItem value="es" className="text-[#f5f5f5] hover:bg-white/10">
              {t('Espagnol')}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default LanguageSelector;
