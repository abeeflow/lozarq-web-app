/**
 * Mock Calendar API for Development
 *
 * This is a temporary implementation that simulates Google Calendar API responses.
 * Replace this with actual Supabase Edge Functions or backend API when ready.
 *
 * For production:
 * 1. Create Supabase Edge Functions in /supabase/functions/
 * 2. Implement Google Calendar API OAuth flow
 * 3. Store business hours in Supabase database
 * 4. Replace these mock functions with actual API calls
 */

import type {
  BookingFormData,
  BookingResponse,
  AvailabilityResponse,
  TimeSlot,
  BusinessHours,
} from '../types/booking';
import { DEFAULT_BUSINESS_HOURS, generateTimeSlots, formatTimeTo12h } from './googleCalendarService';

// Simulated database of booked appointments
// In production, this would be fetched from Google Calendar API
const bookedAppointments = new Map<string, Set<string>>();

/**
 * Mock: Get available time slots for a specific date
 */
export const mockGetAvailableSlots = async (date: string): Promise<AvailabilityResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const businessHours = DEFAULT_BUSINESS_HOURS;
  const allSlots = generateTimeSlots(businessHours);

  // Check which slots are already booked
  const bookedTimes = bookedAppointments.get(date) || new Set();

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
};

/**
 * Mock: Create a booking
 */
export const mockCreateBooking = async (bookingData: BookingFormData): Promise<BookingResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const { fecha, hora } = bookingData;

  // Check if slot is still available
  const bookedTimes = bookedAppointments.get(fecha) || new Set();

  if (bookedTimes.has(hora)) {
    return {
      success: false,
      message: 'Este horario ya ha sido reservado. Por favor selecciona otro.',
    };
  }

  // "Book" the slot
  bookedTimes.add(hora);
  bookedAppointments.set(fecha, bookedTimes);

  // Generate mock event ID
  const eventId = `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  // In production, this would:
  // 1. Create event in Google Calendar via API
  // 2. Send confirmation email
  // 3. Store booking in database
  console.log('📅 Mock Booking Created:', {
    eventId,
    bookingData,
    timestamp: new Date().toISOString(),
  });

  return {
    success: true,
    eventId,
    message: 'Reserva creada exitosamente',
  };
};

/**
 * Mock: Get business hours configuration
 */
export const mockGetBusinessHours = async (): Promise<BusinessHours> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  // In production, fetch from Supabase database
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

  const bookedTimes = bookedAppointments.get(date);

  if (bookedTimes && bookedTimes.has(time)) {
    bookedTimes.delete(time);

    console.log('❌ Mock Booking Cancelled:', {
      eventId,
      date,
      time,
    });

    return {
      success: true,
      message: 'Reserva cancelada exitosamente',
    };
  }

  return {
    success: false,
    message: 'No se encontró la reserva',
  };
};

/**
 * Helper: Seed some mock appointments for testing
 */
export const seedMockAppointments = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const todayStr = today.toISOString().split('T')[0];
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  // Book some slots for testing
  bookedAppointments.set(todayStr, new Set(['09:00', '14:00', '16:00']));
  bookedAppointments.set(tomorrowStr, new Set(['10:00', '11:00']));

  console.log('🌱 Mock appointments seeded for testing');
};

// Automatically seed appointments in development
if (import.meta.env.DEV) {
  seedMockAppointments();
}
