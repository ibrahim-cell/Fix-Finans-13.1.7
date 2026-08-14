window.addEventListener("error", function (event) {
    document.documentElement.dataset.fixFinansRuntimeError = "true";
    console.error("Fix Finans runtime error:", event.error || event.message);
  });
  window.addEventListener("unhandledrejection", function (event) {
    document.documentElement.dataset.fixFinansRuntimeError = "true";
    console.error("Fix Finans unhandled rejection:", event.reason);
  });
  document.documentElement.dataset.fixFinansRuntime = "external";
