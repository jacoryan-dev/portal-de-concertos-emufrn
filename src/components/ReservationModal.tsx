import { useState } from "react";
import { X, CheckCircle, AlertCircle } from "lucide-react";
import { Concert } from "@/data/mockData";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  concert: Concert;
  onClose: () => void;
}

const ReservationModal = ({ concert, onClose }: Props) => {
  const { addReservation } = useApp();
  const isSoldOut = concert.reservedTickets >= concert.totalTickets;
  const remaining = concert.totalTickets - concert.reservedTickets;

  const [step, setStep] = useState<"form" | "success">("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [lgpdConsent, setLgpdConsent] = useState(false);
  const [error, setError] = useState("");

  const maxQty = isSoldOut ? 0 : Math.min(2, remaining);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !whatsapp.trim()) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }
    if (!lgpdConsent) {
      setError("Você precisa aceitar os termos de uso de dados.");
      return;
    }

    addReservation({
      concertId: concert.id,
      name: name.trim(),
      email: email.trim(),
      whatsapp: whatsapp.trim(),
      quantity: isSoldOut ? 0 : quantity,
      isWaitlist: isSoldOut,
      lgpdConsent,
    });

    setStep("success");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-dark/80 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-card w-full max-w-md rounded-xl shadow-2xl border border-border overflow-hidden animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-navy p-6 relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gold-light/50 hover:text-gold transition-colors">
            <X className="h-5 w-5" />
          </button>
          <p className="text-gold text-xs font-medium tracking-widest uppercase mb-1">
            {isSoldOut ? "Lista de Espera" : "Reservar Ingresso"}
          </p>
          <h3 className="font-display text-xl font-bold text-card">{concert.title}</h3>
          <p className="text-gold-light/50 text-sm mt-1">
            {new Date(concert.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "long" })} às {concert.time}
          </p>
        </div>

        {step === "form" ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {isSoldOut && (
              <div className="flex items-start gap-2 p-3 bg-gold/5 border border-gold/20 rounded-lg text-sm">
                <AlertCircle className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                <p className="text-muted-foreground">
                  Ingressos esgotados. Cadastre-se na lista de espera e você será
                  notificado via WhatsApp caso surja uma vaga.
                </p>
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="name">Nome completo *</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">E-mail *</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com" />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="whatsapp">WhatsApp *</Label>
              <Input id="whatsapp" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="(11) 99999-0000" />
            </div>

            {!isSoldOut && (
              <div className="space-y-1.5">
                <Label>Quantidade de ingressos (máx. 2)</Label>
                <div className="flex gap-3">
                  {[1, 2].map((n) => (
                    <button
                      key={n}
                      type="button"
                      disabled={n > maxQty}
                      onClick={() => setQuantity(n)}
                      className={`flex-1 py-2 rounded-lg border text-sm font-semibold transition-all ${
                        quantity === n
                          ? "border-gold bg-gold/10 text-foreground"
                          : "border-border text-muted-foreground hover:border-gold/50"
                      } ${n > maxQty ? "opacity-40 cursor-not-allowed" : ""}`}
                    >
                      {n} {n === 1 ? "ingresso" : "ingressos"}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-start gap-2 pt-2">
              <Checkbox
                id="lgpd"
                checked={lgpdConsent}
                onCheckedChange={(v) => setLgpdConsent(v === true)}
              />
              <label htmlFor="lgpd" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                Autorizo o uso dos meus dados para gerenciamento de ingressos e envio de
                comunicações sobre projetos e parceiros institucionais, conforme a LGPD.
              </label>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" className="w-full bg-gradient-gold text-accent-foreground font-semibold hover:opacity-90">
              {isSoldOut ? "Entrar na Lista de Espera" : "Confirmar Reserva"}
            </Button>
          </form>
        ) : (
          <div className="p-6 text-center space-y-4">
            <CheckCircle className="h-16 w-16 text-gold mx-auto" />
            <h4 className="font-display text-xl font-bold text-foreground">
              {isSoldOut ? "Cadastro na lista de espera confirmado!" : "Reserva confirmada!"}
            </h4>
            <div className="bg-muted rounded-lg p-4 text-sm text-left space-y-1">
              <p><strong>Nome:</strong> {name}</p>
              <p><strong>Evento:</strong> {concert.title}</p>
              <p><strong>Data:</strong> {new Date(concert.date).toLocaleDateString("pt-BR")} às {concert.time}</p>
              <p><strong>Local:</strong> {concert.location}</p>
              {!isSoldOut && <p><strong>Ingressos:</strong> {quantity}</p>}
            </div>
            <p className="text-sm text-muted-foreground">
              {isSoldOut
                ? "Você será notificado via WhatsApp caso uma vaga seja liberada."
                : "Um lembrete será enviado para seu WhatsApp dias antes do concerto."}
            </p>
            <Button onClick={onClose} variant="outline" className="w-full">
              Fechar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationModal;
