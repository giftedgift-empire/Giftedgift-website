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


  if (
    !slug
  ) {

    return new Response(
      "Free product not found.",
      {
        status: 404
      }
    );

  }


  const incomingURL =
    new URL(
      request.url
    );


  /*
    IMPORTANT:
    Cloudflare Pages ASSETS must use the
    pretty asset path, not /free-product.html
  */

  const assetURL =
    new URL(
      "/free-product",
      incomingURL.origin
    );


  assetURL.search =
    incomingURL.search;


  return env.ASSETS.fetch(
    assetURL
  );

}
