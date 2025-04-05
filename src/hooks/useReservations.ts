
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Database } from "@/integrations/supabase/types";

type Reservation = Database["public"]["Tables"]["reservations"]["Row"];
type ReservationStatus = Database["public"]["Enums"]["reservation_status"];

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

export const useReservations = (isAdmin: boolean) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<"all" | ReservationStatus>("all");
  const [dateRange, setDateRange] = useState<DateRange>({ from: undefined, to: undefined });
  const [searchTerm, setSearchTerm] = useState("");

  const fetchReservations = async () => {
    if (!isAdmin) return;
    
    setLoading(true);
    try {
      let query = supabase.from('reservations').select('*');

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      if (dateRange.from) {
        const fromDate = new Date(dateRange.from);
        fromDate.setHours(0, 0, 0, 0);
        query = query.gte('created_at', fromDate.toISOString());
      }
      
      if (dateRange.to) {
        const toDate = new Date(dateRange.to);
        toDate.setHours(23, 59, 59, 999);
        query = query.lte('created_at', toDate.toISOString());
      }

      query = query.order('created_at', { ascending: false });
      
      const { data, error } = await query;

      if (error) {
        throw error;
      }

      setReservations(data as Reservation[]);
    } catch (error) {
      console.error('Erreur lors de la récupération des réservations:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les réservations",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchReservations();
    }
  }, [statusFilter, dateRange.from, dateRange.to, isAdmin]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setDateRange({ from: undefined, to: undefined });
  };

  return {
    reservations,
    loading,
    statusFilter,
    setStatusFilter,
    dateRange,
    setDateRange,
    searchTerm,
    setSearchTerm,
    fetchReservations,
    handleClearFilters
  };
};
