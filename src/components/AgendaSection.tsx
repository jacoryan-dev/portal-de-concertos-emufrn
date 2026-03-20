import { useApp } from "@/contexts/AppContext";
import ConcertCard from "@/components/ConcertCard";
import { Concert } from "@/data/mockData";

interface Props {
  onReserve: (concert: Concert) => void;
}

const AgendaSection = ({ onReserve }: Props) => {
  const { concerts } = useApp();

  return (
    <section id="agenda" className="py-24 md:py-32 bg-background">
      <div className="container px-4">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-gold-dark mb-4">
            Programação
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Agenda de Concertos
          </h2>
          <div className="section-divider mt-6" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          {concerts.map((concert) => (
            <ConcertCard key={concert.id} concert={concert} onReserve={onReserve} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgendaSection;
