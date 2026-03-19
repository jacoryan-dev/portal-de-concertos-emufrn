import heroImage from "@/assets/hero-concert.jpg";

const HeroSection = () => {
  const scrollToAgenda = () => {
    document.getElementById("agenda")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Concerto ao vivo" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/80 via-navy/70 to-navy-dark/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 container text-center px-4 animate-fade-in">
        <p className="text-gold font-medium tracking-[0.3em] uppercase text-sm mb-6">
          Projeto Cultural
        </p>
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-card mb-6 leading-tight">
          A música que{" "}
          <span className="text-gradient-gold">transforma</span>
          <br />vidas começa aqui
        </h1>
        <p className="text-gold-light/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
          Concertos gratuitos que levam música clássica de qualidade para todos.
          Retire seu ingresso e faça parte dessa experiência.
        </p>
        <button
          onClick={scrollToAgenda}
          className="inline-flex items-center gap-2 bg-gradient-gold text-accent-foreground font-semibold px-8 py-4 rounded-lg text-lg hover:opacity-90 transition-opacity shadow-lg shadow-gold/20"
        >
          Ver Agenda de Concertos
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
