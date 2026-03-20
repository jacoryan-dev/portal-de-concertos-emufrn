import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Lock, ArrowLeft } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

const Login = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      navigate("/admin");
    } else {
      setError("Senha incorreta. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm animate-fade-in">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-navy transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar ao site
        </Link>

        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-navy rounded-xl flex items-center justify-center mx-auto mb-5">
            <Lock className="h-6 w-6 text-white" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Área Administrativa
          </h1>
          <p className="text-muted-foreground text-sm mt-2">
            Acesso restrito à equipe do projeto
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-7 shadow-sm border border-border space-y-5"
        >
          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="block text-xs font-semibold text-foreground/80 tracking-wide uppercase"
            >
              Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Digite a senha"
                className="input-md3"
                style={{ paddingLeft: "2.5rem" }}
              />
            </div>
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
            Entrar
          </button>

          <p className="text-xs text-center text-muted-foreground">
            Demo: senha é{" "}
            <code className="bg-secondary px-1.5 py-0.5 rounded text-foreground font-mono">
              admin123
            </code>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
