import BookingForm from '../components/BookingForm';

export default function ReservasPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Agenda una Reunión
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Selecciona el día y hora que mejor se ajuste a tu agenda. Completa el proceso en 3 simples pasos.
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <BookingForm
            onSuccess={() => {
              // Optional: Add analytics or additional actions on successful booking
              console.log('Booking completed successfully');
            }}
          />
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              ¿Qué esperar de tu reunión?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Confirmación Inmediata</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Recibirás un email de confirmación con todos los detalles
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Puntualidad</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Nos comprometemos a estar disponibles en el horario acordado
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Atención Personalizada</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Dedicamos tiempo completo a entender tus necesidades
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
