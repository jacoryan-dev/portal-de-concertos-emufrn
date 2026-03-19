import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Music, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { isAdmin, logout } = useApp();

  const navItems = [
    { label: "Início", href: "/" },
    { label: "Agenda", href: "/#agenda" },
    { label: "Como Doar", href: "/#doar" },
  ];

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/#")) {
      const id = href.replace("/#", "");
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-navy border-b border-navy-light/30">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <Music className="h-6 w-6 text-gold" />
          <span className="font-display text-lg font-bold text-gold">Concertos Vivos</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="text-sm font-medium text-gold-light/80 hover:text-gold transition-colors"
            >
              {item.label}
            </button>
          ))}
          {isAdmin ? (
            <>
              <Link to="/admin" className="text-sm font-medium text-gold-light/80 hover:text-gold transition-colors">
                Dashboard
              </Link>
              <Button variant="outline" size="sm" onClick={logout} className="border-gold/30 text-gold hover:bg-gold/10">
                Sair
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button variant="outline" size="sm" className="border-gold/30 text-gold hover:bg-gold/10">
                Login
              </Button>
            </Link>
          )}
        </nav>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-gold">
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-gradient-navy border-t border-navy-light/20 pb-4">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="block w-full text-left px-6 py-3 text-gold-light/80 hover:text-gold hover:bg-navy-light/20 transition-colors"
            >
              {item.label}
            </button>
          ))}
          {isAdmin ? (
            <>
              <Link to="/admin" onClick={() => setMobileOpen(false)} className="block px-6 py-3 text-gold-light/80 hover:text-gold">
                Dashboard
              </Link>
              <div className="px-6 pt-2">
                <Button variant="outline" size="sm" onClick={() => { logout(); setMobileOpen(false); }} className="border-gold/30 text-gold hover:bg-gold/10 w-full">
                  Sair
                </Button>
              </div>
            </>
          ) : (
            <div className="px-6 pt-2">
              <Link to="/login" onClick={() => setMobileOpen(false)}>
                <Button variant="outline" size="sm" className="border-gold/30 text-gold hover:bg-gold/10 w-full">
                  Login
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
