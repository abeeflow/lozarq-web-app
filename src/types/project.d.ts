export interface Project {
  id: number;
  titulo: string;
  img?: string;
  ubicacion?: string;
  fecha?: string;
  descripcion: string;
  galeria: string[];
  created_at: string;
  updated_at: string;
}

export interface CreateProjectData {
  titulo: string;
  img?: string;
  ubicacion?: string;
  fecha?: string;
  descripcion: string;
  galeria: string[];
}

export interface UpdateProjectData {
  titulo?: string;
  img?: string;
  ubicacion?: string;
  fecha?: string;
  descripcion?: string;
  galeria?: string[];
}
