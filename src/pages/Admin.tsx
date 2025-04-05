import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Database } from "@/integrations/supabase/types";
import CustomNavbar from "@/components/CustomNavbar";
import Footer from "@/components/Footer";
import ReservationFilters from "@/components/admin/ReservationFilters";
import ReservationTable from "@/components/admin/ReservationTable";
import ReservationDetailsDialog from "@/components/admin/ReservationDetailsDialog";
import ReservationActionDialog from "@/components/admin/ReservationActionDialog";

type Reservation = Database["public"]["Tables"]["reservations"]["Row"];
type ReservationStatus = Database["public"]["Enums"]["reservation_status"];

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

const Admin = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [actionType, setActionType] = useState<"confirm" | "reject" | null>(null);
  const [adminMessage, setAdminMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | ReservationStatus>("all");
  const [dateRange, setDateRange] = useState<DateRange>({ from: undefined, to: undefined });

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          toast({
            title: "Accès refusé",
            description: "Vous devez être connecté pour accéder à cette page.",
            variant: "destructive"
          });
          navigate("/");
          return;
        }

        const { data: roles, error } = await supabase
          .from('user_roles')
          .select('*')
          .eq('user_id', user.id)
          .eq('role', 'admin');

        if (error) {
          console.error("Erreur lors de la vérification du rôle:", error);
          toast({
            title: "Erreur",
            description: "Une erreur est survenue lors de la vérification de vos permissions.",
            variant: "destructive"
          });
          navigate("/");
          return;
        }

        if (!roles || roles.length === 0) {
          toast({
            title: "Accès refusé",
            description: "Vous n'avez pas les permissions nécessaires pour accéder à cette page.",
            variant: "destructive"
          });
          navigate("/");
          return;
        }

        setIsAdmin(true);
        fetchReservations();
      } catch (error) {
        console.error("Erreur lors de la vérification de l'utilisateur:", error);
        navigate("/");
      }
    };

    checkAdmin();
  }, [navigate]);

  const fetchReservations = async () => {
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

  const handleDetails = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsDetailsOpen(true);
  };

  const handleAction = (reservation: Reservation, type: "confirm" | "reject") => {
    setSelectedReservation(reservation);
    setActionType(type);
    setAdminMessage(reservation.admin_message || "");
    setIsActionModalOpen(true);
  };

  const submitAction = async () => {
    if (!selectedReservation || !actionType) return;

    try {
      const response = await fetch(`https://fvxhbjypaybgmqsfyfbb.supabase.co/functions/v1/send-notification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
        },
        body: JSON.stringify({
          type: actionType === 'confirm' ? 'confirm-reservation' : 'reject-reservation',
          reservationId: selectedReservation.id,
          adminMessage: adminMessage
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Une erreur est survenue');
      }

      toast({
        title: actionType === 'confirm' ? "Réservation confirmée" : "Réservation refusée",
        description: "Un email a été envoyé au client.",
      });

      fetchReservations();
      setIsActionModalOpen(false);
    } catch (error) {
      console.error('Erreur lors de la soumission de l\'action:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de la notification.",
        variant: "destructive"
      });
    }
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setDateRange({ from: undefined, to: undefined });
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="text-center p-4">
          <h1 className="text-2xl font-bold text-white mb-4">Vérification des permissions...</h1>
          <div className="animate-spin h-8 w-8 border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212]">
      <CustomNavbar />
      <main className="container mx-auto px-4 py-10 pt-32">
        <div className="bg-[#1A1F2C]/90 rounded-lg p-6 mb-8">
          <h1 className="text-3xl font-playfair font-bold text-white mb-6">Administration des réservations</h1>
          
          <ReservationFilters 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            dateRange={dateRange}
            setDateRange={setDateRange}
            onRefresh={fetchReservations}
            onClearFilters={handleClearFilters}
          />

          <ReservationTable 
            reservations={reservations}
            loading={loading}
            handleDetails={handleDetails}
            handleAction={handleAction}
            searchTerm={searchTerm}
          />
        </div>
      </main>

      <ReservationDetailsDialog 
        isOpen={isDetailsOpen}
        setIsOpen={setIsDetailsOpen}
        reservation={selectedReservation}
      />

      <ReservationActionDialog 
        isOpen={isActionModalOpen}
        setIsOpen={setIsActionModalOpen}
        reservation={selectedReservation}
        actionType={actionType}
        adminMessage={adminMessage}
        setAdminMessage={setAdminMessage}
        onSubmit={submitAction}
      />

      <Footer />
    </div>
  );
};

export default Admin;
