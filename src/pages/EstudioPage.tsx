// src/pages/EstudioPage.tsx
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Reemplaza por tu imagen real (p.e. import teamImg from '../assets/estudio.jpg')
const teamImg = '/foto_portadada_v2.jpg';;

export default function EstudioPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-10">
        <Header />

        <main className="mt-16 lg:mt-24">
          {/* Grid principal: texto a la izquierda, imagen a la derecha */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Columna izquierda */}
            <section className="space-y-8">
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">LOZARQ STUDIO</h1>

              <div className="space-y-5 max-w-xl leading-relaxed text-text-light dark:text-text-dark text-justify">
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
              <br />
              <br />
              <br />
              <br />
              <br />
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
                  <a href="tel:+34650644393" className="underline hover:opacity-80">+51 931 103 387 </a>
                  <span className="mx-2">|</span>
                  <a href="tel:+34650655191" className="underline hover:opacity-80">+51 931 103 387 </a>
                </p>
              </address>
              
              {/* Instagram */}
              <div>
                <a
                  href="https://www.instagram.com/lozarqestudio/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm tracking-wide hover:opacity-80 underline"
                >
                  INSTAGRAM
                </a>
                <br />
                 <a
                  href="https://www.instagram.com/lozarqestudio/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm tracking-wide hover:opacity-80 underline"
                >
                  FACEBOOK
                </a>
                
              </div>

              
            </section>

            {/* Columna derecha: imagen grande */}
            <aside className="lg:sticky lg:top-10">
              <figure className="w-full h-[55vh] sm:h-[65vh] lg:h-[82vh] overflow-hidden">
                <img
                  src={teamImg}
                  alt="Equipo Plantea Estudio"
                  className="w-full h-full object-cover rounded-none"
                />
              </figure>
            </aside>
          </div>
        </main>

        <div className="mt-16 lg:mt-24">
          
        </div>
      </div>
    </div>
  );
}