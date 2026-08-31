export async function onRequestGet(context) {

  try {

    const {
      request,
      env
    } = context;


    /*
      =====================================================
      CHECK SERVER CONFIGURATION
      =====================================================
    */

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


    /*
      =====================================================
      GET AFFILIATE LOGIN TOKEN
      =====================================================
    */

    const authorization =
      request.headers.get(
        "Authorization"
      ) || "";


    if (
      !authorization.startsWith(
        "Bearer "
      )
    ) {

      return jsonResponse(
        {
          success: false,
          error: "Authentication required."
        },
        401
      );

    }


    const accessToken =
      authorization
        .slice(7)
        .trim();


    if (
      !accessToken
    ) {

      return jsonResponse(
        {
          success: false,
          error: "Authentication required."
        },
        401
      );

    }


    /*
      =====================================================
      1. VERIFY LOGGED-IN SUPABASE USER
      =====================================================
    */

    const userResponse =
      await fetch(
        env.SUPABASE_URL +
        "/auth/v1/user",
        {
          method: "GET",

          headers: {

            apikey:
              env.SUPABASE_SERVICE_ROLE_KEY,

            Authorization:
              "Bearer " +
              accessToken,

            Accept:
              "application/json"

          }

        }
      );


    if (
      !userResponse.ok
    ) {

      return jsonResponse(
        {
          success: false,
          error: "Your login session is not valid."
        },
        401
      );

    }


    const user =
      await userResponse.json();


    const email =
      String(
        user &&
        user.email
          ? user.email
          : ""
      )
        .trim()
        .toLowerCase();


    if (
      !email
    ) {

      return jsonResponse(
        {
          success: false,
          error: "Affiliate account could not be verified."
        },
        401
      );

    }


    /*
      =====================================================
      2. FIND APPROVED AFFILIATE PROFILE
      =====================================================
    */

    const affiliateLookupUrl =
      env.SUPABASE_URL +
      "/rest/v1/affiliates" +
      "?select=id,email,status" +
      "&email=eq." +
      encodeURIComponent(
        email
      ) +
      "&limit=1";


    const affiliateResponse =
      await fetch(
        affiliateLookupUrl,
        {
          method: "GET",

          headers: {

            apikey:
              env.SUPABASE_SERVICE_ROLE_KEY,

            Accept:
              "application/json"

          }

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
          error: "Affiliate account could not be verified."
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
          error: "Affiliate account was not found."
        },
        403
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
          error: "Affiliate account is not approved."
        },
        403
      );

    }


    /*
      =====================================================
      3. COUNT QUALIFYING SALES

      Qualifying:
      - belongs to this affiliate
      - completed_at has a value
      - refunded_at is NULL
      =====================================================
    */

    const salesUrl =
      env.SUPABASE_URL +
      "/rest/v1/affiliate_order_attributions" +
      "?select=id" +
      "&affiliate_id=eq." +
      encodeURIComponent(
        affiliate.id
      ) +
      "&completed_at=not.is.null" +
      "&refunded_at=is.null";


    const salesResponse =
      await fetch(
        salesUrl,
        {
          method: "GET",

          headers: {

            apikey:
              env.SUPABASE_SERVICE_ROLE_KEY,

            Accept:
              "application/json",

            Prefer:
              "count=exact",

            Range:
              "0-0"

          }

        }
      );


    if (
      !salesResponse.ok
    ) {

      const details =
        await safeResponseText(
          salesResponse
        );


      console.error(
        "Affiliate sales count failed:",
        salesResponse.status,
        details
      );


      return jsonResponse(
        {
          success: false,
          error: "Qualifying sales could not be loaded."
        },
        500
      );

    }


    /*
      =====================================================
      GET EXACT COUNT
      =====================================================
    */

    const contentRange =
      salesResponse.headers.get(
        "Content-Range"
      ) || "";


    let qualifyingSales =
      0;


    if (
      contentRange.includes(
        "/"
      )
    ) {

      const totalPart =
        contentRange
          .split("/")
          .pop();


      const parsedTotal =
        Number(
          totalPart
        );


      if (
        Number.isFinite(
          parsedTotal
        )
      ) {

        qualifyingSales =
          parsedTotal;

      }

    } else {

      const rows =
        await salesResponse.json();


      qualifyingSales =
        Array.isArray(
          rows
        )
          ? rows.length
          : 0;

    }


    /*
      =====================================================
      SUCCESS
      =====================================================
    */

    return jsonResponse(
      {
        success: true,

        qualifying_sales:
          qualifyingSales
      },
      200
    );


  } catch (
    error
  ) {

    console.error(
      "Affiliate sales function error:",
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
