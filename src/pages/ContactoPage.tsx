import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookingForm from '../components/BookingForm';

const teamImg = '/diseño2.png';

type ContactTab = 'mensaje' | 'reunion';

export default function ContactoPage() {
  const [activeTab, setActiveTab] = useState<ContactTab>('mensaje');

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
      <div className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Header />
        <main className="mt-20">
          <div className="mb-12">
            <p className="text-base text-text-light/70 dark:text-text-dark/70 max-w-2xl">
              Para nuevos proyectos, colaboraciones o consultas, puedes enviarnos un mensaje o agendar una reunión directamente.
            </p>
          </div>

          {/* Tabs Navigation */}
          <div className="mb-8 border-b border-gray-200 dark:border-gray-700">
            <nav className="flex gap-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('mensaje')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'mensaje'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-text-light/60 dark:text-text-dark/60 hover:text-text-light dark:hover:text-text-dark hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                📧 Enviar Mensaje
              </button>
              <button
                onClick={() => setActiveTab('reunion')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'reunion'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-text-light/60 dark:text-text-dark/60 hover:text-text-light dark:hover:text-text-dark hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                📅 Agendar Reunión
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'mensaje' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="flex flex-col gap-10">
                <div>
                  <h3 className="text-lg font-bold text-text-light dark:text-text-dark mb-4">
                    Información de Contacto
                  </h3>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4 py-2">
                      <div className="flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 size-10">
                        <span className="material-symbols-outlined text-text-light dark:text-text-dark">location_on</span>
                      </div>
                      <p className="text-text-light dark:text-text-dark">123 Calle de la Arquitectura, Madrid, España</p>
                    </div>
                    <div className="flex items-center gap-4 py-2">
                      <div className="flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 size-10">
                        <span className="material-symbols-outlined text-text-light dark:text-text-dark">phone</span>
                      </div>
                      <p className="text-text-light dark:text-text-dark">+34 912 345 678</p>
                    </div>
                    <div className="flex items-center gap-4 py-2">
                      <div className="flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 size-10">
                        <span className="material-symbols-outlined text-text-light dark:text-text-dark">mail</span>
                      </div>
                      <p className="text-text-light dark:text-text-dark">hola@estudiodiseño.com</p>
                    </div>
                  </div>
                </div>
                <div className="w-full h-60 md:h-60 rounded-xl overflow-hidden">
                  <img
                    src={teamImg}
                    alt="Mapa de ubicación"
                    className="object-cover grayscale"
                  />
                </div>
              </div>

              <div>
                <form className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-text-light/70 dark:text-text-dark/70" htmlFor="name">
                      Nombre
                    </label>
                    <input
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/50"
                      id="name"
                      type="text"
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-text-light/70 dark:text-text-dark/70" htmlFor="email">
                      Correo Electrónico
                    </label>
                    <input
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/50"
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-text-light/70 dark:text-text-dark/70" htmlFor="subject">
                      Asunto
                    </label>
                    <input
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/50"
                      id="subject"
                      type="text"
                      placeholder="¿En qué podemos ayudarte?"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-text-light/70 dark:text-text-dark/70" htmlFor="message">
                      Mensaje
                    </label>
                    <textarea
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/50"
                      id="message"
                      rows={5}
                      placeholder="Escribe tu mensaje aquí..."
                    />
                  </div>
                  <button
                    className="w-full sm:w-auto px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-opacity-90 transition-colors"
                    type="submit"
                  >
                    Enviar Mensaje
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'reunion' && (
            <div className="max-w-4xl mx-auto">
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-3">
                  Agenda una Reunión
                </h2>
                <p className="text-text-light/70 dark:text-text-dark/70">
                  Selecciona el día y hora que mejor se ajuste a tu agenda. Completa el proceso en 3 simples pasos.
                </p>
              </div>
              <BookingForm
                onSuccess={() => {
                  console.log('Booking completed successfully');
                }}
              />

              {/* Info Section */}
              <div className="mt-16 py-12 bg-gray-50 dark:bg-gray-900 rounded-xl">
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
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}
