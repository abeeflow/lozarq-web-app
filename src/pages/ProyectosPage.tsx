import { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useProjects } from '../hooks/useProjects';
import { usePageSEO } from '../hooks/usePageSEO';
import { useLanguage } from '../contexts/LanguageContext';

const CATEGORIAS = [
  { nombre: 'Residencial', imagen: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800' },
  { nombre: 'Infantil', imagen: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800' },
  { nombre: 'Comercial', imagen: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800' },
  { nombre: 'Corporativo', imagen: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800' },
];

export default function ProyectosPage() {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const categoria = searchParams.get('categoria');
  const { projects, loading, error } = useProjects();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const preloadedImagesRef = useRef<Set<string>>(new Set());
  const ITEMS_PER_SLIDE = 4;

  const proyectosFiltrados = categoria
    ? projects.filter(p => p.categoria?.toLowerCase() === categoria.toLowerCase())
    : projects;

  // Calcular total de slides (grupos de 4 proyectos)
  const totalSlides = Math.ceil(proyectosFiltrados.length / ITEMS_PER_SLIDE);

  // Resetear slide cuando cambia la categoría
  useEffect(() => {
    setCurrentSlide(0);
  }, [categoria]);

  // Funciones de navegación
  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Obtener proyectos para el slide actual
  const getProjectsForCurrentSlide = () => {
    const start = currentSlide * ITEMS_PER_SLIDE;
    const end = start + ITEMS_PER_SLIDE;
    return proyectosFiltrados.slice(start, end);
  };

  // Función para precargar una imagen
  const preloadImage = (src: string) => {
    if (!src || preloadedImagesRef.current.has(src)) return;
    
    preloadedImagesRef.current.add(src);
    const img = new Image();
    img.onload = () => {
      setLoadedImages((prev) => new Set(prev).add(src));
    };
    img.src = src;
  };

  // Precargar imágenes del slide actual, siguiente y anterior
  useEffect(() => {
    if (proyectosFiltrados.length === 0 || totalSlides === 0) return;

    // Función auxiliar para obtener proyectos de un slide
    const getProjectsForSlide = (slideIndex: number) => {
      const start = slideIndex * ITEMS_PER_SLIDE;
      const end = start + ITEMS_PER_SLIDE;
      return proyectosFiltrados.slice(start, end);
    };

    // Precargar imágenes del slide actual
    const currentProjects = getProjectsForSlide(currentSlide);
    currentProjects.forEach((proyecto) => {
      const imgSrc = proyecto.img || proyecto.galeria[0];
      if (imgSrc) preloadImage(imgSrc);
    });

    // Precargar imágenes del siguiente slide
    const nextSlide = (currentSlide + 1) % totalSlides;
    const nextProjects = getProjectsForSlide(nextSlide);
    nextProjects.forEach((proyecto) => {
      const imgSrc = proyecto.img || proyecto.galeria[0];
      if (imgSrc) preloadImage(imgSrc);
    });

    // Precargar imágenes del slide anterior
    const prevSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    const prevProjects = getProjectsForSlide(prevSlide);
    prevProjects.forEach((proyecto) => {
      const imgSrc = proyecto.img || proyecto.galeria[0];
      if (imgSrc) preloadImage(imgSrc);
    });
  }, [currentSlide, proyectosFiltrados, totalSlides, ITEMS_PER_SLIDE]);

  // Precargar imágenes del primer slide al cargar la página
  useEffect(() => {
    if (proyectosFiltrados.length === 0 || totalSlides === 0) return;
    
    const getProjectsForSlide = (slideIndex: number) => {
      const start = slideIndex * ITEMS_PER_SLIDE;
      const end = start + ITEMS_PER_SLIDE;
      return proyectosFiltrados.slice(start, end);
    };
    
    // Precargar imágenes del primer slide inmediatamente
    const firstSlideProjects = getProjectsForSlide(0);
    firstSlideProjects.forEach((proyecto) => {
      const imgSrc = proyecto.img || proyecto.galeria[0];
      if (imgSrc) preloadImage(imgSrc);
    });
  }, [proyectosFiltrados, ITEMS_PER_SLIDE]);

  // Si NO hay categoría en la URL, mostrar las 4 categorías
  const showCategories = !categoria;

  // SEO dinámico
  usePageSEO({
    title: categoria
      ? `Proyectos ${categoria} | Lozarq Estudio`
      : 'Proyectos | Lozarq Estudio - Arquitectura e Interiorismo',
    description: categoria
      ? `Descubre nuestros proyectos de ${categoria}. Diseño arquitectónico e interiorismo de alta calidad en Lima, Perú.`
      : 'Explora nuestro portafolio de proyectos de arquitectura e interiorismo. Residencial, infantil, comercial y corporativo.',
    keywords: `proyectos arquitectura, ${categoria || 'diseño'}, interiorismo Lima, Lozarq`,
    ogImage: 'https://www.lozarqestudio.com/foto_main.jpg',
    canonical: `https://www.lozarqestudio.com/proyectos${categoria ? '?categoria=' + categoria : ''}`
  });
  return (
    <div className="relative grid h-screen w-full grid-rows-[auto,1fr,auto] bg-background-light dark:bg-background-dark">
      <Header />
      <div className="min-h-0 h-full px-[clamp(12px,3.2vw,48px)] py-[clamp(12px,2.4vw,24px)] overflow-y-auto">
        <div className="max-w-[1280px] mx-auto h-full min-h-0">
          <main className="h-full flex flex-col">
            {!showCategories && (
              <div className="mb-6 flex flex-col gap-3">
                <Link
                  to="/proyectos"
                  className="group inline-flex items-center gap-2 text-sm font-light tracking-[0.1em] text-text-light/50 dark:text-text-dark/50 hover:text-text-light dark:hover:text-text-dark transition-colors duration-300 w-fit"
                >
                  <span className="transition-transform duration-300 group-hover:-translate-x-1">&larr;</span>
                  {t.proyectos.volverCategorias}
                </Link>
                <h1 className="text-2xl md:text-3xl font-light tracking-[0.1em] text-text-light dark:text-text-dark">
                  {categoria}
                </h1>
              </div>
            )}

            {/* Mostrar categorías cuando NO hay filtro */}
            {showCategories && (
              <div className="flex-1 grid place-items-center">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-[clamp(16px,3vw,32px)] place-items-center justify-center">
                  {CATEGORIAS.map((cat) => (
                    <Link
                      key={cat.nombre}
                      to={`/proyectos?categoria=${cat.nombre}`}
                      className="group w-full flex flex-col"
                    >
                      <div className="overflow-hidden rounded-lg w-full aspect-square md:aspect-[2/3]">
                        <img
                          src={cat.imagen}
                          alt={cat.nombre}
                          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                          loading="lazy"
                        />
                      </div>
                      <div className="mt-3 flex flex-col items-center">
                        <span className="text-sm font-light tracking-[0.15em] text-text-light/70 dark:text-text-dark/70 group-hover:text-text-light dark:group-hover:text-text-dark transition-colors duration-300">
                          {cat.nombre}
                        </span>
                        <div className="mt-1.5 h-px bg-primary transition-all duration-300 w-0 group-hover:w-full"></div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Mostrar listado de proyectos cuando HAY filtro */}
            {!showCategories && (
              <>
                {loading && (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
                      <p className="mt-4 text-gray-600 dark:text-gray-400">{t.proyectos.cargando}</p>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-red-600 dark:text-red-400">Error: {error}</p>
                    </div>
                  </div>
                )}

                {!loading && !error && proyectosFiltrados.length === 0 && (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-gray-600 dark:text-gray-400">{t.proyectos.noProyectos}</p>
                      <Link
                        to="/proyectos"
                        className="mt-4 inline-block text-sm font-light tracking-[0.1em] text-primary hover:text-primary/70 transition-colors duration-300"
                      >
                        &larr; {t.proyectos.volverCategorias}
                      </Link>
                    </div>
                  </div>
                )}

                {!loading && !error && proyectosFiltrados.length > 0 && (
                  <div className="flex-1 flex flex-col justify-center relative w-full">
                    {/* Contenedor del carrusel */}
                    <div className="relative w-full flex items-center">
                      {/* Flecha izquierda - Estilo como Servicios */}
                      {totalSlides > 1 && (
                        <button
                          onClick={goToPrev}
                          disabled={currentSlide === 0}
                          className={`flex absolute -left-4 sm:-left-5 md:-left-6 lg:-left-8 top-1/2 -translate-y-1/2 z-10 flex-shrink-0 transition-colors ${
                            currentSlide === 0
                              ? 'text-gray-300 dark:text-gray-700 cursor-not-allowed'
                              : 'text-text-light dark:text-text-dark hover:text-primary'
                          }`}
                          aria-label="Proyecto anterior"
                        >
                          <span className="material-symbols-outlined text-xl sm:text-2xl md:text-3xl lg:text-4xl">chevron_left</span>
                        </button>
                      )}

                      {/* Grid de proyectos - Mantiene exactamente el mismo layout */}
                      <div className="w-full">
                        <div
                          key={currentSlide}
                          className="grid grid-cols-2 md:grid-cols-4 gap-[clamp(16px,3vw,32px)] place-items-center justify-center animate-fade-in"
                        >
                          {getProjectsForCurrentSlide().map((proyecto) => {
                            const imgSrc = proyecto.img || proyecto.galeria[0] || '';
                            const isImageLoaded = loadedImages.has(imgSrc);
                            const isFirstSlide = currentSlide === 0;

                            return (
                              <Link
                                key={proyecto.id}
                                to={`/proyectos/${proyecto.id}`}
                                className="group w-full flex flex-col"
                              >
                                <div className="relative overflow-hidden rounded-lg w-full aspect-square md:aspect-[2/3]">
                                  {!isImageLoaded && (
                                    <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 animate-pulse"></div>
                                  )}
                                  <img
                                    src={imgSrc}
                                    alt={proyecto.titulo}
                                    className={`w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-[1.02] ${
                                      isImageLoaded ? 'opacity-100' : 'opacity-0'
                                    }`}
                                    loading={isFirstSlide ? 'eager' : 'lazy'}
                                    onLoad={() => {
                                      if (imgSrc) {
                                        setLoadedImages((prev) => new Set(prev).add(imgSrc));
                                      }
                                    }}
                                  />
                                </div>
                                <div className="mt-3 flex flex-col items-center">
                                  <span className="text-sm font-light tracking-[0.15em] text-text-light/70 dark:text-text-dark/70 group-hover:text-text-light dark:group-hover:text-text-dark transition-colors duration-300">
                                    {proyecto.titulo}
                                  </span>
                                  <div className="mt-1.5 h-px bg-primary transition-all duration-300 w-0 group-hover:w-full"></div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>

                      {/* Flecha derecha - Estilo como Servicios */}
                      {totalSlides > 1 && (
                        <button
                          onClick={goToNext}
                          disabled={currentSlide === totalSlides - 1}
                          className={`flex absolute -right-4 sm:-right-5 md:-right-6 lg:-right-8 top-1/2 -translate-y-1/2 z-10 flex-shrink-0 transition-colors ${
                            currentSlide === totalSlides - 1
                              ? 'text-gray-300 dark:text-gray-700 cursor-not-allowed'
                              : 'text-text-light dark:text-text-dark hover:text-primary'
                          }`}
                          aria-label="Siguiente proyecto"
                        >
                          <span className="material-symbols-outlined text-xl sm:text-2xl md:text-3xl lg:text-4xl">chevron_right</span>
                        </button>
                      )}
                    </div>

                    {/* Indicadores de paginación (dots) - Solo los dots, sin flechas */}
                    {totalSlides > 1 && (
                      <div className="flex justify-center items-center gap-2 mt-6 md:mt-8">
                        {Array.from({ length: totalSlides }).map((_, index) => (
                          <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`transition-all duration-300 rounded-full ${
                              index === currentSlide
                                ? 'w-8 h-2 bg-primary'
                                : 'w-2 h-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                            }`}
                            aria-label={`Ir al slide ${index + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </main>

        </div>
      </div>
      <Footer />
    </div>

  );
}
