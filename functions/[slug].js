const SUPABASE_URL =
  "https://mvoxizdzjmtcvokowhpd.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_5wjUjC6amD7e2H_3h_7UQw_TY6orH16";


const SITE_URL =
  "https://giftedgiftempire.com";


const DEFAULT_SOCIAL_IMAGE =
  SITE_URL +
  "/my-logo.png";


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
  BLOG SEO LOOKUP
  =====================================================
*/

async function getPublishedBlogPostBySlug(
  slug
) {

  const selectFields =
    [
      "id",
      "title",
      "category",
      "author_name",
      "slug",
      "excerpt",
      "seo_title",
      "meta_description",
      "youtube_url",
      "content",
      "image_url",
      "published",
      "published_at",
      "created_at",
      "updated_at"
    ]
      .join(
        ","
      );


  const apiURL =
    SUPABASE_URL +
    "/rest/v1/blog_posts" +
    "?select=" +
    encodeURIComponent(
      selectFields
    ) +
    "&slug=eq." +
    encodeURIComponent(
      slug
    ) +
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
      "Blog SEO lookup failed:",
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
  BLOG SEO HELPERS
  =====================================================
*/

function cleanBlogText(
  value
) {

  return String(
    value ||
    ""
  )
    .replace(
      /\s+/g,
      " "
    )
    .trim();

}


function blogDescription(
  value
) {

  const text =
    cleanBlogText(
      value
    );


  if (
    !text
  ) {

    return (
      "Discover helpful ideas, practical guides and useful resources from GiftedGift Empire."
    );

  }


  if (
    text.length <=
      160
  ) {

    return text;

  }


  return (
    text.slice(
      0,
      157
    ) +
    "..."
  );

}


function safeBlogImage(
  value
) {

  if (
    !value
  ) {

    return DEFAULT_SOCIAL_IMAGE;

  }


  try {

    const url =
      new URL(
        String(
          value
        ).trim(),
        SITE_URL
      );


    if (
      url.protocol ===
        "https:" ||
      url.protocol ===
        "http:"
    ) {

      return url.href;

    }

  } catch (
    error
  ) {

    console.error(
      "Invalid Blog image URL:",
      error
    );

  }


  return DEFAULT_SOCIAL_IMAGE;

}



/*
  =====================================================
  SERVE BLOG PAGE WITH SERVER-SIDE SEO
  =====================================================
*/

async function serveBlogLandingPage(
  context,
  post
) {

  const landingURL =
    new URL(
      context.request.url
    );


  landingURL.pathname =
    "/blog";


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


  const title =
    cleanBlogText(
      post.title ||
      "Article"
    );


  const seoTitle =
    cleanBlogText(
      post.seo_title
    );


  const pageTitle =
    seoTitle ||
    (
      title +
      " | GiftedGift Empire"
    );


  const description =
    blogDescription(
      post.meta_description ||
      post.excerpt ||
      post.content
    );


  const canonicalURL =
    SITE_URL +
    "/" +
    encodeURIComponent(
      post.slug
    );


  const image =
    safeBlogImage(
      post.image_url
    );


  const authorName =
    cleanBlogText(
      post.author_name ||
      "GiftedGift Empire"
    );


  const authorSchema =
    authorName
      .toLowerCase() ===
        "giftedgift empire"
      ? {

          "@type":
            "Organization",

          "name":
            "GiftedGift Empire",

          "url":
            SITE_URL

        }
      : {

          "@type":
            "Person",

          "name":
            authorName

        };


  const articleSchema = {

    "@context":
      "https://schema.org",

    "@type":
      "BlogPosting",

    "headline":
      title,

    "description":
      description,

    "url":
      canonicalURL,

    "mainEntityOfPage": {

      "@type":
        "WebPage",

      "@id":
        canonicalURL

    },

    "author":
      authorSchema,

    "publisher": {

      "@type":
        "Organization",

      "name":
        "GiftedGift Empire",

      "url":
        SITE_URL,

      "logo": {

        "@type":
          "ImageObject",

        "url":
          DEFAULT_SOCIAL_IMAGE

      }

    },

    "image":
      [
        image
      ]

  };


  if (
    post.category
  ) {

    articleSchema.articleSection =
      post.category;

  }


  if (
    post.published_at ||
    post.created_at
  ) {

    articleSchema.datePublished =
      post.published_at ||
      post.created_at;

  }


  if (
    post.updated_at
  ) {

    articleSchema.dateModified =
      post.updated_at;

  }


  const safeItemID =
    JSON.stringify(
      String(
        post.id
      )
    );


  const safeSchema =
    JSON.stringify(
      articleSchema
    )
      .replace(
        /</g,
        "\\u003c"
      );


  const injectedHead =
    "<script>" +
    "window.__BLOG_POST_ID = " +
    safeItemID +
    ";" +
    "<\/script>" +
    "<script id=\"blog-structured-data\" type=\"application/ld+json\">" +
    safeSchema +
    "<\/script>";


  return new HTMLRewriter()

    .on(
      "title",
      {

        element(
          element
        ) {

          element.setInnerContent(
            pageTitle
          );

        }

      }
    )

    .on(
      "#page-description-meta",
      {

        element(
          element
        ) {

          element.setAttribute(
            "content",
            description
          );

        }

      }
    )

    .on(
      "#canonical-link",
      {

        element(
          element
        ) {

          element.setAttribute(
            "href",
            canonicalURL
          );

        }

      }
    )

    .on(
      "#og-type",
      {

        element(
          element
        ) {

          element.setAttribute(
            "content",
            "article"
          );

        }

      }
    )

    .on(
      "#og-title",
      {

        element(
          element
        ) {

          element.setAttribute(
            "content",
            pageTitle
          );

        }

      }
    )

    .on(
      "#og-description",
      {

        element(
          element
        ) {

          element.setAttribute(
            "content",
            description
          );

        }

      }
    )

    .on(
      "#og-url",
      {

        element(
          element
        ) {

          element.setAttribute(
            "content",
            canonicalURL
          );

        }

      }
    )

    .on(
      "#og-image",
      {

        element(
          element
        ) {

          element.setAttribute(
            "content",
            image
          );

        }

      }
    )

    .on(
      "#og-image-alt",
      {

        element(
          element
        ) {

          element.setAttribute(
            "content",
            title
          );

        }

      }
    )

    .on(
      "#twitter-title",
      {

        element(
          element
        ) {

          element.setAttribute(
            "content",
            pageTitle
          );

        }

      }
    )

    .on(
      "#twitter-description",
      {

        element(
          element
        ) {

          element.setAttribute(
            "content",
            description
          );

        }

      }
    )

    .on(
      "#twitter-image",
      {

        element(
          element
        ) {

          element.setAttribute(
            "content",
            image
          );

        }

      }
    )

    .on(
      "head",
      {

        element(
          element
        ) {

          element.append(
            injectedHead,
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
      await getPublishedBlogPostBySlug(
        slug
      );


    if (
      blogPost
    ) {

      const response =
        await serveBlogLandingPage(
          context,
          blogPost
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
