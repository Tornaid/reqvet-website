(function (global) {
  const ReqVet = {
    config: null,
    iframeRef: null,

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

      // ❗️externalData (history, etc.) NE PAS mettre dans l’URL
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

      this.iframeRef = iframe;

      const sendExternalData = () => {
        if (!this.iframeRef || !this.iframeRef.contentWindow) return;
        this.iframeRef.contentWindow.postMessage(
          {
            type: "REQVET_EXTERNAL_DATA",
            payload: {
              animalName: this.config.animalName,
              callbackUrl: this.config.callbackUrl,
              partner: this.config.partner,
              externalData: this.config.externalData, // 🔥 history ici
            },
          },
          "*"
        );
      };

      iframe.onload = () => {
        if (this.config.onReady) this.config.onReady();
        // On peut envoyer une première fois pour les cas où le listener est déjà là
        sendExternalData();
      };

      // 🔥 Handshake : si l'iframe demande les données, on les renvoie
      const messageHandler = (event) => {
        if (event.data?.type === "REQVET_ASK_EXTERNAL_DATA") {
          sendExternalData();
        }
      };

      window.addEventListener("message", messageHandler);

      container.innerHTML = "";
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

  global.ReqVet = ReqVet;
})(window);
