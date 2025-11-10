/**
 * Mock Calendar API for Development
 *
 * Uses Supabase as the primary database for bookings.
 * Simulates Google Calendar API integration for development.
 *
 * For production:
 * 1. Create Supabase Edge Functions in /supabase/functions/
 * 2. Implement Google Calendar API OAuth flow
 * 3. Sync bookings from Supabase to Google Calendar
 */

import type {
  BookingFormData,
  BookingResponse,
  AvailabilityResponse,
  TimeSlot,
  BusinessHours,
} from '../types/booking';
import { DEFAULT_BUSINESS_HOURS, generateTimeSlots, formatTimeTo12h } from './googleCalendarService';
import { supabaseBookingService } from './supabaseBookingService';

/**
 * Mock: Get available time slots for a specific date
 * Uses Supabase to check booked appointments
 */
export const mockGetAvailableSlots = async (date: string): Promise<AvailabilityResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  try {
    const businessHours = DEFAULT_BUSINESS_HOURS;
    const allSlots = generateTimeSlots(businessHours);

    // Get bookings from Supabase for this date
    const bookings = await supabaseBookingService.getByDate(date);
    const bookedTimes = new Set(bookings.map(b => b.hora.substring(0, 5))); // HH:MM format

    const availableSlots: TimeSlot[] = allSlots.map(time => ({
      time,
      available: !bookedTimes.has(time),
      label: formatTimeTo12h(time),
    }));

    const availableCount = availableSlots.filter(slot => slot.available).length;
    const isFullyBooked = availableCount === 0;

    return {
      date,
      availableSlots,
      isFullyBooked,
    };
  } catch (error) {
    console.error('Error getting available slots:', error);

    // Fallback: return all slots as available if DB fails
    const businessHours = DEFAULT_BUSINESS_HOURS;
    const allSlots = generateTimeSlots(businessHours);

    return {
      date,
      availableSlots: allSlots.map(time => ({
        time,
        available: true,
        label: formatTimeTo12h(time),
      })),
      isFullyBooked: false,
    };
  }
};

/**
 * Mock: Create a booking
 * Saves to Supabase database
 */
export const mockCreateBooking = async (bookingData: BookingFormData): Promise<BookingResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  try {
    // Create booking in Supabase
    const booking = await supabaseBookingService.create({
      nombre: bookingData.nombre,
      email: bookingData.email,
      telefono: bookingData.telefono,
      servicio: bookingData.servicio,
      fecha: bookingData.fecha,
      hora: bookingData.hora + ':00', // Add seconds
      estado: 'pendiente',
      google_event_id: `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    });

    console.log('📅 Booking Created in Supabase:', {
      id: booking.id,
      fecha: booking.fecha,
      hora: booking.hora,
      nombre: booking.nombre,
    });

    // In production, this would also:
    // 1. Create event in Google Calendar via API
    // 2. Update booking with google_calendar_link
    // 3. Send confirmation email

    return {
      success: true,
      eventId: booking.id,
      message: 'Reserva creada exitosamente',
    };
  } catch (error) {
    console.error('Error creating booking:', error);

    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al crear la reserva',
      error: error instanceof Error ? error.message : 'Error desconocido',
    };
  }
};

/**
 * Mock: Get business hours configuration
 */
export const mockGetBusinessHours = async (): Promise<BusinessHours> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  // In production, fetch from Supabase database
  // For now, return default configuration
  return DEFAULT_BUSINESS_HOURS;
};

/**
 * Mock: Update business hours (Admin function)
 */
export const mockUpdateBusinessHours = async (
  businessHours: BusinessHours
): Promise<{ success: boolean; message: string }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // In production, update in Supabase database
  console.log('⚙️ Mock Business Hours Updated:', businessHours);

  return {
    success: true,
    message: 'Horarios actualizados exitosamente',
  };
};

/**
 * Mock: Cancel a booking
 */
export const mockCancelBooking = async (
  eventId: string,
  date: string,
  time: string
): Promise<{ success: boolean; message: string }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  try {
    await supabaseBookingService.cancel(eventId);

    console.log('❌ Booking Cancelled in Supabase:', {
      eventId,
      date,
      time,
    });

    return {
      success: true,
      message: 'Reserva cancelada exitosamente',
    };
  } catch (error) {
    return {
      success: false,
      message: 'No se encontró la reserva',
    };
  }
};
