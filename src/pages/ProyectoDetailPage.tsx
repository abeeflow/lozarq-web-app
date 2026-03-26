import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useProject } from '../hooks/useProjects';
import { usePageSEO } from '../hooks/usePageSEO';
import { useLanguage } from '../contexts/LanguageContext';

export default function ProyectoDetailPage() {
  const { t } = useLanguage();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { project, loading, error } = useProject(Number(id));
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const preloadedImagesRef = useRef<Set<string>>(new Set());
  const imageRefs = useRef<Map<number, HTMLImageElement>>(new Map());

  // SEO dinámico basado en el proyecto
  usePageSEO({
    title: project ? `${project.titulo} | Lozarq Estudio` : 'Proyecto | Lozarq Estudio',
    description: project
      ? `${project.descripcion?.substring(0, 150) || `Proyecto ${project.categoria} en ${project.ubicacion || 'Lima'}`}...`
      : 'Descubre nuestros proyectos de arquitectura e interiorismo',
    keywords: project
      ? `${project.titulo}, ${project.categoria}, proyecto arquitectura, ${project.ubicacion || 'Lima'}`
      : 'proyectos arquitectura, diseño',
    ogImage: project?.img || 'https://www.lozarqestudio.com/foto_main.jpg',
    canonical: `https://www.lozarqestudio.com/proyecto/${id}`
  });

  const handleBack = () => {
    navigate(-1);
  };

  // Función para precargar una imagen
  const preloadImage = (src: string) => {
    if (!src || preloadedImagesRef.current.has(src)) return;
    
    preloadedImagesRef.current.add(src);
    const img = new Image();
    img.onload = () => {
      setLoadedImages((prev) => new Set(prev).add(src));
    };
    img.onerror = () => {
      // Si falla, marcarla como procesada para no intentar de nuevo
      preloadedImagesRef.current.add(src);
    };
    img.src = src;
  };

  // Precargar imágenes en paralelo con límite de concurrencia
  const preloadImagesInParallel = (urls: string[], concurrency: number = 4) => {
    let currentIndex = 0;
    let activeLoads = 0;
    
    const loadNext = () => {
      while (currentIndex < urls.length && activeLoads < concurrency) {
        const url = urls[currentIndex++];
        if (url && !url.endsWith('.mp4')) {
          activeLoads++;
          const img = new Image();
          img.onload = () => {
            activeLoads--;
            setLoadedImages((prev) => new Set(prev).add(url));
            loadNext(); // Cargar la siguiente cuando termine
          };
          img.onerror = () => {
            activeLoads--;
            loadNext(); // Continuar aunque falle
          };
          img.src = url;
          preloadedImagesRef.current.add(url);
        }
      }
    };

    // Iniciar la carga
    loadNext();
  };

  // Intersection Observer para cargar imágenes bajo demanda
  useEffect(() => {
    if (!project || imageRefs.current.size === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const src = img.src;
            if (src && !preloadedImagesRef.current.has(src)) {
              preloadImage(src);
            }
            observer.unobserve(img);
          }
        });
      },
      {
        rootMargin: '200px', // Precargar cuando está a 200px de ser visible
        threshold: 0.01
      }
    );

    // Observar todas las imágenes de la galería
    imageRefs.current.forEach((img) => {
      if (img) observer.observe(img);
    });

    return () => {
      imageRefs.current.forEach((img) => {
        if (img) observer.unobserve(img);
      });
      observer.disconnect();
    };
  }, [project]);

  // Precargar imágenes cuando el proyecto se carga
  useEffect(() => {
    if (!project) return;

    // Precargar imagen principal inmediatamente
    const mainImage = project.img || project.galeria[0];
    if (mainImage) {
      preloadImage(mainImage);
    }

    // Filtrar solo imágenes (no videos)
    const imageUrls = project.galeria.filter(url => url && !url.endsWith('.mp4'));

    // Precargar primeras 12 imágenes inmediatamente (aumentado de 6)
    const firstBatch = imageUrls.slice(0, 12);
    firstBatch.forEach((url) => {
      preloadImage(url);
    });

    // Precargar el resto en paralelo con límite de concurrencia
    const remainingImages = imageUrls.slice(12);
    if (remainingImages.length > 0) {
      // Reducido delay inicial de 500ms a 100ms
      const timeoutId = setTimeout(() => {
        // Precargar 4 imágenes a la vez en paralelo
        preloadImagesInParallel(remainingImages, 4);
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [project]);

  if (loading) {
    return (
      <div className="relative flex h-screen w-full flex-col bg-background-light dark:bg-background-dark">
        <div className="flex-1 px-6 sm:px-10 md:px-16 lg:px-24 xl:px-40 py-5 flex flex-col">
          <div className="max-w-[1280px] mx-auto flex-1 flex flex-col">
            <Header />
            <div className="flex-1 flex items-center justify-center">
              <p className="text-sm font-light tracking-[0.1em] text-text-light/40 dark:text-text-dark/40">{t.proyectoDetalle.cargando}</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="relative flex h-screen w-full flex-col bg-background-light dark:bg-background-dark">
        <div className="flex-1 px-6 sm:px-10 md:px-16 lg:px-24 xl:px-40 py-5 flex flex-col">
          <div className="max-w-[1280px] mx-auto flex-1 flex flex-col">
            <Header />
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <p className="text-sm font-light tracking-[0.1em] text-text-light/40 dark:text-text-dark/40 mb-6">
                  {error || t.proyectoDetalle.noEncontrado}
                </p>
                <Link
                  to="/proyectos"
                  className="text-sm font-light tracking-[0.1em] text-primary hover:text-primary/70 transition-colors duration-300"
                >
                  &larr; {t.proyectoDetalle.volverAProyectos}
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Meta info line: Categoria | Ubicacion | Año
  const metaParts: string[] = [];
  if (project.categoria) metaParts.push(project.categoria);
  if (project.ubicacion) metaParts.push(project.ubicacion);
  if (project.fecha) metaParts.push(new Date(project.fecha).getFullYear().toString());

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
      <div className="flex-1 px-6 sm:px-10 md:px-16 lg:px-24 xl:px-40 pt-3 pb-12">
        <div className="max-w-[1280px] mx-auto">
          <Header />

          <main className="mt-6 sm:mt-8 relative z-10">
            {/* Back Button */}
            <button
              onClick={handleBack}
              className="group inline-flex items-center gap-2 text-sm font-light tracking-[0.1em] text-text-light/50 dark:text-text-dark/50 hover:text-text-light dark:hover:text-text-dark transition-colors duration-300 mb-8 bg-transparent border-0 cursor-pointer relative z-20"
              type="button"
            >
              <span className="transition-transform duration-300 group-hover:-translate-x-1">&larr;</span>
              {t.proyectoDetalle.volver}
            </button>

            {/* Project Title */}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-light tracking-[0.1em] text-text-light dark:text-text-dark mb-3">
              {project.titulo}
            </h1>

            {/* Meta: Categoria | Ubicacion | Año */}
            {metaParts.length > 0 && (
              <p className="text-xs sm:text-sm font-light tracking-[0.15em] text-text-light/40 dark:text-text-dark/40 mb-8">
                {metaParts.join('  |  ')}
              </p>
            )}

            {/* Main Image */}
            {(project.img || project.galeria[0]) && (() => {
              const mainImageSrc = project.img || project.galeria[0];
              const isMainImageLoaded = loadedImages.has(mainImageSrc);

              return (
                <div className="mb-10 rounded-lg overflow-hidden relative">
                  {!isMainImageLoaded && (
                    <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 animate-pulse"></div>
                  )}
                  <img
                    src={mainImageSrc}
                    alt={`${project.titulo} - Proyecto ${project.categoria}`}
                    className={`w-full max-h-[600px] object-cover transition-opacity duration-300 ${
                      isMainImageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    loading="eager"
                    fetchPriority="high"
                    width="1200"
                    height="600"
                    onLoad={() => {
                      if (mainImageSrc) {
                        setLoadedImages((prev) => new Set(prev).add(mainImageSrc));
                      }
                    }}
                  />
                </div>
              );
            })()}

            {/* Description */}
            {project.descripcion && (
              <div className="mb-10 max-w-3xl">
                <p className="text-sm sm:text-base font-light text-text-light/70 dark:text-text-dark/70 leading-relaxed whitespace-pre-line">
                  {project.descripcion}
                </p>
              </div>
            )}

            {/* Separator */}
            {project.galeria.length > 0 && (
              <div className="flex justify-center mb-10">
                <div className="w-[40%] h-px bg-primary/20"></div>
              </div>
            )}

            {/* Gallery */}
            {project.galeria.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[clamp(12px,2.5vw,24px)]">
                {project.galeria.map((url, index) => {
                  const isImageLoaded = loadedImages.has(url);
                  const isVideo = url.endsWith('.mp4');

                  return (
                    <div
                      key={index}
                      className="group aspect-square rounded-lg overflow-hidden relative"
                    >
                      {isVideo ? (
                        <video
                          src={url}
                          controls
                          className="w-full h-full object-cover"
                          preload="metadata"
                        />
                      ) : (
                        <>
                          {!isImageLoaded && (
                            <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 animate-pulse"></div>
                          )}
                          <img
                            ref={(el) => {
                              if (el) {
                                imageRefs.current.set(index, el);
                              } else {
                                imageRefs.current.delete(index);
                              }
                            }}
                            src={url}
                            alt={`${project.titulo} - ${index + 1}`}
                            className={`w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-[1.02] ${
                              isImageLoaded ? 'opacity-100' : 'opacity-0'
                            }`}
                            loading={index < 12 ? 'eager' : 'lazy'}
                            fetchPriority={index < 12 ? 'high' : 'auto'}
                            onLoad={() => {
                              if (url) {
                                setLoadedImages((prev) => new Set(prev).add(url));
                              }
                            }}
                          />
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
