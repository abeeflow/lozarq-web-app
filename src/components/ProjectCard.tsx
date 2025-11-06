import { Link } from 'react-router-dom';

interface ProjectCardProps {
  id: number;
  titulo: string;
  img: string;
  size?: string;
}

export default function ProjectCard({ id, titulo, img, size = '' }: ProjectCardProps) {
  return (
    <Link
      to={`/proyecto/${id}`}
      className={`group relative block overflow-hidden rounded-xl ${size}`}
    >
      <img
        src={img}
        alt={titulo}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <h3 className="text-white text-2xl font-bold">{titulo}</h3>
        <div className="flex items-center gap-2 mt-2 text-white text-sm">
          <span>Ver Proyecto</span>
          <span className="material-symbols-outlined">arrow_forward</span>
        </div>
      </div>
    </Link>
  );
}
