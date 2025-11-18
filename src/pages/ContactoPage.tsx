import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { usePageSEO } from '../hooks/usePageSEO';

export default function ContactoPage() {
  const [scale, setScale] = useState(0.85);
  const [containerStyle, setContainerStyle] = useState({
    width: '117.65%',
    height: '117.65%',
    marginLeft: '-8.825%',
    marginTop: '-8.825%'
  });

  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      let newScale = 0.85;
      
      // Calcular scale basado en el tamaño de pantalla
      if (width < 640) {
        // Móviles pequeños - scale más pequeño para que quepa todo
        newScale = 0.65;
      } else if (width < 768) {
        // Móviles
        newScale = 0.70;
      } else if (width < 1024) {
        // Tablets
        newScale = 0.75;
      } else if (width < 1280) {
        // Laptops pequeños
        newScale = 0.80;
      } else if (width < 1536) {
        // Laptops/Desktop
        newScale = 0.85;
      } else {
        // Monitores grandes
        newScale = 0.90;
      }
      
      // Ajustar según altura también si es necesario
      if (height < 600) {
        newScale = Math.min(newScale, 0.70);
      } else if (height < 800) {
        newScale = Math.min(newScale, 0.80);
      }
      
      setScale(newScale);
      const inverseScale = 100 / newScale;
      const margin = (inverseScale - 100) / 2;
      setContainerStyle({
        width: `${inverseScale}%`,
        height: `${inverseScale}%`,
        marginLeft: `-${margin}%`,
        marginTop: `-${margin}%`
      });
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

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
      <div className="min-h-0 px-1 sm:px-2 md:px-3 lg:px-4 xl:px-5 2xl:px-6 py-0.5 sm:py-1 md:py-1.5 lg:py-2 xl:py-2.5 2xl:py-3">
        <div className="max-w-[1800px] mx-auto w-full h-full flex flex-col min-h-0">
          <main className="h-full min-h-0 flex flex-col">
            {/* Page Title */}
            <div className="text-center mb-0.5 sm:mb-1 md:mb-1.5 lg:mb-2 xl:mb-2.5 px-2 sm:px-3 md:px-4 flex-shrink-0">
              <p className="text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg text-text-light/70 dark:text-text-dark/70">
                Selecciona el día y hora que mejor te convenga
              </p>
            </div>

            {/* Google Calendar Embed */}
            <div className="w-full mx-auto px-0 sm:px-0.5 md:px-1 lg:px-1.5 xl:px-2 flex-1 min-h-0 flex flex-col items-center justify-center">
              <div className="relative w-full h-full flex-1 min-h-0 overflow-hidden rounded sm:rounded-md md:rounded-lg lg:rounded-xl xl:rounded-2xl bg-white dark:bg-gray-800">
                <div 
                  className="w-full h-full origin-center transition-transform duration-200 ease-out"
                  style={{
                    transform: `scale(${scale})`,
                    transformOrigin: 'center center',
                    ...containerStyle
                  }}
                >
                  <iframe
                    src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0aLCFsuiTAcVgJOWw0ihW04QBMfmcmi4xKz8ZPOW1HYlsirWu_jkwWeUv2t-2eHnDiDXpakTBj?gv=true"
                    className="w-full h-full border-0"
                    frameBorder="0"
                    allowFullScreen
                    title="Agenda de disponibilidad"
                    loading="lazy"
                    style={{ width: '100%', height: '100%' }}
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
