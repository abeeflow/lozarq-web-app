import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ContactoPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
      <div className="flex-1 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-5">
        <div className="max-w-[1280px] mx-auto">
          <Header />
          <main className="mt-20">
            {/* Page Title */}
            <div className="text-center mb-8">
              
              <p className="text-sm text-text-light/70 dark:text-text-dark/70">
                Selecciona el día y hora que mejor te convenga
              </p>
            </div>

            {/* Google Calendar Embed */}
            <div className="w-full max-w-4xl mx-auto">
              <div className="relative w-full overflow-hidden rounded-lg shadow-lg bg-white dark:bg-gray-800" style={{ paddingBottom: '75%', minHeight: '600px' }}>
                <iframe
                  src="https://calendar.app.google/xAaTLTvfjYkxqYXF6"
                  className="absolute top-0 left-0 w-full h-full border-0"
                  frameBorder="0"
                  scrolling="yes"
                  title="Agenda de disponibilidad"
                />
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
