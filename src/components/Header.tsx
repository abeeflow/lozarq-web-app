import { useState, useRef } from "react";
import { NavLink, Link } from "react-router-dom";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectsDropdownOpen, setProjectsDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef<number | null>(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleMouseEnterProjects = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setProjectsDropdownOpen(true);
  };

  const handleMouseLeaveProjects = () => {
    dropdownTimeoutRef.current = window.setTimeout(() => {
      setProjectsDropdownOpen(false);
    }, 300);
  };

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-10 p-6 md:p-8 lg:p-10">
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
                  ? "text-sm font-bold tracking-wide text-primary border-b-2 border-primary transition-colors"
                  : "text-sm font-medium tracking-wide text-text-light dark:text-text-dark hover:text-primary dark:hover:text-primary transition-colors"
              }
            >
              Home
            </NavLink>

            {/* Projects Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnterProjects}
              onMouseLeave={handleMouseLeaveProjects}
            >
              <NavLink
                to="/proyectos"
                className={({ isActive }) =>
                  isActive
                    ? "text-sm font-bold tracking-wide text-primary border-b-2 border-primary transition-colors flex items-center gap-1"
                    : "text-sm font-medium tracking-wide text-text-light dark:text-text-dark hover:text-primary dark:hover:text-primary transition-colors flex items-center gap-1"
                }
              >
                Proyectos
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </NavLink>

              {/* Dropdown Menu */}
              {projectsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                  <Link
                    to="/proyectos?categoria=proyecto-1"
                    className="block px-4 py-2 text-sm text-text-light dark:text-text-dark hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    Proyecto 1
                  </Link>
                  <Link
                    to="/proyectos?categoria=proyecto-2"
                    className="block px-4 py-2 text-sm text-text-light dark:text-text-dark hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    Proyecto 2
                  </Link>
                  <Link
                    to="/proyectos?categoria=proyecto-3"
                    className="block px-4 py-2 text-sm text-text-light dark:text-text-dark hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    Proyecto 3
                  </Link>
                </div>
              )}
            </div>

            <NavLink
              to="/servicios"
              className={({ isActive }) =>
                isActive
                  ? "text-sm font-bold tracking-wide text-primary border-b-2 border-primary transition-colors"
                  : "text-sm font-medium tracking-wide text-text-light dark:text-text-dark hover:text-primary dark:hover:text-primary transition-colors"
              }
            >
              Servicios
            </NavLink>

            <NavLink
              to="/estudio"
              className={({ isActive }) =>
                isActive
                  ? "text-sm font-bold tracking-wide text-primary border-b-2 border-primary transition-colors"
                  : "text-sm font-medium tracking-wide text-text-light dark:text-text-dark hover:text-primary dark:hover:text-primary transition-colors"
              }
            >
              Estudio
            </NavLink>

            <NavLink
              to="/contacto"
              className={({ isActive }) =>
                isActive
                  ? "text-sm font-bold tracking-wide text-primary border-b-2 border-primary transition-colors"
                  : "text-sm font-medium tracking-wide text-text-light dark:text-text-dark hover:text-primary dark:hover:text-primary transition-colors"
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
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={closeMobileMenu}
          />

          {/* Mobile Menu */}
          <div className="fixed top-0 right-0 bottom-0 w-64 bg-background-light dark:bg-background-dark z-30 md:hidden shadow-xl transform transition-transform duration-300 ease-in-out">
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
                      ? "text-lg font-bold text-primary border-b-2 border-primary pb-2"
                      : "text-lg font-medium text-text-light dark:text-text-dark hover:text-primary pb-2"
                  }
                >
                  Home
                </NavLink>

                <div>
                  <NavLink
                    to="/proyectos"
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      isActive
                        ? "text-lg font-bold text-primary border-b-2 border-primary pb-2"
                        : "text-lg font-medium text-text-light dark:text-text-dark hover:text-primary pb-2"
                    }
                  >
                    Proyectos
                  </NavLink>
                  <div className="ml-4 mt-2 space-y-2">
                    <Link
                      to="/proyectos?categoria=proyecto-1"
                      onClick={closeMobileMenu}
                      className="block text-sm text-text-light/70 dark:text-text-dark/70 hover:text-primary"
                    >
                      → Proyecto 1
                    </Link>
                    <Link
                      to="/proyectos?categoria=proyecto-2"
                      onClick={closeMobileMenu}
                      className="block text-sm text-text-light/70 dark:text-text-dark/70 hover:text-primary"
                    >
                      → Proyecto 2
                    </Link>
                    <Link
                      to="/proyectos?categoria=proyecto-3"
                      onClick={closeMobileMenu}
                      className="block text-sm text-text-light/70 dark:text-text-dark/70 hover:text-primary"
                    >
                      → Proyecto 3
                    </Link>
                  </div>
                </div>

                <NavLink
                  to="/servicios"
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    isActive
                      ? "text-lg font-bold text-primary border-b-2 border-primary pb-2"
                      : "text-lg font-medium text-text-light dark:text-text-dark hover:text-primary pb-2"
                  }
                >
                  Servicios
                </NavLink>

                <NavLink
                  to="/estudio"
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    isActive
                      ? "text-lg font-bold text-primary border-b-2 border-primary pb-2"
                      : "text-lg font-medium text-text-light dark:text-text-dark hover:text-primary pb-2"
                  }
                >
                  Estudio
                </NavLink>

                <NavLink
                  to="/contacto"
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    isActive
                      ? "text-lg font-bold text-primary border-b-2 border-primary pb-2"
                      : "text-lg font-medium text-text-light dark:text-text-dark hover:text-primary pb-2"
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
