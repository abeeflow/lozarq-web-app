import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const proyectos = [
  {
    id: 1,
    titulo: 'Residencial',
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    ubicacion: 'Valle de Bravo, México',
    año: '2023',
    descripcion: 'Una residencia moderna que se integra perfectamente con el entorno natural del valle, combinando diseño contemporáneo con materiales locales.',
    galeria: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
    ]
  },
  {
    id: 2,
    titulo: 'Infantil',
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600',
    ubicacion: 'Ciudad de México',
    año: '2023',
    descripcion: 'Transformación de un espacio industrial en un loft moderno y funcional, manteniendo elementos arquitectónicos originales.',
    galeria: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
    ]
  },
  {
    id: 3,
    titulo: 'Comercial',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600',
    ubicacion: 'Riviera Maya, México',
    año: '2022',
    descripcion: 'Vivienda costera diseñada para maximizar las vistas al mar y la ventilación natural.',
    galeria: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
    ]
  },
  {
    id: 4,
    titulo: 'Coporativo',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600',
    ubicacion: 'Monterrey, México',
    año: '2023',
    descripcion: 'Espacios verdes corporativos que integran áreas de trabajo al aire libre con zonas de descanso.',
    galeria: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
    ]
  },
  
];

export default function ProyectoDetallePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blockIndex, setBlockIndex] = useState(0);

  const proyecto = proyectos.find(p => p.id === Number(id));
  
  // Agrupar imágenes en bloques de 6
  const agruparEnBloques = () => {
    if (!proyecto?.galeria) return [];
    const bloques = [];
    for (let i = 0; i < proyecto.galeria.length; i += 6) {
      const bloque = proyecto.galeria.slice(i, i + 6);
      bloques.push(bloque);
    }
    return bloques;
  };
  
  const bloques = agruparEnBloques();
  const totalBloques = bloques.length;
  const tieneMasDeUnBloque = totalBloques > 1;

  if (!proyecto) {
    return (
      <div className="bg-background-light dark:bg-background-dark min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-text-light dark:text-text-dark mb-4">
            Proyecto no encontrado
          </h1>
          <button
            onClick={() => navigate('/proyectos')}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Volver a Proyectos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-hidden">
      <div className="flex-1 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-3 sm:py-4 flex flex-col min-h-0">
        <Header />
        <div className="max-w-[1280px] mx-auto flex-1 flex flex-col w-full mt-10 sm:mt-16 md:mt-32">
          <main className="flex-1 flex flex-col min-h-0 mt-2 sm:mt-4">
            
            
            {/* Título */}
            <div className="mb-3 sm:mb-4 flex-shrink-0">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-thin text-gray-700 dark:text-gray-300 uppercase">
                {proyecto.titulo}
              </h1>
            </div>

            {/* Carrusel de galería con bloques de 6 imágenes */}
            {proyecto.galeria && proyecto.galeria.length > 0 && (
              <div className="flex-1 flex flex-col min-h-0 overflow-hidden justify-center">
                <div className="flex-1 flex items-center gap-2 sm:gap-4 md:gap-6 w-full">
                  {/* Flecha izquierda */}
                  <button
                    onClick={() => setBlockIndex((prev) => 
                      prev > 0 ? prev - 1 : totalBloques - 1
                    )}
                    disabled={!tieneMasDeUnBloque}
                    className={`flex-shrink-0 transition-colors ${
                      !tieneMasDeUnBloque
                        ? 'text-gray-300 dark:text-gray-700 cursor-not-allowed'
                        : 'text-text-light dark:text-text-dark hover:text-primary'
                    }`}
                    aria-label="Bloque anterior"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>chevron_left</span>
                  </button>

                  {/* Contenedor del carrusel */}
                  <div className="flex-1 relative w-full overflow-hidden">
                    <div 
                      className="flex h-full transition-transform duration-500 ease-in-out"
                      style={{ 
                        transform: `translateX(-${blockIndex * 100}%)`
                      }}
                    >
                      {bloques.map((bloque, bloqueIdx) => (
                        <div 
                          key={bloqueIdx} 
                          className="min-w-full w-full flex-shrink-0 h-full"
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 w-full h-full justify-items-center px-2">
                            {bloque.map((img, index) => {
                              // Calcular el índice global de la imagen en la galería
                              const imagenGlobalIndex = bloqueIdx * 6 + index;
                              return (
                                <div 
                                  key={index} 
                                  className="w-full h-full min-h-[220px] sm:min-h-[240px] md:min-h-[260px] lg:min-h-[280px] cursor-pointer hover:opacity-90 transition-opacity"
                                  onClick={() => navigate(`/proyecto/${id}/imagen/${imagenGlobalIndex}`)}
                                >
                                  <img
                                    src={img}
                                    alt={`${proyecto.titulo} - Bloque ${bloqueIdx + 1} - ${index + 1}`}
                                    className="w-full h-full object-cover rounded-lg sm:rounded-xl shadow-lg max-h-[220px] sm:max-h-[240px] md:max-h-[260px] lg:max-h-[280px]"
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Flecha derecha */}
                  <button
                    onClick={() => setBlockIndex((prev) => 
                      prev < totalBloques - 1 ? prev + 1 : 0
                    )}
                    disabled={!tieneMasDeUnBloque}
                    className={`flex-shrink-0 transition-colors ${
                      !tieneMasDeUnBloque
                        ? 'text-gray-300 dark:text-gray-700 cursor-not-allowed'
                        : 'text-text-light dark:text-text-dark hover:text-primary'
                    }`}
                    aria-label="Bloque siguiente"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>chevron_right</span>
                  </button>
                </div>

                {/* Controles del carrusel (indicadores y contador) */}
                <div className="mt-4 sm:mt-6 flex items-center justify-center gap-3 sm:gap-4 flex-shrink-0">
                  {/* Indicadores */}
                  <div className="flex gap-2 sm:gap-2.5">
                    {bloques.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => tieneMasDeUnBloque && setBlockIndex(index)}
                        disabled={!tieneMasDeUnBloque}
                        className={`h-2 sm:h-2.5 rounded-full transition-all ${
                          index === blockIndex 
                            ? 'w-6 sm:w-7 bg-primary shadow-md' 
                            : 'w-2 sm:w-2.5 bg-gray-400 hover:bg-gray-500'
                        } ${!tieneMasDeUnBloque ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        aria-label={`Ir a bloque ${index + 1}`}
                      />
                    ))}
                  </div>
                  
                  {/* Contador */}
                  <div className="text-xs sm:text-sm text-text-light dark:text-text-dark">
                    {blockIndex + 1} / {totalBloques}
                  </div>
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
