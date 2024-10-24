import { Workbox } from 'workbox-window';

const swRegister = async () =>{
  if ('serviceWorker' in navigator) {
    const wb = new Workbox('./sw.bundle.js');

    wb.addEventListener('waiting', () => {
      console.log('New service worker is waiting to activate.');
      if (confirm('A new version is available. Refresh to update?')) {
        wb.messageSkipWaiting();
      }
    });

    wb.addEventListener('activated', (event) => {
      if (!event.isUpdate) {
        console.log('Service worker activated for the first time.');
      }
    });

    wb.register();
  }
};

export default swRegister;