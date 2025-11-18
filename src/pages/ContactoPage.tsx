import Header from '../components/Header';
import Footer from '../components/Footer';
import { usePageSEO } from '../hooks/usePageSEO';

export default function ContactoPage() {
  usePageSEO({
    title: 'Contacto | Lozarq Estudio - Agenda tu Cita',
    description: 'Agenda una reunión con nuestro estudio de arquitectura e interiorismo. Transformamos tu idea en realidad. Contáctanos en Lima, Perú.',
    keywords: 'contacto Lozarq, agendar cita arquitecto, consultoría diseño Lima, reunión arquitectura',
    ogImage: 'https://www.lozarqestudio.com/foto_main.jpg',
    canonical: 'https://www.lozarqestudio.com/contacto'
  });

  return (
    <div className="relative grid h-screen w-full grid-rows-[auto,1fr,auto] bg-background-light dark:bg-background-dark overflow-hidden">
      <Header />
      <div className="min-h-0 px-4 sm:px-6 md:px-8 lg:px-[clamp(16px,4vw,56px)] py-2 sm:py-3 md:py-[clamp(8px,1.6vw,14px)]">
        <div className="max-w-[1600px] mx-auto w-full h-full flex flex-col min-h-0">
          <main className="mt-2 sm:mt-3 md:mt-[clamp(8px,1.6vw,14px)] mb-2 sm:mb-3 md:mb-[clamp(8px,1.6vw,14px)] relative z-0 flex flex-col flex-1 min-h-0">
            {/* Page Title */}
            <div className="text-center mb-3 sm:mb-4 md:mb-[clamp(10px,2vw,16px)] px-2 sm:px-4 flex-shrink-0">
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-text-light/70 dark:text-text-dark/70">
                Selecciona el día y hora que mejor te convenga
              </p>
            </div>

            {/* Google Calendar Embed */}
            <div className="w-full mx-auto px-0 sm:px-1 md:px-2 lg:px-4 flex-1 min-h-0 flex flex-col">
              <div className="relative w-full flex-1 min-h-[400px] sm:min-h-[500px] md:min-h-[600px] overflow-hidden rounded-md sm:rounded-lg md:rounded-xl shadow-md sm:shadow-lg bg-white dark:bg-gray-800">
                <iframe 
                  src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0aLCFsuiTAcVgJOWw0ihW04QBMfmcmi4xKz8ZPOW1HYlsirWu_jkwWeUv2t-2eHnDiDXpakTBj?gv=true" 
                  className="w-full h-full border-0"
                  frameBorder="0"
                  allowFullScreen
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
