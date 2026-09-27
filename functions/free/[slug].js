export async function onRequest(context) {

  const {
    request,
    env,
    params
  } = context;


  const slug =
    String(
      params.slug || ""
    ).trim();


  if (!slug) {

    return new Response(
      "Free product not found.",
      {
        status: 404
      }
    );

  }


  /*
  ==========================================
  SERVE THE FREE PRODUCT LANDING PAGE

  The browser keeps:
  /free/my-book-slug

  But Cloudflare internally serves:
  /free-product.html
  ==========================================
  */

  const url =
    new URL(
      request.url
    );


  const assetUrl =
    new URL(
      "/free-product.html",
      url.origin
    );


  /*
  Preserve Facebook / advertising tracking
  parameters such as utm_source, fbclid, etc.
  */

  assetUrl.search =
    url.search;


  const assetRequest =
    new Request(
      assetUrl.toString(),
      request
    );


  return env.ASSETS.fetch(
    assetRequest
  );

}
