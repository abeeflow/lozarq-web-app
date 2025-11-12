import { Link } from 'react-router-dom';

interface ProjectCardProps {
  id: number;
  titulo: string;
  categoriaTitulo?: string;
  img: string;
  size?: string;
  customLink?: string;
}

export default function ProjectCard({ id, titulo, categoriaTitulo, img, size = '', customLink }: ProjectCardProps) {
  const linkTo = customLink || `/proyectos/${id}`;

  return (
    <Link
      to={linkTo}
      className={`group relative block overflow-hidden rounded-xl h-full min-h-0 ${size}`}
    >
      <img
        src={img}
        alt={titulo}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
      {/* Título centrado en la mitad de la imagen */}
      {categoriaTitulo && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full bg-white/60 backdrop-blur-sm py-3 md:py-4 rounded-sm group-hover:bg-white/75 transition-all flex items-center justify-center">
            <h2 className="text-gray-900/70 text-2xl md:text-3xl lg:text-4xl font-medium tracking-wide uppercase text-center group-hover:text-gray-900/90 transition-all">
              {categoriaTitulo}
            </h2>
          </div>
        </div>
      )}
    </Link>
  );
}
