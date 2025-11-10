import { useState, useEffect, type ChangeEvent } from 'react';
import type { BookingFormData, TimeSlot, BusinessHours } from '../types/booking';
import {
  getAvailableSlots,
  createBooking,
  getBusinessHours,
  formatTimeTo12h,
} from '../services/googleCalendarService';

type BookingStep = 1 | 2 | 3 | 4; // 4 = Success

interface BookingFormProps {
  onSuccess?: () => void;
}

export default function BookingForm({ onSuccess }: BookingFormProps) {
  const [step, setStep] = useState<BookingStep>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form data
  const [formData, setFormData] = useState<BookingFormData>({
    nombre: '',
    email: '',
    telefono: '',
    servicio: '',
    fecha: '',
    hora: '',
  });

  // Available time slots for selected date
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [businessHours, setBusinessHours] = useState<BusinessHours | null>(null);

  // Load business hours on mount
  useEffect(() => {
    const loadBusinessHours = async () => {
      try {
        const hours = await getBusinessHours();
        setBusinessHours(hours);
      } catch (err) {
        console.error('Error loading business hours:', err);
      }
    };
    loadBusinessHours();
  }, []);

  // Load available slots when date is selected
  useEffect(() => {
    if (formData.fecha && step === 3) {
      loadAvailableSlots();
    }
  }, [formData.fecha, step]);

  const loadAvailableSlots = async () => {
    if (!formData.fecha) return;

    setLoading(true);
    setError(null);
    try {
      const availability = await getAvailableSlots(formData.fecha);
      setTimeSlots(availability.availableSlots);

      if (availability.isFullyBooked) {
        setError('Este día está completamente reservado. Por favor selecciona otra fecha.');
      }
    } catch (err) {
      setError('Error al cargar los horarios disponibles');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    setError(null);

    // Validation for step 1
    if (step === 1) {
      if (!formData.nombre || !formData.email || !formData.telefono) {
        setError('Por favor completa todos los campos');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        setError('Por favor ingresa un email válido');
        return;
      }
    }

    // Validation for step 2
    if (step === 2 && !formData.fecha) {
      setError('Por favor selecciona una fecha');
      return;
    }

    // Validation for step 3
    if (step === 3 && !formData.hora) {
      setError('Por favor selecciona una hora');
      return;
    }

    setStep((prev) => (prev + 1) as BookingStep);
  };

  const handlePrevStep = () => {
    setError(null);
    setStep((prev) => (prev - 1) as BookingStep);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await createBooking(formData);

      if (response.success) {
        setStep(4); // Success step
        onSuccess?.();
      } else {
        setError(response.message || 'Error al crear la reserva');
      }
    } catch (err) {
      setError('Error al procesar la reserva');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectTime = (time: string) => {
    setFormData((prev) => ({ ...prev, hora: time }));
  };

  // Get min and max dates for date picker
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3); // 3 months ahead
    return maxDate.toISOString().split('T')[0];
  };

  return (
    <div className="w-full">
      {/* Progress Indicator */}
      {step !== 4 && (
        <div className="mb-12 max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`flex-1 h-1.5 rounded-full mx-1.5 transition-colors ${
                  s <= step ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs font-medium text-gray-500 dark:text-gray-400">
            <span className={step === 1 ? 'text-primary' : ''}>Datos</span>
            <span className={step === 2 ? 'text-primary' : ''}>Fecha</span>
            <span className={step === 3 ? 'text-primary' : ''}>Hora</span>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-8 max-w-3xl mx-auto p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Step 1: Personal Data */}
      {step === 1 && (
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Información Personal
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Completa tus datos para agendar
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="grid md:grid-cols-2 gap-5 mb-5">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all"
                  placeholder="Juan Pérez"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all"
                  placeholder="juan@ejemplo.com"
                />
              </div>

              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all"
                  placeholder="+1 234 567 8900"
                />
              </div>

              <div>
                <label htmlFor="servicio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Servicio (opcional)
                </label>
                <input
                  type="text"
                  id="servicio"
                  name="servicio"
                  value={formData.servicio}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all"
                  placeholder="Consultoría, Diseño, etc."
                />
              </div>
            </div>

            <button
              onClick={handleNextStep}
              className="w-full px-6 py-4 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all font-medium shadow-lg shadow-primary/20"
            >
              Continuar
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Date Selection */}
      {step === 2 && (
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Selecciona una Fecha
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Elige el día que mejor te convenga
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
            <input
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleInputChange}
              min={getMinDate()}
              max={getMaxDate()}
              className="w-full px-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-base transition-all"
            />
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
              📅 Horario de atención: {businessHours?.horaInicio} - {businessHours?.horaFin}
            </p>

            <div className="flex gap-3 mt-8">
              <button
                onClick={handlePrevStep}
                className="flex-1 px-6 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-all font-medium"
              >
                Atrás
              </button>
              <button
                onClick={handleNextStep}
                disabled={!formData.fecha}
                className="flex-1 px-6 py-4 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Time Selection */}
      {step === 3 && (
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Selecciona una Hora
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Elige el horario disponible
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
            {loading ? (
              <div className="text-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Cargando horarios...</p>
              </div>
            ) : timeSlots.length === 0 ? (
              <div className="text-center py-16 text-gray-500 dark:text-gray-400">
                No hay horarios disponibles para esta fecha
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3">
                {timeSlots
                  .filter((slot) => slot.available)
                  .map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() => handleSelectTime(slot.time)}
                      className={`px-4 py-3 rounded-xl border-2 transition-all font-medium ${
                        formData.hora === slot.time
                          ? 'border-primary bg-primary text-white shadow-lg shadow-primary/30'
                          : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-primary hover:bg-primary/5'
                      }`}
                    >
                      {slot.label || formatTimeTo12h(slot.time)}
                    </button>
                  ))}
              </div>
            )}

            <div className="flex gap-3 mt-8">
              <button
                onClick={handlePrevStep}
                className="flex-1 px-6 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-all font-medium"
              >
                Atrás
              </button>
              <button
                onClick={handleSubmit}
                disabled={!formData.hora || loading}
                className="flex-1 px-6 py-4 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
              >
                {loading ? 'Reservando...' : 'Confirmar Reserva'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Success */}
      {step === 4 && (
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              ¡Reserva Confirmada!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Hemos enviado un email de confirmación a <strong>{formData.email}</strong>
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 mb-10">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">Detalles de la cita</h3>
            <div className="space-y-4 max-w-md mx-auto">
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                <span className="text-2xl">📅</span>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Fecha</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {new Date(formData.fecha).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                <span className="text-2xl">🕐</span>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Hora</p>
                  <p className="font-medium text-gray-900 dark:text-white">{formatTimeTo12h(formData.hora)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                <span className="text-2xl">👤</span>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Nombre</p>
                  <p className="font-medium text-gray-900 dark:text-white">{formData.nombre}</p>
                </div>
              </div>
              {formData.servicio && (
                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                  <span className="text-2xl">💼</span>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Servicio</p>
                    <p className="font-medium text-gray-900 dark:text-white">{formData.servicio}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Info Section */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              ¿Qué esperar de tu reunión?
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-lg">Confirmación Inmediata</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Recibirás un email de confirmación con todos los detalles
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-lg">Puntualidad</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Nos comprometemos a estar disponibles en el horario acordado
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-lg">Atención Personalizada</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Dedicamos tiempo completo a entender tus necesidades
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => {
                setStep(1);
                setFormData({
                  nombre: '',
                  email: '',
                  telefono: '',
                  servicio: '',
                  fecha: '',
                  hora: '',
                });
              }}
              className="px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all font-medium shadow-lg shadow-primary/20"
            >
              Hacer otra reserva
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
