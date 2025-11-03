import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function EstudioPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-5">
        <Header />
        <main className="mt-16">
          <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-6 text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-text-light dark:text-text-dark">
                Conectando Espacios, Creando Experiencias
              </h1>
              <p className="text-base text-text-light/70 dark:text-text-dark/70 max-w-3xl mx-auto">
                Creemos en un diseño que integra arquitectura y paisaje, centrado en la sostenibilidad y la experiencia humana para crear entornos atemporales y significativos.
              </p>
            </div>

            <div className="w-full bg-cover bg-center rounded-xl min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]"
                 style={{backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200')"}}
            />

            <div className="flex flex-col gap-10">
              <div className="text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-text-light dark:text-text-dark mb-4">
                  Nuestra Esencia
                </h2>
                <p className="text-base text-text-light/70 dark:text-text-dark/70 max-w-3xl mx-auto">
                  Guiados por una filosofía de colaboración y excelencia, transformamos ideas en realidades tangibles que inspiran y perduran.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6">
                  <div className="text-primary">
                    <span className="material-symbols-outlined text-3xl">groups</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-light dark:text-text-dark mb-2">
                      Quiénes Somos
                    </h3>
                    <p className="text-sm text-text-light/70 dark:text-text-dark/70">
                      Somos un equipo de arquitectos y paisajistas apasionados, dedicados a crear espacios que reflejan la identidad de nuestros clientes y respetan el entorno.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6">
                  <div className="text-primary">
                    <span className="material-symbols-outlined text-3xl">layers</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-light dark:text-text-dark mb-2">
                      Qué Hacemos
                    </h3>
                    <p className="text-sm text-text-light/70 dark:text-text-dark/70">
                      Ofrecemos servicios integrales que abarcan diseño arquitectónico, planificación urbana, paisajismo y diseño de interiores.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6">
                  <div className="text-primary">
                    <span className="material-symbols-outlined text-3xl">task_alt</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-light dark:text-text-dark mb-2">
                      Nuestro Proceso
                    </h3>
                    <p className="text-sm text-text-light/70 dark:text-text-dark/70">
                      Desde el concepto inicial hasta la ejecución, nuestro proceso se basa en la colaboración estrecha con el cliente.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
              <div className="md:col-span-2 w-full bg-cover bg-center aspect-square rounded-xl"
                   style={{backgroundImage: "url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600')"}}
              />
              <div className="md:col-span-3 flex flex-col gap-6">
                <h2 className="text-3xl font-bold text-text-light dark:text-text-dark">
                  ¿Listo para crear algo increíble?
                </h2>
                <p className="text-base text-text-light/70 dark:text-text-dark/70">
                  Creemos que cada proyecto es una oportunidad para innovar y crear espacios que no solo son funcionales y bellos, sino que también mejoran la vida de las personas que los habitan.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/proyectos"
                    className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-base font-semibold text-white hover:bg-opacity-90 transition-colors"
                  >
                    Ver Proyectos
                  </Link>
                  <Link
                    to="/contacto"
                    className="inline-flex items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-800 px-5 py-2.5 text-base font-semibold text-text-light dark:text-text-dark hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                  >
                    Contacta con nosotros
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
        <div className="mt-16">
          <Footer />
        </div>
      </div>
    </div>
  );
}
