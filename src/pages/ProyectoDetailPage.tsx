import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useProject } from '../hooks/useProjects';
import { usePageSEO } from '../hooks/usePageSEO';

export default function ProyectoDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { project, loading, error } = useProject(Number(id));

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
            {(project.img || project.galeria[0]) && (
              <div className="mb-8 rounded-lg overflow-hidden shadow-xl">
                <img
                  src={project.img || project.galeria[0]}
                  alt={`${project.titulo} - Proyecto ${project.categoria}`}
                  className="w-full max-h-[600px] object-cover"
                  loading="eager"
                  fetchPriority="high"
                  width="1200"
                  height="600"
                />
              </div>
            )}

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
                    {new Date(project.fecha).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-12">
              <h3 className="text-xl font-light text-text-light dark:text-text-dark mb-4">
                Descripción
              </h3>
              <p className="text-base text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {project.descripcion}
              </p>
            </div>

            {/* Gallery */}
            {project.galeria.length > 0 && (
              <div>
                <h3 className="text-xl font-light text-text-light dark:text-text-dark mb-6">
                  Galería
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {project.galeria.map((url, index) => (
                    <div
                      key={index}
                      className="aspect-square rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                    >
                      {url.endsWith('.mp4') ? (
                        <video
                          src={url}
                          controls
                          className="w-full h-full object-cover"
                          preload="metadata"
                        />
                      ) : (
                        <img
                          src={url}
                          alt={`${project.titulo} - ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      )}
                    </div>
                  ))}
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
