
import React from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Database } from "@/integrations/supabase/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/dateUtils";

type Reservation = Database["public"]["Tables"]["reservations"]["Row"];
type ReservationStatus = Database["public"]["Enums"]["reservation_status"];

interface ReservationTableProps {
  reservations: Reservation[];
  loading: boolean;
  handleDetails: (reservation: Reservation) => void;
  handleAction: (reservation: Reservation, type: "confirm" | "reject") => void;
  searchTerm: string;
}

const ReservationTable: React.FC<ReservationTableProps> = ({
  reservations,
  loading,
  handleDetails,
  handleAction,
  searchTerm,
}) => {
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'en_attente':
        return 'bg-yellow-500/20 text-yellow-500';
      case 'confirmee':
        return 'bg-green-500/20 text-green-500';
      case 'refusee':
        return 'bg-red-500/20 text-red-500';
      default:
        return 'bg-gray-500/20 text-gray-500';
    }
  };

  const filteredReservations = reservations.filter(res => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      res.reference.toLowerCase().includes(searchLower) ||
      res.commande.toLowerCase().includes(searchLower) ||
      res.full_name.toLowerCase().includes(searchLower) ||
      res.email.toLowerCase().includes(searchLower) ||
      (res.car_name && res.car_name.toLowerCase().includes(searchLower))
    );
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin h-10 w-10 border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table className="w-full">
        <TableCaption>Liste des réservations ({filteredReservations.length})</TableCaption>
        <TableHeader>
          <TableRow className="hover:bg-[#2A2F3C] border-gray-700">
            <TableHead className="text-white">Référence</TableHead>
            <TableHead className="text-white">Client</TableHead>
            <TableHead className="text-white">Véhicule</TableHead>
            <TableHead className="text-white">Date</TableHead>
            <TableHead className="text-white">Prix</TableHead>
            <TableHead className="text-white">Statut</TableHead>
            <TableHead className="text-white text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredReservations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-10 text-gray-400">
                Aucune réservation trouvée
              </TableCell>
            </TableRow>
          ) : (
            filteredReservations.map((reservation) => (
              <TableRow key={reservation.id} className="hover:bg-[#2A2F3C] border-gray-700">
                <TableCell className="font-medium text-gray-300">{reservation.reference}</TableCell>
                <TableCell className="text-gray-300">{reservation.full_name}</TableCell>
                <TableCell className="text-gray-300">{reservation.car_name || "Non spécifié"}</TableCell>
                <TableCell className="text-gray-300">{formatDate(reservation.created_at)}</TableCell>
                <TableCell className="text-gray-300">{reservation.price ? `${reservation.price}€` : "-"}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusBadgeClass(reservation.status as string)}`}>
                    {reservation.status === 'en_attente' ? 'En attente' : 
                     reservation.status === 'confirmee' ? 'Confirmée' : 'Refusée'}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-gray-700 text-gray-300 hover:text-white hover:bg-[#2A2F3C]"
                      onClick={() => handleDetails(reservation)}
                    >
                      Détails
                    </Button>
                    
                    {reservation.status === 'en_attente' && (
                      <>
                        <Button 
                          variant="outline"
                          size="sm"
                          className="border-green-700 text-green-500 hover:bg-green-900/20"
                          onClick={() => handleAction(reservation, 'confirm')}
                        >
                          <span className="w-4 h-4 mr-1">✓</span> Confirmer
                        </Button>
                        
                        <Button 
                          variant="outline"
                          size="sm"
                          className="border-red-700 text-red-500 hover:bg-red-900/20"
                          onClick={() => handleAction(reservation, 'reject')}
                        >
                          <span className="w-4 h-4 mr-1">✗</span> Refuser
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReservationTable;
