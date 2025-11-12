import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const servicios = [
  { icono: 'holiday_village', titulo: 'Diseño Interior', desc: 'Transformación de espacios para elevar estética, funcionalidad y confort, creando ambientes que reflejan personalidad y estilo.' },
  { icono: 'format_paint', titulo: 'Consultoría diseño', desc: 'Asesoría profesional para tomar decisiones claras sobre materiales, distribución, iluminación y acabados, optimizando el resultado final de cada proyecto.' },
  { icono: 'chair', titulo: 'Mobiliario', desc: 'Diseño y fabricación de mobiliario a medida, creado para adaptarse al espacio y potenciar su uso con piezas únicas, funcionales y atemporales.' },
  { icono: 'architecture', titulo: 'Arquitectura & Construcción', desc: 'Desarrollo integral de proyectos desde la idea hasta la ejecución, asegurando soluciones técnicas eficientes, materiales de calidad y construcción responsable.' },
  ];

export default function ServiciosPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalPages = servicios.length;

  const nextSlide = () => {
    if (currentIndex < totalPages - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative grid h-screen w-full grid-rows-[auto,1fr,auto] bg-background-light dark:bg-background-dark overflow-hidden">
      <Header />
      <div className="h-full min-h-0 w-full mx-auto px-[clamp(16px,4vw,56px)] py-[clamp(6px,1.2vw,10px)]">
        <div className="max-w-5xl mx-auto h-full min-h-0">
          <main className="h-full min-h-0 flex flex-col justify-center">
            <div className="text-center mb-[clamp(10px,2vw,16px)] px-2">
              <p className="text-sm sm:text-base md:text-lg text-text-light/70 dark:text-text-dark/70 max-w-3xl mx-auto">
                Combinamos creatividad y experiencia para transformar espacios.
              </p>
            </div>

            <div className="relative mb-[clamp(8px,1.6vw,12px)]">
              {/* Navigation buttons (visible on all sizes) */}
              <button
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className={`flex absolute -left-3 sm:-left-4 md:-left-6 top-1/2 -translate-y-1/2 z-10 flex-shrink-0 transition-colors ${
                  currentIndex === 0
                    ? 'text-gray-300 dark:text-gray-700 cursor-not-allowed'
                    : 'text-text-light dark:text-text-dark hover:text-primary'
                }`}
                aria-label="Página anterior"
              >
                <span className="material-symbols-outlined text-2xl sm:text-3xl md:text-4xl">chevron_left</span>
              </button>

              <div className="overflow-hidden px-4 md:px-6">
                <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                  {servicios.map((servicio, idx) => (
                    <div
                      key={idx}
                      className="min-w-full w-full flex-shrink-0 px-2 sm:px-3"
                    >
                      <div className="flex flex-col items-center gap-2 sm:gap-2 md:gap-3 lg:gap-4 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-800 bg-background-light dark:bg-background-dark p-2 sm:p-2 md:p-3 lg:p-4 hover:shadow-lg transition-shadow max-w-4xl mx-auto">
                        <div className="text-primary">
                          <span className="material-symbols-outlined text-[clamp(2rem,5vw,2.75rem)]">
                            {servicio.icono}
                          </span>
                        </div>
                        <div className="text-center w-full">
                          <h2 className="text-[clamp(1rem,2.2vw,1.4rem)] font-bold text-text-light dark:text-text-dark mb-1 sm:mb-2 md:mb-2 lg:mb-3 px-2">
                            {servicio.titulo}
                          </h2>
                          <p className="text-[clamp(0.8rem,1.2vw,0.95rem)] text-text-light/70 dark:text-text-dark/70 max-w-2xl mx-auto leading-snug px-2">
                            {servicio.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                ))}
              </div>
            </div>

              <button
                onClick={nextSlide}
                disabled={currentIndex === totalPages - 1}
                className={`flex absolute -right-3 sm:-right-4 md:-right-6 top-1/2 -translate-y-1/2 z-10 flex-shrink-0 transition-colors ${
                  currentIndex === totalPages - 1
                    ? 'text-gray-300 dark:text-gray-700 cursor-not-allowed'
                    : 'text-text-light dark:text-text-dark hover:text-primary'
                }`}
                aria-label="Página siguiente"
              >
                <span className="material-symbols-outlined text-2xl sm:text-3xl md:text-4xl">chevron_right</span>
              </button>
            </div>

            <div className="flex justify-center gap-2 mb-[clamp(8px,1.6vw,12px)]">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentIndex
                      ? 'bg-primary w-6 sm:w-8'
                      : 'bg-gray-300 dark:bg-gray-600 w-2'
                  }`}
                  aria-label={`Ir a la página ${idx + 1}`}
                />
              ))}
            </div>

            <div className="text-center py-[clamp(4px,0.9vw,10px)] px-2">
              <h2 className="text-[clamp(0.95rem,2vw,1.25rem)] font-bold text-gray-600 dark:text-gray-300/70 mb-2 sm:mb-2">
                ¿Tienes una idea en mente?
              </h2>
              <p className="text-[clamp(0.78rem,1.1vw,0.9rem)] text-text-light/70 dark:text-text-dark/70 mb-2 sm:mb-2 max-w-2xl mx-auto">
                Hablemos de cómo podemos ayudarte a hacerla realidad.
              </p>
              <Link
                to="/contacto"
                className="inline-block px-4 sm:px-5 py-1.5 sm:py-2 bg-primary text-white text-[clamp(0.85rem,1.1vw,0.95rem)] font-bold rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Iniciar un Proyecto
              </Link>
            </div>

          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
