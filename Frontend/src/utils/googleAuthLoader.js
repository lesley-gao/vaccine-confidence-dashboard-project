// using the google script to load the google sign in button
 export const loadGoogleScript = () => {
    return new Promise((resolve, reject) => {
      if (document.querySelector('script#google-signin')) {
        resolve();
        return;
      }
  
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.id = 'google-signin';
      script.async = true;
      script.defer = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };
  