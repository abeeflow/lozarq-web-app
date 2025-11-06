import Header from '../components/Header';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';

const proyectos = [
  { id: 1, titulo: 'Residencia en el Valle', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800', size: 'lg:col-span-2 lg:row-span-2' },
  { id: 2, titulo: 'Loft Industrial Moderno', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600', size: '' },
  { id: 3, titulo: 'Casa de la Costa', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600', size: '' },
  { id: 4, titulo: 'Jardines Corporativos', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600', size: '' },
  { id: 5, titulo: 'Patio Minimalista', img: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=600', size: '' },
];

export default function ProyectosPage() {
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
            <h1 className="text-4xl md:text-5xl font-black text-text-light dark:text-text-dark mb-12">

            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {proyectos.map((proyecto) => (
                <ProjectCard
                  key={proyecto.id}
                  id={proyecto.id}
                  titulo={proyecto.titulo}
                  img={proyecto.img}
                  size={proyecto.size}
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
