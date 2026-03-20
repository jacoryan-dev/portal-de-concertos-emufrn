import { Heart, Building2, ExternalLink, Shield, CheckCircle } from "lucide-react";

const DonationSection = () => {
  return (
    <section id="doar" className="py-24 md:py-32 bg-secondary/50">
      <div className="container px-4">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-gold-dark mb-4">
            Apoie a Cultura
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Como Apoiar nosso Projeto
          </h2>
          <div className="section-divider mt-6" />
          <p className="text-muted-foreground text-base max-w-2xl mx-auto mt-6 leading-relaxed">
            Sua contribuição mantém a música viva e acessível. Escolha a melhor
            forma de apoiar a Escola de Música da UFRN.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          {/* Pessoa Física */}
          <div className="card-institutional p-8">
            <div className="w-12 h-12 bg-navy/5 rounded-xl flex items-center justify-center mb-6">
              <Heart className="h-5 w-5 text-navy" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground mb-2">
              Para Você
            </h3>
            <span className="inline-block text-xs font-medium text-muted-foreground tracking-wider uppercase mb-4">
              Pessoa Física
            </span>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Sua contribuição individual mantém a música viva e acessível a todos.
              Ao doar, você ajuda a custear a logística dos concertos, a manutenção
              de instrumentos e a formação de jovens talentos.
            </p>

            <ul className="space-y-3 mb-8">
              {["Doe qualquer valor via PIX", "Recibo para declaração de IR", "Selo de Apoiador Cultural"].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/80">
                  <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <button className="w-full font-semibold py-3 px-6 rounded-lg text-sm bg-navy text-white hover:bg-navy-light transition-all duration-300 shadow-sm hover:shadow-md">
              <span className="flex items-center justify-center gap-2">
                <Heart className="h-4 w-4" />
                Doar via PIX / Cartão
              </span>
            </button>
          </div>

          {/* Pessoa Jurídica — Premium Card */}
          <div className="card-premium p-8 relative overflow-hidden">
            {/* Premium badge */}
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-gold/10 text-gold-dark border border-gold/20">
                Premium
              </span>
            </div>

            <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-6">
              <Building2 className="h-5 w-5 text-gold-dark" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground mb-2">
              Para sua Empresa
            </h3>
            <span className="inline-block text-xs font-medium text-gold-dark tracking-wider uppercase mb-4">
              Pessoa Jurídica
            </span>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Invista em cultura e fortaleça sua responsabilidade social. Empresas
              parceiras contam com visibilidade institucional e possibilidade de
              abatimento fiscal pela Lei de Incentivo à Cultura.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                "Visibilidade em materiais de divulgação",
                "Cotas de ingressos para colaboradores",
                "Abatimento fiscal (Lei de Incentivo)",
                "Relatório de impacto social personalizado",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/80">
                  <CheckCircle className="h-4 w-4 text-gold-dark mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <button className="w-full font-semibold py-3 px-6 rounded-lg text-sm bg-gradient-gold text-white hover:opacity-90 transition-all duration-300 shadow-sm hover:shadow-md">
              <span className="flex items-center justify-center gap-2">
                <ExternalLink className="h-4 w-4" />
                Falar com Equipe de Parcerias
              </span>
            </button>

            {/* Trust indicator */}
            <div className="flex items-center gap-2 mt-6 pt-5 border-t border-gold/10">
              <Shield className="h-4 w-4 text-gold-dark/50 shrink-0" />
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Processo transparente com nota fiscal e contrato formal. Dados
                protegidos conforme a LGPD.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;
