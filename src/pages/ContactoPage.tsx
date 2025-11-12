import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ContactoPage() {
  const calendarUrl = import.meta.env.VITE_CALENDLY_URL || 'https://calendar.app.google/21RBPrPcN4D63N9f9';

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
      <div className="flex-1 px-3 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-40 py-3 sm:py-4 md:py-5">
        <div className="max-w-[1280px] mx-auto w-full">
          <Header />
          <main className="mt-20 sm:mt-24 md:mt-28 lg:mt-32 xl:mt-36 mb-4 sm:mb-6 md:mb-8 relative z-0">
            {/* Page Title */}
            <div className="text-center mb-6 sm:mb-8 md:mb-10 px-2 sm:px-4">
              <p className="text-sm sm:text-base md:text-lg text-text-light/70 dark:text-text-dark/70">
                Selecciona el día y hora que mejor te convenga
              </p>
            </div>

            {/* Google Calendar Embed */}
            <div className="w-full mx-auto px-0 sm:px-2 md:px-4">
              <div className="relative w-full overflow-hidden rounded-lg sm:rounded-xl shadow-lg bg-white dark:bg-gray-800">
                <div className="h-[calc(100vh-180px)] sm:h-[calc(100vh-220px)] md:h-[calc(100vh-250px)] lg:h-[calc(100vh-280px)] min-h-[550px] sm:min-h-[600px]">
                  <iframe
                    src={calendarUrl}
                    className="w-full h-full border-0"
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
