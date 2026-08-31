export async function onRequestPost(context) {

  try {

    const {
      request,
      env
    } = context;


    if (
      !env.SUPABASE_URL ||
      !env.SUPABASE_SERVICE_ROLE_KEY
    ) {

      return jsonResponse(
        {
          success: false,
          error: "Server configuration is incomplete."
        },
        500
      );

    }


    let body;


    try {

      body =
        await request.json();

    } catch {

      return jsonResponse(
        {
          success: false,
          error: "Invalid request body."
        },
        400
      );

    }


    const referralCode =
      String(
        body.referral_code || ""
      )
        .trim()
        .toUpperCase();


    const landingUrl =
      String(
        body.landing_url || ""
      )
        .trim();


    const rawProductId =
      body.product_id;


    let productId =
      null;


    /*
      =====================================================
      VALIDATE REFERRAL CODE
      =====================================================
    */


    if (
      !referralCode ||
      referralCode.length > 100
    ) {

      return jsonResponse(
        {
          success: false,
          error: "Invalid referral code."
        },
        400
      );

    }


    /*
      =====================================================
      VALIDATE LANDING URL
      =====================================================
    */


    if (
      !landingUrl ||
      landingUrl.length > 2000
    ) {

      return jsonResponse(
        {
          success: false,
          error: "Invalid landing URL."
        },
        400
      );

    }


    let parsedLandingUrl;


    try {

      parsedLandingUrl =
        new URL(
          landingUrl
        );

    } catch {

      return jsonResponse(
        {
          success: false,
          error: "Invalid landing URL."
        },
        400
      );

    }


    const allowedHosts = [
      "giftedgiftempire.com",
      "www.giftedgiftempire.com"
    ];


    if (
      !allowedHosts.includes(
        parsedLandingUrl.hostname
      )
    ) {

      return jsonResponse(
        {
          success: false,
          error: "Landing URL is not allowed."
        },
        400
      );

    }


    /*
      =====================================================
      OPTIONAL PRODUCT ID
      =====================================================
    */


    if (
      rawProductId !== null &&
      rawProductId !== undefined &&
      rawProductId !== ""
    ) {

      const parsedProductId =
        Number(
          rawProductId
        );


      if (
        !Number.isInteger(
          parsedProductId
        ) ||
        parsedProductId <= 0
      ) {

        return jsonResponse(
          {
            success: false,
            error: "Invalid product ID."
          },
          400
        );

      }


      productId =
        parsedProductId;

    }


    /*
      =====================================================
      SUPABASE HEADERS

      New sb_secret_ keys are sent using APIKEY only.
      =====================================================
    */


    const supabaseHeaders = {

      apikey:
        env.SUPABASE_SERVICE_ROLE_KEY,

      Accept:
        "application/json"

    };


    /*
      =====================================================
      1. FIND APPROVED AFFILIATE
      =====================================================
    */


    const affiliateLookupUrl =
      env.SUPABASE_URL +
      "/rest/v1/affiliates" +
      "?select=id,referral_code,status" +
      "&referral_code=eq." +
      encodeURIComponent(
        referralCode
      ) +
      "&limit=1";


    const affiliateResponse =
      await fetch(
        affiliateLookupUrl,
        {
          method: "GET",

          headers:
            supabaseHeaders
        }
      );


    if (
      !affiliateResponse.ok
    ) {

      const details =
        await safeResponseText(
          affiliateResponse
        );


      console.error(
        "Affiliate lookup failed:",
        affiliateResponse.status,
        details
      );


      return jsonResponse(
        {
          success: false,
          error: "Affiliate validation failed."
        },
        500
      );

    }


    const affiliates =
      await affiliateResponse.json();


    const affiliate =
      Array.isArray(
        affiliates
      )
        ? affiliates[0]
        : null;


    if (
      !affiliate
    ) {

      return jsonResponse(
        {
          success: false,
          error: "Referral code not found."
        },
        404
      );

    }


    const affiliateStatus =
      String(
        affiliate.status || ""
      )
        .trim()
        .toLowerCase();


    if (
      affiliateStatus !==
      "approved"
    ) {

      return jsonResponse(
        {
          success: false,
          error: "Affiliate is not active."
        },
        403
      );

    }


    /*
      =====================================================
      2. OPTIONAL DIGITAL PRODUCT VALIDATION
      =====================================================
    */


    if (
      productId !== null
    ) {

      const productLookupUrl =
        env.SUPABASE_URL +
        "/rest/v1/digital_products" +
        "?select=id" +
        "&id=eq." +
        encodeURIComponent(
          productId
        ) +
        "&limit=1";


      const productResponse =
        await fetch(
          productLookupUrl,
          {
            method: "GET",

            headers:
              supabaseHeaders
          }
        );


      if (
        !productResponse.ok
      ) {

        const details =
          await safeResponseText(
            productResponse
          );


        console.error(
          "Product lookup failed:",
          productResponse.status,
          details
        );


        return jsonResponse(
          {
            success: false,
            error: "Product validation failed."
          },
          500
        );

      }


      const products =
        await productResponse.json();


      if (
        !Array.isArray(
          products
        ) ||
        products.length === 0
      ) {

        return jsonResponse(
          {
            success: false,
            error: "Product not found."
          },
          404
        );

      }

    }


    /*
      =====================================================
      3. CREATE CLICK RECORD
      =====================================================
    */


    const clickPayload = {

      affiliate_id:
        affiliate.id,

      referral_code:
        referralCode,

      landing_url:
        landingUrl

    };


    if (
      productId !== null
    ) {

      clickPayload.product_id =
        productId;

    }


    const insertResponse =
      await fetch(
        env.SUPABASE_URL +
        "/rest/v1/affiliate_clicks",
        {
          method: "POST",

          headers: {

            apikey:
              env.SUPABASE_SERVICE_ROLE_KEY,

            "Content-Type":
              "application/json",

            Prefer:
              "return=minimal"

          },

          body:
            JSON.stringify(
              clickPayload
            )
        }
      );


    if (
      !insertResponse.ok
    ) {

      const details =
        await safeResponseText(
          insertResponse
        );


      console.error(
        "Affiliate click insert failed:",
        insertResponse.status,
        details
      );


      return jsonResponse(
        {
          success: false,
          error: "Click could not be recorded."
        },
        500
      );

    }


    /*
      =====================================================
      SUCCESS
      =====================================================
    */


    return jsonResponse(
      {
        success: true
      },
      200
    );


  } catch (
    error
  ) {

    console.error(
      "Affiliate click function error:",
      error
    );


    return jsonResponse(
      {
        success: false,
        error: "Unexpected server error."
      },
      500
    );

  }

}



function jsonResponse(
  data,
  status = 200
) {

  return new Response(
    JSON.stringify(
      data
    ),
    {
      status,

      headers: {

        "Content-Type":
          "application/json; charset=utf-8",

        "Cache-Control":
          "no-store"

      }

    }
  );

}



async function safeResponseText(
  response
) {

  try {

    return await response.text();

  } catch {

    return "";

  }

}
