const SUPABASE_URL =
  "https://mvoxizdzjmtcvokowhpd.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_5wjUjC6amD7e2H_3h_7UQw_TY6orH16";


async function getProductBySlug(
  table,
  slug,
  activeAffiliate = false
) {

  let apiURL =
    SUPABASE_URL +
    "/rest/v1/" +
    table +
    "?select=id,slug" +
    "&slug=eq." +
    encodeURIComponent(slug);

  if (activeAffiliate) {
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


  const products =
    await response.json();


  if (
    !Array.isArray(products) ||
    products.length === 0
  ) {
    return null;
  }


  return products[0];
}



async function serveLandingPage(
  context,
  pathname,
  variableName,
  productID
) {

  const landingURL =
    new URL(
      context.request.url
    );


  landingURL.pathname =
    pathname;


  landingURL.search =
    "";


  const landingResponse =
    await context.env.ASSETS.fetch(
      landingURL
    );


  if (!landingResponse.ok) {
    return null;
  }


  const safeProductID =
    JSON.stringify(
      String(productID)
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
      AFFILIATE PRODUCTS
    */

    const affiliateProduct =
      await getProductBySlug(
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
      PHYSICAL PRODUCTS
    */

    const physicalProduct =
      await getProductBySlug(
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
      NORMAL WEBSITE PAGE / FILE
    */

    return context.env.ASSETS.fetch(
      context.request
    );


  } catch (error) {

    console.error(
      "Clean product URL error:",
      error
    );


    return context.env.ASSETS.fetch(
      context.request
    );
  }
}
