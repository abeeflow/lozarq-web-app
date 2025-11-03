import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const proyectos = [
  { id: 1, titulo: 'Residencia en el Valle', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800', size: 'lg:col-span-2 lg:row-span-2' },
  { id: 2, titulo: 'Loft Industrial Moderno', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600', size: '' },
  { id: 3, titulo: 'Casa de la Costa', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600', size: '' },
  { id: 4, titulo: 'Jardines Corporativos', img: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=600', size: '' },
  { id: 5, titulo: 'Patio Minimalista', img: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=600', size: '' },
  { id: 6, titulo: 'Edificio de Oficinas Verdes', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800', size: 'lg:col-span-2' },
];

export default function ProyectosPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen">
      <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-5">
        <div className="max-w-[1280px] mx-auto">
          <Header />
          <main className="mt-12">
            <h1 className="text-4xl md:text-5xl font-black text-text-light dark:text-text-dark mb-12">
              Nuestros Proyectos
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {proyectos.map((proyecto) => (
                <Link
                  key={proyecto.id}
                  to={`/proyecto/${proyecto.id}`}
                  className={`group relative block overflow-hidden rounded-xl ${proyecto.size}`}
                >
                  <img
                    src={proyecto.img}
                    alt={proyecto.titulo}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <h3 className="text-white text-2xl font-bold">{proyecto.titulo}</h3>
                    <div className="flex items-center gap-2 mt-2 text-white text-sm">
                      <span>Ver Proyecto</span>
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
