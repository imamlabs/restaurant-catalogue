import 'regenerator-runtime';
import '../styles/style.css';
import '../styles/responsive.css';
import App from './views/app';
import './utils/skip-content';

const app = new App({
  button: document.querySelector('#hamburgerButton'),
  drawer: document.querySelector('#navigationDrawer'),
  content: document.querySelector('#mainContent'),
});
console.log('Button:', document.querySelector('#hamburgerButton'));
console.log('Drawer:', document.querySelector('#navigationDrawer'));
console.log('Content:', document.querySelector('#mainContent'));

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', async () => {
  app.renderPage();
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('sw.bundle.js');
      console.log('Service Worker registered successfully');
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }
});
