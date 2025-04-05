
import React from "react";
import CustomNavbar from "@/components/CustomNavbar";
import Footer from "@/components/Footer";
import ReservationContainer from "@/components/reservation/ReservationContainer";

const Reservation = () => {
  return (
    <div className="min-h-screen bg-[#121212]">
      <CustomNavbar />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <ReservationContainer />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Reservation;
