import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-50 p-6 md:p-8 lg:p-10 bg-background-light dark:bg-background-dark border-b border-gray-200 dark:border-gray-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-4 text-text-light dark:text-text-dark hover:opacity-80 transition-opacity"
          >
            <img
              src="/Lozarq_Logotipo2.png"
              alt="Lozarq Logo"
              className="h-16 w-auto"
            />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-6 md:gap-8">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? "text-base font-bold tracking-wide text-primary border-b-2 border-primary transition-colors uppercase"
                  : "text-base font-medium tracking-wide text-text-light dark:text-text-dark hover:text-primary dark:hover:text-primary transition-colors uppercase"
              }
            >
              Home
            </NavLink>

            {/* Projects Dropdown */}
            
            <NavLink
              to="/proyectos"
              className={({ isActive }) =>
                isActive
                  ? "text-base font-bold tracking-wide text-primary border-b-2 border-primary transition-colors flex items-center gap-1 uppercase"
                  : "text-base font-medium tracking-wide text-text-light dark:text-text-dark hover:text-primary dark:hover:text-primary transition-colors flex items-center gap-1 uppercase"
              }
            >
              Proyectos
              
            </NavLink>

            <NavLink
              to="/servicios"
              className={({ isActive }) =>
                isActive
                  ? "text-base font-bold tracking-wide text-primary border-b-2 border-primary transition-colors uppercase"
                  : "text-base font-medium tracking-wide text-text-light dark:text-text-dark hover:text-primary dark:hover:text-primary transition-colors uppercase"
              }
            >
              Servicios
            </NavLink>

            <NavLink
              to="/estudio"
              className={({ isActive }) =>
                isActive
                  ? "text-base font-bold tracking-wide text-primary border-b-2 border-primary transition-colors uppercase"
                  : "text-base font-medium tracking-wide text-text-light dark:text-text-dark hover:text-primary dark:hover:text-primary transition-colors uppercase"
              }
            >
              Estudio
            </NavLink>

            <NavLink
              to="/contacto"
              className={({ isActive }) =>
                isActive
                  ? "text-base font-bold tracking-wide text-primary border-b-2 border-primary transition-colors uppercase"
                  : "text-base font-medium tracking-wide text-text-light dark:text-text-dark hover:text-primary dark:hover:text-primary transition-colors uppercase"
              }
            >
              Contacto
            </NavLink>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-text-light dark:text-text-dark"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>

        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={closeMobileMenu}
          />

          {/* Mobile Menu */}
          <div className="fixed top-0 right-0 bottom-0 w-64 bg-background-light dark:bg-background-dark z-50 md:hidden shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full p-6">
              {/* Close Button */}
              <div className="flex justify-end mb-8">
                <button
                  onClick={closeMobileMenu}
                  className="text-text-light dark:text-text-dark"
                  aria-label="Close menu"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="flex flex-col gap-6">
                <NavLink
                  to="/"
                  end
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    isActive
                      ? "text-xl font-bold text-primary border-b-2 border-primary pb-2 uppercase"
                      : "text-xl font-medium text-text-light dark:text-text-dark hover:text-primary pb-2 uppercase"
                  }
                >
                  Home
                </NavLink>

                <NavLink
                  to="/proyectos"
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    isActive
                      ? "text-xl font-bold text-primary border-b-2 border-primary pb-2 uppercase"
                      : "text-xl font-medium text-text-light dark:text-text-dark hover:text-primary pb-2 uppercase"
                  }
                >
                  Proyectos
                </NavLink>

                <NavLink
                  to="/servicios"
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    isActive
                      ? "text-xl font-bold text-primary border-b-2 border-primary pb-2 uppercase"
                      : "text-xl font-medium text-text-light dark:text-text-dark hover:text-primary pb-2 uppercase"
                  }
                >
                  Servicios
                </NavLink>

                <NavLink
                  to="/estudio"
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    isActive
                      ? "text-xl font-bold text-primary border-b-2 border-primary pb-2 uppercase"
                      : "text-xl font-medium text-text-light dark:text-text-dark hover:text-primary pb-2 uppercase"
                  }
                >
                  Estudio
                </NavLink>

                <NavLink
                  to="/contacto"
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    isActive
                      ? "text-xl font-bold text-primary border-b-2 border-primary pb-2 uppercase"
                      : "text-xl font-medium text-text-light dark:text-text-dark hover:text-primary pb-2 uppercase"
                  }
                >
                  Contacto
                </NavLink>
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  );
}
