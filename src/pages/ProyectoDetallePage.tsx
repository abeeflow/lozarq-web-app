import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Datos de proyectos (mismo array que ProyectosPage)
const proyectos = [
  {
    id: 1,
    titulo: 'Residencia en el Valle',
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    ubicacion: 'Valle de Bravo, México',
    año: '2023',
    descripcion: 'Una residencia moderna que se integra perfectamente con el entorno natural del valle, combinando diseño contemporáneo con materiales locales.',
    galeria: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
    ]
  },
  {
    id: 2,
    titulo: 'Loft Industrial Moderno',
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
    titulo: 'Casa de la Costa',
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
    titulo: 'Jardines Corporativos',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600',
    ubicacion: 'Monterrey, México',
    año: '2023',
    descripcion: 'Espacios verdes corporativos que integran áreas de trabajo al aire libre con zonas de descanso.',
    galeria: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
    ]
  },
  {
    id: 5,
    titulo: 'Patio Minimalista',
    img: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=600',
    ubicacion: 'Guadalajara, México',
    año: '2022',
    descripcion: 'Diseño minimalista de patio con enfoque en líneas limpias y materiales naturales.',
    galeria: [
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800'
    ]
  },
];

export default function ProyectoDetallePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const proyecto = proyectos.find(p => p.id === Number(id));

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
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
      <div className="flex-1 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-5">
        <div className="max-w-[1280px] mx-auto">
          <Header />
          <br />
          <br />
          <br />
          <br />

          <main className="mt-12">
            {/* Botón Volver */}
            <button
              onClick={() => navigate('/proyectos')}
              className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity mb-8"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              <span className="font-medium">Volver a proyectos</span>
            </button>

            {/* Encabezado del Proyecto */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-black text-text-light dark:text-text-dark mb-4">
                {proyecto.titulo}
              </h1>
              <div className="flex flex-wrap gap-6 text-text-light dark:text-text-dark">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined">location_on</span>
                  <span>{proyecto.ubicacion}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined">calendar_today</span>
                  <span>{proyecto.año}</span>
                </div>
              </div>
            </div>

            {/* Imagen Principal */}
            <div className="mb-12">
              <img
                src={proyecto.img}
                alt={proyecto.titulo}
                className="w-full h-[400px] md:h-[600px] object-cover rounded-2xl shadow-xl"
              />
            </div>

            {/* Descripción */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-text-light dark:text-text-dark mb-4">
                Descripción
              </h2>
              <p className="text-lg text-text-light dark:text-text-dark leading-relaxed">
                {proyecto.descripcion}
              </p>
            </div>

            {/* Galería */}
            {proyecto.galeria && proyecto.galeria.length > 1 && (
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-text-light dark:text-text-dark mb-6">
                  Galería
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {proyecto.galeria.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`${proyecto.titulo} - ${index + 1}`}
                      className="w-full h-64 object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Botón Volver (inferior) */}
            <div className="mt-12 text-center">
              <button
                onClick={() => navigate('/proyectos')}
                className="px-8 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
              >
                Ver otros proyectos
              </button>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
