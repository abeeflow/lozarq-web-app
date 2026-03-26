import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";
import { useLanguage } from '../contexts/LanguageContext';

const teamImg = '/Lozarq.JPG';

export default function EstudioPage() {
  const { t } = useLanguage();
  return (
    <div className="relative grid h-screen w-full grid-rows-[auto,1fr,auto] bg-background-light dark:bg-background-dark overflow-hidden">
      <Header />
      <div className="min-h-0 px-6 sm:px-8 md:px-10 lg:px-16 py-4 sm:py-6">
        <div className="mx-auto max-w-7xl h-full">
          <main className="h-full min-h-0 flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 flex-1 min-h-0 gap-8 md:gap-12 lg:gap-16 items-center">
              {/* Texto */}
              <section className="flex flex-col justify-center h-full min-h-0 overflow-hidden space-y-6 sm:space-y-8">
                <p className="text-xs font-light tracking-[0.2em] text-text-light/40 dark:text-text-dark/40">
                  {t.estudio.tagline}
                </p>
                <div className="space-y-4 max-w-lg text-sm sm:text-base font-light text-text-light/70 dark:text-text-dark/70 leading-relaxed text-justify">
                  <p>{t.estudio.parrafo1}</p>
                  <p>{t.estudio.parrafo2}</p>
                </div>

                {/* Separator */}
                <div className="w-12 h-px bg-primary/30"></div>

                {/* Contact info */}
                <address className="not-italic space-y-2 text-xs sm:text-sm font-light flex-shrink-0">
                  <p className="tracking-[0.15em] text-text-light/50 dark:text-text-dark/50">
                    Trujillo  |  Lima
                  </p>
                  <p>
                    <a href="mailto:lozarq.estudio@gmail.com" className="text-text-light/60 dark:text-text-dark/60 hover:text-primary transition-colors duration-300">
                      lozarq.estudio@gmail.com
                    </a>
                  </p>
                  <p>
                    <a
                      href="https://wa.me/51963103387?text=Hola%20Lozarq%20Estudio,%20quisiera%20m%C3%A1s%20informaci%C3%B3n."
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Abrir chat de WhatsApp"
                      className="text-text-light/60 dark:text-text-dark/60 hover:text-primary transition-colors duration-300"
                    >
                      +51 963 103 387
                    </a>
                  </p>
                </address>

                {/* Social */}
                <div className="flex items-center gap-5 sm:gap-6 flex-shrink-0">
                  <a
                    href="https://www.instagram.com/lozarqestudio/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-light/40 dark:text-text-dark/40 hover:text-primary transition-colors duration-300"
                  >
                    <FaInstagram className="text-base sm:text-lg" />
                  </a>
                  <a
                    href="https://www.facebook.com/p/Lozarq-Estudio-100082969437663/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-light/40 dark:text-text-dark/40 hover:text-primary transition-colors duration-300"
                  >
                    <FaFacebook className="text-base sm:text-lg" />
                  </a>
                  <a
                    href="https://www.tiktok.com/@lozarq.estudio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-light/40 dark:text-text-dark/40 hover:text-primary transition-colors duration-300"
                  >
                    <FaTiktok className="text-base sm:text-lg" />
                  </a>
                </div>
              </section>

              {/* Imagen */}
              <aside className="hidden md:flex items-center justify-center w-full h-full min-h-0">
                <figure className="w-full h-full max-h-full mx-auto overflow-hidden rounded-lg">
                  <img
                    src={teamImg}
                    alt="Equipo Lozarq Estudio"
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                </figure>
              </aside>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}