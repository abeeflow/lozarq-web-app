import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="relative z-40 mt-auto border-t border-gray-300 dark:border-gray-700 bg-background-light dark:bg-background-dark h-14">
      <div className="mx-auto max-w-7xl px-6 h-full flex items-center justify-center">
        <p className="text-center text-[10px] sm:text-[11px] text-text-light/70 dark:text-text-dark/70">
          &copy; {new Date().getFullYear()} Lozarq Estudio. {t.footer.derechos}
        </p>
      </div>
    </footer>
  );
}
