import { NavLink, Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-10 p-6 md:p-8 lg:p-10">
      <div className="mx-auto flex max-w-7xl items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-4 text-text-light dark:text-text-dark hover:opacity-80 transition-opacity"
        >
          <a href="/" className="flex items-center gap-3">
        <img
          src="/Lozarq_Logotipo2.png"
          alt="Lozarq Logo"
          className="h-16 w-auto"
        />
        
      </a>
          
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

          <NavLink
            to="/proyectos"
            className={({ isActive }) =>
              isActive
                ? "text-sm font-bold tracking-wide text-primary border-b-2 border-primary transition-colors"
                : "text-sm font-medium tracking-wide text-text-light dark:text-text-dark hover:text-primary dark:hover:text-primary transition-colors"
            }
          >
            Proyectos
          </NavLink>

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
        <button className="md:hidden text-text-light dark:text-text-dark">
          <span className="material-symbols-outlined">menu</span>
        </button>

      </div>
    </header>
  );
}