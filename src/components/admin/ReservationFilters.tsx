
import React from "react";
import { Search, Calendar as CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger, 
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/dateUtils";
import { Database } from "@/integrations/supabase/types";

type ReservationStatus = Database["public"]["Enums"]["reservation_status"];

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

interface ReservationFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: "all" | ReservationStatus;
  setStatusFilter: (value: "all" | ReservationStatus) => void;
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
  onRefresh: () => void;
  onClearFilters: () => void;
}

const ReservationFilters: React.FC<ReservationFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  dateRange,
  setDateRange,
  onRefresh,
  onClearFilters,
}) => {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
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
        
        <div className="flex gap-2">
          <Button onClick={onRefresh} className="bg-blue-600 hover:bg-blue-700">
            Actualiser
          </Button>
          <Button 
            onClick={onClearFilters} 
            variant="outline" 
            className="border-gray-700 text-gray-300 hover:bg-[#2A2F3C]"
          >
            Réinitialiser
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="text-sm font-medium text-white">Période :</div>
        <div className="grid gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date-range"
                variant={"outline"}
                className={cn(
                  "w-full md:w-[300px] justify-start text-left font-normal bg-[#121212] border-gray-700 text-white",
                  !dateRange.from && "text-gray-400"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange.from ? (
                  dateRange.to ? (
                    <>
                      Du {formatDate(dateRange.from.toISOString())} au {formatDate(dateRange.to.toISOString())}
                    </>
                  ) : (
                    `Le ${formatDate(dateRange.from.toISOString())}`
                  )
                ) : (
                  <span>Sélectionner des dates</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-[#1A1F2C] border-gray-700" align="start">
              <Calendar
                mode="range"
                selected={{
                  from: dateRange.from,
                  to: dateRange.to,
                }}
                onSelect={setDateRange as any}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default ReservationFilters;
