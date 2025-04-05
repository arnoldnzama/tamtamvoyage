
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { Users } from "lucide-react";

interface LocationFieldsProps {
  form: UseFormReturn<any>;
  selectedCountry: string | null;
  availableCities: { value: string; label: string }[];
  handleCountryChange: (value: string) => void;
}

const LocationFields: React.FC<LocationFieldsProps> = ({
  form,
  selectedCountry,
  availableCities,
  handleCountryChange,
}) => {
  const { t } = useLanguage();
  
  const countries = [
    { value: "france", label: "France" },
    { value: "belgique", label: "Belgique" },
  ];

  return (
    <>
      {/* Pays */}
      <FormField
        control={form.control}
        name="country"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#f5f5f5] font-inter">{t('Pays')}</FormLabel>
            <Select 
              onValueChange={(value) => {
                field.onChange(value);
                handleCountryChange(value);
              }}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger className="bg-black/30 border-white/20 text-[#f5f5f5] font-inter">
                  <SelectValue placeholder={t('Sélectionnez un pays')} />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-[#1A1F2C] border-white/20">
                {countries.map((country) => (
                  <SelectItem 
                    key={country.value} 
                    value={country.value}
                    className="text-[#f5f5f5] hover:bg-white/10 font-inter"
                  >
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Ville */}
      <FormField
        control={form.control}
        name="city"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#f5f5f5] font-inter">{t('Ville')}</FormLabel>
            <Select 
              onValueChange={field.onChange}
              value={field.value}
              disabled={!selectedCountry}
            >
              <FormControl>
                <SelectTrigger className="bg-black/30 border-white/20 text-[#f5f5f5] font-inter">
                  <SelectValue placeholder={t('Sélectionnez une ville')} />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-[#1A1F2C] border-white/20">
                {availableCities.map((city) => (
                  <SelectItem 
                    key={city.value} 
                    value={city.value}
                    className="text-[#f5f5f5] hover:bg-white/10 font-inter"
                  >
                    {city.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Lieu de prise en charge */}
      <FormField
        control={form.control}
        name="pickupLocation"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#f5f5f5] font-inter">{t('Lieu de prise en charge')}</FormLabel>
            <FormControl>
              <Input 
                placeholder={t('Adresse ou point de rencontre')} 
                className="bg-black/30 border-white/20 text-[#f5f5f5] font-inter"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Nombre de participants */}
      <FormField
        control={form.control}
        name="participants"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#f5f5f5] font-inter">{t('Nombre de participants')}</FormLabel>
            <FormControl>
              <div className="flex items-center">
                <Users className="text-[#f5f5f5] mr-2" />
                <Input 
                  type="number" 
                  min={1} 
                  max={10}
                  className="bg-black/30 border-white/20 text-[#f5f5f5] font-inter"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default LocationFields;
