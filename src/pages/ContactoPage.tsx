import Header from '../components/Header';
import Footer from '../components/Footer';
const teamImg = '/diseño2.png';
export default function ContactoPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Header />
        <main className="mt-20">
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-black text-text-light dark:text-text-dark mb-4">
              Hablemos
            </h1>
            <p className="text-base text-text-light/70 dark:text-text-dark/70 max-w-md">
              Para nuevos proyectos, colaboraciones o consultas, por favor utiliza el siguiente formulario.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="flex flex-col gap-10">
              <div>
                <h3 className="text-lg font-bold text-text-light dark:text-text-dark mb-4">
                  Información de Contacto
                </h3>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4 py-2">
                    <div className="flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 size-10">
                      <span className="material-symbols-outlined text-text-light dark:text-text-dark">location_on</span>
                    </div>
                    <p className="text-text-light dark:text-text-dark">123 Calle de la Arquitectura, Madrid, España</p>
                  </div>
                  <div className="flex items-center gap-4 py-2">
                    <div className="flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 size-10">
                      <span className="material-symbols-outlined text-text-light dark:text-text-dark">phone</span>
                    </div>
                    <p className="text-text-light dark:text-text-dark">+34 912 345 678</p>
                  </div>
                  <div className="flex items-center gap-4 py-2">
                    <div className="flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 size-10">
                      <span className="material-symbols-outlined text-text-light dark:text-text-dark">mail</span>
                    </div>
                    <p className="text-text-light dark:text-text-dark">hola@estudiodiseño.com</p>
                  </div>
                </div>
              </div>
              <div className="w-full h-60 md:h-60 rounded-xl overflow-hidden">
                <img
                  src={teamImg}
                  alt="Mapa de ubicación"
                  className="  object-cover grayscale "
                />
              </div>
            </div>

            <div>
              <form className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-text-light/70 dark:text-text-dark/70" htmlFor="name">
                    Nombre
                  </label>
                  <input
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/50"
                    id="name"
                    type="text"
                    placeholder="Tu nombre completo"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-text-light/70 dark:text-text-dark/70" htmlFor="email">
                    Correo Electrónico
                  </label>
                  <input
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/50"
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-text-light/70 dark:text-text-dark/70" htmlFor="subject">
                    Asunto
                  </label>
                  <input
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/50"
                    id="subject"
                    type="text"
                    placeholder="¿En qué podemos ayudarte?"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-text-light/70 dark:text-text-dark/70" htmlFor="message">
                    Mensaje
                  </label>
                  <textarea
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/50"
                    id="message"
                    rows={5}
                    placeholder="Escribe tu mensaje aquí..."
                  />
                </div>
                <button
                  className="w-full sm:w-auto px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-opacity-90 transition-colors"
                  type="submit"
                >
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>
        </main>
        <Footer />
      </div>
      
    </div>
  );
}
