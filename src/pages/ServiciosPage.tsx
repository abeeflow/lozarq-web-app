import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const servicios = [
  { icono: 'architecture', titulo: 'Diseño Arquitectónico', desc: 'Creación de espacios residenciales y comerciales que son funcionales, sostenibles y estéticamente atractivos.' },
  { icono: 'landscape', titulo: 'Diseño de Paisaje', desc: 'Diseño de entornos exteriores que armonizan con la arquitectura y la naturaleza.' },
  { icono: 'chair', titulo: 'Diseño de Interiores', desc: 'Transformación de interiores para reflejar tu estilo y mejorar la funcionalidad.' },
  { icono: 'holiday_village', titulo: 'Urbanismo y Master Planning', desc: 'Planificación a gran escala para desarrollar comunidades sostenibles.' },
  { icono: 'ballot', titulo: 'Gestión de Proyectos', desc: 'Aseguramos que cada fase del proyecto se ejecute a la perfección.' },
  { icono: 'lightbulb', titulo: 'Consultoría de Diseño', desc: 'Asesoramiento experto para optimizar tus ideas y maximizar el potencial.' },
];

export default function ServiciosPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-5">
        <Header />
        <main className="mt-10 pt-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-black text-text-light dark:text-text-dark mb-4">
              Nuestros Servicios
            </h1>
            <p className="text-base sm:text-lg text-text-light/70 dark:text-text-dark/70 max-w-3xl mx-auto">
              Combinamos creatividad y experiencia para transformar espacios.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-0">
            {servicios.map((servicio, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-background-light dark:bg-background-dark p-6 hover:shadow-lg transition-shadow"
              >
                <div className="text-primary">
                  <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>
                    {servicio.icono}
                  </span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-text-light dark:text-text-dark mb-2">
                    {servicio.titulo}
                  </h2>
                  <p className="text-sm text-text-light/70 dark:text-text-dark/70">
                    {servicio.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center py-5">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-light dark:text-text-dark mb-4">
              ¿Tienes una idea en mente?
            </h2>
            <p className="text-base text-text-light/70 dark:text-text-dark/70 mb-6 max-w-2xl mx-auto">
              Hablemos de cómo podemos ayudarte a hacerla realidad.
            </p>
            <Link
              to="/contacto"
              className="inline-block px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Iniciar un Proyecto
            </Link>
            <Footer />
          </div>
          
        </main>
        
      </div>
      
    </div>
  );
}
