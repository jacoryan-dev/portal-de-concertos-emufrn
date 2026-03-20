import { useState } from "react";
import { X, CheckCircle, AlertCircle } from "lucide-react";
import { Concert } from "@/data/mockData";
import { useApp } from "@/contexts/AppContext";
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-border overflow-hidden animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-navy px-6 py-5 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </button>
          <p className="text-white/50 text-xs font-semibold tracking-[0.15em] uppercase mb-1">
            {isSoldOut ? "Lista de Espera" : "Reservar Ingresso"}
          </p>
          <h3 className="font-display text-lg font-bold text-white pr-8">
            {concert.title}
          </h3>
          <p className="text-white/40 text-sm mt-1.5">
            {new Date(concert.date).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
            })}{" "}
            às {concert.time}
          </p>
        </div>

        {step === "form" ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {isSoldOut && (
              <div className="flex items-start gap-3 p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-sm">
                <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                <p className="text-amber-800 text-xs leading-relaxed">
                  Ingressos esgotados. Cadastre-se na lista de espera e seja
                  notificado via WhatsApp caso surja uma vaga.
                </p>
              </div>
            )}

            {/* Name */}
            <div className="space-y-1.5">
              <label htmlFor="modal-name" className="block text-xs font-semibold text-foreground/80 tracking-wide uppercase">
                Nome completo <span className="text-destructive">*</span>
              </label>
              <input
                id="modal-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
                className="input-md3"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="modal-email" className="block text-xs font-semibold text-foreground/80 tracking-wide uppercase">
                E-mail <span className="text-destructive">*</span>
              </label>
              <input
                id="modal-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="input-md3"
              />
            </div>

            {/* WhatsApp */}
            <div className="space-y-1.5">
              <label htmlFor="modal-whatsapp" className="block text-xs font-semibold text-foreground/80 tracking-wide uppercase">
                WhatsApp <span className="text-destructive">*</span>
              </label>
              <input
                id="modal-whatsapp"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="(84) 99999-0000"
                className="input-md3"
              />
            </div>

            {/* Quantity picker */}
            {!isSoldOut && (
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-foreground/80 tracking-wide uppercase">
                  Quantidade (máx. 2)
                </label>
                <div className="flex gap-3">
                  {[1, 2].map((n) => (
                    <button
                      key={n}
                      type="button"
                      disabled={n > maxQty}
                      onClick={() => setQuantity(n)}
                      className={`flex-1 py-2.5 rounded-lg border text-sm font-semibold transition-all duration-200 ${
                        quantity === n
                          ? "border-navy bg-navy/5 text-navy"
                          : "border-border text-muted-foreground hover:border-navy/30"
                      } ${n > maxQty ? "opacity-30 cursor-not-allowed" : ""}`}
                    >
                      {n} {n === 1 ? "ingresso" : "ingressos"}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* LGPD Consent */}
            <div className="flex items-start gap-3 pt-1">
              <Checkbox
                id="lgpd"
                checked={lgpdConsent}
                onCheckedChange={(v) => setLgpdConsent(v === true)}
                className="mt-0.5"
              />
              <label htmlFor="lgpd" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                Autorizo o uso dos meus dados para gerenciamento de ingressos e envio de
                comunicações sobre projetos e parceiros institucionais, conforme a{" "}
                <span className="text-navy font-medium">LGPD</span>.
              </label>
            </div>

            {error && (
              <p className="text-xs text-destructive font-medium bg-destructive/5 px-3 py-2 rounded-lg">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-navy text-white font-semibold py-3.5 px-6 rounded-lg text-sm hover:bg-navy-light transition-all duration-300 shadow-sm hover:shadow-md"
            >
              {isSoldOut ? "Entrar na Lista de Espera" : "Confirmar Reserva"}
            </button>
          </form>
        ) : (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 mx-auto bg-emerald-50 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-emerald-500" />
            </div>
            <div>
              <h4 className="font-display text-xl font-bold text-foreground mb-1">
                {isSoldOut ? "Cadastro realizado!" : "Reserva confirmada!"}
              </h4>
              <p className="text-sm text-muted-foreground">
                {isSoldOut
                  ? "Você está na lista de espera."
                  : "Seu ingresso foi reservado com sucesso."}
              </p>
            </div>

            <div className="bg-secondary rounded-xl p-5 text-sm text-left space-y-2">
              <p>
                <span className="font-semibold text-foreground">Nome:</span>{" "}
                <span className="text-muted-foreground">{name}</span>
              </p>
              <p>
                <span className="font-semibold text-foreground">Evento:</span>{" "}
                <span className="text-muted-foreground">{concert.title}</span>
              </p>
              <p>
                <span className="font-semibold text-foreground">Data:</span>{" "}
                <span className="text-muted-foreground">
                  {new Date(concert.date).toLocaleDateString("pt-BR")} às{" "}
                  {concert.time}
                </span>
              </p>
              <p>
                <span className="font-semibold text-foreground">Local:</span>{" "}
                <span className="text-muted-foreground">{concert.location}</span>
              </p>
              {!isSoldOut && (
                <p>
                  <span className="font-semibold text-foreground">Ingressos:</span>{" "}
                  <span className="text-muted-foreground">{quantity}</span>
                </p>
              )}
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              {isSoldOut
                ? "Você será notificado via WhatsApp caso uma vaga seja liberada."
                : "Um lembrete será enviado para seu WhatsApp antes do concerto."}
            </p>

            <button
              onClick={onClose}
              className="w-full py-3 px-6 rounded-lg text-sm font-semibold border border-border text-foreground hover:bg-secondary transition-all duration-300"
            >
              Fechar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationModal;
