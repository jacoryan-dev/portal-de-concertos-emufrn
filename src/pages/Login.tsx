import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Music } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    <div className="min-h-screen bg-gradient-navy flex items-center justify-center p-4">
      <div className="w-full max-w-sm animate-fade-in">
        <div className="text-center mb-8">
          <Music className="h-10 w-10 text-gold mx-auto mb-4" />
          <h1 className="font-display text-2xl font-bold text-card">Área Administrativa</h1>
          <p className="text-gold-light/50 text-sm mt-2">Acesso restrito à equipe do projeto</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-xl p-6 shadow-2xl space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                placeholder="Digite a senha"
                className="pl-10"
              />
            </div>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full bg-gradient-gold text-accent-foreground font-semibold hover:opacity-90">
            Entrar
          </Button>
          <p className="text-xs text-center text-muted-foreground">Demo: senha é <code className="bg-muted px-1.5 py-0.5 rounded">admin123</code></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
