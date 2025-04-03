
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon, Clock, Car, Users, Phone, Mail, User, Globe, CreditCard } from "lucide-react";
import CustomNavbar from "@/components/CustomNavbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
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
  fullName: string;
  phone: string;
  email: string;
  selectedCar?: string;
};

const Reservation = () => {
  const { t, language, setLanguage } = useLanguage();
  const [price, setPrice] = useState<number>(0);
  const [basePrice, setBasePrice] = useState<number>(0);
  const [selectedCar, setSelectedCar] = useState<string | null>(null);
  
  const form = useForm<ReservationFormData>({
    defaultValues: {
      country: "",
      city: "",
      pickupLocation: "",
      participants: 1,
      driverAge: "30-65",
      startTime: "10:00",
      endTime: "10:00",
      fullName: "",
      phone: "",
      email: "",
    },
  });

  const participants = form.watch("participants");

  useEffect(() => {
    // Update price when participants change or car is selected
    if (basePrice > 0) {
      setPrice(basePrice * participants);
    }
  }, [participants, basePrice]);

  const onSubmit = (data: ReservationFormData) => {
    console.log("Form data:", data, "Total price:", price);
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
      { value: "chapelleParis", label: "Chapelle de Paris" },
    ],
    belgique: [
      { value: "bruxelles", label: "Bruxelles" },
    ],
  };

  // Cars data with updated images
  const cars = [
    {
      id: "citroen-c3",
      name: "Citroën C3",
      category: "Économique",
      image: "/public/lovable-uploads/b033696d-4eb2-4eb3-b601-2306188f23e3.png",
      price: 29,
      rating: 4.8,
      seats: 5,
      transmission: "Manuelle",
      fuel: "Essence",
      year: 2022
    },
    {
      id: "mercedes-v",
      name: "Mercedes V-Class",
      category: "Van",
      image: "/public/lovable-uploads/56cbfb0e-d9c4-4825-b262-98f78d8c49bc.png",
      price: 89,
      rating: 4.9,
      seats: 8,
      transmission: "Automatique",
      fuel: "Diesel",
      year: 2023
    },
    {
      id: "opel-insignia",
      name: "Opel Insignia",
      category: "Berline",
      image: "/public/lovable-uploads/24777eab-759d-4fa6-b797-327e1a8751f5.png",
      price: 49,
      rating: 4.7,
      seats: 5,
      transmission: "Automatique",
      fuel: "Diesel",
      year: 2021
    },
    {
      id: "peugeot-3008",
      name: "Peugeot 3008",
      category: "SUV",
      image: "/public/lovable-uploads/1c1d840c-cd92-4a29-887c-73bd43b8b6e5.png",
      price: 59,
      rating: 4.9,
      seats: 5,
      transmission: "Automatique",
      fuel: "Hybride",
      year: 2023
    },
    {
      id: "renault-clio",
      name: "Renault Clio",
      category: "Économique",
      image: "/public/lovable-uploads/760b7a91-7066-4718-97db-46e3d93ce3b4.png",
      price: 25,
      rating: 4.6,
      seats: 5,
      transmission: "Manuelle",
      fuel: "Essence",
      year: 2022
    }
  ];

  // État pour gérer les villes en fonction du pays sélectionné
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [availableCities, setAvailableCities] = useState<{value: string, label: string}[]>([]);

  // Mettre à jour les villes disponibles lorsque le pays change
  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    setAvailableCities(cities[value as keyof typeof cities] || []);
    form.setValue("city", "");
  };

  const handleCarSelect = (carId: string) => {
    setSelectedCar(carId);
    const car = cars.find(c => c.id === carId);
    if (car) {
      setBasePrice(car.price);
      setPrice(car.price * participants);
      form.setValue("selectedCar", carId);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212]">
      <CustomNavbar />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-[#1A1F2C]/90 rounded-xl p-8 glass-card">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-playfair font-bold mb-2 text-[#f5f5f5]">
                {t('Réservation')}
              </h1>
              <p className="text-[#f5f5f5]/80 font-inter">
                {t('Trouvez la voiture idéale pour votre prochain voyage')}
              </p>
            </div>

            {/* Language selector */}
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

            <div className="bg-[#1A1F2C]/70 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-medium mb-6 text-[#f5f5f5] flex items-center font-playfair">
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

                    {/* Date de début */}
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-[#f5f5f5] font-inter">{t('Date de début')}</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full bg-black/30 border-white/20 text-[#f5f5f5] pl-3 text-left font-normal font-inter",
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
                            <PopoverContent className="w-auto p-0 bg-[#1A1F2C] border-white/20" align="start">
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
                          <FormLabel className="text-[#f5f5f5] font-inter">{t('Heure de début')}</FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <Clock className="text-[#f5f5f5] mr-2" />
                              <Input 
                                type="time" 
                                className="bg-black/30 border-white/20 text-[#f5f5f5] font-inter"
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
                          <FormLabel className="text-[#f5f5f5] font-inter">{t('Date de fin')}</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full bg-black/30 border-white/20 text-[#f5f5f5] pl-3 text-left font-normal font-inter",
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
                            <PopoverContent className="w-auto p-0 bg-[#1A1F2C] border-white/20" align="start">
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
                          <FormLabel className="text-[#f5f5f5] font-inter">{t('Heure de fin')}</FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <Clock className="text-[#f5f5f5] mr-2" />
                              <Input 
                                type="time" 
                                className="bg-black/30 border-white/20 text-[#f5f5f5] font-inter"
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
                        <FormLabel className="text-[#f5f5f5] font-inter">{t('Âge du conducteur')}</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-black/30 border-white/20 text-[#f5f5f5] font-inter">
                              <SelectValue placeholder={t('Sélectionnez une tranche d\'âge')} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-[#1A1F2C] border-white/20">
                            <SelectItem 
                              value="18-29" 
                              className="text-[#f5f5f5] hover:bg-white/10 font-inter"
                            >
                              18-29 ans
                            </SelectItem>
                            <SelectItem 
                              value="30-65" 
                              className="text-[#f5f5f5] hover:bg-white/10 font-inter"
                            >
                              30-65 ans
                            </SelectItem>
                            <SelectItem 
                              value="65+" 
                              className="text-[#f5f5f5] hover:bg-white/10 font-inter"
                            >
                              Plus de 65 ans
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Car selection */}
                  <div className="mt-8">
                    <h3 className="text-xl font-medium mb-4 text-[#f5f5f5] font-playfair">
                      {t('Sélectionnez un véhicule')}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {cars.map((car) => (
                        <div 
                          key={car.id}
                          className={`rounded-lg p-4 transition-all duration-300 cursor-pointer hover:scale-105 border ${selectedCar === car.id ? 'border-[#FF5A5F]' : 'border-white/10'}`}
                          onClick={() => handleCarSelect(car.id)}
                        >
                          <div className="bg-white p-2 rounded-lg mb-3">
                            <img src={car.image} alt={car.name} className="h-32 w-full object-contain" />
                          </div>
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium text-[#f5f5f5] font-inter">{car.name}</h4>
                            <span className="text-[#FF5A5F] font-bold">{car.price}€ / {t('par jour')}</span>
                          </div>
                          <div className="flex mt-2 gap-2">
                            <span className="bg-[#1A1F2C] text-[#f5f5f5]/80 text-xs px-2 py-1 rounded font-inter">
                              {car.transmission}
                            </span>
                            <span className="bg-[#1A1F2C] text-[#f5f5f5]/80 text-xs px-2 py-1 rounded font-inter">
                              {car.fuel}
                            </span>
                            <span className="bg-[#1A1F2C] text-[#f5f5f5]/80 text-xs px-2 py-1 rounded font-inter">
                              {car.seats} places
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price display */}
                  {price > 0 && (
                    <div className="bg-[#FF5A5F]/10 p-4 rounded-lg mt-6">
                      <div className="flex justify-between items-center">
                        <span className="text-[#f5f5f5] font-inter">{t('Prix')} ({participants} {participants > 1 ? 'participants' : 'participant'}):</span>
                        <span className="text-[#FF5A5F] text-2xl font-bold">{price}€ / {t('par jour')}</span>
                      </div>
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full bg-[#FF5A5F] hover:bg-[#FF5A5F]/90 text-[#f5f5f5] font-bold py-3 text-lg transition-transform hover:scale-105 duration-300 font-inter"
                    disabled={!selectedCar}
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
