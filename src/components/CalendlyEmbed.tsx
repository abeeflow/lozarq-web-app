import { useEffect } from 'react';

interface CalendlyEmbedProps {
  url?: string;
  prefill?: {
    name?: string;
    email?: string;
    customAnswers?: Record<string, string>;
  };
  utm?: Record<string, string>;
  styles?: {
    height?: string;
    minHeight?: string;
  };
}

export default function CalendlyEmbed({
  url,
  prefill,
  utm,
  styles = { minHeight: '700px' }
}: CalendlyEmbedProps) {
  // Get Calendly URL from props or environment variable
  const calendlyUrl = url || import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/tu-usuario/30min';

  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup: remove script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  // Build URL with prefill and UTM parameters
  const buildUrl = () => {
    const params = new URLSearchParams();

    if (prefill?.name) params.append('name', prefill.name);
    if (prefill?.email) params.append('email', prefill.email);

    if (prefill?.customAnswers) {
      Object.entries(prefill.customAnswers).forEach(([key, value]) => {
        params.append(key, value);
      });
    }

    if (utm) {
      Object.entries(utm).forEach(([key, value]) => {
        params.append(`utm_${key}`, value);
      });
    }

    const queryString = params.toString();
    return queryString ? `${calendlyUrl}?${queryString}` : calendlyUrl;
  };

  return (
    <div className="calendly-embed-container">
      <div
        className="calendly-inline-widget"
        data-url={buildUrl()}
        style={{
          minWidth: '320px',
          height: styles.height || 'auto',
          minHeight: styles.minHeight || '700px',
          ...styles
        }}
      />
    </div>
  );
}
