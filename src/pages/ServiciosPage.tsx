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
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
      <div className="flex-1 max-w-5xl mx-auto px-4 py-5">
        <Header />
        <main className="mt-10 pt-20">
          <div className="text-center mb-16">
            
            <p className="text-base sm:text-lg text-text-light/70 dark:text-text-dark/70 max-w-3xl mx-auto">
              Combinamos creatividad y experiencia para transformar espacios.
            </p>
          </div>

          <div className="flex items-center gap-8 mb-8">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className={`flex-shrink-0 transition-colors ${
                currentIndex === 0
                  ? 'text-gray-300 dark:text-gray-700 cursor-not-allowed'
                  : 'text-text-light dark:text-text-dark hover:text-primary'
              }`}
              aria-label="Página anterior"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>chevron_left</span>
            </button>

            <div className="flex-1 overflow-hidden">
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {servicios.map((servicio, idx) => (
                  <div
                    key={idx}
                    className="min-w-full w-full flex-shrink-0"
                  >
                    <div className="flex flex-col items-center gap-6 sm:gap-8 rounded-xl border border-gray-200 dark:border-gray-800 bg-background-light dark:bg-background-dark p-8 sm:p-12 md:p-16 hover:shadow-lg transition-shadow max-w-4xl mx-auto">
                      <div className="text-primary">
                        <span className="material-symbols-outlined" style={{ fontSize: '80px' }}>
                          {servicio.icono}
                        </span>
                      </div>
                      <div className="text-center">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-light dark:text-text-dark mb-4 sm:mb-6">
                          {servicio.titulo}
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl text-text-light/70 dark:text-text-dark/70 max-w-2xl mx-auto">
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
              className={`flex-shrink-0 transition-colors ${
                currentIndex === totalPages - 1
                  ? 'text-gray-300 dark:text-gray-700 cursor-not-allowed'
                  : 'text-text-light dark:text-text-dark hover:text-primary'
              }`}
              aria-label="Página siguiente"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>chevron_right</span>
            </button>
          </div>

          <div className="flex justify-center gap-2 mb-8">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentIndex
                    ? 'bg-primary w-6'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
                aria-label={`Ir a la página ${idx + 1}`}
              />
            ))}
          </div>

          <div className="text-center py-5">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-600 dark:text-gray-300/70 mb-4">
              ¿Tienes una idea en mente?
            </h2>
            <p className="text-base text-text-light/70 dark:text-text-dark/70 mb-6 max-w-2xl mx-auto">
              Hablemos de cómo podemos ayudarte a hacerla realidad.
            </p>
            <Link
              to="/contacto"
              className="inline-block px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Iniciar un Proyecto
            </Link>
          </div>

        </main>

      </div>
      <Footer />
    </div>
  );
}
