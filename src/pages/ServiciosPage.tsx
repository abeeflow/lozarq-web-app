import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { usePageSEO } from '../hooks/usePageSEO';

const servicios = [
  { icono: 'holiday_village', titulo: 'Diseño Interior', desc: 'Transformación de espacios para elevar estética, funcionalidad y confort, creando ambientes que reflejan personalidad y estilo.' },
  { icono: 'format_paint', titulo: 'Consultoría diseño', desc: 'Asesoría profesional para tomar decisiones claras sobre materiales, distribución, iluminación y acabados, optimizando el resultado final de cada proyecto.' },
  { icono: 'chair', titulo: 'Mobiliario', desc: 'Diseño y fabricación de mobiliario a medida, creado para adaptarse al espacio y potenciar su uso con piezas únicas, funcionales y atemporales.' },
  { icono: 'architecture', titulo: 'Arquitectura & Construcción', desc: 'Desarrollo integral de proyectos desde la idea hasta la ejecución, asegurando soluciones técnicas eficientes, materiales de calidad y construcción responsable.' },
  ];

export default function ServiciosPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);
  
  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        setCardsPerView(4); // xl: 4 cards
      } else if (width >= 1024) {
        setCardsPerView(3); // lg: 3 cards
      } else if (width >= 768) {
        setCardsPerView(2); // md: 2 cards
      } else {
        setCardsPerView(1); // sm y menores: 1 card
      }
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  // Agrupar servicios en páginas
  const pages: typeof servicios[] = [];
  for (let i = 0; i < servicios.length; i += cardsPerView) {
    pages.push(servicios.slice(i, i + cardsPerView));
  }
  
  const totalPages = pages.length;

  usePageSEO({
    title: 'Servicios | Lozarq Estudio - Diseño Interior y Arquitectura',
    description: 'Ofrecemos diseño interior, consultoría de diseño, mobiliario a medida y servicios de arquitectura y construcción en Lima, Perú.',
    keywords: 'diseño interior, consultoría diseño, mobiliario a medida, arquitectura, construcción, Lima',
    ogImage: 'https://www.lozarqestudio.com/diseño.jpg',
    canonical: 'https://www.lozarqestudio.com/servicios'
  });

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

  // Ajustar currentIndex cuando cambia cardsPerView
  useEffect(() => {
    const maxIndex = Math.ceil(servicios.length / cardsPerView) - 1;
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [cardsPerView, currentIndex]);

  const gapSize = cardsPerView === 4 ? '0.75rem' : '0.5rem';
  const gapCount = cardsPerView - 1;
  // Calcular el ancho de cada card considerando el gap en todos los casos
  const cardWidth = `calc((100% - ${gapCount} * ${gapSize}) / ${cardsPerView})`;

  return (
    <div className="relative flex flex-col h-screen w-full bg-background-light dark:bg-background-dark overflow-hidden">
      <Header />
      <div className="flex-1 w-full flex items-center justify-center min-h-0">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-[clamp(16px,4vw,56px)] h-full flex items-center justify-center">
          <main className="w-full flex flex-col items-center justify-center h-full">
            <div className="text-center mb-[50px] px-2 flex-shrink-0 w-full">
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-text-light/70 dark:text-text-dark/70 max-w-3xl mx-auto">
                Combinamos creatividad y experiencia para transformar espacios.
              </p>
            </div>

            <div className="relative my-[5px] flex items-center justify-center w-full min-h-[240px] sm:min-h-[260px] md:min-h-[280px] lg:min-h-[300px]">
              {/* Navigation buttons */}
              <button
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className={`flex absolute -left-4 sm:-left-5 md:-left-6 lg:-left-8 top-1/2 -translate-y-1/2 z-10 flex-shrink-0 transition-colors ${
                  currentIndex === 0
                    ? 'text-gray-300 dark:text-gray-700 cursor-not-allowed'
                    : 'text-text-light dark:text-text-dark hover:text-primary'
                }`}
                aria-label="Página anterior"
              >
                <span className="material-symbols-outlined text-xl sm:text-2xl md:text-3xl lg:text-4xl">chevron_left</span>
              </button>

              <div className="overflow-hidden w-full h-full min-h-[240px] sm:min-h-[260px] md:min-h-[280px] lg:min-h-[300px]" style={{ overflowX: 'hidden', overflowY: 'hidden' }}>
                <div 
                  className="flex transition-transform duration-500 ease-in-out h-full" 
                  style={{ 
                    transform: `translateX(-${currentIndex * 100}%)`,
                  }}
                >
                  {pages.map((page, pageIdx) => (
                    <div
                      key={pageIdx}
                      className={`flex-shrink-0 w-full h-full ${cardsPerView === 4 ? 'px-0' : 'px-1 sm:px-2 md:px-3 lg:px-4'}`}
                    >
                      <div className="flex h-full w-full" style={{ gap: gapSize }}>
                        {page.map((servicio, idx) => (
                          <div
                            key={`${pageIdx}-${idx}`}
                            className="flex-shrink-0 h-full"
                            style={{ width: cardWidth }}
                          >
                            <div className="flex flex-col items-center justify-center gap-1 sm:gap-1.5 md:gap-2 lg:gap-2.5 xl:gap-3 h-full min-h-[240px] sm:min-h-[260px] md:min-h-[280px] lg:min-h-[300px] rounded-md sm:rounded-lg md:rounded-xl border border-gray-200 dark:border-gray-800 bg-background-light dark:bg-background-dark p-2 sm:p-2.5 md:p-3 lg:p-4 hover:shadow-lg transition-all duration-300">
                              <div className="text-primary flex-shrink-0">
                                <span className="material-symbols-outlined text-[clamp(1.25rem,2.5vw,2.25rem)] sm:text-[clamp(1.5rem,3vw,2.5rem)] md:text-[clamp(1.75rem,3.5vw,2.75rem)]">
                                  {servicio.icono}
                                </span>
                              </div>
                              <div className="text-center w-full flex-1 flex flex-col justify-center">
                                <h2 className="text-[clamp(0.8rem,1.5vw,1.2rem)] sm:text-[clamp(0.9rem,1.8vw,1.3rem)] md:text-[clamp(1rem,2vw,1.4rem)] font-bold text-text-light dark:text-text-dark mb-0.5 sm:mb-1 md:mb-1.5 lg:mb-2 px-1 sm:px-1.5">
                                  {servicio.titulo}
                                </h2>
                                <p className="text-[clamp(0.65rem,0.9vw,0.8rem)] sm:text-[clamp(0.7rem,1vw,0.9rem)] md:text-[clamp(0.75rem,1.1vw,0.95rem)] text-text-light/70 dark:text-text-dark/70 leading-tight sm:leading-snug md:leading-normal px-1 sm:px-1.5">
                                  {servicio.desc}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={nextSlide}
                disabled={currentIndex === totalPages - 1}
                className={`flex absolute -right-4 sm:-right-5 md:-right-6 lg:-right-8 top-1/2 -translate-y-1/2 z-10 flex-shrink-0 transition-colors ${
                  currentIndex === totalPages - 1
                    ? 'text-gray-300 dark:text-gray-700 cursor-not-allowed'
                    : 'text-text-light dark:text-text-dark hover:text-primary'
                }`}
                aria-label="Página siguiente"
              >
                <span className="material-symbols-outlined text-xl sm:text-2xl md:text-3xl lg:text-4xl">chevron_right</span>
              </button>
            </div>

            <div className="flex justify-center items-center gap-1.5 sm:gap-2 mb-2 sm:mb-2.5 md:mb-3 flex-shrink-0 w-full">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`h-1.5 sm:h-2 rounded-full transition-all ${
                    idx === currentIndex
                      ? 'bg-primary w-5 sm:w-6 md:w-8'
                      : 'bg-gray-300 dark:bg-gray-600 w-1.5 sm:w-2'
                  }`}
                  aria-label={`Ir a la página ${idx + 1}`}
                />
              ))}
            </div>

            <div className="text-center px-2 flex-shrink-0 w-full mt-[30px]">
              <h2 className="text-[clamp(0.85rem,1.8vw,1.2rem)] font-bold text-gray-600 dark:text-gray-300/70 mb-1 sm:mb-1.5 md:mb-2">
                ¿Tienes una idea en mente?
              </h2>
              <p className="text-[clamp(0.7rem,1vw,0.85rem)] text-text-light/70 dark:text-text-dark/70 mb-1.5 sm:mb-2 max-w-2xl mx-auto">
                Hablemos de cómo podemos ayudarte a hacerla realidad.
              </p>
              <Link
                to="/contacto"
                className="inline-block px-3 sm:px-4 md:px-5 py-1 sm:py-1.5 md:py-2 bg-primary text-white text-[clamp(0.75rem,1vw,0.9rem)] font-bold rounded-lg hover:bg-opacity-90 transition-colors"
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
