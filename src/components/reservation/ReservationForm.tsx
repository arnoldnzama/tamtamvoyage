
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
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
import { Database } from "@/integrations/supabase/types";
import { useLanguage } from "@/context/LanguageContext";
import PersonalInfoFields from "./PersonalInfoFields";
import LocationFields from "./LocationFields";
import CarSelection from "./CarSelection";

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

interface ReservationFormProps {
  cars: any[];
}

const ReservationForm: React.FC<ReservationFormProps> = ({ cars }) => {
  const { t } = useLanguage();
  const [price, setPrice] = useState<number>(0);
  const [basePrice, setBasePrice] = useState<number>(0);
  const [selectedCar, setSelectedCar] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
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

  // Update price when participants change or car is selected
  useEffect(() => {
    if (basePrice > 0) {
      setPrice(basePrice * participants);
    }
  }, [participants, basePrice]);

  // Handle country change to update available cities
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [availableCities, setAvailableCities] = useState<{value: string, label: string}[]>([]);

  // Cities data based on country
  const cities = {
    france: [
      { value: "paris", label: "Paris" },
      { value: "chapelleParis", label: "Chapelle de Paris" },
    ],
    belgique: [
      { value: "bruxelles", label: "Bruxelles" },
    ],
  };

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

  const onSubmit = async (data: ReservationFormData) => {
    setIsSubmitting(true);
    try {
      const selectedCarObj = cars.find(c => c.id === data.selectedCar);
      
      // Préparer les données de réservation
      const reservationData = {
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        country: data.country,
        city: data.city,
        pickup_location: data.pickupLocation,
        start_date: data.startDate ? data.startDate.toISOString().split('T')[0] : null,
        start_time: data.startTime,
        end_date: data.endDate ? data.endDate.toISOString().split('T')[0] : null,
        end_time: data.endTime,
        car_id: data.selectedCar || null,
        car_name: selectedCarObj?.name || null,
        participants: data.participants,
        driver_age: data.driverAge,
        price: price,
        user_id: (await supabase.auth.getUser()).data.user?.id || null,
        status: "en_attente" as Database["public"]["Enums"]["reservation_status"]
      };
      
      // Insérer la réservation dans la base de données
      const { data: reservation, error } = await supabase
        .from('reservations')
        .insert(reservationData)
        .select()
        .single();
      
      if (error) {
        console.error("Erreur lors de la soumission de la réservation:", error);
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de la soumission de votre réservation. Veuillez réessayer.",
          variant: "destructive"
        });
        return;
      }
      
      console.log("Réservation soumise avec succès:", reservation);
      
      // Envoyer la notification par email
      if (reservation) {
        await fetch(`https://fvxhbjypaybgmqsfyfbb.supabase.co/functions/v1/send-notification`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
          },
          body: JSON.stringify({
            type: 'new-reservation',
            reservationId: reservation.id
          })
        });
      }
      
      toast({
        title: "Réservation effectuée",
        description: "Votre demande de réservation a été soumise avec succès. Vous recevrez un email de confirmation prochainement.",
      });
      
      // Réinitialiser le formulaire
      form.reset();
      setSelectedCar(null);
      setBasePrice(0);
      setPrice(0);
    } catch (err) {
      console.error("Erreur lors de la soumission:", err);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la soumission de votre réservation. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#1A1F2C]/70 p-6 rounded-lg mb-8">
      <h2 className="text-xl font-medium mb-6 text-[#f5f5f5] flex items-center font-playfair">
        {t('Trouver une voiture de location')}
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LocationFields 
              form={form} 
              selectedCountry={selectedCountry}
              availableCities={availableCities}
              handleCountryChange={handleCountryChange}
            />
            
            <PersonalInfoFields form={form} />

            {/* Date et heure de début */}
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
          <CarSelection 
            cars={cars} 
            selectedCar={selectedCar} 
            onSelect={handleCarSelect}
          />

          {/* Price display */}
          {price > 0 && (
            <div className="bg-[#FF5A5F]/10 p-4 rounded-lg mt-6">
              <div className="flex justify-between items-center">
                <span className="text-[#f5f5f5] font-inter">
                  {t('Prix')} ({participants} {participants > 1 ? 'participants' : 'participant'}):
                </span>
                <span className="text-[#FF5A5F] text-2xl font-bold">{price}€ / {t('par jour')}</span>
              </div>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full bg-[#FF5A5F] hover:bg-[#FF5A5F]/90 text-[#f5f5f5] font-bold py-3 text-lg transition-transform hover:scale-105 duration-300 font-inter"
            disabled={!selectedCar || isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t('Traitement en cours...')}
              </span>
            ) : (
              <>
                {t('Réserver maintenant')}
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ReservationForm;
