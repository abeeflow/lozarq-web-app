import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

const navLinkBase = "text-sm font-light tracking-[0.15em] pb-1 transition-all duration-300";
const navLinkActive = `${navLinkBase} text-primary border-b border-primary`;
const navLinkInactive = `${navLinkBase} text-text-light/70 dark:text-text-dark/70 hover:text-text-light dark:hover:text-text-dark border-b border-transparent hover:border-text-light/30 dark:hover:border-text-dark/30`;

const mobileLinkBase = "text-lg font-light tracking-[0.15em] pb-1";
const mobileLinkActive = `${mobileLinkBase} text-primary border-b border-primary`;
const mobileLinkInactive = `${mobileLinkBase} text-text-light/70 dark:text-text-dark/70 hover:text-text-light dark:hover:text-text-dark transition-all duration-300`;

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const navItems = [
    { to: "/", label: t.nav.home, end: true },
    { to: "/proyectos", label: t.nav.proyectos },
    { to: "/servicios", label: t.nav.servicios },
    { to: "/estudio", label: t.nav.estudio },
    { to: "/contacto", label: t.nav.contacto },
  ];

  const LanguageToggle = ({ className = "" }: { className?: string }) => (
    <div className={`flex items-center gap-1 ${className}`}>
      <button
        onClick={() => setLang('es')}
        className={`text-xs font-light tracking-[0.15em] px-1.5 py-0.5 transition-all duration-300 ${
          lang === 'es'
            ? 'text-primary'
            : 'text-text-light/30 dark:text-text-dark/30 hover:text-text-light/60 dark:hover:text-text-dark/60'
        }`}
      >
        ES
      </button>
      <span className="text-text-light/20 dark:text-text-dark/20 text-xs">|</span>
      <button
        onClick={() => setLang('en')}
        className={`text-xs font-light tracking-[0.15em] px-1.5 py-0.5 transition-all duration-300 ${
          lang === 'en'
            ? 'text-primary'
            : 'text-text-light/30 dark:text-text-dark/30 hover:text-text-light/60 dark:hover:text-text-dark/60'
        }`}
      >
        EN
      </button>
    </div>
  );

  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-50 px-6 py-4 md:px-8 md:py-5 lg:px-10 lg:py-6 bg-background-light dark:bg-background-dark">
        <div className="mx-auto flex max-w-7xl items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-4 text-text-light dark:text-text-dark hover:opacity-80 transition-opacity"
          >
            <img
              src="/Lozarq_Logotipo2.png"
              alt="Lozarq Estudio - Arquitectura e Interiorismo"
              className="h-16 w-auto"
              loading="eager"
              fetchPriority="high"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10 lg:gap-12">
            <nav className="flex items-center gap-10 lg:gap-12">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) => isActive ? navLinkActive : navLinkInactive}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <LanguageToggle />
          </div>

          {/* Mobile: Language + Menu */}
          <div className="flex md:hidden items-center gap-3">
            <LanguageToggle />
            <button
              onClick={toggleMobileMenu}
              className="text-text-light dark:text-text-dark"
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>

        </div>
        {/* Linea decorativa */}
        <div className="flex justify-center mt-4 md:mt-5">
          <div className="w-[60%] h-px bg-primary/20"></div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={closeMobileMenu}
          />
          <div className="fixed top-0 right-0 bottom-0 w-64 bg-background-light dark:bg-background-dark z-50 md:hidden shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-end mb-8">
                <button
                  onClick={closeMobileMenu}
                  className="text-text-light dark:text-text-dark"
                  aria-label="Close menu"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <nav className="flex flex-col gap-8">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    onClick={closeMobileMenu}
                    className={({ isActive }) => isActive ? mobileLinkActive : mobileLinkInactive}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  );
}
