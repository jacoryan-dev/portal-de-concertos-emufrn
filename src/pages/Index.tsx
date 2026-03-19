import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AgendaSection from "@/components/AgendaSection";
import DonationSection from "@/components/DonationSection";
import Footer from "@/components/Footer";
import ReservationModal from "@/components/ReservationModal";
import { Concert } from "@/data/mockData";

const Index = () => {
  const [selectedConcert, setSelectedConcert] = useState<Concert | null>(null);

  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <AgendaSection onReserve={setSelectedConcert} />
      <DonationSection />
      <Footer />
      {selectedConcert && (
        <ReservationModal concert={selectedConcert} onClose={() => setSelectedConcert(null)} />
      )}
    </div>
  );
};

export default Index;
