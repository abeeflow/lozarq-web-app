export interface Project {
  id: number;
  titulo: string;
  img?: string;
  ubicacion?: string;
  fecha?: string;
  descripcion: string;
  galeria: string[];
  categoria?: 'Residencial' | 'Infantil' | 'Comercial' | 'Corporativo';
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
  categoria?: 'Residencial' | 'Infantil' | 'Comercial' | 'Corporativo';
}

export interface UpdateProjectData {
  titulo?: string;
  img?: string;
  ubicacion?: string;
  fecha?: string;
  descripcion?: string;
  galeria?: string[];
  categoria?: 'Residencial' | 'Infantil' | 'Comercial' | 'Corporativo';
}
