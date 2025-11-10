import Header from '../components/Header';
import Footer from '../components/Footer';
import CalendlyEmbed from '../components/CalendlyEmbed';

export default function ContactoPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
      <div className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Header />
        <main className="mt-20">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-text-light dark:text-text-dark mb-4">
              Agenda una Reunión
            </h1>
            <p className="text-lg text-text-light/70 dark:text-text-dark/70 max-w-2xl mx-auto">
              Selecciona el día y hora que mejor se ajuste a tu agenda
            </p>
          </div>

          {/* Calendly Embed */}
          <div className="max-w-5xl mx-auto">
            <CalendlyEmbed
              styles={{
                minHeight: '750px',
              }}
            />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
