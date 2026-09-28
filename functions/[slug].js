const SUPABASE_URL =
  "https://mvoxizdzjmtcvokowhpd.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_5wjUjC6amD7e2H_3h_7UQw_TY6orH16";


/*
  =====================================================
  PRODUCT / FOODSTUFF LOOKUP
  =====================================================
*/

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

  if (
    requireActive
  ) {

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


  if (
    !response.ok
  ) {

    console.error(
      "Slug lookup failed:",
      table,
      response.status
    );


    return null;

  }


  const items =
    await response.json();


  if (
    !Array.isArray(
      items
    ) ||
    items.length ===
      0
  ) {

    return null;

  }


  return items[0];

}



/*
  =====================================================
  BLOG / DAILY INSPIRATION LOOKUP
  =====================================================
*/

async function getPublishedItemBySlug(
  table,
  slug
) {

  const apiURL =
    SUPABASE_URL +
    "/rest/v1/" +
    table +
    "?select=id,slug" +
    "&slug=eq." +
    encodeURIComponent(slug) +
    "&published=eq.true" +
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


  if (
    !response.ok
  ) {

    console.error(
      "Published slug lookup failed:",
      table,
      response.status
    );


    return null;

  }


  const items =
    await response.json();


  if (
    !Array.isArray(
      items
    ) ||
    items.length ===
      0
  ) {

    return null;

  }


  return items[0];

}



/*
  =====================================================
  SERVE STATIC PAGE
  =====================================================

  Used for real website pages which must not be
  mistaken for database product slugs.

  IMPORTANT:
  Cloudflare Pages ASSETS uses the pretty path,
  so free-product.html is requested internally as:

  /free-product

  Query parameters such as ?slug=test-free-download
  are preserved.
*/

async function serveStaticPage(
  context,
  pathname
) {

  const assetURL =
    new URL(
      context.request.url
    );


  assetURL.pathname =
    pathname;


  return context.env.ASSETS.fetch(
    assetURL
  );

}



/*
  =====================================================
  LOAD THE CORRECT PUBLIC HTML PAGE
  =====================================================
*/

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
    from the INTERNAL asset request.

    The visitor's browser URL still keeps
    the original query string.
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
      String(
        itemID
      )
    );


  return new HTMLRewriter()
    .on(
      "head",
      {

        element(
          element
        ) {

          element.append(
            `
              <script>
                window.${variableName} =
                  ${safeItemID};
              </script>
            `,
            {
              html:
                true
            }
          );

        }

      }
    )
    .transform(
      landingResponse
    );

}



/*
  =====================================================
  CLEAN URL ROUTER
  =====================================================
*/

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


  if (
    !slug
  ) {

    return context.env.ASSETS.fetch(
      context.request
    );

  }


  try {


    /*
      =================================================
      IMPORTANT STATIC FREE-PRODUCT PAGE

      Cloudflare changes:

      /free-product.html?slug=my-book

      into:

      /free-product?slug=my-book

      Because this file is functions/[slug].js,
      /free-product arrives here.

      We must serve the actual free-product page
      BEFORE trying database slug lookups.
      =================================================
    */

    if (
      slug ===
        "free-product" ||
      slug ===
        "free-product.html"
    ) {

      return serveStaticPage(
        context,
        "/free-product"
      );

    }



    /*
      =================================================
      1. AFFILIATE PRODUCTS

      Example:
      /delife-sirpio-xl
      =================================================
    */

    const affiliateProduct =
      await getItemBySlug(
        "affiliate_products",
        slug,
        true
      );


    if (
      affiliateProduct
    ) {

      const response =
        await serveLandingPage(
          context,
          "/affiliate-products",
          "__AFFILIATE_PRODUCT_ID",
          affiliateProduct.id
        );


      if (
        response
      ) {

        return response;

      }

    }



    /*
      =================================================
      2. PHYSICAL PRODUCTS

      Example:
      /test-product
      =================================================
    */

    const physicalProduct =
      await getItemBySlug(
        "products",
        slug
      );


    if (
      physicalProduct
    ) {

      const response =
        await serveLandingPage(
          context,
          "/product",
          "__PHYSICAL_PRODUCT_ID",
          physicalProduct.id
        );


      if (
        response
      ) {

        return response;

      }

    }



    /*
      =================================================
      3. DIGITAL PRODUCTS

      Example:
      /my-ebook
      =================================================
    */

    const digitalProduct =
      await getItemBySlug(
        "digital_products",
        slug,
        true
      );


    if (
      digitalProduct
    ) {

      const response =
        await serveLandingPage(
          context,
          "/digital-product",
          "__DIGITAL_PRODUCT_ID",
          digitalProduct.id
        );


      if (
        response
      ) {

        return response;

      }

    }



    /*
      =================================================
      4. FOODSTUFFS

      Example:
      /dried-catfish
      =================================================
    */

    const foodstuff =
      await getItemBySlug(
        "foodstuffs",
        slug,
        true
      );


    if (
      foodstuff
    ) {

      const response =
        await serveLandingPage(
          context,
          "/foodstuffs",
          "__FOODSTUFF_ID",
          foodstuff.id
        );


      if (
        response
      ) {

        return response;

      }

    }



    /*
      =================================================
      5. BLOG POSTS
      =================================================
    */

    const blogPost =
      await getPublishedItemBySlug(
        "blog_posts",
        slug
      );


    if (
      blogPost
    ) {

      const response =
        await serveLandingPage(
          context,
          "/blog",
          "__BLOG_POST_ID",
          blogPost.id
        );


      if (
        response
      ) {

        return response;

      }

    }



    /*
      =================================================
      6. DAILY INSPIRATION
      =================================================
    */

    const dailyInspiration =
      await getPublishedItemBySlug(
        "daily_inspirations",
        slug
      );


    if (
      dailyInspiration
    ) {

      const response =
        await serveLandingPage(
          context,
          "/daily-inspiration",
          "__DAILY_INSPIRATION_ID",
          dailyInspiration.id
        );


      if (
        response
      ) {

        return response;

      }

    }



    /*
      =================================================
      NOTHING MATCHED

      Let Cloudflare serve the normal website asset.
      =================================================
    */

    return context.env.ASSETS.fetch(
      context.request
    );


  }

  catch (
    error
  ) {

    console.error(
      "Clean URL router error:",
      error
    );


    return context.env.ASSETS.fetch(
      context.request
    );

  }

}
