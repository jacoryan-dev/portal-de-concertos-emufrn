import { Shield } from "lucide-react";

const Footer = () => (
  <footer className="bg-gradient-navy py-16 border-t border-navy-light/20">
    <div className="container px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-3">
          <img src="/favicon.png" alt="EMUFRN" className="h-7 w-7 rounded" />
          <div className="flex flex-col">
            <span className="font-display text-sm font-bold text-white leading-tight">
              Portal de Concertos
            </span>
            <span className="text-[9px] font-medium tracking-[0.12em] uppercase text-white/40 leading-tight">
              EMUFRN
            </span>
          </div>
        </div>
        <div className="flex gap-8 text-sm text-white/40">
          <a href="#" className="hover:text-white transition-colors">
            Política de Privacidade
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Termos de Uso
          </a>
        </div>
      </div>

      <div className="border-t border-white/10 pt-8">
        <div className="flex items-start gap-3 max-w-3xl">
          <Shield className="h-4 w-4 text-white/20 mt-0.5 shrink-0" />
          <p className="text-[11px] text-white/30 leading-relaxed">
            <strong className="text-white/50">Transparência LGPD:</strong> Todos
            os dados coletados (E-mail e WhatsApp) são tratados com segurança e
            utilizados exclusivamente para o gerenciamento de ingressos e envio de
            novidades sobre nossos projetos e parceiros institucionais. Ao se
            cadastrar, você consente com o uso dos seus dados conforme descrito em
            nossa Política de Privacidade.
          </p>
        </div>
      </div>

      <p className="text-center text-[11px] text-white/20 mt-10">
        © {new Date().getFullYear()} Portal de Concertos EMUFRN — Escola de
        Música da UFRN. Todos os direitos reservados.
      </p>
    </div>
  </footer>
);

export default Footer;
