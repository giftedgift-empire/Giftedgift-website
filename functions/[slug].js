const SUPABASE_URL =
  "https://mvoxizdzjmtcvokowhpd.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_5wjUjC6amD7e2H_3h_7UQw_TY6orH16";


export async function onRequestGet(context) {

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
      FIRST:
      Check whether this slug belongs
      to an active affiliate product.
    */

    const apiURL =
      SUPABASE_URL +
      "/rest/v1/affiliate_products" +
      "?select=id,slug" +
      "&slug=eq." +
      encodeURIComponent(slug) +
      "&active=eq.true" +
      "&limit=1";


    const productResponse =
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
      productResponse.ok
    ) {

      const products =
        await productResponse.json();


      if (
        Array.isArray(products) &&
        products.length > 0
      ) {

        const product =
          products[0];


        /*
          Load the existing affiliate
          landing-page engine.
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
          landingResponse.ok
        ) {

          const safeProductID =
            JSON.stringify(
              String(
                product.id
              )
            );


          /*
            Insert the real product ID
            into the landing page while
            keeping the clean URL visible.
          */

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
        }
      }
    }


    /*
      If it is NOT an affiliate-product slug,
      let Cloudflare serve the normal website.

      Examples:
      /shop
      /about
      /contact
      /blog
    */

    return context.env.ASSETS.fetch(
      context.request
    );


  } catch (error) {

    console.error(
      "Clean affiliate URL error:",
      error
    );


    return context.env.ASSETS.fetch(
      context.request
    );
  }
}
