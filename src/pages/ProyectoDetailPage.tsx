import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useProject } from '../hooks/useProjects';
import { usePageSEO } from '../hooks/usePageSEO';

export default function ProyectoDetailPage() {
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
        <div className="flex-1 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-5 flex flex-col">
          <div className="max-w-[1280px] mx-auto flex-1 flex flex-col">
            <Header />
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Cargando proyecto...</p>
              </div>
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
        <div className="flex-1 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-5 flex flex-col">
          <div className="max-w-[1280px] mx-auto flex-1 flex flex-col">
            <Header />
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <p className="text-red-600 dark:text-red-400 mb-4">
                  {error || 'Proyecto no encontrado'}
                </p>
                <Link
                  to="/proyectos"
                  className="inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  ← Volver a proyectos
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
      <div className="flex-1 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 pt-3 pb-5">
        <div className="max-w-[1280px] mx-auto">
          <Header />

          <main className="mt-8 relative z-10">
            {/* Back Button */}
            <button
              onClick={handleBack}
              className="mb-4 -mt-3 inline-flex items-center gap-2 text-primary text-sm hover:underline cursor-pointer bg-transparent border-0 p-1.5 -ml-2 relative z-20"
              type="button"
            >
              ← Volver al listado
            </button>

            {/* Project Title */}
            <h1 className="text-sm font-light uppercase text-text-light dark:text-text-dark mb-4">
              {project.titulo}
            </h1>

            {/* Category */}
            {project.categoria && (
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-xs font-light uppercase tracking-wider">
                  {project.categoria}
                </span>
              </div>
            )}

            {/* Main Image */}
            {(project.img || project.galeria[0]) && (() => {
              const mainImageSrc = project.img || project.galeria[0];
              const isMainImageLoaded = loadedImages.has(mainImageSrc);
              
              return (
                <div className="mb-8 rounded-lg overflow-hidden shadow-xl relative">
                  {/* Skeleton/Placeholder mientras carga */}
                  {!isMainImageLoaded && (
                    <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
                      <div className="w-16 h-16 border-4 border-gray-300 dark:border-gray-600 border-t-primary rounded-full animate-spin"></div>
                    </div>
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

            {/* Project Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {project.ubicacion && (
                <div>
                  <h3 className="text-sm font-light text-gray-500 dark:text-gray-400 uppercase mb-2">
                    Ubicación
                  </h3>
                  <p className="text-base text-text-light dark:text-text-dark">
                    {project.ubicacion}
                  </p>
                </div>
              )}
              {project.fecha && (
                <div>
                  <h3 className="text-sm font-light text-gray-500 dark:text-gray-400 uppercase mb-2">
                    Fecha
                  </h3>
                  <p className="text-base text-text-light dark:text-text-dark">
                    {new Date(project.fecha).getFullYear()}
                  </p>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-12">
              <h3 className="text-sm font-light uppercase text-text-light dark:text-text-dark mb-4">
                Descripción
              </h3>
              <p className="text-base text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {project.descripcion}
              </p>
            </div>

            {/* Gallery */}
            {project.galeria.length > 0 && (
              <div>
                <h3 className="text-sm font-light uppercase text-text-light dark:text-text-dark mb-6">
                  Galería
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {project.galeria.map((url, index) => {
                    const isImageLoaded = loadedImages.has(url);
                    const isVideo = url.endsWith('.mp4');
                    
                    return (
                      <div
                        key={index}
                        className="aspect-square rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow relative"
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
                            {/* Skeleton/Placeholder mientras carga */}
                            {!isImageLoaded && (
                              <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
                                <div className="w-12 h-12 border-4 border-gray-300 dark:border-gray-600 border-t-primary rounded-full animate-spin"></div>
                              </div>
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
                              className={`w-full h-full object-cover hover:scale-105 transition-all duration-300 ${
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
              </div>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
