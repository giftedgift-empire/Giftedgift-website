const SUPABASE_URL =
  "https://mvoxizdzjmtcvokowhpd.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_5wjUjC6amD7e2H_3h_7UQw_TY6orH16";


async function getItemBySlug(
  table,
  slug,
  requireActive = false
) {

  let apiURL =
    SUPABASE_URL +
    "/rest/v1/" +
    table +
    "?select=id,slug" +
    "&slug=eq." +
    encodeURIComponent(slug);

  if (requireActive) {
    apiURL +=
      "&active=eq.true";
  }

  apiURL +=
    "&limit=1";


  const response =
    await fetch(
      apiURL,
      {
        headers: {
          apikey:
            SUPABASE_PUBLISHABLE_KEY,

          Authorization:
            "Bearer " +
            SUPABASE_PUBLISHABLE_KEY,

          Accept:
            "application/json"
        }
      }
    );


  if (!response.ok) {
    return null;
  }


  const items =
    await response.json();


  if (
    !Array.isArray(items) ||
    items.length === 0
  ) {
    return null;
  }


  return items[0];
}



async function serveLandingPage(
  context,
  pathname,
  variableName,
  itemID
) {

  const landingURL =
    new URL(
      context.request.url
    );


  landingURL.pathname =
    pathname;


  /*
    Remove the public query string only
    from the internal asset request.

    The customer's browser URL still keeps
    things such as ?deal_id=4.
  */
  landingURL.search =
    "";


  const landingResponse =
    await context.env.ASSETS.fetch(
      landingURL
    );


  if (
    !landingResponse.ok
  ) {
    return null;
  }


  const safeItemID =
    JSON.stringify(
      String(itemID)
    );


  return new HTMLRewriter()
    .on(
      "head",
      {
        element(element) {

          element.append(
            `
              <script>
                window.${variableName} =
                  ${safeItemID};
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
}



export async function onRequestGet(
  context
) {

  const slug =
    String(
      context.params.slug ||
      ""
    )
      .trim()
      .toLowerCase();


  if (!slug) {

    return context.env.ASSETS.fetch(
      context.request
    );
  }


  try {

    /*
      =========================
      AFFILIATE PRODUCTS
      =========================
    */

    const affiliateProduct =
      await getItemBySlug(
        "affiliate_products",
        slug,
        true
      );


    if (affiliateProduct) {

      const response =
        await serveLandingPage(
          context,
          "/affiliate-products.html",
          "__AFFILIATE_PRODUCT_ID",
          affiliateProduct.id
        );


      if (response) {
        return response;
      }
    }



    /*
      =========================
      PHYSICAL PRODUCTS
      =========================
    */

    const physicalProduct =
      await getItemBySlug(
        "products",
        slug
      );


    if (physicalProduct) {

      const response =
        await serveLandingPage(
          context,
          "/product.html",
          "__PHYSICAL_PRODUCT_ID",
          physicalProduct.id
        );


      if (response) {
        return response;
      }
    }



    /*
      =========================
      DIGITAL PRODUCTS
      =========================
    */

    const digitalProduct =
      await getItemBySlug(
        "digital_products",
        slug,
        true
      );


    if (digitalProduct) {

      const response =
        await serveLandingPage(
          context,
          "/checkout.html",
          "__DIGITAL_PRODUCT_ID",
          digitalProduct.id
        );


      if (response) {
        return response;
      }
    }



    /*
      =========================
      FOODSTUFFS
      =========================
    */

    const foodstuff =
      await getItemBySlug(
        "foodstuffs",
        slug,
        true
      );


    if (foodstuff) {

      const response =
        await serveLandingPage(
          context,
          "/foodstuffs.html",
          "__FOODSTUFF_ID",
          foodstuff.id
        );


      if (response) {
        return response;
      }
    }



    /*
      Nothing matched.
      Allow the normal website asset
      to load as before.
    */

    return context.env.ASSETS.fetch(
      context.request
    );


  } catch (error) {

    console.error(
      "Clean URL router error:",
      error
    );


    return context.env.ASSETS.fetch(
      context.request
    );
  }
}
