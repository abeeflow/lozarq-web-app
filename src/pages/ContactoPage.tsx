import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ContactoPage() {
  const calendarUrl = import.meta.env.VITE_CALENDLY_URL || 'https://calendar.app.google/21RBPrPcN4D63N9f9';

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
      <div className="flex-1 px-2 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-5">
        <div className="max-w-[1280px] mx-auto">
          <Header />
          <main className="mt-16 sm:mt-20 mb-4 sm:mb-8">
            {/* Page Title */}
            <div className="text-center mb-3 sm:mb-6 px-2">
              <p className="text-xs sm:text-sm text-text-light/70 dark:text-text-dark/70">
                Selecciona el día y hora que mejor te convenga
              </p>
            </div>

            {/* Google Calendar Embed */}
            <div className="w-full max-w-5xl mx-auto px-0 sm:px-4">
              <div className="relative w-full overflow-hidden rounded-lg shadow-lg bg-white dark:bg-gray-800">
                <div className="min-h-[700px] h-[calc(100vh-180px)] sm:h-auto sm:aspect-[4/3] lg:aspect-[16/10] xl:aspect-[16/9]">
                  <iframe
                    src={calendarUrl}
                    className="absolute top-0 left-0 w-full h-full border-0"
                    frameBorder="0"
                    scrolling="yes"
                    title="Agenda de disponibilidad"
                  />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
