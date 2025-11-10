import Header from '../components/Header';
import Footer from '../components/Footer';
import CalendlyEmbed from '../components/CalendlyEmbed';

export default function ContactoPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
      <div className="flex-1 flex flex-col px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-5">
        <div className="w-full max-w-[1280px] mx-auto flex-1 flex flex-col">
          <Header />

          <main className="flex-1 flex flex-col mt-20">
            {/* Page Title */}
            <div className="text-center mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark mb-2">
                Agenda una Reunión
              </h1>
            </div>

            {/* Calendly Embed - Ocupa espacio disponible */}
            <div className="flex-1 w-full" style={{ minHeight: '900px' }}>
              <CalendlyEmbed
                styles={{
                  height: '100%',
                  minHeight: '900px',
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
