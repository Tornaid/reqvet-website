/**
 * ReqVet Partner SDK – UMD / IIFE Version
 * Compatible avec <script src="..."> dans tous les navigateurs
 */

(function (global) {
  const ReqVet = {
    config: null,
    iframeRef: null,

    /**
     * Initialise le SDK
     */
    init(options = {}) {
      this.config = {
        animalName: options.animalName || "",
        callbackUrl: options.callbackUrl || "",
        partner: options.partner || "",
        externalData: options.externalData || {}, // 🔥 history, consultation_id, etc.
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

    /**
     * Construit l'URL de base SANS transmettre l'historique
     * (juste les infos non sensibles)
     */
    buildUrl() {
      if (!this.config) {
        console.error("ReqVet SDK not initialized");
        return;
      }

      const params = new URLSearchParams();

      params.set("animal_name", this.config.animalName);
      params.set("callback_url", this.config.callbackUrl);

      if (this.config.partner) params.set("partner", this.config.partner);

      // ❌ NE PAS inclure externalData (trop volumineux / sensible)
      // On enverra ça via postMessage

      return `${this.config.endpoint}?${params.toString()}`;
    },

    /**
     * Ouvre l’iframe ReqVet
     */
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

      this.iframeRef = iframe;

      iframe.onload = () => {
        if (this.config.onReady) this.config.onReady();

        // 🔥 ENVOYER LES DONNÉES SENSIBLES APRÈS CHARGEMENT
        iframe.contentWindow.postMessage(
          {
            type: "REQVET_EXTERNAL_DATA",
            payload: {
              animalName: this.config.animalName,
              callbackUrl: this.config.callbackUrl,
              partner: this.config.partner,
              externalData: this.config.externalData, // history, consultation_id, animal_internal_ref
            },
          },
          "*"
        );
      };

      container.innerHTML = ""; // clear previous iframe
      container.appendChild(iframe);

      return iframe;
    },

    /**
     * Attache un bouton pour ouvrir ReqVet
     */
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
