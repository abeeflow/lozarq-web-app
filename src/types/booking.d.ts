/**
 * Booking System Types for Google Calendar Integration
 */

export interface BookingFormData {
  // Personal Data (Step 1)
  nombre: string;
  email: string;
  telefono: string;
  servicio?: string; // Optional: type of service

  // Date Selection (Step 2)
  fecha: string; // ISO date format: YYYY-MM-DD

  // Time Selection (Step 3)
  hora: string; // Time format: HH:mm (24h)
}

export interface TimeSlot {
  time: string; // HH:mm format
  available: boolean;
  label: string; // Display label like "9:00 AM"
}

export interface BusinessHours {
  diasLaborables: number[]; // 0=Sunday, 1=Monday, etc.
  horaInicio: string; // HH:mm format
  horaFin: string; // HH:mm format
  duracionCita: number; // Duration in minutes
  bufferTime?: number; // Optional buffer between appointments in minutes
}

export interface GoogleCalendarEvent {
  id?: string;
  summary: string; // Event title
  description?: string;
  start: {
    dateTime: string; // ISO 8601 format
    timeZone: string;
  };
  end: {
    dateTime: string; // ISO 8601 format
    timeZone: string;
  };
  attendees?: Array<{
    email: string;
    displayName?: string;
  }>;
}

export interface AvailabilityResponse {
  date: string;
  availableSlots: TimeSlot[];
  isFullyBooked: boolean;
}

export interface BookingResponse {
  success: boolean;
  eventId?: string;
  message: string;
  error?: string;
}
