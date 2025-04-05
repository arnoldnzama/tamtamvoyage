
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { User, Phone, Mail } from "lucide-react";

interface PersonalInfoFieldsProps {
  form: UseFormReturn<any>;
}

const PersonalInfoFields: React.FC<PersonalInfoFieldsProps> = ({ form }) => {
  const { t } = useLanguage();

  return (
    <>
      {/* Nom complet */}
      <FormField
        control={form.control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#f5f5f5] font-inter">{t('Nom complet')}</FormLabel>
            <FormControl>
              <div className="flex items-center">
                <User className="text-[#f5f5f5] mr-2" />
                <Input 
                  className="bg-black/30 border-white/20 text-[#f5f5f5] font-inter"
                  {...field}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Téléphone */}
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#f5f5f5] font-inter">{t('Téléphone')}</FormLabel>
            <FormControl>
              <div className="flex items-center">
                <Phone className="text-[#f5f5f5] mr-2" />
                <Input 
                  className="bg-black/30 border-white/20 text-[#f5f5f5] font-inter"
                  {...field}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Email */}
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#f5f5f5] font-inter">{t('Email')}</FormLabel>
            <FormControl>
              <div className="flex items-center">
                <Mail className="text-[#f5f5f5] mr-2" />
                <Input 
                  type="email"
                  className="bg-black/30 border-white/20 text-[#f5f5f5] font-inter"
                  {...field}
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

export default PersonalInfoFields;
