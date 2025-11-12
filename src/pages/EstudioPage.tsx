import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";

const teamImg = '/foto_portadada_v2.jpg';

export default function EstudioPage() {
  return (
    <div className="relative grid h-screen w-full grid-rows-[auto,1fr,auto] bg-background-light dark:bg-background-dark">
      <Header />
      <div className="min-h-0 px-[clamp(12px,3.2vw,48px)]">
        <div className="mx-auto max-w-7xl">
          <main className="mt-[clamp(6px,1.4vw,12px)] h-full min-h-0">
            <div className="grid grid-cols-1 md:grid-cols-2 h-full gap-[clamp(8px,2vw,20px)] items-stretch">
              <section className="space-y-6 self-center">
              <div className="space-y-[clamp(6px,1.2vw,12px)] max-w-2xl leading-[1.45] text-text-light dark:text-text-dark text-justify text-[clamp(0.94rem,1.22vw,1.08rem)]">
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
              <address className="not-italic space-y-1 text-[clamp(0.8rem,1.1vw,0.9rem)]">
                <p className="font-semibold">
                  Trujillo <span className="mx-2">|</span> Lima 
                </p>
                
                <p>
                  <a href="mailto:lozarq.estudio@gmail.com" className="underline hover:opacity-80">
                    lozarq.estudio@gmail.com
                  </a>
                </p>
                <p>
                  <a href="tel:+51963103387" className="underline hover:opacity-80">+51 963 103 387</a>
                </p>
              </address>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <a
                  href="https://www.instagram.com/lozarqestudio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[clamp(0.8rem,1.1vw,0.9rem)] text-gray-700 hover:text-black transition-colors"
                >
                  <FaInstagram className="text-xl" />
                  <span className="tracking-wide hover:opacity-80 underline">INSTAGRAM</span>
                </a>
                <a
                  href="https://www.facebook.com/p/Lozarq-Estudio-100082969437663/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[clamp(0.8rem,1.1vw,0.9rem)] text-gray-700 hover:text-black transition-colors"
                >
                  <FaFacebook className="text-xl" />
                  <span className="tracking-wide hover:opacity-80 underline">FACEBOOK</span>
                </a>
                <a
                  href="https://www.tiktok.com/@lozarq.estudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[clamp(0.8rem,1.1vw,0.9rem)] text-gray-700 hover:text-black transition-colors"
                >
                  <FaTiktok className="text-xl" />
                  <span className="tracking-wide hover:opacity-80 underline">TIK-TOK</span>
                </a>
              </div>
            </section>
            <aside className="mt-[clamp(6px,1.2vw,10px)] md:mt-0 md:self-stretch">
              <figure className="w-full h-[clamp(30vh,36vw,48vh)] md:h-full min-h-0 mx-auto overflow-hidden rounded-3xl" style={{maxHeight: 'calc(100vh - 220px)'}}>
                <img
                  src={teamImg}
                  alt="Equipo Lozarq Estudio"
                  className="w-full h-full object-cover object-center"
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