
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Database } from "@/integrations/supabase/types";

type ReservationStatus = Database["public"]["Enums"]["reservation_status"];

interface ReservationFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: "all" | ReservationStatus;
  setStatusFilter: (value: "all" | ReservationStatus) => void;
  onRefresh: () => void;
}

const ReservationFilters: React.FC<ReservationFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  onRefresh,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
      <div className="relative w-full md:w-1/3">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          className="w-full pl-10 bg-[#121212] border-gray-700 text-white"
          placeholder="Rechercher par référence, nom..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
        <SelectTrigger className="w-full md:w-[180px] bg-[#121212] border-gray-700 text-white">
          <SelectValue placeholder="Filtrer par statut" />
        </SelectTrigger>
        <SelectContent className="bg-[#1A1F2C] border-gray-700">
          <SelectItem value="all">Tous les statuts</SelectItem>
          <SelectItem value="en_attente">En attente</SelectItem>
          <SelectItem value="confirmee">Confirmée</SelectItem>
          <SelectItem value="refusee">Refusée</SelectItem>
        </SelectContent>
      </Select>
      
      <Button onClick={onRefresh} className="bg-blue-600 hover:bg-blue-700">
        Actualiser
      </Button>
    </div>
  );
};

export default ReservationFilters;
