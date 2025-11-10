import Header from '../components/Header';
import Footer from '../components/Footer';
import CalendlyEmbed from '../components/CalendlyEmbed';

export default function ContactoPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
      <div className="flex-1 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-5">
        <div className="max-w-[1280px] mx-auto">
          <Header />
          <main className="mt-20">
            {/* Page Title */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark mb-2">
                Agenda una Reunión
              </h1>
              <p className="text-sm text-text-light/70 dark:text-text-dark/70">
                Selecciona el día y hora que mejor te convenga
              </p>
            </div>

            {/* Calendly Embed */}
            <div className="w-full">
              <CalendlyEmbed
                styles={{
                  height: '700px',
                  minHeight: '700px',
                }}
              />
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
