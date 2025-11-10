import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const servicios = [
  { icono: 'architecture', titulo: 'Diseño Arquitectónico', desc: 'Creación de espacios residenciales y comerciales que son funcionales, sostenibles y estéticamente atractivos.' },
  { icono: 'landscape', titulo: 'Diseño de Paisaje', desc: 'Diseño de entornos exteriores que armonizan con la arquitectura y la naturaleza.' },
  { icono: 'chair', titulo: 'Diseño de Interiores', desc: 'Transformación de interiores para reflejar tu estilo y mejorar la funcionalidad.' },
  { icono: 'holiday_village', titulo: 'Urbanismo y Master Planning', desc: 'Planificación a gran escala para desarrollar comunidades sostenibles.' },
  { icono: 'ballot', titulo: 'Gestión de Proyectos', desc: 'Aseguramos que cada fase del proyecto se ejecute a la perfección.' },
  { icono: 'lightbulb', titulo: 'Consultoría de Diseño', desc: 'Asesoramiento experto para optimizar tus ideas y maximizar el potencial.' },
];

export default function ServiciosPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(servicios.length / itemsPerPage);

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

  const getCurrentPageServices = () => {
    const start = currentIndex * itemsPerPage;
    return servicios.slice(start, start + itemsPerPage);
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 transition-opacity duration-500">
                {getCurrentPageServices().map((servicio, idx) => (
                  <div
                    key={currentIndex * itemsPerPage + idx}
                    className="flex flex-col items-center gap-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-background-light dark:bg-background-dark p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="text-primary">
                      <span className="material-symbols-outlined" style={{ fontSize: '40px' }}>
                        {servicio.icono}
                      </span>
                    </div>
                    <div className="text-center">
                      <h2 className="text-xl font-bold text-text-light dark:text-text-dark mb-3">
                        {servicio.titulo}
                      </h2>
                      <p className="text-sm text-text-light/70 dark:text-text-dark/70">
                        {servicio.desc}
                      </p>
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
