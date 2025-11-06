// src/pages/EstudioPage.tsx
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";

// Reemplaza por tu imagen real (p.e. import teamImg from '../assets/estudio.jpg')
const teamImg = '/foto_portadada_v2.jpg';

export default function EstudioPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
      <div className="flex-1 mx-auto max-w-7xl px-4 md:px-6 lg:px-10">
        <Header />
        <main className="mt-24">
          {/* Grid principal: texto a la izquierda, imagen a la derecha */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Columna izquierda */}
            <section className="space-y-8 mt-18">
          
              <div className="space-y-5 max-w-xl leading-relaxed text-text-light dark:text-text-dark text-justify mt-12">
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
              {/* Bloque de contacto */}
              <address className="not-italic space-y-1 text-sm">
                <p className="font-semibold">
                  Trujillo <span className="mx-2">|</span> Lima 
                </p>
                
                <p>
                  <a href="mailto:info@lozarqstudio.com" className="underline hover:opacity-80">
                    info@lozarqstudio.com
                  </a>
                </p>
                <p>
                  <a href="tel:+51931103387" className="underline hover:opacity-80">+51 931 103 387</a>
                  <span className="mx-2">|</span>
                  <a href="tel:+51931103387" className="underline hover:opacity-80">+51 931 103 387</a>
                </p>
              </address>
              
              {/* Redes sociales */}
              <div className="space-y-4">
                <a
                  href="https://www.instagram.com/lozarqestudio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-700 hover:text-black transition-colors"
                >
                  <FaInstagram className="text-2xl" />
                  <span className="text-sm tracking-wide hover:opacity-80 underline">
                    INSTAGRAM
                  </span>
                </a>
                
                <a
                  href="https://www.facebook.com/p/Lozarq-Estudio-100082969437663/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-700 hover:text-black transition-colors"
                >
                  <FaFacebook className="text-2xl" />
                  <span className="text-sm tracking-wide hover:opacity-80 underline">
                    FACEBOOK
                  </span>
                </a>
                <a
                  href="https://www.tiktok.com/@lozarq.estudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-700 hover:text-black transition-colors"
                >
                  <FaTiktok className="text-2xl" />
                  <span className="text-sm tracking-wide hover:opacity-80 underline">
                    TIK-TOK
                  </span>
                </a>
              </div>
            </section>

            {/* Columna derecha: imagen grande */}
            <aside className="lg:sticky lg:top-10 mt-12">
              <figure className="w-full h-[55vh] sm:h-[65vh] lg:h-[82vh] overflow-hidden lg:max-h-screen">
                <img
                  src={teamImg}
                  alt="Equipo Lozarq Estudio"
                  className="w-full h-full object-cover rounded-none"
                />
              </figure>
            </aside>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}