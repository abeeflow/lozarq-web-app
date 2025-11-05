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
          <div className="size-6 text-primary">
            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z"></path>
            </svg>
          </div>
          <h2 className="text-lg font-bold">Estudio de Diseño</h2>
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