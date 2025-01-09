import { useEffect } from 'react';

export default function useGoogleAuth() {
  useEffect(() => {
    if (!document.querySelector('script#google-gsi')) {
      const script = document.createElement('script');
      script.id = 'google-gsi';
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }, []);
}