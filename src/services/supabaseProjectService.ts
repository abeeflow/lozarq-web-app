import { supabase } from '../lib/supabase.config';
import type { Project, CreateProjectData, UpdateProjectData } from '../types/project';
import { storageService, type UploadResult } from './supabaseStorageService';

export interface CreateProjectWithFilesData {
  titulo: string;
  ubicacion?: string;
  fecha?: string;
  descripcion: string;
  categoria?: 'Residencial' | 'Infantil' | 'Comercial' | 'Corporativo';
  files: File[];
  coverIndex?: number;
  onProgress?: (message: string) => void;
}

export const projectService = {
  async getAll(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getById(id: number): Promise<Project | null> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async create(projectData: CreateProjectData): Promise<Project> {
    // Convertir categoría a minúsculas para cumplir con el constraint de la BD
    const dataToInsert = {
      ...projectData,
      categoria: projectData.categoria?.toLowerCase(),
    };

    const { data, error } = await supabase
      .from('projects')
      .insert([dataToInsert])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: number, projectData: UpdateProjectData): Promise<Project> {
    // Convertir categoría a minúsculas para cumplir con el constraint de la BD
    const dataToUpdate = {
      ...projectData,
      categoria: projectData.categoria?.toLowerCase(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('projects')
      .update(dataToUpdate)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: number): Promise<void> {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  /**
   * Crea un proyecto con imágenes de forma transaccional.
   * Si falla la creación del proyecto, elimina las imágenes subidas.
   */
  async createWithFiles(data: CreateProjectWithFilesData): Promise<Project> {
    const { files, coverIndex, onProgress, ...projectFields } = data;
    let uploadedFiles: UploadResult[] = [];

    try {
      // Paso 1: Subir archivos
      onProgress?.('Subiendo archivos...');

      // Subir archivos en paralelo con manejo de errores individual
      const uploadPromises = files.map(async (file, index) => {
        onProgress?.(`Subiendo archivo ${index + 1} de ${files.length}...`);
        return storageService.uploadFile(file, 'projects');
      });

      uploadedFiles = await Promise.all(uploadPromises);
      const galleryUrls = uploadedFiles.map(r => r.url);

      // Determinar imagen de portada
      const coverImage = coverIndex !== null && coverIndex !== undefined
        ? galleryUrls[coverIndex]
        : galleryUrls[0] || '';

      // Paso 2: Crear proyecto en la base de datos
      onProgress?.('Guardando proyecto...');

      const projectData: CreateProjectData = {
        titulo: projectFields.titulo,
        img: coverImage,
        ubicacion: projectFields.ubicacion,
        fecha: projectFields.fecha,
        descripcion: projectFields.descripcion,
        galeria: galleryUrls,
        categoria: projectFields.categoria,
      };

      const project = await this.create(projectData);

      onProgress?.('Proyecto creado exitosamente');
      return project;

    } catch (error) {
      // Rollback: Eliminar archivos subidos si falla la creación
      if (uploadedFiles.length > 0) {
        onProgress?.('Error al crear proyecto. Limpiando archivos...');
        console.log('Iniciando rollback. Archivos a eliminar:', uploadedFiles.map(f => f.path));

        // Eliminar uno por uno para asegurar que se borren todos
        for (const file of uploadedFiles) {
          try {
            console.log('Eliminando archivo:', file.path);
            await storageService.deleteFile(file.path);
            console.log('Archivo eliminado exitosamente:', file.path);
          } catch (cleanupError) {
            console.error('Error eliminando archivo:', file.path, cleanupError);
          }
        }

        onProgress?.('Archivos limpiados. Error en la creación del proyecto.');
      }

      throw error;
    }
  },
};
