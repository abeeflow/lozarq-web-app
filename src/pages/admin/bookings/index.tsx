import { useState, useEffect } from 'react';
import AdminLayout from '../../../components/AdminLayout';
import { supabaseBookingService, type Booking } from '../../../services/supabaseBookingService';

export default function AdminBookingsIndex() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterEstado, setFilterEstado] = useState<string>('all');
  const [stats, setStats] = useState({
    pendiente: 0,
    confirmada: 0,
    cancelada: 0,
    completada: 0,
  });

  useEffect(() => {
    loadBookings();
    loadStats();
  }, [filterEstado]);

  const loadBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const filters = filterEstado !== 'all' ? { estado: filterEstado } : {};
      const data = await supabaseBookingService.getAll(filters);
      setBookings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar reservas');
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const counts = await supabaseBookingService.getCountByStatus();
      setStats(counts);
    } catch (err) {
      console.error('Error loading stats:', err);
    }
  };

  const handleStatusChange = async (id: string, newStatus: Booking['estado']) => {
    try {
      await supabaseBookingService.update(id, { estado: newStatus });
      loadBookings();
      loadStats();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al actualizar');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta reserva?')) return;

    try {
      await supabaseBookingService.remove(id);
      loadBookings();
      loadStats();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al eliminar');
    }
  };

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'confirmada':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'cancelada':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'completada':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('es-ES', {
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const period = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes}${period}`;
  };

  return (
    <AdminLayout>
      <div className="space-y-4">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Reservas
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Gestiona todas las citas y reservaciones
          </p>
        </div>

        {/* Stats Cards - Compact */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-xl">⏳</span>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400 truncate">
                  Pendientes
                </p>
                <p className="text-xl font-bold text-yellow-600 dark:text-yellow-400">
                  {stats.pendiente}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-xl">✅</span>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400 truncate">
                  Confirmadas
                </p>
                <p className="text-xl font-bold text-green-600 dark:text-green-400">
                  {stats.confirmada}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-xl">✔️</span>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400 truncate">
                  Completadas
                </p>
                <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  {stats.completada}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-xl">❌</span>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400 truncate">
                  Canceladas
                </p>
                <p className="text-xl font-bold text-red-600 dark:text-red-400">
                  {stats.cancelada}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters - Compact */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Filtro:
            </label>
            <select
              value={filterEstado}
              onChange={(e) => setFilterEstado(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todas</option>
              <option value="pendiente">Pendientes</option>
              <option value="confirmada">Confirmadas</option>
              <option value="completada">Completadas</option>
              <option value="cancelada">Canceladas</option>
            </select>
            <button
              onClick={loadBookings}
              className="sm:ml-auto px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              🔄 Actualizar
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-sm text-red-700 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">Cargando...</p>
          </div>
        )}

        {/* No Data */}
        {!loading && bookings.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              No hay reservas
              {filterEstado !== 'all' && ` con estado "${filterEstado}"`}
            </p>
          </div>
        )}

        {/* Bookings List - Desktop Table */}
        {!loading && bookings.length > 0 && (
          <>
            {/* Desktop View (1024px+) */}
            <div className="hidden lg:block bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Cliente
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Fecha/Hora
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Servicio
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Estado
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-3 py-3">
                          <div className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-[180px]">
                            {booking.nombre}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[180px]">
                            {booking.email}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {booking.telefono}
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <div className="text-sm text-gray-900 dark:text-white">
                            📅 {formatDate(booking.fecha)}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            🕐 {formatTime(booking.hora)}
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <div className="text-sm text-gray-900 dark:text-white truncate max-w-[120px]">
                            {booking.servicio || '-'}
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <select
                            value={booking.estado}
                            onChange={(e) =>
                              handleStatusChange(booking.id, e.target.value as Booking['estado'])
                            }
                            className={`w-full px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                              booking.estado
                            )}`}
                          >
                            <option value="pendiente">Pendiente</option>
                            <option value="confirmada">Confirmada</option>
                            <option value="completada">Completada</option>
                            <option value="cancelada">Cancelada</option>
                          </select>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex gap-2">
                            {booking.google_calendar_link && (
                              <a
                                href={booking.google_calendar_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 text-lg"
                                title="Ver en Calendar"
                              >
                                📅
                              </a>
                            )}
                            <button
                              onClick={() => handleDelete(booking.id)}
                              className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 text-lg"
                              title="Eliminar"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile/Tablet View (< 1024px) - Cards */}
            <div className="lg:hidden space-y-3">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {booking.nombre}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {booking.email}
                      </p>
                    </div>
                    <div className="flex gap-2 ml-2">
                      {booking.google_calendar_link && (
                        <a
                          href={booking.google_calendar_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400"
                          title="Ver en Calendar"
                        >
                          📅
                        </a>
                      )}
                      <button
                        onClick={() => handleDelete(booking.id)}
                        className="text-red-600 dark:text-red-400"
                        title="Eliminar"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Fecha:</span>
                      <p className="text-gray-900 dark:text-white font-medium">
                        📅 {formatDate(booking.fecha)}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Hora:</span>
                      <p className="text-gray-900 dark:text-white font-medium">
                        🕐 {formatTime(booking.hora)}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Teléfono:</span>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {booking.telefono}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Servicio:</span>
                      <p className="text-gray-900 dark:text-white font-medium truncate">
                        {booking.servicio || '-'}
                      </p>
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">
                      Estado:
                    </label>
                    <select
                      value={booking.estado}
                      onChange={(e) =>
                        handleStatusChange(booking.id, e.target.value as Booking['estado'])
                      }
                      className={`w-full px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusColor(
                        booking.estado
                      )}`}
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="confirmada">Confirmada</option>
                      <option value="completada">Completada</option>
                      <option value="cancelada">Cancelada</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
