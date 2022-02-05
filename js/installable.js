const divInstall = document.getElementById('installContainer');
const butInstall = document.getElementById('butInstall');
var appInstalled = true;
var canInstall = false;

/* Put code here */
  window.addEventListener('beforeinstallprompt', (event) => {
    appInstalled = false;
    canInstall = true;
    checkInstallable();
      console.log('👍', 'beforeinstallprompt', event);
      // Stash the event so it can be triggered later.
      window.deferredPrompt = event;
      // Remove the 'hidden' class from the install button container
      divInstall.classList.toggle('hidden', false);
    });

  butInstall.addEventListener('click', async () => {
    checkInstallable();
      console.log('👍', 'butInstall-clicked');
      const promptEvent = window.deferredPrompt;
      if (!promptEvent) {
          // The deferred prompt isn't available.
          return;
      }
      // Show the install prompt.
      promptEvent.prompt();
      // Log the result
      const result = await promptEvent.userChoice;
      console.log('👍', 'userChoice', result);
      if(result.outcome.accepted){
        launchable = true;
      }
      // Reset the deferred prompt variable, since
      // prompt() can only be called once.
      window.deferredPrompt = null;
      // Hide the install button.
      divInstall.classList.toggle('hidden', true);
  });

  window.addEventListener('appinstalled', (event) => {
    checkInstallable();
      appInstalled = true;
      launchable = true;
      console.log('👍', 'appinstalled', event);
      // Clear the deferredPrompt so it can be garbage collected
      window.deferredPrompt = null;

      launch();
  });

/* Only register a service worker if it's supported */
if ('serviceWorker' in navigator && platform != "dev") {
  navigator.serviceWorker.register('/service-worker.js');
}

/**
 * Warn the page must be served over HTTPS
 * The `beforeinstallprompt` event won't fire if the page is served over HTTP.
 * Installability requires a service worker with a fetch event handler, and
 * if the page isn't served over HTTPS, the service worker won't load.
 */
if (window.location.protocol === 'http:') {
  window.location.href = window.location.href.replace('http://', 'https://');
}