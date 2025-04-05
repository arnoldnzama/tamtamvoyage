
import React from "react";
import { Database } from "@/integrations/supabase/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/dateUtils";

type Reservation = Database["public"]["Tables"]["reservations"]["Row"];

interface ReservationDetailsDialogProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  reservation: Reservation | null;
}

const ReservationDetailsDialog: React.FC<ReservationDetailsDialogProps> = ({
  isOpen,
  setIsOpen,
  reservation,
}) => {
  if (!reservation) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-[#1A1F2C] text-white border-gray-700 max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-playfair">Détails de la réservation</DialogTitle>
          <DialogDescription className="text-gray-400">
            Référence: {reservation.reference} | Commande: {reservation.commande}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <h3 className="font-medium text-white">Informations client</h3>
            <p><span className="text-gray-400">Nom:</span> {reservation.full_name}</p>
            <p><span className="text-gray-400">Email:</span> {reservation.email}</p>
            <p><span className="text-gray-400">Téléphone:</span> {reservation.phone || '-'}</p>
            <p><span className="text-gray-400">Pays:</span> {reservation.country || '-'}</p>
            <p><span className="text-gray-400">Ville:</span> {reservation.city || '-'}</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-white">Informations réservation</h3>
            <p><span className="text-gray-400">Véhicule:</span> {reservation.car_name || '-'}</p>
            <p><span className="text-gray-400">Date de début:</span> {formatDate(reservation.start_date)} {reservation.start_time || ''}</p>
            <p><span className="text-gray-400">Date de fin:</span> {formatDate(reservation.end_date)} {reservation.end_time || ''}</p>
            <p><span className="text-gray-400">Participants:</span> {reservation.participants}</p>
            <p><span className="text-gray-400">Prix:</span> {reservation.price ? `${reservation.price}€` : '-'}</p>
          </div>

          <div className="col-span-1 md:col-span-2 space-y-2">
            <h3 className="font-medium text-white">Lieu de prise en charge</h3>
            <p>{reservation.pickup_location || '-'}</p>
          </div>

          <div className="col-span-1 md:col-span-2 space-y-2">
            <h3 className="font-medium text-white">Message administrateur</h3>
            <p>{reservation.admin_message || '-'}</p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReservationDetailsDialog;
