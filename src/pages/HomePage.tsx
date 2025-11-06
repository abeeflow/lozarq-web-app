import Header from '../components/Header';
import Footer from '../components/Footer';



export default function HomePage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <Header />
       <main className="flex flex-1 items-center justify-center">
        <div
          className="bg-cover bg-center rounded-2xl shadow-xl flex items-center justify-center"
          style={{
            backgroundImage: "url('/foto_main.jpg')",
            width: "70vw",
            height: "60vh",
          }}
        >
          
        </div>
      </main>
      <Footer />
    </div>
  );
}
