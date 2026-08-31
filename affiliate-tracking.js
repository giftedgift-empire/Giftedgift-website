/*
  =====================================================
  GIFTEDGIFT EMPIRE
  AFFILIATE REFERRAL TRACKING
  =====================================================
*/


(function () {


  const STORAGE_KEY =
    "gge_affiliate_referral";


  const STORAGE_DAYS =
    30;


  /*
    =====================================================
    HELPERS
    =====================================================
  */


  function getReferralCodeFromUrl() {

    const params =
      new URLSearchParams(
        window.location.search
      );


    const ref =
      params.get(
        "ref"
      );


    if (
      !ref
    ) {

      return "";

    }


    return String(
      ref
    )
      .trim()
      .toUpperCase();

  }



  function getProductIdFromUrl() {

    const params =
      new URLSearchParams(
        window.location.search
      );


    const productId =
      params.get(
        "product_id"
      );


    if (
      !productId
    ) {

      return null;

    }


    const parsed =
      Number(
        productId
      );


    if (
      !Number.isInteger(
        parsed
      ) ||
      parsed <= 0
    ) {

      return null;

    }


    return parsed;

  }



  function saveReferralLocally(
    referralCode
  ) {

    const expiresAt =
      Date.now() +
      (
        STORAGE_DAYS *
        24 *
        60 *
        60 *
        1000
      );


    const payload = {

      referral_code:
        referralCode,

      expires_at:
        expiresAt

    };


    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        payload
      )
    );

  }



  function getStoredReferral() {

    try {

      const raw =
        localStorage.getItem(
          STORAGE_KEY
        );


      if (
        !raw
      ) {

        return "";

      }


      const data =
        JSON.parse(
          raw
        );


      if (
        !data ||
        !data.referral_code ||
        !data.expires_at
      ) {

        localStorage.removeItem(
          STORAGE_KEY
        );


        return "";

      }


      if (
        Date.now() >
        Number(
          data.expires_at
        )
      ) {

        localStorage.removeItem(
          STORAGE_KEY
        );


        return "";

      }


      return String(
        data.referral_code
      )
        .trim()
        .toUpperCase();


    } catch (
      error
    ) {

      console.error(
        "Stored affiliate referral read error:",
        error
      );


      return "";

    }

  }



  /*
    =====================================================
    RECORD CLICK
    =====================================================
  */


  async function recordAffiliateClick(
    referralCode,
    productId
  ) {

    try {

      const payload = {

        referral_code:
          referralCode,

        landing_url:
          window.location.href

      };


      if (
        productId !== null
      ) {

        payload.product_id =
          productId;

      }


      const response =
        await fetch(
          "/api/affiliate-click",
          {
            method:
              "POST",

            headers: {

              "Content-Type":
                "application/json"

            },

            body:
              JSON.stringify(
                payload
              )

          }
        );


      if (
        !response.ok
      ) {

        const text =
          await response.text();


        console.error(
          "Affiliate click tracking failed:",
          response.status,
          text
        );


        return false;

      }


      return true;


    } catch (
      error
    ) {

      console.error(
        "Affiliate click tracking error:",
        error
      );


      return false;

    }

  }



  /*
    =====================================================
    START
    =====================================================
  */


  async function startAffiliateTracking() {

    const referralCode =
      getReferralCodeFromUrl();


    /*
      NO REFERRAL IN CURRENT URL

      Keep any existing stored referral.
    */

    if (
      !referralCode
    ) {

      getStoredReferral();

      return;

    }



    /*
      SAVE REFERRAL FIRST

      Even if click logging fails temporarily,
      checkout attribution can still use the referral.
    */

    saveReferralLocally(
      referralCode
    );



    const productId =
      getProductIdFromUrl();



    await recordAffiliateClick(
      referralCode,
      productId
    );

  }



  startAffiliateTracking();


})();
