import { Calendar, MapPin, Ticket } from "lucide-react";
import { Concert } from "@/data/mockData";
import { Button } from "@/components/ui/button";

interface Props {
  concert: Concert;
  onReserve: (concert: Concert) => void;
}

const ConcertCard = ({ concert, onReserve }: Props) => {
  const isSoldOut = concert.reservedTickets >= concert.totalTickets;
  const remaining = concert.totalTickets - concert.reservedTickets;
  const dateObj = new Date(concert.date + "T" + concert.time);
  const formattedDate = dateObj.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="group bg-card rounded-xl border border-border p-6 hover:shadow-xl hover:shadow-gold/5 transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
          isSoldOut
            ? "bg-destructive/10 text-destructive"
            : "bg-gold/10 text-gold-dark"
        }`}>
          <Ticket className="h-3 w-3" />
          {isSoldOut ? "Esgotado" : `${remaining} disponíveis`}
        </div>
        <span className="text-sm font-medium text-muted-foreground">{concert.time}</span>
      </div>

      <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-navy-light transition-colors">
        {concert.title}
      </h3>
      <p className="text-sm text-muted-foreground mb-4">{concert.description}</p>

      <div className="space-y-2 mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 text-gold" />
          {formattedDate}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-gold" />
          {concert.location}
        </div>
      </div>

      <Button
        onClick={() => onReserve(concert)}
        className={`w-full font-semibold ${
          isSoldOut
            ? "bg-navy text-gold-light hover:bg-navy-light"
            : "bg-gradient-gold text-accent-foreground hover:opacity-90"
        }`}
      >
        {isSoldOut ? "Entrar na Lista de Espera" : "Retirar Ingresso"}
      </Button>
    </div>
  );
};

export default ConcertCard;
