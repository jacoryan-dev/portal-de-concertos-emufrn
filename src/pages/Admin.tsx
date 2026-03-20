import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Users,
  Ticket,
  Clock,
  Download,
  ArrowLeft,
  BarChart3,
} from "lucide-react";
import { useApp } from "@/contexts/AppContext";

const Admin = () => {
  const { isAdmin, concerts, reservations, logout } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) navigate("/login");
  }, [isAdmin, navigate]);

  if (!isAdmin) return null;

  const totalLeads = reservations.length;
  const totalReserved = reservations
    .filter((r) => !r.isWaitlist)
    .reduce((s, r) => s + r.quantity, 0);
  const totalWaitlist = reservations.filter((r) => r.isWaitlist).length;

  const exportCSV = () => {
    const header =
      "Nome,Email,WhatsApp,Evento,Quantidade,Lista de Espera,Data Cadastro\n";
    const rows = reservations
      .map((r) => {
        const concert = concerts.find((c) => c.id === r.concertId);
        return `"${r.name}","${r.email}","${r.whatsapp}","${concert?.title || ""}",${r.quantity},${r.isWaitlist ? "Sim" : "Não"},"${r.createdAt}"`;
      })
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "leads-concertos-emufrn.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const stats = [
    {
      icon: Users,
      label: "Total de Leads",
      value: totalLeads,
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: Ticket,
      label: "Ingressos Reservados",
      value: totalReserved,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      icon: Clock,
      label: "Em Lista de Espera",
      value: totalWaitlist,
      color: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <div className="min-h-screen bg-secondary/40">
      {/* Top bar */}
      <header className="bg-white border-b border-border sticky top-0 z-40">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/favicon.png"
                alt="EMUFRN"
                className="h-7 w-7 rounded"
              />
              <div className="flex flex-col">
                <span className="font-display text-sm font-bold text-navy leading-tight">
                  Portal de Concertos
                </span>
                <span className="text-[9px] font-medium tracking-[0.12em] uppercase text-muted-foreground leading-tight">
                  EMUFRN
                </span>
              </div>
            </Link>
            <div className="hidden sm:flex items-center gap-1.5 ml-4 px-3 py-1 rounded-full bg-navy/5 text-navy">
              <BarChart3 className="h-3.5 w-3.5" />
              <span className="text-xs font-semibold">Dashboard</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Link to="/">
              <button className="text-xs font-medium text-muted-foreground hover:text-navy px-3 py-2 rounded-lg hover:bg-secondary transition-colors">
                Ver Site
              </button>
            </Link>
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="text-xs font-medium text-muted-foreground hover:text-destructive px-3 py-2 rounded-lg hover:bg-destructive/5 transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <div className="container px-4 py-8 space-y-8">
        {/* Page title */}
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Painel Administrativo
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gerencie concertos, reservas e leads do Portal de Concertos EMUFRN.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          {stats.map(({ icon: Icon, label, value, color }) => (
            <div
              key={label}
              className="bg-white rounded-xl border border-border p-6 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-sm text-muted-foreground">{label}</span>
              </div>
              <p className="text-3xl font-bold text-foreground">{value}</p>
            </div>
          ))}
        </div>

        {/* Concerts table */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-4 font-display">
            Concertos
          </h2>
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-xs font-semibold text-muted-foreground tracking-wide uppercase">
                      Evento
                    </th>
                    <th className="text-left p-4 text-xs font-semibold text-muted-foreground tracking-wide uppercase">
                      Data
                    </th>
                    <th className="text-center p-4 text-xs font-semibold text-muted-foreground tracking-wide uppercase">
                      Inscritos
                    </th>
                    <th className="text-center p-4 text-xs font-semibold text-muted-foreground tracking-wide uppercase">
                      Espera
                    </th>
                    <th className="text-center p-4 text-xs font-semibold text-muted-foreground tracking-wide uppercase">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {concerts.map((c) => {
                    const full = c.reservedTickets >= c.totalTickets;
                    const pct = Math.round(
                      (c.reservedTickets / c.totalTickets) * 100
                    );
                    return (
                      <tr
                        key={c.id}
                        className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors"
                      >
                        <td className="p-4 font-medium text-foreground">
                          {c.title}
                        </td>
                        <td className="p-4 text-muted-foreground">
                          {new Date(c.date).toLocaleDateString("pt-BR")}
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex flex-col items-center gap-1">
                            <span className="font-medium text-foreground">
                              {c.reservedTickets}/{c.totalTickets}
                            </span>
                            <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all ${
                                  full ? "bg-destructive" : "bg-emerald-500"
                                }`}
                                style={{ width: `${Math.min(pct, 100)}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-center text-muted-foreground">
                          {c.waitlistCount}
                        </td>
                        <td className="p-4 text-center">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                              full
                                ? "bg-red-50 text-red-700 border border-red-200"
                                : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                full ? "bg-red-500" : "bg-emerald-500"
                              }`}
                            />
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

        {/* Leads table */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground font-display">
              Base de Leads
            </h2>
            <button
              onClick={exportCSV}
              className="inline-flex items-center gap-2 text-xs font-semibold text-navy border border-border rounded-lg px-4 py-2.5 hover:bg-secondary transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              Exportar CSV
            </button>
          </div>
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-xs font-semibold text-muted-foreground tracking-wide uppercase">
                      Nome
                    </th>
                    <th className="text-left p-4 text-xs font-semibold text-muted-foreground tracking-wide uppercase">
                      E-mail
                    </th>
                    <th className="text-left p-4 text-xs font-semibold text-muted-foreground tracking-wide uppercase">
                      WhatsApp
                    </th>
                    <th className="text-left p-4 text-xs font-semibold text-muted-foreground tracking-wide uppercase">
                      Evento
                    </th>
                    <th className="text-center p-4 text-xs font-semibold text-muted-foreground tracking-wide uppercase">
                      Qtd
                    </th>
                    <th className="text-center p-4 text-xs font-semibold text-muted-foreground tracking-wide uppercase">
                      Tipo
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((r) => {
                    const concert = concerts.find(
                      (c) => c.id === r.concertId
                    );
                    return (
                      <tr
                        key={r.id}
                        className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors"
                      >
                        <td className="p-4 font-medium text-foreground">
                          {r.name}
                        </td>
                        <td className="p-4 text-muted-foreground">
                          {r.email}
                        </td>
                        <td className="p-4 text-muted-foreground">
                          {r.whatsapp}
                        </td>
                        <td className="p-4 text-muted-foreground">
                          {concert?.title || "-"}
                        </td>
                        <td className="p-4 text-center font-medium">
                          {r.quantity}
                        </td>
                        <td className="p-4 text-center">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                              r.isWaitlist
                                ? "bg-amber-50 text-amber-700 border border-amber-200"
                                : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            }`}
                          >
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
