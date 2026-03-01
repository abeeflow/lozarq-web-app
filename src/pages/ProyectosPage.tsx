import { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';
import { useProjects } from '../hooks/useProjects';
import { usePageSEO } from '../hooks/usePageSEO';

const CATEGORIAS = [
  { nombre: 'Residencial', imagen: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800' },
  { nombre: 'Infantil', imagen: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800' },
  { nombre: 'Comercial', imagen: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800' },
  { nombre: 'Corporativo', imagen: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800' },
];

export default function ProyectosPage() {
  const [searchParams] = useSearchParams();
  const categoria = searchParams.get('categoria');
  const { projects, loading, error } = useProjects();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const preloadedImagesRef = useRef<Set<string>>(new Set());
  const ITEMS_PER_SLIDE = 4; // Mantener siempre 4 proyectos por vista

  // Log de todos los proyectos obtenidos
  console.log('📊 PROYECTOS OBTENIDOS DE LA BD:', {
    total: projects.length,
    proyectos: projects,
    categoriaFiltro: categoria || 'Todas',
    proyectosPorCategoria: projects.reduce((acc, p) => {
      const cat = p.categoria || 'Sin categoría';
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  });

  const proyectosFiltrados = categoria
    ? projects.filter(p => p.categoria?.toLowerCase() === categoria.toLowerCase())
    : projects;

  // Log de proyectos filtrados
  console.log('🔍 PROYECTOS FILTRADOS:', {
    categoria: categoria || 'Todas',
    cantidad: proyectosFiltrados.length,
    proyectos: proyectosFiltrados
  });

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
              <h1
                className={`${categoria && categoria.toLowerCase() === 'infantil'
                  ? 'text-[1.1rem] font-light text-primary uppercase'
                  : 'text-4xl md:text-5xl font-black text-text-light dark:text-text-dark'
                } mb-8`}
              >
                {categoria && categoria.toLowerCase() === 'infantil' ? categoria.toUpperCase() : categoria}
              </h1>
            )}

            {/* Mostrar categorías cuando NO hay filtro */}
            {showCategories && (
              <div className="flex-1 grid place-items-center">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-[clamp(12px,2.4vw,20px)] place-items-center justify-center">
                  {CATEGORIAS.map((cat, index) => (
                    <div key={cat.nombre} className="min-h-0 w-full">
                      <ProjectCard
                        id={index}
                        titulo={cat.nombre}
                        categoriaTitulo={cat.nombre}
                        img={cat.imagen}
                        size="aspect-square md:aspect-[2/3] w-full"
                        customLink={`/proyectos?categoria=${cat.nombre}`}
                      />
                    </div>
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
                      <p className="mt-4 text-gray-600 dark:text-gray-400">Cargando proyectos...</p>
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
                      <p className="text-gray-600 dark:text-gray-400">No hay proyectos en esta categoría</p>
                      <Link
                        to="/proyectos"
                        className="mt-4 inline-block text-primary hover:underline"
                      >
                        ← Volver a categorías
                      </Link>
                    </div>
                  </div>
                )}

                {!loading && !error && proyectosFiltrados.length > 0 && (
                  <div className="flex-1 flex flex-col justify-center relative w-full">
                    {/* Contenedor del carrusel */}
                    <div className="relative w-full">
                      {/* Grid de proyectos - Mantiene exactamente el mismo layout */}
                      <div 
                        key={currentSlide}
                        className="grid grid-cols-2 md:grid-cols-4 gap-[clamp(12px,2.4vw,20px)] place-items-center justify-center animate-fade-in"
                      >
                        {getProjectsForCurrentSlide().map((proyecto) => {
                          const imgSrc = proyecto.img || proyecto.galeria[0] || '';
                          const isImageLoaded = loadedImages.has(imgSrc);
                          const isFirstSlide = currentSlide === 0;

                          return (
                            <Link
                              key={proyecto.id}
                              to={`/proyectos/${proyecto.id}`}
                              className="group relative block overflow-hidden rounded-2xl aspect-square md:aspect-[2/3] hover:shadow-2xl transition-all duration-300 w-full"
                            >
                              {/* Skeleton/Placeholder mientras carga */}
                              {!isImageLoaded && (
                                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
                                  <div className="w-12 h-12 border-4 border-gray-300 dark:border-gray-600 border-t-primary rounded-full animate-spin"></div>
                                </div>
                              )}
                              
                              {/* Imagen */}
                              <img
                                src={imgSrc}
                                alt={proyecto.titulo}
                                className={`w-full h-full object-cover transition-opacity duration-300 ${
                                  isImageLoaded ? 'opacity-100' : 'opacity-0'
                                }`}
                                loading={isFirstSlide ? 'eager' : 'lazy'}
                                onLoad={() => {
                                  if (imgSrc) {
                                    setLoadedImages((prev) => new Set(prev).add(imgSrc));
                                  }
                                }}
                              />
                              
                              <div className="absolute bottom-0 left-0 right-0 bg-white px-6 md:px-8 py-4 md:py-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto shadow-sm">
                                <h3 className={`text-text-light dark:text-text-dark text-xs font-light mb-3 ${categoria && categoria.toLowerCase() === 'infantil' ? 'uppercase' : ''}`}>
                                  {proyecto.titulo}
                                </h3>
                                <div className="flex items-center gap-2 text-text-light dark:text-text-dark transition-colors">
                                  <span className="text-[11px] font-light">Ver Proyecto</span>
                                  <svg
                                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>

                    {/* Controles de navegación: Flechas + Indicadores de paginación (dots) */}
                    {totalSlides > 1 && (
                      <div className="flex justify-center items-center gap-4 md:gap-6 mt-6 md:mt-8">
                        {/* Flecha izquierda */}
                        <button
                          onClick={goToPrev}
                          className="bg-white/90 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800 rounded-full p-2 md:p-3 shadow-lg transition-all duration-300 hover:scale-110"
                          aria-label="Proyecto anterior"
                        >
                          <svg
                            className="w-5 h-5 md:w-6 md:h-6 text-text-light dark:text-text-dark"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 19l-7-7 7-7"
                            />
                          </svg>
                        </button>

                        {/* Indicadores de paginación (dots) */}
                        <div className="flex justify-center items-center gap-2">
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

                        {/* Flecha derecha */}
                        <button
                          onClick={goToNext}
                          className="bg-white/90 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800 rounded-full p-2 md:p-3 shadow-lg transition-all duration-300 hover:scale-110"
                          aria-label="Siguiente proyecto"
                        >
                          <svg
                            className="w-5 h-5 md:w-6 md:h-6 text-text-light dark:text-text-dark"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
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
