import { Music, Shield } from "lucide-react";

const Footer = () => (
  <footer className="bg-navy-dark py-12 border-t border-navy-light/20">
    <div className="container px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-2">
          <Music className="h-5 w-5 text-gold" />
          <span className="font-display text-lg font-bold text-gold">Concertos Vivos</span>
        </div>
        <div className="flex gap-6 text-sm text-gold-light/50">
          <a href="#" className="hover:text-gold transition-colors">Política de Privacidade</a>
          <a href="#" className="hover:text-gold transition-colors">Termos de Uso</a>
        </div>
      </div>

      <div className="border-t border-navy-light/10 pt-6">
        <div className="flex items-start gap-3 max-w-3xl">
          <Shield className="h-5 w-5 text-gold/50 mt-0.5 shrink-0" />
          <p className="text-xs text-gold-light/40 leading-relaxed">
            <strong className="text-gold-light/60">Transparência LGPD:</strong> Todos os dados coletados
            (E-mail e WhatsApp) são tratados com segurança e utilizados exclusivamente para o
            gerenciamento de ingressos e envio de novidades sobre nossos projetos e parceiros
            institucionais. Ao se cadastrar, você consente com o uso dos seus dados conforme
            descrito em nossa Política de Privacidade.
          </p>
        </div>
      </div>

      <p className="text-center text-xs text-gold-light/30 mt-8">
        © {new Date().getFullYear()} Concertos Vivos. Todos os direitos reservados.
      </p>
    </div>
  </footer>
);

export default Footer;
