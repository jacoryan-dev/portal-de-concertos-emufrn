import { Heart, Building2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const DonationSection = () => {
  return (
    <section id="doar" className="py-20 bg-gradient-navy">
      <div className="container px-4">
        <div className="text-center mb-14">
          <p className="text-gold font-medium tracking-widest uppercase text-sm mb-3">Faça a diferença</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-card">
            Como Apoiar nosso Projeto
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {/* Pessoa Física */}
          <div className="bg-card/5 backdrop-blur border border-gold/10 rounded-xl p-8">
            <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-6">
              <Heart className="h-6 w-6 text-gold" />
            </div>
            <h3 className="font-display text-xl font-semibold text-card mb-4">Para Você (Pessoa Física)</h3>
            <p className="text-gold-light/60 text-sm leading-relaxed mb-6">
              Sua contribuição individual mantém a música viva e acessível a todos.
              Ao doar, você ajuda a custear a logística dos concertos, a manutenção
              de instrumentos e a remuneração de jovens talentos. Escolha o valor
              que cabe no seu bolso e faça parte da nossa história.
            </p>
            <Button className="bg-gradient-gold text-accent-foreground hover:opacity-90 w-full font-semibold">
              <Heart className="h-4 w-4 mr-2" />
              Doar via PIX / Cartão
            </Button>
          </div>

          {/* Pessoa Jurídica */}
          <div className="bg-card/5 backdrop-blur border border-gold/10 rounded-xl p-8">
            <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-6">
              <Building2 className="h-6 w-6 text-gold" />
            </div>
            <h3 className="font-display text-xl font-semibold text-card mb-4">Para sua Empresa (Pessoa Jurídica)</h3>
            <p className="text-gold-light/60 text-sm leading-relaxed mb-6">
              Invista em cultura e fortaleça sua responsabilidade social. Empresas
              parceiras contam com visibilidade em nossos materiais de divulgação,
              cotas de ingressos exclusivos para colaboradores e a possibilidade de
              abatimento fiscal (Lei de Incentivo à Cultura).
            </p>
            <Button variant="outline" className="border-gold/30 text-gold hover:bg-gold/10 w-full font-semibold">
              <ExternalLink className="h-4 w-4 mr-2" />
              Falar com nossa Equipe de Parcerias
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;
