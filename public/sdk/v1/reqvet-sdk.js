/**
 * ============================================================
 *  REQVET PARTNER SDK v1
 *  ------------------------------------------------------------
 *  Ce SDK permet aux logiciels partenaires :
 *   - d’ouvrir le module ReqVet dans un iframe
 *   - de transmettre leur contexte (animal, consultation…)
 *   - de recevoir automatiquement le compte-rendu via callback
 *   - d’écouter des événements (start, ready, finish, error)
 *
 *  Sécurité :
 *    - jamais de données sensibles dans l'URL
 *    - tout est géré côté serveur ReqVet
 *
 *  Contact : contact@reqvet.com
 * ============================================================
 */

export const ReqVet = {
  version: "1.5.0",
  config: null,
  iframeInstance: null,
  events: {
    onStart: null,
    onReady: null,
    onFinish: null,
    onError: null,
  },

  /**
   * Initialise le SDK avec la configuration ReqVet
   */
  init(options = {}) {
    if (!options.callbackUrl) {
      throw new Error("ReqVet SDK: callbackUrl est obligatoire.");
    }

    this.config = {
      animalName: options.animalName || "",
      callbackUrl: options.callbackUrl,
      partner: options.partner || "",
      externalData: options.externalData || {},
      endpoint: options.endpoint || "https://app.reqvet.com/embedded/recorder",
      iframeStyle:
        options.iframeStyle ||
        "width:100%;height:700px;border:none;border-radius:14px;",
    };

    // Enregistrer éventuels handlers
    this.events.onStart = options.onStart || null;
    this.events.onReady = options.onReady || null;
    this.events.onFinish = options.onFinish || null;
    this.events.onError = options.onError || null;

    return this;
  },

  /**
   * Construit l’URL envoyée à ReqVet
   */
  buildUrl() {
    if (!this.config) {
      throw new Error("ReqVet SDK: init() doit être appelé avant buildUrl().");
    }

    const params = new URLSearchParams({
      animal_name: this.config.animalName,
      callback_url: this.config.callbackUrl,
    });

    if (this.config.partner) {
      params.set("partner", this.config.partner);
    }

    // Injecte tous les identifiants du partenaire (non obligatoires)
    Object.entries(this.config.externalData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.set(key, value);
      }
    });

    // Ajouter version du SDK (debugging)
    params.set("sdk_version", this.version);

    return `${this.config.endpoint}?${params.toString()}`;
  },

  /**
   * Ouvre ReqVet dans une DIV : mount(container)
   */
  mount(containerSelector) {
    const url = this.buildUrl();

    const container =
      typeof containerSelector === "string"
        ? document.querySelector(containerSelector)
        : containerSelector;

    if (!container) {
      throw new Error(
        `ReqVet SDK: Impossible de trouver le conteneur ${containerSelector}`
      );
    }

    // Empêche le double-montage
    container.innerHTML = "";

    const iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.allow = "microphone";
    iframe.style = this.config.iframeStyle;
    iframe.loading = "lazy";

    container.appendChild(iframe);
    this.iframeInstance = iframe;

    // event : start
    this._trigger("onStart");

    // event : ready
    iframe.onload = () => this._trigger("onReady");

    return iframe;
  },

  /**
   * Attache ReqVet à un bouton
   */
  attachToButton(buttonSelector, containerSelector) {
    const button = document.querySelector(buttonSelector);
    if (!button) {
      throw new Error(
        `ReqVet SDK: Impossible de trouver le bouton ${buttonSelector}`
      );
    }

    button.addEventListener("click", () => {
      this.mount(containerSelector);
    });
  },

  /**
   * En interne : gestion des events
   */
  _trigger(eventName, payload = null) {
    if (typeof this.events[eventName] === "function") {
      try {
        this.events[eventName](payload);
      } catch (err) {
        console.error(`ReqVet SDK: erreur dans ${eventName}`, err);
      }
    }
  },
};
