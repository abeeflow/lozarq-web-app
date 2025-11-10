import Header from '../components/Header';
import Footer from '../components/Footer';
import BookingForm from '../components/BookingForm';

export default function ContactoPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
      <div className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Header />
        <main className="mt-20">
          {/* Header Section */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-text-light dark:text-text-dark mb-4">
              Agenda una Reunión
            </h1>
            <p className="text-base text-text-light/70 dark:text-text-dark/70 max-w-2xl mx-auto">
              Selecciona el día y hora que mejor se ajuste a tu agenda. Completa el proceso en 3 simples pasos.
            </p>
          </div>

          {/* Booking Form */}
          <div className="max-w-4xl mx-auto">
            <BookingForm
              onSuccess={() => {
                console.log('Booking completed successfully');
              }}
            />
          </div>

          {/* Info Section */}
          <div className="mt-16 py-12 bg-gray-50 dark:bg-gray-900 rounded-xl max-w-4xl mx-auto">
            <div className="px-6">
              <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-6 text-center">
                ¿Qué esperar de tu reunión?
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-text-light dark:text-text-dark mb-2">Confirmación Inmediata</h4>
                  <p className="text-sm text-text-light/60 dark:text-text-dark/60">
                    Recibirás un email de confirmación con todos los detalles
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-text-light dark:text-text-dark mb-2">Puntualidad</h4>
                  <p className="text-sm text-text-light/60 dark:text-text-dark/60">
                    Nos comprometemos a estar disponibles en el horario acordado
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-text-light dark:text-text-dark mb-2">Atención Personalizada</h4>
                  <p className="text-sm text-text-light/60 dark:text-text-dark/60">
                    Dedicamos tiempo completo a entender tus necesidades
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
