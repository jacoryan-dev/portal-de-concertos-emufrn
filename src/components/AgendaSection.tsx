import { useApp } from "@/contexts/AppContext";
import ConcertCard from "@/components/ConcertCard";
import { Concert } from "@/data/mockData";

interface Props {
  onReserve: (concert: Concert) => void;
}

const AgendaSection = ({ onReserve }: Props) => {
  const { concerts } = useApp();

  return (
    <section id="agenda" className="py-20 bg-background">
      <div className="container px-4">
        <div className="text-center mb-12">
          <p className="text-gold font-medium tracking-widest uppercase text-sm mb-3">Programação</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Agenda de Concertos
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto">
          {concerts.map((concert) => (
            <ConcertCard key={concert.id} concert={concert} onReserve={onReserve} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgendaSection;
