/**
 * Google Calendar Service
 * Handles all interactions with Google Calendar API for booking appointments
 */

import type {
  BookingFormData,
  BookingResponse,
  AvailabilityResponse,
  BusinessHours,
} from '../types/booking';

// Import mock API for development
import {
  mockGetAvailableSlots,
  mockCreateBooking,
  mockGetBusinessHours,
} from './mockCalendarAPI';

// API Base URL - Should be configured in environment variables
const API_BASE_URL = import.meta.env.VITE_CALENDAR_API_URL || '/api/calendar';
const USE_MOCK_API = import.meta.env.DEV && !import.meta.env.VITE_CALENDAR_API_URL;

/**
 * Default business hours configuration
 * This can be overridden by admin settings stored in Supabase
 */
export const DEFAULT_BUSINESS_HOURS: BusinessHours = {
  diasLaborables: [1, 2, 3, 4, 5], // Monday to Friday
  horaInicio: '09:00',
  horaFin: '18:00',
  duracionCita: 60, // 1 hour appointments
  bufferTime: 0, // No buffer by default
};

/**
 * Fetch available time slots for a specific date
 */
export const getAvailableSlots = async (
  date: string
): Promise<AvailabilityResponse> => {
  // Use mock API in development mode
  if (USE_MOCK_API) {
    return mockGetAvailableSlots(date);
  }

  try {
    const response = await fetch(`${API_BASE_URL}/availability?date=${date}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching available slots:', error);
    throw new Error('No se pudieron cargar los horarios disponibles');
  }
};

/**
 * Create a booking/appointment in Google Calendar
 */
export const createBooking = async (
  bookingData: BookingFormData
): Promise<BookingResponse> => {
  // Use mock API in development mode
  if (USE_MOCK_API) {
    return mockCreateBooking(bookingData);
  }

  try {
    const response = await fetch(`${API_BASE_URL}/book`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al crear la reserva');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating booking:', error);
    return {
      success: false,
      message: 'No se pudo completar la reserva',
      error: error instanceof Error ? error.message : 'Error desconocido',
    };
  }
};

/**
 * Get business hours configuration
 * Can be extended to fetch from Supabase admin settings
 */
export const getBusinessHours = async (): Promise<BusinessHours> => {
  // Use mock API in development mode
  if (USE_MOCK_API) {
    return mockGetBusinessHours();
  }

  try {
    const response = await fetch(`${API_BASE_URL}/business-hours`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      // If API fails, return default configuration
      console.warn('Using default business hours');
      return DEFAULT_BUSINESS_HOURS;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching business hours:', error);
    return DEFAULT_BUSINESS_HOURS;
  }
};

/**
 * Check if a specific date is available (has at least one free slot)
 * Used to disable dates in the calendar picker
 */
export const isDateAvailable = async (date: string): Promise<boolean> => {
  try {
    const availability = await getAvailableSlots(date);
    return !availability.isFullyBooked;
  } catch (error) {
    console.error('Error checking date availability:', error);
    return false;
  }
};

/**
 * Utility: Generate time slots for a day based on business hours
 * This can be used client-side for display before checking actual availability
 */
export const generateTimeSlots = (businessHours: BusinessHours): string[] => {
  const slots: string[] = [];
  const [startHour, startMin] = businessHours.horaInicio.split(':').map(Number);
  const [endHour, endMin] = businessHours.horaFin.split(':').map(Number);

  const startMinutes = startHour * 60 + startMin;
  const endMinutes = endHour * 60 + endMin;
  const duration = businessHours.duracionCita + (businessHours.bufferTime || 0);

  for (let time = startMinutes; time < endMinutes; time += duration) {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    slots.push(timeString);
  }

  return slots;
};

/**
 * Utility: Format time from 24h to 12h format for display
 */
export const formatTimeTo12h = (time24: string): string => {
  const [hours, minutes] = time24.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
};

/**
 * Utility: Check if a date is a business day
 */
export const isBusinessDay = (date: Date, businessHours: BusinessHours): boolean => {
  const dayOfWeek = date.getDay();
  return businessHours.diasLaborables.includes(dayOfWeek);
};

/**
 * Utility: Combine date and time into ISO datetime string
 */
export const combineDateAndTime = (date: string, time: string): string => {
  return `${date}T${time}:00`;
};
