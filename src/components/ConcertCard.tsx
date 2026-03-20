import { Calendar, MapPin, Users } from "lucide-react";
import { Concert } from "@/data/mockData";

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
    <div className="card-institutional p-6 flex flex-col">
      {/* Top row: status + time */}
      <div className="flex items-center justify-between mb-5">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
            isSoldOut
              ? "bg-amber-50 text-amber-700 border border-amber-200"
              : "bg-emerald-50 text-emerald-700 border border-emerald-200"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isSoldOut ? "bg-amber-500" : "bg-emerald-500"
            }`}
          />
          {isSoldOut ? "Lista de Espera" : "Disponível"}
        </span>
        <span className="text-xs font-medium text-muted-foreground bg-secondary px-2.5 py-1 rounded-md">
          {concert.time}
        </span>
      </div>

      {/* Title + description */}
      <h3 className="font-display text-xl font-semibold text-foreground mb-2 leading-snug">
        {concert.title}
      </h3>
      <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
        {concert.description}
      </p>

      {/* Meta */}
      <div className="space-y-2.5 mb-6">
        <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 text-navy/60" />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-navy/60" />
          <span>{concert.location}</span>
        </div>
        {!isSoldOut && (
          <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
            <Users className="h-4 w-4 text-navy/60" />
            <span>{remaining} de {concert.totalTickets} ingressos disponíveis</span>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="mt-auto">
        <button
          onClick={() => onReserve(concert)}
          className={`w-full font-semibold py-3 px-6 rounded-lg text-sm transition-all duration-300 ${
            isSoldOut
              ? "bg-secondary text-navy border border-border hover:bg-navy hover:text-white hover:border-navy"
              : "bg-navy text-white hover:bg-navy-light shadow-sm hover:shadow-md"
          }`}
        >
          {isSoldOut ? "Entrar na Lista de Espera" : "Retirar Ingresso"}
        </button>
      </div>
    </div>
  );
};

export default ConcertCard;
