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
    !Array.isArray(items) ||
    items.length === 0
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


  if (!response.ok) {

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
    !Array.isArray(items) ||
    items.length === 0
  ) {

    return null;

  }


  return items[0];

}



/*
  =====================================================
  LOAD CORRECT PUBLIC HTML PAGE
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
    Remove query parameters only from
    the INTERNAL HTML request.

    The customer's visible clean URL
    keeps its original query string.
  */

  landingURL.search =
    "";


  const landingResponse =
    await context.env.ASSETS.fetch(
      landingURL
    );


  if (!landingResponse.ok) {

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



/*
  =====================================================
  STATIC FILE CHECK
  =====================================================

  Files with real extensions must NEVER
  be treated as clean URL slugs.

  Examples:

  /tracking.js
  /cookie-consent.js
  /styles.css
  /my-logo.png
  /favicon.ico
  /sitemap.xml
  /robots.txt
*/

function isStaticFileRequest(
  slug
) {

  return /\.[a-z0-9]{1,10}$/i
    .test(
      slug
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


  /*
    =================================================
    IMPORTANT:

    If this request is for an actual file,
    DO NOT run any Supabase slug lookups.

    Pass the request straight to Cloudflare's
    normal website asset handling.
    =================================================
  */

  if (
    isStaticFileRequest(
      slug
    )
  ) {

    return context.next();

  }


  if (!slug) {

    return context.next();

  }


  try {

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
      =================================================
      2. PHYSICAL PRODUCTS

      Example:
      /test-product

      Also keeps:
      /test-product?deal_id=4
      =================================================
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
      =================================================
      5. BLOG POSTS

      Example:
      /how-to-choose-the-perfect-gift
      =================================================
    */

    const blogPost =
      await getPublishedItemBySlug(
        "blog_posts",
        slug
      );


    if (blogPost) {

      const response =
        await serveLandingPage(
          context,
          "/blog.html",
          "__BLOG_POST_ID",
          blogPost.id
        );


      if (response) {

        return response;

      }

    }



    /*
      =================================================
      6. DAILY INSPIRATION

      Example:
      /gods-word-for-today
      =================================================
    */

    const dailyInspiration =
      await getPublishedItemBySlug(
        "daily_inspirations",
        slug
      );


    if (dailyInspiration) {

      const response =
        await serveLandingPage(
          context,
          "/daily-inspiration.html",
          "__DAILY_INSPIRATION_ID",
          dailyInspiration.id
        );


      if (response) {

        return response;

      }

    }



    /*
      =================================================
      NOTHING MATCHED

      Continue to Cloudflare's normal
      static website handling.
      =================================================
    */

    return context.next();


  } catch (error) {

    console.error(
      "Clean URL router error:",
      error
    );


    return context.next();

  }

}
