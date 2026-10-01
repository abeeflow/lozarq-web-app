import { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useProjects } from '../hooks/useProjects';
import { usePageSEO } from '../hooks/usePageSEO';
import { useLanguage } from '../contexts/LanguageContext';

// Iconos Material Symbols Outlined (FILL 0, wght 400, GRAD 0, opsz 24) como SVG en línea,
// mismo patrón que ServiciosPage (sin depender de la carga de la fuente de iconos).
const CATEGORIAS = [
  {
    nombre: 'Residencial',
    icono: 'home',
    path: 'M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z',
  },
  {
    nombre: 'Infantil',
    icono: 'cruelty_free',
    path: 'M380-80q-75 0-127.5-52.5T200-260q0-35 17-64.5t63-75.5q6-6 11.5-12.5T306-430q-51-78-78.5-163.5T200-760q0-58 21-89t59-31q57 0 102 55t68 101q9 20 16.5 40.5T480-641q6-22 13.5-42.5T511-724q22-46 67-101t102-55q38 0 59 31t21 89q0 81-27.5 166.5T654-430q9 11 14.5 17.5T680-400q46 46 63 75.5t17 64.5q0 75-52.5 127.5T580-80q-45 0-72.5-10L480-100l-27.5 10Q425-80 380-80Zm0-80q23 0 46-5.5t43-16.5q-11-5-20-17t-9-21q0-8 11.5-14t28.5-6q17 0 28.5 6t11.5 14q0 9-9 21t-20 17q20 11 43 16.5t46 5.5q42 0 71-29t29-71q0-18-10-35t-30-34q-14-12-23-21t-29-34q-29-35-48-45.5T480-440q-41 0-60.5 10.5T372-384q-20 25-29 34t-23 21q-20 17-30 34t-10 35q0 42 29 71t71 29Zm40-130q-8 0-14-9t-6-21q0-12 6-21t14-9q8 0 14 9t6 21q0 12-6 21t-14 9Zm120 0q-8 0-14-9t-6-21q0-12 6-21t14-9q8 0 14 9t6 21q0 12-6 21t-14 9ZM363-489q11-8 25-14t31-11q-2-48-14.5-95.5T373-696q-19-40-42-67.5T285-799q-2 6-3.5 15.5T280-760q0 68 21.5 138T363-489Zm234 0q40-63 61.5-133T680-760q0-14-1.5-23.5T675-799q-23 8-46 35.5T587-696q-18 39-30.5 86.5T541-514q15 4 29 10.5t27 14.5Z',
  },
  {
    nombre: 'Comercial',
    icono: 'storefront',
    path: 'M841-518v318q0 33-23.5 56.5T761-120H201q-33 0-56.5-23.5T121-200v-318q-23-21-35.5-54t-.5-72l42-136q8-26 28.5-43t47.5-17h556q27 0 47 16.5t29 43.5l42 136q12 39-.5 71T841-518Zm-272-42q27 0 41-18.5t11-41.5l-22-140h-78v148q0 21 14 36.5t34 15.5Zm-180 0q23 0 37.5-15.5T441-612v-148h-78l-22 140q-4 24 10.5 42t37.5 18Zm-178 0q18 0 31.5-13t16.5-33l22-154h-78l-40 134q-6 20 6.5 43t41.5 23Zm540 0q29 0 42-23t6-43l-42-134h-76l22 154q3 20 16.5 33t31.5 13ZM201-200h560v-282q-5 2-6.5 2H751q-27 0-47.5-9T663-518q-18 18-41 28t-49 10q-27 0-50.5-10T481-518q-17 18-39.5 28T393-480q-29 0-52.5-10T299-518q-21 21-41.5 29.5T211-480h-4.5q-2.5 0-5.5-2v282Zm560 0H201h560Z',
  },
  {
    nombre: 'Corporativo',
    icono: 'desktop_mac',
    path: 'M320-120v-40l80-80H160q-33 0-56.5-23.5T80-320v-440q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v440q0 33-23.5 56.5T800-240H560l80 80v40H320ZM160-440h640v-320H160v320Zm0 0v-320 320Z',
  },
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

            {/* Mostrar categorías cuando NO hay filtro.
                Misma retícula y proporción que el listado de proyectos (ancho completo, 2 col. móvil / 4 col. desktop)
                para que la transición categoría → proyectos sea continua. */}
            {showCategories && (
              <div className="flex-1 flex flex-col justify-center w-full">
                <div className="grid w-full grid-cols-2 md:grid-cols-4 gap-[clamp(16px,3vw,32px)]">
                  {CATEGORIAS.map((cat) => (
                    <Link
                      key={cat.nombre}
                      to={`/proyectos?categoria=${cat.nombre}`}
                      className="group w-full flex flex-col"
                    >
                      <div className="relative overflow-hidden rounded-lg w-full aspect-square md:aspect-[2/3] flex items-center justify-center bg-primary/[0.04] dark:bg-primary/[0.10]">
                        {/* Halo difuminado detrás del icono */}
                        <div
                          aria-hidden="true"
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 aspect-square rounded-full bg-primary/20 blur-3xl transition-all duration-700 ease-out group-hover:scale-125 group-hover:bg-primary/30"
                        ></div>
                        {/* Degradado inferior suave para dar profundidad */}
                        <div
                          aria-hidden="true"
                          className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/10 to-transparent"
                        ></div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 -960 960 960"
                          fill="currentColor"
                          aria-hidden="true"
                          className="relative w-[clamp(2.25rem,4.5vw,4rem)] h-[clamp(2.25rem,4.5vw,4rem)] text-primary/80 group-hover:text-primary transition-all duration-500 ease-out group-hover:scale-110"
                        >
                          <path d={cat.path} />
                        </svg>
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
