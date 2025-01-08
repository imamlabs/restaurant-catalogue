const swRegister = async () => {
  // Register service worker here
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('./dist/sw.bundle.js'); // Jika file ada di folder 'dist'

      console.log('Service Worker registered successfully');
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }
};

export default swRegister;
