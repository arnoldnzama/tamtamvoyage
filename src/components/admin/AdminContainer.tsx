
import React from "react";
import CustomNavbar from "@/components/CustomNavbar";
import Footer from "@/components/Footer";
import ReservationFilters from "@/components/admin/ReservationFilters";
import ReservationTable from "@/components/admin/ReservationTable";
import ReservationDetailsDialog from "@/components/admin/ReservationDetailsDialog";
import ReservationActionDialog from "@/components/admin/ReservationActionDialog";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useReservations } from "@/hooks/useReservations";
import { useReservationActions } from "@/hooks/useReservationActions";

const AdminContainer = () => {
  const { isAdmin, loading: authLoading } = useAdminAuth();
  
  const {
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
  } = useReservations(isAdmin);
  
  const {
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
  } = useReservationActions(fetchReservations);

  if (!isAdmin && authLoading) {
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

export default AdminContainer;
