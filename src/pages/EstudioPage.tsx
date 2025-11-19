import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";

const teamImg = '/Lozarq.JPG';

export default function EstudioPage() {
  return (
    <div className="relative grid h-screen w-full grid-rows-[auto,1fr,auto] bg-background-light dark:bg-background-dark overflow-hidden">
      <Header />
      <div className="min-h-0 px-3 sm:px-4 md:px-6 lg:px-[clamp(12px,3.2vw,48px)] py-1 sm:py-2">
        <div className="mx-auto max-w-7xl h-full">
          <main className="h-full min-h-0 flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 flex-1 min-h-0 gap-2 sm:gap-3 md:gap-4 lg:gap-[clamp(8px,2vw,20px)] items-center">
              <section className="space-y-2 sm:space-y-2.5 md:space-y-3 flex flex-col justify-center h-full min-h-0 overflow-hidden">
              <div className="space-y-1.5 sm:space-y-2 md:space-y-2.5 max-w-2xl leading-tight sm:leading-snug md:leading-[1.4] text-text-light dark:text-text-dark text-justify text-xs sm:text-sm md:text-[clamp(0.85rem,1.1vw,1rem)]">
                <p>
                  Lozarq Estudio es un estudio de arquitectura e interiorismo ubicado en Trujillo, 
                  especializado en diseñar y transformar espacios residenciales, comerciales y corporativos. 
                  Ofrecen un servicio integral que va desde la concepción del concepto hasta la ejecución 
                  final de la obra, incluyendo diseño arquitectónico, remodelaciones, selección de materiales 
                  y mobiliario a medida. Su enfoque combina estética moderna, funcionalidad y un alto grado 
                  de personalización según las necesidades del cliente.
                </p>
                <p>
                  Se distinguen por ofrecer un trato cercano, transparente y profesional, diseñando 
                  cada proyecto como único, sin plantillas genéricas. Su objetivo es crear ambientes 
                  que reflejen la identidad del usuario y mejoren su experiencia en el espacio, 
                  garantizando soluciones prácticas, armoniosas y ejecutadas con rigor técnico.
                </p>
                
              </div>
              <address className="not-italic space-y-0.5 sm:space-y-1 text-[10px] sm:text-xs md:text-[clamp(0.7rem,0.95vw,0.85rem)] flex-shrink-0">
                <p className="font-semibold">
                  Trujillo <span className="mx-1.5 sm:mx-2">|</span> Lima 
                </p>
                
                <p>
                  <a href="mailto:lozarq.estudio@gmail.com" className="underline hover:opacity-80">
                    lozarq.estudio@gmail.com
                  </a>
                </p>
                <p>
                  <a
                    href="https://wa.me/51963103387?text=Hola%20Lozarq%20Estudio,%20quisiera%20m%C3%A1s%20informaci%C3%B3n."
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Abrir chat de WhatsApp"
                    className="underline hover:opacity-80"
                  >
                    +51 963 103 387
                  </a>
                </p>
              </address>
              <div className="flex flex-wrap items-center gap-x-2 sm:gap-x-3 gap-y-1 flex-shrink-0">
                <a
                  href="https://www.instagram.com/lozarqestudio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs md:text-[clamp(0.7rem,0.95vw,0.85rem)] text-gray-700 hover:text-black transition-colors"
                >
                  <FaInstagram className="text-sm sm:text-base md:text-lg" />
                  <span className="tracking-wide hover:opacity-80 underline">INSTAGRAM</span>
                </a>
                <a
                  href="https://www.facebook.com/p/Lozarq-Estudio-100082969437663/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs md:text-[clamp(0.7rem,0.95vw,0.85rem)] text-gray-700 hover:text-black transition-colors"
                >
                  <FaFacebook className="text-sm sm:text-base md:text-lg" />
                  <span className="tracking-wide hover:opacity-80 underline">FACEBOOK</span>
                </a>
                <a
                  href="https://www.tiktok.com/@lozarq.estudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs md:text-[clamp(0.7rem,0.95vw,0.85rem)] text-gray-700 hover:text-black transition-colors"
                >
                  <FaTiktok className="text-sm sm:text-base md:text-lg" />
                  <span className="tracking-wide hover:opacity-80 underline">TIK-TOK</span>
                </a>
              </div>
            </section>
            <aside className="flex items-center justify-center w-full h-full min-h-0">
              <figure className="w-full h-full max-h-full mx-auto overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl shadow-lg">
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