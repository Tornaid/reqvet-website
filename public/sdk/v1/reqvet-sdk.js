/**
 * ReqVet Partner SDK – UMD / IIFE Version
 * Compatible avec <script src="..."> dans tous les navigateurs
 */

(function (global) {
  const ReqVet = {
    config: null,

    init(options = {}) {
      this.config = {
        animalName: options.animalName || "",
        callbackUrl: options.callbackUrl || "",
        partner: options.partner || "",
        externalData: options.externalData || {},
        iframeStyle:
          options.iframeStyle ||
          "width:100%;height:700px;border:none;border-radius:12px;",
        endpoint: "https://app.reqvet.com/embedded/recorder",

        // Callbacks
        onStart: options.onStart || null,
        onReady: options.onReady || null,
        onFinish: options.onFinish || null,
        onError: options.onError || null,
      };
    },

    buildUrl() {
      if (!this.config) {
        console.error("ReqVet SDK not initialized");
        return;
      }

      const params = new URLSearchParams();

      params.set("animal_name", this.config.animalName);
      params.set("callback_url", this.config.callbackUrl);

      if (this.config.partner) params.set("partner", this.config.partner);

      Object.entries(this.config.externalData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.set(key, value);
        }
      });

      return `${this.config.endpoint}?${params.toString()}`;
    },

    openRecorder(target) {
      const url = this.buildUrl();
      if (!url) return;

      const container =
        typeof target === "string" ? document.querySelector(target) : target;

      if (!container) {
        console.error(
          "ReqVet SDK: impossible de trouver le container :",
          target
        );
        return;
      }

      if (this.config.onStart) this.config.onStart();

      const iframe = document.createElement("iframe");
      iframe.src = url;
      iframe.allow = "microphone";
      iframe.style = this.config.iframeStyle;

      iframe.onload = () => {
        if (this.config.onReady) this.config.onReady();
      };

      container.innerHTML = ""; // clear previous
      container.appendChild(iframe);

      return iframe;
    },

    attachToButton(buttonSelector, containerSelector) {
      const button = document.querySelector(buttonSelector);

      if (!button) {
        console.error(
          `ReqVet SDK: impossible de trouver le bouton ${buttonSelector}`
        );
        return;
      }

      button.addEventListener("click", () => {
        this.openRecorder(containerSelector);
      });
    },
  };

  // EXPOSE GLOBAL
  global.ReqVet = ReqVet;
})(window);
