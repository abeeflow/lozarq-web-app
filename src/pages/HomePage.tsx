import Header from '../components/Header';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div className="relative grid h-screen w-full grid-rows-[auto,1fr,auto] bg-background-light dark:bg-background-dark overflow-hidden">
      <Header />
      <div className="min-h-0 px-[clamp(16px,4vw,56px)] py-[clamp(8px,1.6vw,14px)]">
        <div className="w-full max-w-[1280px] mx-auto h-full min-h-0">
          <main className="h-full flex items-center justify-center">
            <figure className="w-full max-w-5xl rounded-2xl shadow-xl overflow-hidden">
              <img
                src="/foto_main.jpg"
                alt="Imagen principal"
                className="w-full h-[clamp(40vh,50vh,55vh)] object-cover object-center mx-auto"
                loading="eager"
              />
            </figure>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
