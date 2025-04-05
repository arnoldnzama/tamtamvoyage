
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type Reservation = Database["public"]["Tables"]["reservations"]["Row"];

interface ReservationActionDialogProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  reservation: Reservation | null;
  actionType: "confirm" | "reject" | null;
  adminMessage: string;
  setAdminMessage: (value: string) => void;
  onSubmit: () => void;
}

const ReservationActionDialog: React.FC<ReservationActionDialogProps> = ({
  isOpen,
  setIsOpen,
  reservation,
  actionType,
  adminMessage,
  setAdminMessage,
  onSubmit,
}) => {
  if (!reservation || !actionType) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-[#1A1F2C] text-white border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-xl font-playfair">
            {actionType === 'confirm' ? 'Confirmer la réservation' : 'Refuser la réservation'}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {actionType === 'confirm' 
              ? 'Confirmez cette réservation et envoyez une notification au client.' 
              : 'Refusez cette réservation et informez le client.'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Message au client
            </label>
            <Textarea 
              placeholder="Ajoutez un message personnalisé pour le client..."
              className="bg-[#121212] border-gray-700 text-white min-h-[100px]"
              value={adminMessage}
              onChange={(e) => setAdminMessage(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="flex gap-2 justify-end">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Annuler
          </Button>
          <Button 
            onClick={onSubmit}
            className={actionType === 'confirm' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
          >
            {actionType === 'confirm' ? 'Confirmer' : 'Refuser'} la réservation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReservationActionDialog;
