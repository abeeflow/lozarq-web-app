/**
 * Supabase Booking Service
 * Handles CRUD operations for bookings/appointments
 */

import { supabase } from '../lib/supabase.config';

export interface Booking {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  servicio?: string;
  fecha: string; // YYYY-MM-DD
  hora: string; // HH:MM:SS
  google_event_id?: string;
  google_calendar_link?: string;
  estado: 'pendiente' | 'confirmada' | 'cancelada' | 'completada';
  notas?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateBookingData {
  nombre: string;
  email: string;
  telefono: string;
  servicio?: string;
  fecha: string;
  hora: string;
  google_event_id?: string;
  google_calendar_link?: string;
  estado?: 'pendiente' | 'confirmada' | 'cancelada' | 'completada';
  notas?: string;
}

export interface UpdateBookingData {
  nombre?: string;
  email?: string;
  telefono?: string;
  servicio?: string;
  fecha?: string;
  hora?: string;
  google_event_id?: string;
  google_calendar_link?: string;
  estado?: 'pendiente' | 'confirmada' | 'cancelada' | 'completada';
  notas?: string;
}

/**
 * Get all bookings with optional filters
 */
export const getAll = async (filters?: {
  fecha?: string;
  estado?: string;
  limit?: number;
}): Promise<Booking[]> => {
  let query = supabase
    .from('bookings')
    .select('*')
    .order('fecha', { ascending: false })
    .order('hora', { ascending: false });

  if (filters?.fecha) {
    query = query.eq('fecha', filters.fecha);
  }

  if (filters?.estado) {
    query = query.eq('estado', filters.estado);
  }

  if (filters?.limit) {
    query = query.limit(filters.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching bookings:', error);
    throw new Error('No se pudieron cargar las reservas');
  }

  return data || [];
};

/**
 * Get a single booking by ID
 */
export const getById = async (id: string): Promise<Booking> => {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching booking:', error);
    throw new Error('No se pudo cargar la reserva');
  }

  return data;
};

/**
 * Get bookings for a specific date (to check availability)
 */
export const getByDate = async (fecha: string): Promise<Booking[]> => {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('fecha', fecha)
    .neq('estado', 'cancelada')
    .order('hora', { ascending: true });

  if (error) {
    console.error('Error fetching bookings by date:', error);
    throw new Error('No se pudieron cargar las reservas de la fecha');
  }

  return data || [];
};

/**
 * Check if a specific time slot is available
 */
export const isTimeSlotAvailable = async (
  fecha: string,
  hora: string
): Promise<boolean> => {
  const { data, error } = await supabase
    .from('bookings')
    .select('id')
    .eq('fecha', fecha)
    .eq('hora', hora)
    .neq('estado', 'cancelada')
    .maybeSingle();

  if (error) {
    console.error('Error checking time slot:', error);
    return false;
  }

  return data === null; // Available if no booking found
};

/**
 * Create a new booking
 */
export const create = async (
  bookingData: CreateBookingData
): Promise<Booking> => {
  // Check if time slot is available
  const isAvailable = await isTimeSlotAvailable(
    bookingData.fecha,
    bookingData.hora
  );

  if (!isAvailable) {
    throw new Error('Este horario ya está reservado');
  }

  const { data, error } = await supabase
    .from('bookings')
    .insert([
      {
        ...bookingData,
        estado: bookingData.estado || 'pendiente',
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error creating booking:', error);
    throw new Error('No se pudo crear la reserva');
  }

  return data;
};

/**
 * Update a booking
 */
export const update = async (
  id: string,
  bookingData: UpdateBookingData
): Promise<Booking> => {
  // If updating time slot, check availability
  if (bookingData.fecha && bookingData.hora) {
    const existing = await getById(id);

    // Only check if date/time is actually changing
    if (
      bookingData.fecha !== existing.fecha ||
      bookingData.hora !== existing.hora
    ) {
      const isAvailable = await isTimeSlotAvailable(
        bookingData.fecha,
        bookingData.hora
      );

      if (!isAvailable) {
        throw new Error('El nuevo horario ya está reservado');
      }
    }
  }

  const { data, error } = await supabase
    .from('bookings')
    .update(bookingData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating booking:', error);
    throw new Error('No se pudo actualizar la reserva');
  }

  return data;
};

/**
 * Delete a booking (soft delete - mark as cancelled)
 */
export const cancel = async (id: string): Promise<Booking> => {
  return update(id, { estado: 'cancelada' });
};

/**
 * Hard delete a booking (permanent)
 */
export const remove = async (id: string): Promise<void> => {
  const { error } = await supabase.from('bookings').delete().eq('id', id);

  if (error) {
    console.error('Error deleting booking:', error);
    throw new Error('No se pudo eliminar la reserva');
  }
};

/**
 * Get upcoming bookings (future dates, not cancelled)
 */
export const getUpcoming = async (limit = 10): Promise<Booking[]> => {
  const today = new Date().toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .gte('fecha', today)
    .neq('estado', 'cancelada')
    .order('fecha', { ascending: true })
    .order('hora', { ascending: true })
    .limit(limit);

  if (error) {
    console.error('Error fetching upcoming bookings:', error);
    throw new Error('No se pudieron cargar las próximas reservas');
  }

  return data || [];
};

/**
 * Get bookings count by status
 */
export const getCountByStatus = async (): Promise<{
  pendiente: number;
  confirmada: number;
  cancelada: number;
  completada: number;
}> => {
  const { data, error } = await supabase
    .from('bookings')
    .select('estado');

  if (error) {
    console.error('Error counting bookings:', error);
    return { pendiente: 0, confirmada: 0, cancelada: 0, completada: 0 };
  }

  const counts = {
    pendiente: 0,
    confirmada: 0,
    cancelada: 0,
    completada: 0,
  };

  data.forEach((booking) => {
    if (booking.estado in counts) {
      counts[booking.estado as keyof typeof counts]++;
    }
  });

  return counts;
};

export const supabaseBookingService = {
  getAll,
  getById,
  getByDate,
  isTimeSlotAvailable,
  create,
  update,
  cancel,
  remove,
  getUpcoming,
  getCountByStatus,
};
