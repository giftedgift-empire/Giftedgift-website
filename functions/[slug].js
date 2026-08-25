const SUPABASE_URL =
  "https://mvoxizdzjmtcvokowhpd.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_5wjUjC6amD7e2H_3h_7UQw_TY6orH16";


export async function onRequestGet(context) {

  /*
    First allow normal website pages/files
    such as /shop, /about, /contact, etc.
  */

  const existingAsset =
    await context.env.ASSETS.fetch(
      context.request
    );


  if (
    existingAsset.status !== 404
  ) {

    return existingAsset;
  }


  const slug =
    String(
      context.params.slug ||
      ""
    )
      .trim()
      .toLowerCase();


  if (!slug) {

    return existingAsset;
  }


  try {

    /*
      Find the active affiliate product
      that owns this short Share Link Name.
    */

    const apiURL =
      SUPABASE_URL +
      "/rest/v1/affiliate_products" +
      "?select=id,slug" +
      "&slug=eq." +
      encodeURIComponent(slug) +
      "&active=eq.true" +
      "&limit=1";


    const response =
      await fetch(
        apiURL,
        {
          headers: {
            apikey:
              SUPABASE_PUBLISHABLE_KEY,

            Accept:
              "application/json"
          }
        }
      );


    if (!response.ok) {

      console.error(
        "Could not check affiliate slug:",
        response.status
      );

      return existingAsset;
    }


    const products =
      await response.json();


    if (
      !Array.isArray(products) ||
      products.length === 0
    ) {

      return existingAsset;
    }


    const product =
      products[0];


    /*
      Load the existing affiliate landing page
      behind the clean URL.
    */

    const landingURL =
      new URL(
        context.request.url
      );


    landingURL.pathname =
      "/affiliate-products";

    landingURL.search =
      "";


    const landingResponse =
      await context.env.ASSETS.fetch(
        landingURL
      );


    if (
      !landingResponse.ok
    ) {

      return landingResponse;
    }


    /*
      Give affiliate-products.html the real
      product ID without putting ?id= in
      the customer's URL.
    */

    const safeProductID =
      JSON.stringify(
        String(product.id)
      );


    return new HTMLRewriter()
      .on(
        "head",
        {
          element(element) {

            element.append(
              `
                <script>
                  window.__AFFILIATE_PRODUCT_ID =
                    ${safeProductID};
                </script>
              `,
              {
                html: true
              }
            );
          }
        }
      )
      .transform(
        landingResponse
      );


  } catch (error) {

    console.error(
      "Clean affiliate URL error:",
      error
    );


    return existingAsset;
  }
      }
