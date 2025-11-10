import Header from '../components/Header';
import Footer from '../components/Footer';
import CalendlyEmbed from '../components/CalendlyEmbed';

export default function ContactoPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
      <div className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-8">
        <Header />
        <main className="mt-16">
          {/* Page Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark mb-3">
              Agenda una Reunión
            </h1>
            <p className="text-base text-text-light/70 dark:text-text-dark/70 max-w-2xl mx-auto">
              Selecciona el día y hora que mejor se ajuste a tu agenda
            </p>
          </div>

          {/* Calendly Embed - Full Width */}
          <div className="w-full max-w-7xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
              <CalendlyEmbed
                styles={{
                  minHeight: '950px',
                  height: '100%',
                }}
              />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
