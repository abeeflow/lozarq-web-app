import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../../components/AdminLayout';
import { projectService } from '../../../services/supabaseProjectService';
import { storageService } from '../../../services/supabaseStorageService';
import type { CreateProjectWithFilesData } from '../../../services/supabaseProjectService';

interface FilePreview {
  file: File;
  preview: string;
  type: 'image' | 'video';
}

export default function AdminProjectsCreate() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentYear = new Date().getFullYear();

  const [formData, setFormData] = useState({
    titulo: '',
    img: '',
    ubicacion: '',
    fecha: currentYear.toString(),
    descripcion: '',
    categoria: 'Residencial' as 'Residencial' | 'Infantil' | 'Comercial' | 'Corporativo',
  });

  const [files, setFiles] = useState<FilePreview[]>([]);
  const [selectedCoverIndex, setSelectedCoverIndex] = useState<number | null>(null);
  const [uploadProgress, setUploadProgress] = useState<string>('');

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

    setFiles((prev) => [...prev, ...newPreviews]);
    e.target.value = '';
  };

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Convertir año a fecha completa (YYYY-MM-DD)
      let fechaString: string | undefined = undefined;
      if (formData.fecha) {
        const year = formData.fecha.trim();
        fechaString = `${year}-01-01`;
      }

      // Usar el método transaccional que hace rollback si falla
      const createData: CreateProjectWithFilesData = {
        titulo: formData.titulo,
        ubicacion: formData.ubicacion || undefined,
        fecha: fechaString,
        descripcion: formData.descripcion,
        categoria: formData.categoria,
        files: files.map((f) => f.file),
        coverIndex: selectedCoverIndex ?? undefined,
        onProgress: (message) => setUploadProgress(message),
      };

      await projectService.createWithFiles(createData);

      // Cleanup previews
      files.forEach((f) => URL.revokeObjectURL(f.preview));

      navigate('/admin/projects');
    } catch (err) {
      console.error('Error creating project:', err);
      setError(err instanceof Error ? err.message : 'Error al crear el proyecto');
    } finally {
      setLoading(false);
      setUploadProgress('');
    }
  };

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
          <h1 className="text-3xl font-bold text-gray-900">Crear Nuevo Proyecto</h1>
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
                placeholder="Ingresa el título del proyecto"
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
                placeholder="Ingresa la descripción del proyecto"
              />
            </div>
          </div>

          {/* File Upload */}
          <div className="bg-white rounded-lg shadow p-6">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Galería (Imágenes y Videos)
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

            {/* File Previews */}
            {files.length > 0 && (
              <>
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Portada:</strong> {selectedCoverIndex !== null
                      ? `Imagen ${selectedCoverIndex + 1}`
                      : 'Primera imagen (por defecto)'}
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    Haz clic en una imagen para seleccionarla como portada
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {files.map((filePreview, index) => (
                    <div key={index} className="relative group">
                      <div
                        className={`aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-pointer border-4 transition-all ${
                          selectedCoverIndex === index
                            ? 'border-blue-500 shadow-lg'
                            : 'border-transparent hover:border-blue-300'
                        }`}
                        onClick={() => setSelectedCoverIndex(index)}
                      >
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
                          removeFile(index);
                          if (selectedCoverIndex === index) {
                            setSelectedCoverIndex(null);
                          } else if (selectedCoverIndex !== null && selectedCoverIndex > index) {
                            setSelectedCoverIndex(selectedCoverIndex - 1);
                          }
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
                      <div className="mt-1 text-xs text-gray-500 truncate">
                        {filePreview.file.name}
                      </div>
                    </div>
                  ))}
                </div>
              </>
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
              disabled={loading || files.length === 0}
              className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creando...' : 'Crear Proyecto'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
