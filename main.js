// META HUB PWA

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js")
      .then((registration) => {
        console.log("Service Worker Registered:", registration.scope);
      })
      .catch((error) => {
        console.log("Service Worker Registration Failed:", error);
      });
  });
}

// Install App Popup

let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  const installBtn = document.getElementById("installBtn");

  if (installBtn) {
    installBtn.style.display = "block";

    installBtn.addEventListener("click", async () => {
      deferredPrompt.prompt();

      const result = await deferredPrompt.userChoice;

      if (result.outcome === "accepted") {
        console.log("META HUB Installed");
      }

      deferredPrompt = null;
      installBtn.style.display = "none";
    });
  }
});