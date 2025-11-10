import Header from '../components/Header';
import Footer from '../components/Footer';
import BookingForm from '../components/BookingForm';

export default function ContactoPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
      <div className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Header />
        <main className="mt-20">
          {/* Booking Form */}
          <div className="max-w-4xl mx-auto">
            <BookingForm
              onSuccess={() => {
                console.log('Booking completed successfully');
              }}
            />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
