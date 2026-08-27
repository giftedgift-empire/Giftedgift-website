/* =========================================================
   GIFTEDGIFT EMPIRE
   CONSENT-CONTROLLED TRACKING LOADER

   Analytics:
   - Google Analytics 4

   Marketing:
   - Meta / Facebook Pixel
   - Pinterest Tag
   - TikTok Pixel
   - Google Ads / YouTube Ads ready for later
========================================================= */

(function () {

  "use strict";


  /* =========================================================
     TRACKING IDS
  ========================================================= */

  const GA4_MEASUREMENT_ID =
    "G-76WQT4QTEQ";


  const META_PIXEL_ID =
    "1869126857045650";


  const PINTEREST_TAG_ID =
    "2612493377128";


  const TIKTOK_PIXEL_ID =
    "DA7OV1JC77UES9744130";


  /*
    GOOGLE ADS / YOUTUBE ADS

    Leave blank for now.

    When we later create your Google Ads
    conversion tracking, its ID will normally
    look like:

    AW-123456789

    We will only need to insert that ID here.
  */

  const GOOGLE_ADS_ID =
    "";


  /* =========================================================
     CURRENT CONSENT
  ========================================================= */

  let currentConsent = {

    analytics:
      false,

    marketing:
      false

  };


  /* =========================================================
     LOAD STATE
  ========================================================= */

  let googleScriptLoaded =
    false;


  let googleAnalyticsConfigured =
    false;


  let googleAdsConfigured =
    false;


  let metaPixelLoaded =
    false;


  let metaPageTracked =
    false;


  let pinterestTagLoaded =
    false;


  let pinterestPageTracked =
    false;


  let tiktokPixelLoaded =
    false;


  let tiktokPageTracked =
    false;


  /* =========================================================
     GENERAL HELPERS
  ========================================================= */

  function addScript(
    id,
    src
  ) {

    if (
      document.getElementById(
        id
      )
    ) {

      return;

    }


    const script =
      document.createElement(
        "script"
      );


    script.id =
      id;


    script.async =
      true;


    script.src =
      src;


    document.head.appendChild(
      script
    );

  }


  /* =========================================================
     GOOGLE TAG
     GA4 + FUTURE GOOGLE ADS / YOUTUBE
  ========================================================= */

  function prepareGoogleQueue() {

    window.dataLayer =
      window.dataLayer ||
      [];


    if (
      typeof window.gtag !==
      "function"
    ) {

      window.gtag =
        function () {

          window.dataLayer.push(
            arguments
          );

        };

    }


    return window.gtag;

  }


  function setGoogleConsentDefaults() {

    const gtag =
      prepareGoogleQueue();


    /*
      Everything starts denied.

      No Google script has to be
      downloaded merely to create
      this local queue.
    */

    gtag(
      "consent",
      "default",
      {

        analytics_storage:
          "denied",

        ad_storage:
          "denied",

        ad_user_data:
          "denied",

        ad_personalization:
          "denied"

      }
    );

  }


  function updateGoogleConsent() {

    if (
      !googleScriptLoaded
    ) {

      return;

    }


    const gtag =
      prepareGoogleQueue();


    gtag(
      "consent",
      "update",
      {

        analytics_storage:
          currentConsent.analytics
            ? "granted"
            : "denied",

        ad_storage:
          currentConsent.marketing
            ? "granted"
            : "denied",

        ad_user_data:
          currentConsent.marketing
            ? "granted"
            : "denied",

        ad_personalization:
          currentConsent.marketing
            ? "granted"
            : "denied"

      }
    );

  }


  function ensureGoogleScript() {

    if (
      googleScriptLoaded
    ) {

      updateGoogleConsent();

      return;

    }


    /*
      GA4 requires Analytics consent.

      Future Google Ads / YouTube Ads
      can require Marketing consent.

      If neither applicable permission
      has been given, do nothing.
    */

    const analyticsNeeded =
      currentConsent.analytics;


    const advertisingNeeded =
      currentConsent.marketing &&
      Boolean(
        GOOGLE_ADS_ID
      );


    if (
      !analyticsNeeded &&
      !advertisingNeeded
    ) {

      return;

    }


    setGoogleConsentDefaults();


    const gtag =
      prepareGoogleQueue();


    /*
      Update consent BEFORE configuring
      the Google products.
    */

    gtag(
      "consent",
      "update",
      {

        analytics_storage:
          currentConsent.analytics
            ? "granted"
            : "denied",

        ad_storage:
          currentConsent.marketing
            ? "granted"
            : "denied",

        ad_user_data:
          currentConsent.marketing
            ? "granted"
            : "denied",

        ad_personalization:
          currentConsent.marketing
            ? "granted"
            : "denied"

      }
    );


    const primaryGoogleID =
      analyticsNeeded
        ? GA4_MEASUREMENT_ID
        : GOOGLE_ADS_ID;


    addScript(
      "gg-google-tag",
      "https://www.googletagmanager.com/gtag/js?id=" +
        encodeURIComponent(
          primaryGoogleID
        )
    );


    gtag(
      "js",
      new Date()
    );


    googleScriptLoaded =
      true;


    configureGoogleProducts();

  }


  function configureGoogleProducts() {

    if (
      !googleScriptLoaded
    ) {

      return;

    }


    const gtag =
      prepareGoogleQueue();


    /*
      GOOGLE ANALYTICS 4
    */

    if (
      currentConsent.analytics &&
      !googleAnalyticsConfigured
    ) {

      gtag(
        "config",
        GA4_MEASUREMENT_ID
      );


      googleAnalyticsConfigured =
        true;

    }


    /*
      FUTURE GOOGLE ADS / YOUTUBE

      Nothing runs here today because
      GOOGLE_ADS_ID is intentionally blank.
    */

    if (
      currentConsent.marketing &&
      GOOGLE_ADS_ID &&
      !googleAdsConfigured
    ) {

      gtag(
        "config",
        GOOGLE_ADS_ID
      );


      googleAdsConfigured =
        true;

    }

  }


  function applyGoogleConsent() {

    /*
      If Google has previously loaded,
      immediately update its consent state.
    */

    if (
      googleScriptLoaded
    ) {

      updateGoogleConsent();

      configureGoogleProducts();

      return;

    }


    /*
      Otherwise only introduce the
      Google script after applicable
      permission.
    */

    ensureGoogleScript();

  }


  /* =========================================================
     META / FACEBOOK PIXEL
     MARKETING CONSENT REQUIRED
  ========================================================= */

  function createMetaPixel() {

    if (
      typeof window.fbq ===
      "function"
    ) {

      return window.fbq;

    }


    const fbq =
      function () {

        if (
          fbq.callMethod
        ) {

          fbq.callMethod.apply(
            fbq,
            arguments
          );

        } else {

          fbq.queue.push(
            arguments
          );

        }

      };


    window.fbq =
      fbq;


    if (
      !window._fbq
    ) {

      window._fbq =
        fbq;

    }


    fbq.push =
      fbq;


    fbq.loaded =
      true;


    fbq.version =
      "2.0";


    fbq.queue =
      [];


    addScript(
      "gg-meta-pixel",
      "https://connect.facebook.net/en_US/fbevents.js"
    );


    return fbq;

  }


  function loadMetaPixel() {

    if (
      !currentConsent.marketing
    ) {

      return;

    }


    if (
      metaPixelLoaded
    ) {

      if (
        typeof window.fbq ===
        "function"
      ) {

        window.fbq(
          "consent",
          "grant"
        );

      }


      return;

    }


    const fbq =
      createMetaPixel();


    /*
      Marketing consent already exists
      before this script is introduced.
    */

    fbq(
      "consent",
      "grant"
    );


    fbq(
      "init",
      META_PIXEL_ID
    );


    metaPixelLoaded =
      true;


    if (
      !metaPageTracked
    ) {

      fbq(
        "track",
        "PageView"
      );


      metaPageTracked =
        true;

    }

  }


  function revokeMetaConsent() {

    if (
      typeof window.fbq !==
      "function"
    ) {

      return;

    }


    window.fbq(
      "consent",
      "revoke"
    );

  }


  /* =========================================================
     PINTEREST TAG
     MARKETING CONSENT REQUIRED
  ========================================================= */

  function createPinterestTag() {

    if (
      typeof window.pintrk ===
      "function"
    ) {

      return window.pintrk;

    }


    const pintrk =
      function () {

        pintrk.queue.push(
          Array.prototype.slice.call(
            arguments
          )
        );

      };


    pintrk.queue =
      [];


    pintrk.version =
      "3.0";


    window.pintrk =
      pintrk;


    addScript(
      "gg-pinterest-tag",
      "https://s.pinimg.com/ct/core.js"
    );


    return pintrk;

  }


  function loadPinterestTag() {

    if (
      !currentConsent.marketing
    ) {

      return;

    }


    if (
      pinterestTagLoaded
    ) {

      if (
        typeof window.pintrk ===
        "function"
      ) {

        window.pintrk(
          "setconsent",
          true
        );

      }


      return;

    }


    const pintrk =
      createPinterestTag();


    /*
      No enhanced matching/email data
      is being sent here.
    */

    pintrk(
      "load",
      PINTEREST_TAG_ID
    );


    pintrk(
      "setconsent",
      true
    );


    pinterestTagLoaded =
      true;


    if (
      !pinterestPageTracked
    ) {

      pintrk(
        "page"
      );


      pinterestPageTracked =
        true;

    }

  }


  function revokePinterestConsent() {

    if (
      typeof window.pintrk !==
      "function"
    ) {

      return;

    }


    window.pintrk(
      "setconsent",
      false
    );

  }


  /* =========================================================
     TIKTOK PIXEL
     MARKETING CONSENT REQUIRED
  ========================================================= */

  function createTikTokPixel() {

    if (
      window.ttq
    ) {

      return window.ttq;

    }


    const analyticsObject =
      "ttq";


    window.TiktokAnalyticsObject =
      analyticsObject;


    const ttq =
      window[
        analyticsObject
      ] =
        window[
          analyticsObject
        ] ||
        [];


    ttq.methods = [

      "page",
      "track",
      "identify",
      "instances",
      "debug",
      "on",
      "off",
      "once",
      "ready",
      "alias",
      "group",
      "enableCookie",
      "disableCookie",
      "holdConsent",
      "revokeConsent",
      "grantConsent"

    ];


    ttq.setAndDefer =
      function (
        target,
        method
      ) {

        target[
          method
        ] =
          function () {

            target.push(
              [
                method
              ].concat(
                Array.prototype.slice.call(
                  arguments,
                  0
                )
              )
            );

          };

      };


    for (
      let i = 0;
      i <
        ttq.methods.length;
      i++
    ) {

      ttq.setAndDefer(
        ttq,
        ttq.methods[
          i
        ]
      );

    }


    ttq.instance =
      function (
        pixelID
      ) {

        const instance =
          (
            ttq._i &&
            ttq._i[
              pixelID
            ]
          ) ||
          [];


        for (
          let i = 0;
          i <
            ttq.methods.length;
          i++
        ) {

          ttq.setAndDefer(
            instance,
            ttq.methods[
              i
            ]
          );

        }


        return instance;

      };


    ttq.load =
      function (
        pixelID,
        options
      ) {

        const scriptURL =
          "https://analytics.tiktok.com/i18n/pixel/events.js";


        ttq._i =
          ttq._i ||
          {};


        ttq._i[
          pixelID
        ] =
          [];


        ttq._i[
          pixelID
        ]._u =
          scriptURL;


        ttq._t =
          ttq._t ||
          {};


        ttq._t[
          pixelID
        ] =
          +new Date();


        ttq._o =
          ttq._o ||
          {};


        ttq._o[
          pixelID
        ] =
          options ||
          {};


        const script =
          document.createElement(
            "script"
          );


        script.type =
          "text/javascript";


        script.async =
          true;


        script.id =
          "gg-tiktok-pixel";


        script.src =
          scriptURL +
          "?sdkid=" +
          encodeURIComponent(
            pixelID
          ) +
          "&lib=" +
          analyticsObject;


        document.head.appendChild(
          script
        );

      };


    return ttq;

  }


  function loadTikTokPixel() {

    if (
      !currentConsent.marketing
    ) {

      return;

    }


    if (
      tiktokPixelLoaded
    ) {

      if (
        window.ttq &&
        typeof window.ttq.grantConsent ===
          "function"
      ) {

        window.ttq
          .grantConsent();

      }


      return;

    }


    const ttq =
      createTikTokPixel();


    ttq.load(
      TIKTOK_PIXEL_ID
    );


    /*
      Explicit marketing permission
      has already been granted.
    */

    ttq.grantConsent();


    tiktokPixelLoaded =
      true;


    if (
      !tiktokPageTracked
    ) {

      ttq.page();


      tiktokPageTracked =
        true;

    }

  }


  function revokeTikTokConsent() {

    if (
      !window.ttq ||
      typeof window.ttq.revokeConsent !==
        "function"
    ) {

      return;

    }


    window.ttq
      .revokeConsent();

  }


  /* =========================================================
     APPLY ANALYTICS CONSENT
  ========================================================= */

  function applyAnalyticsConsent() {

    applyGoogleConsent();

  }


  /* =========================================================
     APPLY MARKETING CONSENT
  ========================================================= */

  function applyMarketingConsent() {

    /*
      Google advertising consent also
      follows Marketing permission.

      There is no Google Ads ID yet,
      so no Google advertising tag
      is being configured today.
    */

    applyGoogleConsent();


    if (
      currentConsent.marketing
    ) {

      loadMetaPixel();

      loadPinterestTag();

      loadTikTokPixel();

    } else {

      revokeMetaConsent();

      revokePinterestConsent();

      revokeTikTokConsent();

    }

  }


  /* =========================================================
     MASTER CONSENT FUNCTION
  ========================================================= */

  function applyConsent(
    consent
  ) {

    currentConsent = {

      analytics:
        Boolean(
          consent?.analytics
        ),

      marketing:
        Boolean(
          consent?.marketing
        )

    };


    applyAnalyticsConsent();

    applyMarketingConsent();

  }


  /* =========================================================
     LISTEN FOR COOKIE-BANNER CHANGES
  ========================================================= */

  window.addEventListener(
    "giftedgift:consentchange",
    function (
      event
    ) {

      applyConsent(
        event.detail ||
        {}
      );

    }
  );


  /*
    We will also use this event when
    connecting tracking.js to the
    cookie-consent system.
  */

  window.addEventListener(
    "giftedgift:consentready",
    function (
      event
    ) {

      applyConsent(
        event.detail ||
        {}
      );

    }
  );


  /* =========================================================
     PUBLIC TRACKING API
  ========================================================= */

  window.GiftedGiftTracking = {

    applyConsent:
      applyConsent,


    getConsent:
      function () {

        return {

          analytics:
            currentConsent.analytics,

          marketing:
            currentConsent.marketing

        };

      },


    /*
      These will be useful later when
      we add ecommerce events such as:

      ViewContent
      AddToCart
      BeginCheckout
      Purchase
    */

    metaEvent:
      function (
        eventName,
        parameters
      ) {

        if (
          !currentConsent.marketing ||
          typeof window.fbq !==
            "function"
        ) {

          return;

        }


        window.fbq(
          "track",
          eventName,
          parameters ||
          {}
        );

      },


    pinterestEvent:
      function (
        eventName,
        parameters
      ) {

        if (
          !currentConsent.marketing ||
          typeof window.pintrk !==
            "function"
        ) {

          return;

        }


        window.pintrk(
          "track",
          eventName,
          parameters ||
          {}
        );

      },


    tiktokEvent:
      function (
        eventName,
        parameters
      ) {

        if (
          !currentConsent.marketing ||
          !window.ttq ||
          typeof window.ttq.track !==
            "function"
        ) {

          return;

        }


        window.ttq.track(
          eventName,
          parameters ||
          {}
        );

      },


    gaEvent:
      function (
        eventName,
        parameters
      ) {

        if (
          !currentConsent.analytics ||
          typeof window.gtag !==
            "function"
        ) {

          return;

        }


        window.gtag(
          "event",
          eventName,
          parameters ||
          {}
        );

      }

  };


  /* =========================================================
     INITIAL CHECK

     If cookie-consent.js has already
     loaded before tracking.js, use its
     current consent immediately.
  ========================================================= */

  if (
    window.GiftedGiftConsent
  ) {

    applyConsent(
      {

        analytics:
          window
            .GiftedGiftConsent
            .analytics,

        marketing:
          window
            .GiftedGiftConsent
            .marketing

      }
    );

  }

})();
