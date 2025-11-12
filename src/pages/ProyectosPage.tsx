import { useSearchParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';
import { useProjects } from '../hooks/useProjects';

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

  const proyectosFiltrados = categoria
    ? projects.filter(p => p.categoria === categoria)
    : projects;

  // Si NO hay categoría en la URL, mostrar las 4 categorías
  const showCategories = !categoria;
  return (
    <div className="relative grid h-screen w-full grid-rows-[auto,1fr,auto] bg-background-light dark:bg-background-dark">
      <Header />
      <div className="min-h-0 h-full px-[clamp(12px,3.2vw,48px)] py-[clamp(12px,2.4vw,24px)] overflow-y-auto">
        <div className="max-w-[1280px] mx-auto h-full min-h-0">
          <main className="h-full flex flex-col">
            {!showCategories && (
              <h1 className="text-4xl md:text-5xl font-black text-text-light dark:text-text-dark mb-8">
                {categoria}
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
                  <div className="flex-1 grid place-items-center">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-[clamp(12px,2.4vw,20px)] place-items-center justify-center">
                      {proyectosFiltrados.slice(0,4).map((proyecto) => (
                        <Link
                          key={proyecto.id}
                          to={`/proyectos/${proyecto.id}`}
                          className="group relative block overflow-hidden rounded-2xl aspect-square md:aspect-[2/3] hover:shadow-2xl transition-all duration-300 w-full"
                        >
                          <img
                            src={proyecto.img || proyecto.galeria[0] || ''}
                            alt={proyecto.titulo}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-8">
                            <h3 className="text-white text-2xl md:text-3xl font-bold mb-3">
                              {proyecto.titulo}
                            </h3>
                            <div className="flex items-center gap-2 text-white/90 group-hover:text-white transition-colors">
                              <span className="text-sm md:text-base">Ver Proyecto</span>
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
                      ))}
                    </div>
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
