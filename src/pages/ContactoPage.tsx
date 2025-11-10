import Header from '../components/Header';
import Footer from '../components/Footer';
import CalendlyEmbed from '../components/CalendlyEmbed';

export default function ContactoPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
      <Header />

      {/* Calendly Full Width Container */}
      <main className="flex-1 w-full mt-20 pb-8">
        {/* Page Title */}
        <div className="text-center mb-6 px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark mb-2">
            Agenda una Reunión
          </h1>
        </div>

        {/* Calendly Embed - Completamente sin restricciones */}
        <div className="w-full px-0">
          <CalendlyEmbed
            styles={{
              minHeight: '1100px',
              height: '1100px',
            }}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
