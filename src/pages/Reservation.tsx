
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon, Clock, Car, Users } from "lucide-react";
import CustomNavbar from "@/components/CustomNavbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type ReservationFormData = {
  country: string;
  city: string;
  pickupLocation: string;
  startDate: Date;
  startTime: string;
  endDate: Date;
  endTime: string;
  participants: number;
  driverAge: string;
};

const Reservation = () => {
  const { t } = useLanguage();
  const form = useForm<ReservationFormData>({
    defaultValues: {
      country: "",
      city: "",
      pickupLocation: "",
      participants: 1,
      driverAge: "30-65",
      startTime: "10:00",
      endTime: "10:00",
    },
  });

  const onSubmit = (data: ReservationFormData) => {
    console.log("Form data:", data);
    // Ici vous pourriez envoyer les données à une API
  };

  // Options pour les listes déroulantes
  const countries = [
    { value: "france", label: "France" },
    { value: "belgique", label: "Belgique" },
  ];

  const cities = {
    france: [
      { value: "paris", label: "Paris" },
      { value: "chapelle", label: "Chapelle" },
    ],
    belgique: [
      { value: "bruxelles", label: "Bruxelles" },
    ],
  };

  // État pour gérer les villes en fonction du pays sélectionné
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [availableCities, setAvailableCities] = useState<{value: string, label: string}[]>([]);

  // Mettre à jour les villes disponibles lorsque le pays change
  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    setAvailableCities(cities[value as keyof typeof cities] || []);
    form.setValue("city", "");
  };

  return (
    <div className="min-h-screen bg-experience-dark">
      <CustomNavbar />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-experience-dark/90 rounded-xl p-8 glass-card">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2 text-white">
                {t('Réservation')}
              </h1>
              <p className="text-experience-light/80">
                {t('Trouvez la voiture idéale pour votre prochain voyage')}
              </p>
            </div>

            <div className="bg-experience-dark/70 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-medium mb-6 text-white flex items-center">
                <Car className="mr-2" />
                {t('Trouver une voiture de location')}
              </h2>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Pays */}
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">{t('Pays')}</FormLabel>
                          <Select 
                            onValueChange={(value) => {
                              field.onChange(value);
                              handleCountryChange(value);
                            }}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-black/30 border-white/20 text-white">
                                <SelectValue placeholder={t('Sélectionnez un pays')} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-experience-dark border-white/20">
                              {countries.map((country) => (
                                <SelectItem 
                                  key={country.value} 
                                  value={country.value}
                                  className="text-white hover:bg-white/10"
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
                          <FormLabel className="text-white">{t('Ville')}</FormLabel>
                          <Select 
                            onValueChange={field.onChange}
                            value={field.value}
                            disabled={!selectedCountry}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-black/30 border-white/20 text-white">
                                <SelectValue placeholder={t('Sélectionnez une ville')} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-experience-dark border-white/20">
                              {availableCities.map((city) => (
                                <SelectItem 
                                  key={city.value} 
                                  value={city.value}
                                  className="text-white hover:bg-white/10"
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
                          <FormLabel className="text-white">{t('Lieu de prise en charge')}</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder={t('Adresse ou point de rencontre')} 
                              className="bg-black/30 border-white/20 text-white"
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
                          <FormLabel className="text-white">{t('Nombre de participants')}</FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <Users className="text-white mr-2" />
                              <Input 
                                type="number" 
                                min={1} 
                                max={10}
                                className="bg-black/30 border-white/20 text-white"
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Date de début */}
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-white">{t('Date de début')}</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full bg-black/30 border-white/20 text-white pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>{t('Sélectionner une date')}</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-experience-dark border-white/20" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                                className="p-3 pointer-events-auto"
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Heure de début */}
                    <FormField
                      control={form.control}
                      name="startTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">{t('Heure de début')}</FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <Clock className="text-white mr-2" />
                              <Input 
                                type="time" 
                                className="bg-black/30 border-white/20 text-white"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Date de fin */}
                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-white">{t('Date de fin')}</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full bg-black/30 border-white/20 text-white pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>{t('Sélectionner une date')}</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-experience-dark border-white/20" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                                className="p-3 pointer-events-auto"
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Heure de fin */}
                    <FormField
                      control={form.control}
                      name="endTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">{t('Heure de fin')}</FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <Clock className="text-white mr-2" />
                              <Input 
                                type="time" 
                                className="bg-black/30 border-white/20 text-white"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Age du conducteur */}
                  <FormField
                    control={form.control}
                    name="driverAge"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">{t('Âge du conducteur')}</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-black/30 border-white/20 text-white">
                              <SelectValue placeholder={t('Sélectionnez une tranche d\'âge')} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-experience-dark border-white/20">
                            <SelectItem 
                              value="18-29" 
                              className="text-white hover:bg-white/10"
                            >
                              18-29 ans
                            </SelectItem>
                            <SelectItem 
                              value="30-65" 
                              className="text-white hover:bg-white/10"
                            >
                              30-65 ans
                            </SelectItem>
                            <SelectItem 
                              value="65+" 
                              className="text-white hover:bg-white/10"
                            >
                              Plus de 65 ans
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full bg-experience-primary hover:bg-experience-primary/90 text-black font-bold py-3 text-lg"
                  >
                    {t('Rechercher des véhicules disponibles')}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Reservation;
