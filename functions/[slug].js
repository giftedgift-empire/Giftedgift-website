const SUPABASE_URL =
  "https://mvoxizdzjmtcvokowhpd.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_5wjUjC6amD7e2H_3h_7UQw_TY6orH16";


/*
  =====================================================
  PRODUCT / FOODSTUFF LOOKUP
  =====================================================

  This is the SAME lookup already working for:

  - affiliate_products
  - products
  - digital_products
  - foodstuffs

  When requireActive is true,
  only active=true items are accepted.
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

  Blog posts and Daily Inspiration use:

  published=true

  instead of:

  active=true
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

    The customer's browser URL still keeps
    things such as:

    /test-product?deal_id=4
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


  if (!slug) {

    return context.env.ASSETS.fetch(
      context.request
    );
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
          "/digital-product.html",
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

      Only published blog posts can open publicly.
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

      Only published inspirations can open publicly.
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

      Allow Cloudflare to load the normal website
      file exactly as before.

      Examples:

      /shop.html
      /blog.html
      /daily-inspiration.html
      /about.html
      /contact.html
      /my-logo.png
      =================================================
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
