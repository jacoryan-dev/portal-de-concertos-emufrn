import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Ticket, Clock, Download, Music } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";

const Admin = () => {
  const { isAdmin, concerts, reservations, logout } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) navigate("/login");
  }, [isAdmin, navigate]);

  if (!isAdmin) return null;

  const totalLeads = reservations.length;
  const totalReserved = reservations.filter((r) => !r.isWaitlist).reduce((s, r) => s + r.quantity, 0);
  const totalWaitlist = reservations.filter((r) => r.isWaitlist).length;

  const exportCSV = () => {
    const header = "Nome,Email,WhatsApp,Evento,Quantidade,Lista de Espera,Data Cadastro\n";
    const rows = reservations.map((r) => {
      const concert = concerts.find((c) => c.id === r.concertId);
      return `"${r.name}","${r.email}","${r.whatsapp}","${concert?.title || ""}",${r.quantity},${r.isWaitlist ? "Sim" : "Não"},"${r.createdAt}"`;
    }).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "leads-concertos.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="bg-gradient-navy border-b border-navy-light/20">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <Music className="h-5 w-5 text-gold" />
            <span className="font-display text-lg font-bold text-gold">Dashboard Admin</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate("/")} className="border-gold/30 text-gold hover:bg-gold/10">
              Ver Site
            </Button>
            <Button variant="outline" size="sm" onClick={() => { logout(); navigate("/"); }} className="border-gold/30 text-gold hover:bg-gold/10">
              Sair
            </Button>
          </div>
        </div>
      </div>

      <div className="container px-4 py-8 space-y-8">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: Users, label: "Total de Leads", value: totalLeads, color: "text-gold" },
            { icon: Ticket, label: "Ingressos Reservados", value: totalReserved, color: "text-gold" },
            { icon: Clock, label: "Em Lista de Espera", value: totalWaitlist, color: "text-gold" },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center gap-3 mb-2">
                <Icon className={`h-5 w-5 ${color}`} />
                <span className="text-sm text-muted-foreground">{label}</span>
              </div>
              <p className="text-3xl font-bold text-foreground">{value}</p>
            </div>
          ))}
        </div>

        {/* Concerts */}
        <div>
          <h2 className="font-display text-xl font-bold text-foreground mb-4">Concertos</h2>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left p-4 font-semibold text-foreground">Evento</th>
                    <th className="text-left p-4 font-semibold text-foreground">Data</th>
                    <th className="text-center p-4 font-semibold text-foreground">Inscritos</th>
                    <th className="text-center p-4 font-semibold text-foreground">Espera</th>
                    <th className="text-center p-4 font-semibold text-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {concerts.map((c) => {
                    const full = c.reservedTickets >= c.totalTickets;
                    return (
                      <tr key={c.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                        <td className="p-4 font-medium">{c.title}</td>
                        <td className="p-4 text-muted-foreground">{new Date(c.date).toLocaleDateString("pt-BR")}</td>
                        <td className="p-4 text-center">{c.reservedTickets}/{c.totalTickets}</td>
                        <td className="p-4 text-center">{c.waitlistCount}</td>
                        <td className="p-4 text-center">
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                            full ? "bg-destructive/10 text-destructive" : "bg-gold/10 text-gold-dark"
                          }`}>
                            {full ? "Esgotado" : "Disponível"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Leads */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-bold text-foreground">Base de Leads</h2>
            <Button onClick={exportCSV} variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Exportar CSV
            </Button>
          </div>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left p-4 font-semibold text-foreground">Nome</th>
                    <th className="text-left p-4 font-semibold text-foreground">E-mail</th>
                    <th className="text-left p-4 font-semibold text-foreground">WhatsApp</th>
                    <th className="text-left p-4 font-semibold text-foreground">Evento</th>
                    <th className="text-center p-4 font-semibold text-foreground">Qtd</th>
                    <th className="text-center p-4 font-semibold text-foreground">Tipo</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((r) => {
                    const concert = concerts.find((c) => c.id === r.concertId);
                    return (
                      <tr key={r.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                        <td className="p-4 font-medium">{r.name}</td>
                        <td className="p-4 text-muted-foreground">{r.email}</td>
                        <td className="p-4 text-muted-foreground">{r.whatsapp}</td>
                        <td className="p-4 text-muted-foreground">{concert?.title || "-"}</td>
                        <td className="p-4 text-center">{r.quantity}</td>
                        <td className="p-4 text-center">
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                            r.isWaitlist ? "bg-muted text-muted-foreground" : "bg-gold/10 text-gold-dark"
                          }`}>
                            {r.isWaitlist ? "Espera" : "Reserva"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
