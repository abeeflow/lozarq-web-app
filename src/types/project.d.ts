export interface Project {
  id: number;
  titulo: string;
  img?: string;
  ubicacion?: string;
  fecha?: string;
  descripcion: string;
  galeria: string[];
  categoria?: 'proyecto-1' | 'proyecto-2' | 'proyecto-3';
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
  categoria?: 'proyecto-1' | 'proyecto-2' | 'proyecto-3';
}

export interface UpdateProjectData {
  titulo?: string;
  img?: string;
  ubicacion?: string;
  fecha?: string;
  descripcion?: string;
  galeria?: string[];
  categoria?: 'proyecto-1' | 'proyecto-2' | 'proyecto-3';
}
