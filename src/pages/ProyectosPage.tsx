import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';

const proyectos = [
  { id: 1, titulo: 'Residencia en el Valle', categoriaTitulo: 'RESIDENCIAL', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800', size: 'lg:col-span-2 lg:row-span-2', categoria: 'interiores-vivienda' },
  { id: 2, titulo: 'Loft Industrial Moderno', categoriaTitulo: 'INFANTIL', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600', size: '', categoria: 'comercio' },
  { id: 3, titulo: 'Casa de la Costa', categoriaTitulo: 'COMERCIAL', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600', size: '', categoria: 'interiores-vivienda' },
  { id: 4, titulo: 'Jardines Corporativos', categoriaTitulo: 'CORPORATIVO', img: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=600', size: '', categoria: 'infantil' },
  //{ id: 5, titulo: 'Patio Minimalista', img: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=600', size: '', categoria: 'comercio' },
];



export default function ProyectosPage() {
  const [searchParams] = useSearchParams();
  const categoria = searchParams.get('categoria');

  const proyectosFiltrados = categoria
    ? proyectos.filter(p => p.categoria === categoria)
    : proyectos;
  return (
    <div className="relative flex h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-hidden">
      <div className="flex-1 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-5 flex flex-col min-h-0">
        <div className="max-w-[1280px] mx-auto flex-1 flex flex-col min-h-0">
          <Header />
          <br />
          <br />
          <br />
          <br />
          <main className="mt-12 flex-1 flex flex-col min-h-0">
            <h1 className="text-4xl md:text-5xl font-black text-text-light dark:text-text-dark mb-8">
              
            </h1>
            <div className="flex-1 grid grid-cols-4 gap-4 md:gap-6 min-h-0">
              {proyectosFiltrados.map((proyecto) => (
                <ProjectCard
                  key={proyecto.id}
                  id={proyecto.id}
                  titulo={proyecto.titulo}
                  categoriaTitulo={proyecto.categoriaTitulo}
                  img={proyecto.img}
                  size=""
                />
              ))}
            </div>
          </main>

        </div>

      </div>
      <Footer />
    </div>

  );
}
