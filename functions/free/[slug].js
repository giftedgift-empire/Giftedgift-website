import html from "../../free-product.html";


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
    !slug ||
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/
      .test(
        slug
      )
  ) {

    return new Response(
      "Free product not found.",
      {
        status: 404,
        headers: {
          "Content-Type":
            "text/plain; charset=UTF-8"
        }
      }
    );

  }


  return new Response(
    html,
    {
      status: 200,
      headers: {
        "Content-Type":
          "text/html; charset=UTF-8",

        "Cache-Control":
          "no-store"
      }
    }
  );

}
