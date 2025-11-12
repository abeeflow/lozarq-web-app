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
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
    ]
  },
  {
    id: 3,
    titulo: 'Comercial',
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    ubicacion: 'Riviera Maya, México',
    año: '2022',
    descripcion: 'Vivienda costera diseñada para maximizar las vistas al mar y la ventilación natural.',
    galeria: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
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

export default function ImagenDetallePage() {
  const { id, imageIndex } = useParams<{ id: string; imageIndex: string }>();
  const navigate = useNavigate();

  const proyecto = proyectos.find(p => p.id === Number(id));
  const imagenIndex = imageIndex ? parseInt(imageIndex) : 0;

  if (!proyecto || !proyecto.galeria || imagenIndex >= proyecto.galeria.length) {
    return (
      <div className="bg-background-light dark:bg-background-dark min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-text-light dark:text-text-dark mb-4">
            Imagen no encontrada
          </h1>
         
        </div>
      </div>
    );
  }

  const imagenUrl = proyecto.galeria[imagenIndex];

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
      <div className="flex-1 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-3 sm:py-4 flex flex-col min-h-0">
        <div className="max-w-[1280px] mx-auto flex-1 flex flex-col w-full">
          <Header />
          <main className="flex-1 flex flex-col min-h-0 mt-8 sm:mt-32">
            

            {/* Título */}
            <div className="mb-6 sm:mb-8 flex-shrink-0">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-thin text-text-light dark:text-text-dark uppercase">
                {proyecto.titulo}
              </h1>
            </div>

            {/* Imagen centrada (más pequeña) */}
            <div className="flex flex-col items-center justify-center mb-6 sm:mb-8">
              <div className="w-full max-w-2xl">
                <img
                  src={imagenUrl}
                  alt={`${proyecto.titulo} - Imagen ${imagenIndex + 1}`}
                  className="w-full h-auto object-contain rounded-lg sm:rounded-xl shadow-2xl"
                />
              </div>
            </div>

            {/* Descripción */}
            <div className="w-full max-w-5xl mx-auto mb-6 sm:mb-8">
              <p className="text-base sm:text-lg md:text-xl text-text-light dark:text-text-dark leading-relaxed text-center">
                {proyecto.descripcion}
              </p>
            </div>

            {/* Grid de galería */}
            {proyecto.galeria && proyecto.galeria.length > 0 && (
              <div className="w-full max-w-5xl mx-auto mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-light dark:text-text-dark mb-4 sm:mb-6">
                  Galería
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                  {proyecto.galeria.map((img, index) => (
                    <div 
                      key={index} 
                      className="w-full h-full min-h-[150px] sm:min-h-[180px] md:min-h-[200px] cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => navigate(`/proyecto/${id}/imagen/${index}`)}
                    >
                      <img
                        src={img}
                        alt={`${proyecto.titulo} - ${index + 1}`}
                        className={`w-full h-full object-cover rounded-lg sm:rounded-xl shadow-lg ${
                          index === imagenIndex ? 'ring-2 ring-primary' : ''
                        }`}
                      />
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

