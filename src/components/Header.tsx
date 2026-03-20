import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAdmin, logout } = useApp();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Início", href: "/" },
    { label: "Agenda", href: "/#agenda" },
    { label: "Apoie", href: "/#doar" },
  ];

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/#")) {
      const id = href.replace("/#", "");
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-white border-b border-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-[4.5rem]">
        <Link to="/" className="flex items-center gap-3">
          <img src="/favicon.png" alt="EMUFRN" className="h-8 w-8 rounded" />
          <div className="flex flex-col">
            <span className="font-display text-base font-bold text-navy leading-tight">
              Portal de Concertos
            </span>
            <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-muted-foreground leading-tight">
              EMUFRN
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="text-sm font-medium text-foreground/70 hover:text-navy transition-colors relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-navy group-hover:w-full transition-all duration-300" />
            </button>
          ))}
          {isAdmin ? (
            <>
              <Link
                to="/admin"
                className="text-sm font-medium text-foreground/70 hover:text-navy transition-colors"
              >
                Dashboard
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="border-navy/20 text-navy hover:bg-navy/5 text-xs"
              >
                Sair
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button
                variant="outline"
                size="sm"
                className="border-navy/20 text-navy hover:bg-navy/5 text-xs"
              >
                Área Admin
              </Button>
            </Link>
          )}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-navy p-2"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-border pb-4 shadow-lg animate-fade-in">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="block w-full text-left px-6 py-3.5 text-sm text-foreground/80 hover:text-navy hover:bg-secondary transition-colors"
            >
              {item.label}
            </button>
          ))}
          {isAdmin ? (
            <>
              <Link
                to="/admin"
                onClick={() => setMobileOpen(false)}
                className="block px-6 py-3.5 text-sm text-foreground/80 hover:text-navy"
              >
                Dashboard
              </Link>
              <div className="px-6 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => { logout(); setMobileOpen(false); }}
                  className="border-navy/20 text-navy hover:bg-navy/5 w-full text-xs"
                >
                  Sair
                </Button>
              </div>
            </>
          ) : (
            <div className="px-6 pt-2">
              <Link to="/login" onClick={() => setMobileOpen(false)}>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-navy/20 text-navy hover:bg-navy/5 w-full text-xs"
                >
                  Área Admin
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
