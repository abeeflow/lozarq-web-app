import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ContactoPage() {
  const calendarUrl = import.meta.env.VITE_CALENDLY_URL || 'https://calendar.app.google/21RBPrPcN4D63N9f9';

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
      <div className="flex-1 px-3 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-40 py-3 sm:py-4 md:py-5">
        <div className="max-w-[1280px] mx-auto w-full">
          <Header />
          <main className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-24 mb-4 sm:mb-6 md:mb-8">
            {/* Page Title */}
            <div className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-10 px-2 sm:px-4">
              <p className="text-xs sm:text-sm md:text-base text-text-light/70 dark:text-text-dark/70">
                Selecciona el día y hora que mejor te convenga
              </p>
            </div>

            {/* Google Calendar Embed */}
            <div className="w-full mx-auto px-0 sm:px-2 md:px-4">
              <div className="relative w-full overflow-hidden rounded-lg sm:rounded-xl shadow-lg bg-white dark:bg-gray-800">
                <div className="min-h-[500px] sm:min-h-[600px] md:min-h-[700px] h-[calc(100vh-200px)] sm:h-[calc(100vh-240px)] md:h-[calc(100vh-270px)] lg:h-[calc(100vh-300px)] xl:h-[calc(100vh-320px)]">
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
