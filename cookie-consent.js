/* =========================================================
   GIFTEDGIFT EMPIRE
   COOKIE / PRIVACY CONSENT SYSTEM
========================================================= */

(function () {

  "use strict";


  /* =========================================================
     SETTINGS
  ========================================================= */

  const CONSENT_KEY =
    "giftedgift_cookie_consent";


  const CONSENT_VERSION =
  "2.0";


  /*
    CNIL generally recommends around six months
    before asking again.

    180 days = approximately six months.
  */

  const CONSENT_DURATION_DAYS =
    180;


  /* =========================================================
     HELPERS
  ========================================================= */

  function nowISO() {

    return new Date().toISOString();

  }


  function expiryISO() {

    const date =
      new Date();


    date.setDate(
      date.getDate() +
      CONSENT_DURATION_DAYS
    );


    return date.toISOString();

  }


  function safeParse(value) {

    try {

      return JSON.parse(value);

    } catch {

      return null;

    }

  }


  function getStoredConsent() {

    try {

      const stored =
        localStorage.getItem(
          CONSENT_KEY
        );


      if (!stored) {

        return null;

      }


      const consent =
        safeParse(stored);


      if (!consent) {

        return null;

      }


      /*
        Ask again if consent system
        version changes.
      */

      if (
        consent.version !==
        CONSENT_VERSION
      ) {

        return null;

      }


      /*
        Ask again when consent expires.
      */

      const expires =
        new Date(
          consent.expires_at
        );


      if (
        Number.isNaN(
          expires.getTime()
        ) ||
        expires <= new Date()
      ) {

        localStorage.removeItem(
          CONSENT_KEY
        );


        return null;

      }


      return consent;

    } catch {

      return null;

    }

  }


  function saveConsent(
    analytics,
    marketing
  ) {

    const consent = {

      version:
        CONSENT_VERSION,

      essential:
        true,

      analytics:
        Boolean(analytics),

      marketing:
        Boolean(marketing),

      saved_at:
        nowISO(),

      expires_at:
        expiryISO()

    };


    try {

      localStorage.setItem(
        CONSENT_KEY,
        JSON.stringify(consent)
      );

    } catch {

      /*
        If browser storage is unavailable,
        the visitor may be asked again later.
      */

    }


    window.GiftedGiftConsent =
      buildPublicAPI(
        consent
      );


    window.dispatchEvent(
      new CustomEvent(
        "giftedgift:consentchange",
        {
          detail:
            consent
        }
      )
    );


    return consent;

  }


  /* =========================================================
     PUBLIC API
  ========================================================= */

  function buildPublicAPI(
    consent
  ) {

    return {

      essential:
        true,

      analytics:
        Boolean(
          consent?.analytics
        ),

      marketing:
        Boolean(
          consent?.marketing
        ),


      has:
        function (category) {

          if (
            category ===
            "essential"
          ) {

            return true;

          }


          return Boolean(
            consent?.[category]
          );

        },


      openSettings:
        function () {

          openPreferences();

        },


      reset:
        function () {

          try {

            localStorage.removeItem(
              CONSENT_KEY
            );

          } catch {}


          window.location.reload();

        }

    };

  }


  /* =========================================================
     STYLES
  ========================================================= */

  const style =
    document.createElement(
      "style"
    );


  style.textContent = `

    :root {
      --gg-cookie-blue: #123a8c;
      --gg-cookie-dark-blue: #071e52;
      --gg-cookie-gold: #f2bd16;
      --gg-cookie-border: #dfe3e8;
      --gg-cookie-text: #252a31;
      --gg-cookie-muted: #68707a;
      --gg-cookie-white: #ffffff;
    }


    .gg-cookie-overlay {
      position: fixed;
      inset: 0;
      z-index: 99998;

      display: none;

      background:
        rgba(7, 30, 82, 0.45);

      backdrop-filter:
        blur(2px);
    }


    .gg-cookie-overlay.show {
      display: block;
    }


    .gg-cookie-banner {
      position: fixed;

      left: 20px;
      right: 20px;
      bottom: 20px;

      z-index: 99999;

      max-width: 760px;

      margin: auto;

      display: none;

      background:
        var(--gg-cookie-white);

      border:
        1px solid
        var(--gg-cookie-border);

      border-radius: 18px;

      box-shadow:
        0 14px 45px
        rgba(0, 0, 0, 0.24);

      padding: 24px;
    }


    .gg-cookie-banner.show {
      display: block;
    }


    .gg-cookie-heading {
      display: flex;
      align-items: center;
      gap: 10px;

      margin-bottom: 12px;
    }


    .gg-cookie-heading-icon {
      width: 42px;
      height: 42px;

      display: flex;
      align-items: center;
      justify-content: center;

      flex: 0 0 auto;

      border-radius: 50%;

      background:
        #edf3ff;

      font-size: 22px;
    }


    .gg-cookie-heading h2 {
      margin: 0;

      color:
        var(--gg-cookie-blue);

      font-size: 23px;
      line-height: 1.25;
    }


    .gg-cookie-message {
      margin: 0 0 18px;

      color:
        var(--gg-cookie-muted);

      font-size: 15px;
      line-height: 1.65;
    }


    .gg-cookie-message a {
      color:
        var(--gg-cookie-blue);

      font-weight: 800;
    }


    .gg-cookie-actions {
      display: grid;

      grid-template-columns:
        repeat(3, 1fr);

      gap: 10px;
    }


    .gg-cookie-button {
      min-height: 48px;

      padding:
        10px 14px;

      border:
        2px solid transparent;

      border-radius: 10px;

      cursor: pointer;

      font: inherit;

      font-size: 14px;
      font-weight: 800;

      text-align: center;
    }


    .gg-cookie-accept {
      background:
        var(--gg-cookie-blue);

      color: white;
    }


    .gg-cookie-reject {
      background:
        white;

      color:
        var(--gg-cookie-blue);

      border-color:
        var(--gg-cookie-blue);
    }


    .gg-cookie-manage {
      background:
        var(--gg-cookie-gold);

      color: #111;
    }


    /* =========================
       PREFERENCES WINDOW
    ========================= */


    .gg-cookie-modal {
      position: fixed;

      left: 50%;
      top: 50%;

      transform:
        translate(-50%, -50%);

      z-index: 100000;

      width:
        min(
          92vw,
          560px
        );

      max-height: 88vh;

      overflow-y: auto;

      display: none;

      background: white;

      border-radius: 18px;

      border:
        1px solid
        var(--gg-cookie-border);

      box-shadow:
        0 18px 60px
        rgba(0, 0, 0, 0.28);

      padding: 24px;
    }


    .gg-cookie-modal.show {
      display: block;
    }


    .gg-cookie-modal h2 {
      margin:
        0 0 8px;

      color:
        var(--gg-cookie-blue);

      font-size: 25px;
    }


    .gg-cookie-modal-intro {
      margin:
        0 0 20px;

      color:
        var(--gg-cookie-muted);

      line-height: 1.6;

      font-size: 14px;
    }


    .gg-cookie-category {
      display: flex;

      justify-content:
        space-between;

      align-items:
        flex-start;

      gap: 18px;

      padding:
        17px 0;

      border-top:
        1px solid
        var(--gg-cookie-border);
    }


    .gg-cookie-category-copy {
      flex: 1;
    }


    .gg-cookie-category-copy strong {
      display: block;

      color:
        var(--gg-cookie-text);

      margin-bottom: 4px;
    }


    .gg-cookie-category-copy p {
      margin: 0;

      color:
        var(--gg-cookie-muted);

      font-size: 13px;
      line-height: 1.55;
    }


    .gg-cookie-always {
      flex: 0 0 auto;

      color:
        #18713b;

      font-size: 12px;
      font-weight: 900;

      padding:
        6px 8px;

      border-radius: 20px;

      background:
        #eaf7ee;
    }


    /* =========================
       SWITCH
    ========================= */


    .gg-cookie-switch {
      position: relative;

      width: 50px;
      height: 28px;

      flex: 0 0 auto;
    }


    .gg-cookie-switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }


    .gg-cookie-slider {
      position: absolute;

      inset: 0;

      cursor: pointer;

      background:
        #aeb4bd;

      border-radius: 30px;

      transition:
        0.2s;
    }


    .gg-cookie-slider::before {
      content: "";

      position: absolute;

      width: 22px;
      height: 22px;

      left: 3px;
      top: 3px;

      border-radius: 50%;

      background: white;

      transition:
        0.2s;

      box-shadow:
        0 2px 5px
        rgba(0, 0, 0, 0.22);
    }


    .gg-cookie-switch
    input:checked +
    .gg-cookie-slider {

      background:
        #188038;

    }


    .gg-cookie-switch
    input:checked +
    .gg-cookie-slider::before {

      transform:
        translateX(22px);

    }


    .gg-cookie-modal-actions {
      display: grid;

      grid-template-columns:
        repeat(2, 1fr);

      gap: 10px;

      margin-top: 18px;
    }


    .gg-cookie-save {
      background:
        var(--gg-cookie-blue);

      color: white;
    }


    .gg-cookie-reject-modal {
      background:
        white;

      color:
        var(--gg-cookie-blue);

      border-color:
        var(--gg-cookie-blue);
    }


    /* =========================
       COOKIE SETTINGS BUTTON
    ========================= */


    .gg-cookie-settings-button {
      position: fixed;

      left: 14px;
      bottom: 14px;

      z-index: 99990;

      display: none;

      min-height: 38px;

      padding:
        8px 12px;

      border:
        1px solid
        #ccd5e7;

      border-radius: 20px;

      background: white;

      color:
        var(--gg-cookie-blue);

      box-shadow:
        0 3px 12px
        rgba(0, 0, 0, 0.12);

      cursor: pointer;

      font-size: 12px;
      font-weight: 800;
    }


    .gg-cookie-settings-button.show {
      display: block;
    }


    /* =========================
       MOBILE
    ========================= */


    @media (
      max-width: 620px
    ) {

      .gg-cookie-banner {
        left: 10px;
        right: 10px;
        bottom: 10px;

        padding: 20px 16px;

        border-radius: 16px;
      }


      .gg-cookie-actions {
        grid-template-columns:
          1fr;
      }


      .gg-cookie-button {
        width: 100%;
      }


      .gg-cookie-modal {
        width:
          calc(100% - 20px);

        padding:
          21px 16px;
      }


      .gg-cookie-modal-actions {
        grid-template-columns:
          1fr;
      }

    }

  `;


  document.head.appendChild(
    style
  );


  /* =========================================================
     BUILD HTML
  ========================================================= */

  const overlay =
    document.createElement(
      "div"
    );


  overlay.className =
    "gg-cookie-overlay";


  overlay.id =
    "gg-cookie-overlay";


  const banner =
    document.createElement(
      "div"
    );


  banner.className =
    "gg-cookie-banner";


  banner.id =
    "gg-cookie-banner";


  banner.setAttribute(
    "role",
    "dialog"
  );


  banner.setAttribute(
    "aria-modal",
    "true"
  );


  banner.setAttribute(
    "aria-labelledby",
    "gg-cookie-title"
  );


  banner.innerHTML = `

    <div class="gg-cookie-heading">

      <div class="gg-cookie-heading-icon">
        🍪
      </div>

      <h2 id="gg-cookie-title">
        Your privacy choices
      </h2>

    </div>


    <p class="gg-cookie-message">

      GiftedGift Empire uses essential browser
      storage for functions such as your shopping
      cart, security and website preferences.

      Optional analytics and marketing technologies
      will only be used if you allow them.

      <a href="privacy-policy.html">
        Learn more
      </a>

    </p>


    <div class="gg-cookie-actions">

      <button
        id="gg-cookie-accept"
        class="
          gg-cookie-button
          gg-cookie-accept
        "
        type="button"
      >
        Accept optional
      </button>


      <button
        id="gg-cookie-reject"
        class="
          gg-cookie-button
          gg-cookie-reject
        "
        type="button"
      >
        Reject optional
      </button>


      <button
        id="gg-cookie-manage"
        class="
          gg-cookie-button
          gg-cookie-manage
        "
        type="button"
      >
        Manage choices
      </button>

    </div>

  `;


  const modal =
    document.createElement(
      "div"
    );


  modal.className =
    "gg-cookie-modal";


  modal.id =
    "gg-cookie-modal";


  modal.setAttribute(
    "role",
    "dialog"
  );


  modal.setAttribute(
    "aria-modal",
    "true"
  );


  modal.innerHTML = `

    <h2>
      Cookie & privacy settings
    </h2>


    <p class="gg-cookie-modal-intro">

      Choose which optional technologies
      GiftedGift Empire may use.

      Essential technologies cannot be disabled
      because they are required for website
      functions requested by you.

    </p>


    <div class="gg-cookie-category">

      <div class="gg-cookie-category-copy">

        <strong>
          Essential
        </strong>

        <p>
          Used for core website functions such
          as the shopping cart, security,
          session preferences and remembering
          your privacy choice.
        </p>

      </div>


      <div class="gg-cookie-always">
        Always active
      </div>

    </div>


    <div class="gg-cookie-category">

      <div class="gg-cookie-category-copy">

        <strong>
          Analytics
        </strong>

        <p>
          Allows optional audience-measurement
          technologies to help us understand
          how visitors use the website.
        </p>

      </div>


      <label class="gg-cookie-switch">

        <input
          id="gg-consent-analytics"
          type="checkbox"
        >

        <span
          class="gg-cookie-slider"
        ></span>

      </label>

    </div>


    <div class="gg-cookie-category">

      <div class="gg-cookie-category-copy">

        <strong>
          Marketing
        </strong>

        <p>
          Allows optional advertising,
          affiliate-measurement or marketing
          technologies where consent is required.
        </p>

      </div>


      <label class="gg-cookie-switch">

        <input
          id="gg-consent-marketing"
          type="checkbox"
        >

        <span
          class="gg-cookie-slider"
        ></span>

      </label>

    </div>


    <div class="gg-cookie-modal-actions">

      <button
        id="gg-cookie-save"
        class="
          gg-cookie-button
          gg-cookie-save
        "
        type="button"
      >
        Save my choices
      </button>


      <button
        id="gg-cookie-reject-modal"
        class="
          gg-cookie-button
          gg-cookie-reject-modal
        "
        type="button"
      >
        Reject optional
      </button>

    </div>

  `;


  const settingsButton =
    document.createElement(
      "button"
    );


  settingsButton.id =
    "gg-cookie-settings-button";


  settingsButton.className =
    "gg-cookie-settings-button";


  settingsButton.type =
    "button";


  settingsButton.textContent =
    "Cookie Settings";


  document.body.appendChild(
    overlay
  );


  document.body.appendChild(
    banner
  );


  document.body.appendChild(
    modal
  );


  document.body.appendChild(
    settingsButton
  );


  /* =========================================================
     ELEMENTS
  ========================================================= */

  const acceptButton =
    document.getElementById(
      "gg-cookie-accept"
    );


  const rejectButton =
    document.getElementById(
      "gg-cookie-reject"
    );


  const manageButton =
    document.getElementById(
      "gg-cookie-manage"
    );


  const saveButton =
    document.getElementById(
      "gg-cookie-save"
    );


  const modalRejectButton =
    document.getElementById(
      "gg-cookie-reject-modal"
    );


  const analyticsToggle =
    document.getElementById(
      "gg-consent-analytics"
    );


  const marketingToggle =
    document.getElementById(
      "gg-consent-marketing"
    );


  /* =========================================================
     OPEN / CLOSE
  ========================================================= */

  function showBanner() {

    banner.classList.add(
      "show"
    );


    overlay.classList.add(
      "show"
    );


    settingsButton.classList.remove(
      "show"
    );

  }


  function hideBanner() {

    banner.classList.remove(
      "show"
    );


    overlay.classList.remove(
      "show"
    );


    settingsButton.classList.add(
      "show"
    );

  }


  function openPreferences() {

    const current =
      getStoredConsent();


    analyticsToggle.checked =
      Boolean(
        current?.analytics
      );


    marketingToggle.checked =
      Boolean(
        current?.marketing
      );


    banner.classList.remove(
      "show"
    );


    modal.classList.add(
      "show"
    );


    overlay.classList.add(
      "show"
    );


    settingsButton.classList.remove(
      "show"
    );

  }


  function closePreferences() {

    modal.classList.remove(
      "show"
    );


    overlay.classList.remove(
      "show"
    );


    settingsButton.classList.add(
      "show"
    );

  }


  /* =========================================================
     CHOICES
  ========================================================= */

  function acceptOptional() {

    saveConsent(
      true,
      true
    );


    hideBanner();


    closePreferences();

  }


  function rejectOptional() {

    saveConsent(
      false,
      false
    );


    hideBanner();


    closePreferences();

  }


  function savePreferences() {

    saveConsent(
      analyticsToggle.checked,
      marketingToggle.checked
    );


    hideBanner();


    closePreferences();

  }


  /* =========================================================
     EVENTS
  ========================================================= */

  acceptButton.addEventListener(
    "click",
    acceptOptional
  );


  rejectButton.addEventListener(
    "click",
    rejectOptional
  );


  manageButton.addEventListener(
    "click",
    openPreferences
  );


  saveButton.addEventListener(
    "click",
    savePreferences
  );


  modalRejectButton.addEventListener(
    "click",
    rejectOptional
  );


  settingsButton.addEventListener(
    "click",
    openPreferences
  );


  /*
    Clicking outside the preferences
    window does NOT silently accept.

    It simply keeps the settings
    window open so the visitor makes
    an explicit choice.
  */

  overlay.addEventListener(
    "click",
    function () {

      if (
        modal.classList.contains(
          "show"
        )
      ) {

        return;

      }

    }
  );


/* =========================================================
   START
========================================================= */

const existingConsent =
  getStoredConsent();


window.GiftedGiftConsent =
  buildPublicAPI(
    existingConsent
  );


/* =========================================================
   LOAD CONSENT-CONTROLLED TRACKING
========================================================= */

function loadTrackingSystem() {

  if (
    document.getElementById(
      "giftedgift-tracking-script"
    )
  ) {

    return;

  }


  const trackingScript =
    document.createElement(
      "script"
    );


  trackingScript.id =
    "giftedgift-tracking-script";


  /*
    Root-relative path is intentional.

    This allows tracking.js to work on
    normal pages and clean URLs such as:
    /test-product
    /fashion-glasses
    /delife-sirpio-xl
  */

  trackingScript.src =
    "/tracking.js";


  trackingScript.async =
    true;


  trackingScript.onload =
    function () {

      /*
        Tell tracking.js the visitor's
        current consent state immediately
        after the tracking system loads.
      */

      window.dispatchEvent(
        new CustomEvent(
          "giftedgift:consentready",
          {
            detail: {

              analytics:
                Boolean(
                  existingConsent?.analytics
                ),

              marketing:
                Boolean(
                  existingConsent?.marketing
                )

            }
          }
        )
      );

    };


  document.head.appendChild(
    trackingScript
  );

}


loadTrackingSystem();


/*
  Existing visitor:
  their valid consent choice is respected.

  New visitor:
  optional tracking remains off until
  they make a choice in the banner.
*/

if (existingConsent) {

  settingsButton.classList.add(
    "show"
  );

} else {

  showBanner();

}

})(); 
