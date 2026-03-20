import heroImage from "@/assets/hero-concert.png";

const HeroSection = () => {
  const scrollToAgenda = () => {
    document.getElementById("agenda")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Concerto da EMUFRN"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220,75%,6%,0.85)] via-[hsl(220,65%,12%,0.75)] to-[hsl(220,75%,6%,0.92)]" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gold/5 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-navy-light/10 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 container text-center px-4 animate-fade-in">
        <div className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          <span className="text-white/70 font-medium tracking-[0.2em] uppercase text-xs">
            Escola de Música da UFRN
          </span>
        </div>

        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] max-w-4xl mx-auto">
          A música que{" "}
          <span className="text-gradient-gold">transforma</span>
          <br className="hidden md:block" />
          {" "}vidas começa aqui
        </h1>

        <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
          Concertos gratuitos que levam música clássica de qualidade para todos.
          Retire seu ingresso e faça parte dessa experiência.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={scrollToAgenda}
            className="inline-flex items-center gap-2 bg-white text-navy font-semibold px-10 py-4 rounded-lg text-base hover:bg-white/95 transition-all duration-300 shadow-2xl shadow-black/20 hover:shadow-black/30 hover:-translate-y-0.5"
          >
            Retirar Ingresso
          </button>
          <button
            onClick={() => document.getElementById("doar")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 text-gradient-gold font-medium px-8 py-4 rounded-lg text-sm border border-gold/30 hover:border-gold/60 hover:bg-gold/5 transition-all duration-300"
          >
            Apoie o Projeto
          </button>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
