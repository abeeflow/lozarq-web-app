import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const servicios = [
  { icono: 'architecture', titulo: 'Diseño Arquitectónico', desc: 'Creación de espacios residenciales y comerciales que son funcionales, sostenibles y estéticamente atractivos.' },
  { icono: 'landscape', titulo: 'Diseño de Paisaje', desc: 'Diseño de entornos exteriores que armonizan con la arquitectura y la naturaleza.' },
  { icono: 'chair', titulo: 'Diseño de Interiores', desc: 'Transformación de interiores para reflejar tu estilo y mejorar la funcionalidad.' },
];

export default function ServiciosPage() {

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
      <div className="flex-1 max-w-5xl mx-auto px-4 py-5">
        <Header />
        <main className="mt-10 pt-20">
          <div className="text-center mb-16">
            
            <p className="text-base sm:text-lg text-text-light/70 dark:text-text-dark/70 max-w-3xl mx-auto">
              Combinamos creatividad y experiencia para transformar espacios.
            </p>
          </div>

          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {servicios.map((servicio, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center gap-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-background-light dark:bg-background-dark p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="text-primary">
                    <span className="material-symbols-outlined" style={{ fontSize: '40px' }}>
                      {servicio.icono}
                    </span>
                  </div>
                  <div className="text-center">
                    <h2 className="text-xl font-bold text-text-light dark:text-text-dark mb-3">
                      {servicio.titulo}
                    </h2>
                    <p className="text-sm text-text-light/70 dark:text-text-dark/70">
                      {servicio.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center py-5">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-600 dark:text-gray-300/70 mb-4">
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
          </div>

        </main>

      </div>
      <Footer />
    </div>
  );
}
