import Header from '../components/Header';
import Footer from '../components/Footer';
import CalendlyEmbed from '../components/CalendlyEmbed';

export default function ContactoPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
      <div className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-8">
        <Header />
        <main className="mt-12">
          {/* Page Title */}
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark mb-2">
              Agenda una Reunión
            </h1>
            <p className="text-sm text-text-light/70 dark:text-text-dark/70 max-w-2xl mx-auto">
              Selecciona el día y hora que mejor se ajuste a tu agenda
            </p>
          </div>

          {/* Calendly Embed - Sin padding extra */}
          <div className="w-full max-w-7xl mx-auto">
            <CalendlyEmbed
              styles={{
                minHeight: '1000px',
                height: 'auto',
              }}
            />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
