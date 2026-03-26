import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';

export default function HomePage() {
  const { t } = useLanguage();
  return (
    <div className="relative grid h-screen w-full grid-rows-[auto,1fr,auto] bg-background-light dark:bg-background-dark overflow-hidden">
      <Header />
      <div className="min-h-0 h-full">
        <main className="h-full grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Columna izquierda - Texto */}
          <div className="flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 py-8 md:py-0">
            <p className="text-xs tracking-[0.2em] text-text-light/50 dark:text-text-dark/50 font-light mb-6">
              {t.home.tagline}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-[3.5rem] font-bold leading-tight text-text-light dark:text-text-dark mb-6">
              {t.home.title}
            </h1>
            <p className="text-sm sm:text-base text-text-light/60 dark:text-text-dark/60 font-light leading-relaxed mb-8 max-w-lg">
              {t.home.description}
            </p>
            <div>
              <Link
                to="/proyectos"
                className="inline-block px-8 py-3 bg-primary text-white text-sm font-light tracking-[0.1em] rounded hover:bg-primary/90 transition-colors duration-300"
              >
                {t.home.cta}
              </Link>
            </div>
          </div>

          {/* Columna derecha - Imagen */}
          <div className="hidden md:flex h-full items-center pr-8 lg:pr-12 xl:pr-16 py-6">
            <div className="w-full h-full rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&q=90"
                alt="Lozarq Estudio - Arquitectura e Interiorismo"
                className="w-full h-full object-cover"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>

          {/* Imagen mobile (debajo del texto) */}
          <div className="md:hidden px-8 pb-8">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&q=90"
                alt="Lozarq Estudio - Arquitectura e Interiorismo"
                className="w-full h-48 sm:h-56 object-cover"
                loading="eager"
              />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
