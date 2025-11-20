import { useState, useEffect } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../../components/AdminLayout';
import { useProject } from '../../../hooks/useProjects';
import { projectService } from '../../../services/supabaseProjectService';
import { storageService } from '../../../services/supabaseStorageService';

interface FilePreview {
  file: File;
  preview: string;
  type: 'image' | 'video';
}

export default function AdminProjectsEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { project, loading: projectLoading, error: projectError } = useProject(Number(id));

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentYear = new Date().getFullYear();
  
  const [formData, setFormData] = useState({
    titulo: '',
    img: '',
    ubicacion: '',
    fecha: currentYear.toString(),
    descripcion: '',
    categoria: '' as 'Residencial' | 'Infantil' | 'Comercial' | 'Corporativo' | '',
  });

  const [existingGallery, setExistingGallery] = useState<string[]>([]);
  const [newFiles, setNewFiles] = useState<FilePreview[]>([]);
  const [selectedCoverIndex, setSelectedCoverIndex] = useState<number | null>(null);
  const [uploadProgress, setUploadProgress] = useState<string>('');

  useEffect(() => {
    if (project) {
      // Extraer solo el año de la fecha
      let fechaFormatted = currentYear.toString();
      if (project.fecha) {
        // Extraer el año directamente del string para evitar problemas de zona horaria
        // La fecha puede venir como "2025-01-01" o como ISO string completo
        const fechaStr = project.fecha.split('T')[0]; // Obtener solo la parte de fecha (YYYY-MM-DD)
        const parts = fechaStr.split('-');
        if (parts.length >= 1 && parts[0]) {
          const year = parts[0].trim();
          fechaFormatted = year;
        }
      }
      
      setFormData({
        titulo: project.titulo,
        img: project.img || '',
        ubicacion: project.ubicacion || '',
        fecha: fechaFormatted,
        descripcion: project.descripcion,
        categoria: project.categoria || '',
      });
      setExistingGallery(project.galeria);
      // Find current cover index
      if (project.img && project.galeria.length > 0) {
        const coverIndex = project.galeria.findIndex(url => url === project.img);
        if (coverIndex !== -1) {
          setSelectedCoverIndex(coverIndex);
        }
      }
    }
  }, [project, currentYear]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const year = e.target.value;
    if (year) {
      setFormData((prev) => ({ ...prev, fecha: year }));
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setError(null);

    const newPreviews: FilePreview[] = [];

    selectedFiles.forEach((file) => {
      const validation = storageService.validateFile(file);
      if (!validation.valid) {
        setError(validation.error || 'Archivo inválido');
        return;
      }

      const preview = URL.createObjectURL(file);
      const type = file.type.startsWith('video/') ? 'video' : 'image';
      newPreviews.push({ file, preview, type });
    });

    setNewFiles((prev) => [...prev, ...newPreviews]);
    e.target.value = '';
  };

  const removeExistingFile = async (url: string) => {
    if (!confirm('¿Eliminar este archivo de la galería?')) return;

    try {
      // Extract path from URL
      const urlObj = new URL(url);
      const path = urlObj.pathname.split('/').slice(-2).join('/');

      // Remove from storage
      await storageService.deleteFile(path);

      // Find the index of the removed image
      const removedIndex = existingGallery.findIndex(u => u === url);

      // Update state
      setExistingGallery((prev) => prev.filter((u) => u !== url));

      // Adjust selected cover index if necessary
      if (selectedCoverIndex !== null) {
        if (selectedCoverIndex === removedIndex) {
          // If removed image was the cover, reset to default (first image)
          setSelectedCoverIndex(null);
        } else if (selectedCoverIndex > removedIndex) {
          // If removed image was before the cover, decrement the index
          setSelectedCoverIndex(selectedCoverIndex - 1);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar archivo');
    }
  };

  const removeNewFile = (index: number) => {
    setNewFiles((prev) => {
      const files = [...prev];
      URL.revokeObjectURL(files[index].preview);
      files.splice(index, 1);
      return files;
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      let galleryUrls = [...existingGallery];

      // Upload new files if any
      if (newFiles.length > 0) {
        setUploadProgress('Subiendo nuevos archivos...');
        const uploadResults = await storageService.uploadMultiple(
          newFiles.map((f) => f.file),
          'projects'
        );
        galleryUrls = [...galleryUrls, ...uploadResults.map((r) => r.url)];
      }

      // Determine cover image: use selected or first image
      const coverImage = selectedCoverIndex !== null
        ? galleryUrls[selectedCoverIndex]
        : galleryUrls[0] || '';

      // Update project
      setUploadProgress('Actualizando proyecto...');
      
      // Convertir año a fecha completa (01/01/YYYY) y luego a ISO string (YYYY-MM-DD)
      let fechaString: string | undefined = undefined;
      if (formData.fecha) {
        const year = formData.fecha.trim();
        // Crear fecha como 01/01/YYYY y convertir a ISO string (YYYY-MM-DD)
        fechaString = `${year}-01-01`;
      }
      
      await projectService.update(Number(id), {
        titulo: formData.titulo,
        img: coverImage,
        ubicacion: formData.ubicacion,
        fecha: fechaString || undefined,
        descripcion: formData.descripcion,
        galeria: galleryUrls,
        categoria: formData.categoria || undefined,
      });

      // Cleanup previews
      newFiles.forEach((f) => URL.revokeObjectURL(f.preview));

      navigate('/admin/projects');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar el proyecto');
    } finally {
      setLoading(false);
      setUploadProgress('');
    }
  };

  if (projectLoading) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            <p className="mt-4 text-gray-600">Cargando proyecto...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (projectError || !project) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-600 text-xl mb-4">Error al cargar proyecto</div>
            <p className="text-gray-600 mb-4">{projectError || 'Proyecto no encontrado'}</p>
            <button
              onClick={() => navigate('/admin/projects')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Volver a proyectos
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/admin/projects')}
            className="text-sm text-gray-600 hover:text-gray-900 mb-4"
          >
            ← Volver a proyectos
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Editar Proyecto</h1>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-lg shadow p-6 space-y-6">
            <div>
              <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-2">
                Título *
              </label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                required
                value={formData.titulo}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="ubicacion" className="block text-sm font-medium text-gray-700 mb-2">
                  Ubicación
                </label>
                <input
                  type="text"
                  id="ubicacion"
                  name="ubicacion"
                  value={formData.ubicacion}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ubicación del proyecto"
                />
              </div>

              <div>
                <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha
                </label>
                <div className="relative">
                  <input
                    type="text"
                    readOnly
                    value={formData.fecha || currentYear.toString()}
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white pointer-events-none"
                    placeholder="YYYY"
                  />
                  <select
                    id="fecha-year"
                    name="fecha-year"
                    value={formData.fecha || currentYear.toString()}
                    onChange={handleYearChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    style={{ zIndex: 10 }}
                  >
                    {Array.from({ length: 11 }, (_, i) => {
                      const year = currentYear - i;
                      return (
                        <option key={year} value={year.toString()}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none" style={{ zIndex: 0 }}>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-2">
                Categoría
              </label>
              <select
                id="categoria"
                name="categoria"
                value={formData.categoria}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Sin categoría</option>
                <option value="Residencial">Residencial</option>
                <option value="Infantil">Infantil</option>
                <option value="Comercial">Comercial</option>
                <option value="Corporativo">Corporativo</option>
              </select>
            </div>

            <div>
              <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-2">
                Descripción *
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                required
                rows={4}
                value={formData.descripcion}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Existing Gallery */}
          {existingGallery.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Galería Actual</h3>
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Portada:</strong> {selectedCoverIndex !== null && selectedCoverIndex < existingGallery.length
                    ? `Imagen ${selectedCoverIndex + 1}`
                    : 'Primera imagen (por defecto)'}
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Haz clic en una imagen para seleccionarla como portada
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {existingGallery.map((url, index) => (
                  <div key={index} className="relative group">
                    <div
                      className={`aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-pointer border-4 transition-all ${
                        selectedCoverIndex === index
                          ? 'border-blue-500 shadow-lg'
                          : 'border-transparent hover:border-blue-300'
                      }`}
                      onClick={() => setSelectedCoverIndex(index)}
                    >
                      {url.endsWith('.mp4') ? (
                        <video src={url} className="w-full h-full object-cover" muted />
                      ) : (
                        <img src={url} alt="" className="w-full h-full object-cover" />
                      )}
                      {selectedCoverIndex === index && (
                        <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                          <div className="bg-blue-500 text-white rounded-full p-2">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeExistingFile(url);
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add New Files */}
          <div className="bg-white rounded-lg shadow p-6">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Agregar Nuevos Archivos
            </label>

            <div className="mb-4">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Haz clic para subir</span> o arrastra y suelta
                  </p>
                  <p className="text-xs text-gray-500">JPG, PNG, GIF, MP4 (max 5MB each)</p>
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/gif,video/mp4"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </label>
            </div>

            {/* New File Previews */}
            {newFiles.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {newFiles.map((filePreview, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                      {filePreview.type === 'image' ? (
                        <img
                          src={filePreview.preview}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <video
                          src={filePreview.preview}
                          className="w-full h-full object-cover"
                          muted
                        />
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeNewFile(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                    <div className="mt-1 text-xs text-gray-500 truncate">
                      {filePreview.file.name}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Upload Progress */}
          {uploadProgress && (
            <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg">
              {uploadProgress}
            </div>
          )}

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate('/admin/projects')}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Actualizando...' : 'Actualizar Proyecto'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
