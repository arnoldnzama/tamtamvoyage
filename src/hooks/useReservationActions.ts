
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Database } from "@/integrations/supabase/types";

type Reservation = Database["public"]["Tables"]["reservations"]["Row"];

export const useReservationActions = (fetchReservations: () => Promise<void>) => {
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [actionType, setActionType] = useState<"confirm" | "reject" | null>(null);
  const [adminMessage, setAdminMessage] = useState("");

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

  return {
    selectedReservation,
    isDetailsOpen,
    setIsDetailsOpen,
    isActionModalOpen,
    setIsActionModalOpen,
    actionType,
    adminMessage,
    setAdminMessage,
    handleDetails,
    handleAction,
    submitAction
  };
};
