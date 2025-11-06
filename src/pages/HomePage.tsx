import Header from '../components/Header';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-5">
        <div className="w-full max-w-[1280px] mx-auto">
          <Header />
          <main className="flex items-center justify-center mt-20">
            <div
              className="bg-cover bg-center rounded-2xl shadow-xl flex items-center justify-center w-full max-w-5xl"
              style={{
                backgroundImage: "url('/foto_main.jpg')",
                height: "60vh",
              }}
            >
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
