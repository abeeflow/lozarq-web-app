import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ContactoPage() {
  const calendarUrl = import.meta.env.VITE_CALENDLY_URL || 'https://calendar.app.google/21RBPrPcN4D63N9f9';

  return (
    <div className="relative grid h-screen w-full grid-rows-[auto,1fr,auto] bg-background-light dark:bg-background-dark overflow-hidden">
      <Header />
      <div className="min-h-0 px-[clamp(16px,4vw,56px)] py-[clamp(8px,1.6vw,14px)]">
        <div className="max-w-[1280px] mx-auto w-full">
          <main className="mt-[clamp(8px,1.6vw,14px)] mb-[clamp(8px,1.6vw,14px)] relative z-0">
            {/* Page Title */}
            <div className="text-center mb-[clamp(10px,2vw,16px)] px-2 sm:px-4">
              <p className="text-sm sm:text-base md:text-lg text-text-light/70 dark:text-text-dark/70">
                Selecciona el día y hora que mejor te convenga
              </p>
            </div>

            {/* Google Calendar Embed */}
            <div className="w-full mx-auto px-0 sm:px-2 md:px-4">
              <div className="relative w-full overflow-hidden rounded-lg sm:rounded-xl shadow-lg bg-white dark:bg-gray-800">
                <div className="h-[clamp(48vh,58vh,62vh)]">
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
