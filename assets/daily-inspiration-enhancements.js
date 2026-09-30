(function () {
  "use strict";

  const params =
    new URLSearchParams(
      window.location.search
    );


  const inspirationId =
    Number(
      window.__DAILY_INSPIRATION_ID ||
      params.get(
        "id"
      ) ||
      0
    );


  if (
    !Number.isInteger(
      inspirationId
    ) ||
    inspirationId <= 0
  ) {

    return;
  }


  const SUPABASE_URL =
    "https://mvoxizdzjmtcvokowhpd.supabase.co";


  const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_5wjUjC6amD7e2H_3h_7UQw_TY6orH16";


  const SITE_URL =
    "https://giftedgiftempire.com";


  const NEWSLETTER_URL =
    SUPABASE_URL +
    "/functions/v1/newsletter-subscribe";


  if (
    !window.supabase
  ) {

    console.error(
      "Daily Inspiration enhancement: Supabase library is unavailable."
    );

    return;
  }


  const db =
    window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_PUBLISHABLE_KEY
    );



  function escapeHTML(
    value
  ) {

    const div =
      document.createElement(
        "div"
      );


    div.textContent =
      value ??
      "";


    return div.innerHTML;
  }



  function cleanText(
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



  function shortText(
    value,
    limit = 135
  ) {

    const text =
      cleanText(
        value
      );


    if (
      !text
    ) {

      return (
        "Read more faith, prayer and encouragement from GiftedGift Empire."
      );
    }


    if (
      text.length <=
      limit
    ) {

      return text;
    }


    return (
      text
        .slice(
          0,
          Math.max(
            1,
            limit - 3
          )
        )
        .trim() +
      "..."
    );
  }



  function safeURL(
    value
  ) {

    if (
      !value
    ) {

      return "";
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
        "Invalid Daily Inspiration URL:",
        error
      );
    }


    return "";
  }



  function getPostURL(
    post
  ) {

    if (
      post &&
      post.slug
    ) {

      return (
        SITE_URL +
        "/" +
        encodeURIComponent(
          post.slug
        )
      );
    }


    return (
      SITE_URL +
      "/daily-inspiration"
    );
  }



  function injectStyles() {

    if (
      document.getElementById(
        "gge-inspiration-enhancement-styles"
      )
    ) {

      return;
    }


    const style =
      document.createElement(
        "style"
      );


    style.id =
      "gge-inspiration-enhancement-styles";


    style.textContent = `

      .gge-share-card,
      .gge-inspiration-newsletter,
      .gge-related-inspirations {

        margin-top:
          26px;

        padding:
          24px;

        border:
          1px solid
          #e2e6ed;

        border-radius:
          16px;

        background:
          #fff;

        box-shadow:
          0
          4px
          16px
          rgba(0,0,0,.05);
      }


      .gge-share-card {

        border-top:
          5px solid
          #d5a900;
      }


      .gge-share-card h2,
      .gge-inspiration-newsletter h2,
      .gge-related-inspirations h2 {

        margin:
          0
          0
          9px;

        color:
          #123a8c;

        font-size:
          24px;

        line-height:
          1.3;
      }


      .gge-share-card > p,
      .gge-inspiration-newsletter > p,
      .gge-related-inspirations > p {

        margin:
          0;

        color:
          #626b75;

        line-height:
          1.65;
      }


      .gge-share-buttons {

        display:
          flex;

        flex-wrap:
          wrap;

        gap:
          10px;

        margin-top:
          18px;
      }


      .gge-share-button {

        display:
          inline-flex;

        align-items:
          center;

        justify-content:
          center;

        min-height:
          44px;

        padding:
          11px
          15px;

        border:
          0;

        border-radius:
          9px;

        background:
          #123a8c;

        color:
          #fff;

        font:
          inherit;

        font-size:
          14px;

        font-weight:
          800;

        text-decoration:
          none;

        cursor:
          pointer;
      }


      .gge-share-button:hover {

        background:
          #0d2d70;
      }


      .gge-share-button.pinterest {

        background:
          #bd081c;
      }


      .gge-share-button.facebook {

        background:
          #1877f2;
      }


      .gge-share-button.whatsapp {

        background:
          #168b47;
      }


      .gge-share-button.copy {

        background:
          #d5a900;

        color:
          #111;
      }


      .gge-share-message {

        min-height:
          22px;

        margin-top:
          12px;

        color:
          #17652d;

        font-size:
          14px;

        font-weight:
          700;
      }


      .gge-inspiration-newsletter {

        background:
          #f7faff;

        border-color:
          #d9e3f7;
      }


      .gge-inspiration-newsletter-grid {

        display:
          grid;

        grid-template-columns:
          1fr
          1fr;

        gap:
          14px;

        margin-top:
          18px;
      }


      .gge-inspiration-newsletter label {

        display:
          block;

        margin:
          0
          0
          7px;

        color:
          #333;

        font-size:
          14px;

        font-weight:
          700;
      }


      .gge-inspiration-newsletter
      input[type="text"],

      .gge-inspiration-newsletter
      input[type="email"] {

        width:
          100%;

        padding:
          12px
          13px;

        border:
          1px solid
          #cfd7e3;

        border-radius:
          8px;

        background:
          #fff;

        font:
          inherit;
      }


      .gge-inspiration-newsletter-consent {

        display:
          flex !important;

        align-items:
          flex-start;

        gap:
          9px;

        margin-top:
          15px !important;

        font-weight:
          400 !important;

        line-height:
          1.55;
      }


      .gge-inspiration-newsletter-consent
      input {

        margin-top:
          4px;
      }


      .gge-inspiration-newsletter-honeypot {

        position:
          absolute !important;

        left:
          -9999px !important;

        width:
          1px !important;

        height:
          1px !important;

        overflow:
          hidden !important;
      }


      .gge-inspiration-newsletter-button {

        margin-top:
          16px;

        padding:
          12px
          20px;

        border:
          0;

        border-radius:
          9px;

        background:
          #f2bd16;

        color:
          #111;

        font-size:
          16px;

        font-weight:
          800;

        cursor:
          pointer;
      }


      .gge-inspiration-newsletter-button:disabled {

        opacity:
          .65;

        cursor:
          not-allowed;
      }


      .gge-inspiration-newsletter-message {

        display:
          none;

        margin-top:
          14px;

        padding:
          11px
          12px;

        border-radius:
          8px;

        line-height:
          1.5;
      }


      .gge-inspiration-newsletter-message.success {

        display:
          block;

        background:
          #e8f7ec;

        color:
          #17652d;

        border:
          1px solid
          #b8dfc0;
      }


      .gge-inspiration-newsletter-message.error {

        display:
          block;

        background:
          #ffe8e8;

        color:
          #951d1d;

        border:
          1px solid
          #efbbbb;
      }


      .gge-related-inspiration-grid {

        display:
          grid;

        grid-template-columns:
          repeat(
            3,
            minmax(
              0,
              1fr
            )
          );

        gap:
          16px;

        margin-top:
          20px;
      }


      .gge-related-inspiration-card {

        display:
          flex;

        flex-direction:
          column;

        min-width:
          0;

        overflow:
          hidden;

        border:
          1px solid
          #e5e7eb;

        border-radius:
          12px;

        background:
          #fff;
      }


      .gge-related-inspiration-image {

        width:
          100%;

        height:
          150px;

        object-fit:
          cover;

        background:
          #f2f3f5;
      }


      .gge-related-inspiration-placeholder {

        display:
          flex;

        align-items:
          center;

        justify-content:
          center;

        height:
          150px;

        padding:
          18px;

        background:
          #f2f3f5;

        color:
          #7b8088;

        font-weight:
          700;

        text-align:
          center;
      }


      .gge-related-inspiration-body {

        display:
          flex;

        flex:
          1;

        flex-direction:
          column;

        padding:
          15px;
      }


      .gge-related-inspiration-category {

        margin-bottom:
          7px;

        color:
          #a87900;

        font-size:
          12px;

        font-weight:
          800;

        text-transform:
          uppercase;

        letter-spacing:
          .35px;
      }


      .gge-related-inspiration-title {

        margin:
          0;

        color:
          #123a8c;

        font-size:
          18px;

        line-height:
          1.35;
      }


      .gge-related-inspiration-text {

        margin:
          9px
          0
          16px;

        color:
          #666;

        font-size:
          14px;

        line-height:
          1.55;
      }


      .gge-related-inspiration-link {

        display:
          inline-flex;

        align-items:
          center;

        justify-content:
          center;

        align-self:
          flex-start;

        margin-top:
          auto;

        padding:
          10px
          13px;

        border-radius:
          8px;

        background:
          #123a8c;

        color:
          #fff;

        text-decoration:
          none;

        font-size:
          14px;

        font-weight:
          800;
      }


      @media (
        max-width:
          760px
      ) {

        .gge-inspiration-newsletter-grid,
        .gge-related-inspiration-grid {

          grid-template-columns:
            1fr;
        }


        .gge-share-buttons {

          flex-direction:
            column;
        }


        .gge-share-button {

          width:
            100%;
        }

      }

    `;


    document.head.appendChild(
      style
    );
  }



  async function fetchCurrentPost() {

    const result =
      await db
        .from(
          "daily_inspirations"
        )
        .select(
          "id,category,title,slug,verse_text,verse_reference,message,prayer,image_url,published,created_at,updated_at"
        )
        .eq(
          "id",
          inspirationId
        )
        .eq(
          "published",
          true
        )
        .maybeSingle();


    if (
      result.error ||
      !result.data
    ) {

      if (
        result.error
      ) {

        console.error(
          "Daily Inspiration enhancement:",
          result.error
        );
      }


      return null;
    }


    return result.data;
  }



  async function waitForCard() {

    for (
      let i = 0;
      i < 80;
      i += 1
    ) {

      const card =
        document.querySelector(
          "#inspiration-list .inspiration-card"
        );


      if (
        card
      ) {

        return card;
      }


      await new Promise(
        resolve =>
          setTimeout(
            resolve,
            75
          )
      );
    }


    return null;
  }



  function addShareCard(
    post,
    inspirationCard
  ) {

    if (
      document.getElementById(
        "gge-inspiration-share"
      )
    ) {

      return;
    }


    const url =
      getPostURL(
        post
      );


    const title =
      cleanText(
        post.title ||
        "Daily Inspiration"
      );


    const description =
      shortText(
        post.verse_text ||
        post.message ||
        post.prayer,
        180
      );


    const image =
      safeURL(
        post.image_url
      );


    const shareText =
      title +
      " — " +
      description;


    const pinterestURL =
      "https://www.pinterest.com/pin/create/button/?url=" +
      encodeURIComponent(
        url
      ) +
      (
        image
          ? (
              "&media=" +
              encodeURIComponent(
                image
              )
            )
          : ""
      ) +
      "&description=" +
      encodeURIComponent(
        shareText
      );


    const facebookURL =
      "https://www.facebook.com/sharer/sharer.php?u=" +
      encodeURIComponent(
        url
      );


    const whatsappURL =
      "https://wa.me/?text=" +
      encodeURIComponent(
        shareText +
        "\n\n" +
        url
      );


    const section =
      document.createElement(
        "section"
      );


    section.id =
      "gge-inspiration-share";


    section.className =
      "gge-share-card";


    section.innerHTML = `

      <h2>
        Share This Inspiration
      </h2>

      <p>
        Encourage someone today by sharing this message.
      </p>


      <div class="gge-share-buttons">

        <a
          class="gge-share-button pinterest"
          href="${escapeHTML(pinterestURL)}"
          target="_blank"
          rel="noopener noreferrer"
        >
          📌 Save on Pinterest
        </a>


        <a
          class="gge-share-button facebook"
          href="${escapeHTML(facebookURL)}"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>


        <a
          class="gge-share-button whatsapp"
          href="${escapeHTML(whatsappURL)}"
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </a>


        <button
          id="gge-copy-inspiration-link"
          class="gge-share-button copy"
          type="button"
        >
          🔗 Copy Link
        </button>


        <button
          id="gge-native-share"
          class="gge-share-button"
          type="button"
          style="display:none;"
        >
          ↗ Share
        </button>

      </div>


      <div
        id="gge-share-message"
        class="gge-share-message"
        role="status"
        aria-live="polite"
      ></div>

    `;


    inspirationCard
      .insertAdjacentElement(
        "afterend",
        section
      );


    const message =
      document.getElementById(
        "gge-share-message"
      );


    document
      .getElementById(
        "gge-copy-inspiration-link"
      )
      .addEventListener(
        "click",
        async () => {

          try {

            await navigator.clipboard
              .writeText(
                url
              );

          } catch (
            error
          ) {

            const box =
              document.createElement(
                "textarea"
              );


            box.value =
              url;


            box.setAttribute(
              "readonly",
              ""
            );


            box.style.position =
              "fixed";


            box.style.opacity =
              "0";


            document.body
              .appendChild(
                box
              );


            box.select();


            document.execCommand(
              "copy"
            );


            box.remove();
          }


          message.textContent =
            "Link copied.";
        }
      );


    if (
      typeof navigator.share ===
      "function"
    ) {

      const nativeButton =
        document.getElementById(
          "gge-native-share"
        );


      nativeButton.style.display =
        "inline-flex";


      nativeButton
        .addEventListener(
          "click",
          async () => {

            try {

              await navigator.share({

                title,

                text:
                  description,

                url

              });

            } catch (
              error
            ) {

              if (
                error &&
                error.name !==
                  "AbortError"
              ) {

                console.error(
                  "Share error:",
                  error
                );
              }
            }

          }
        );
    }
  }



  function addNewsletterCard() {

    if (
      document.getElementById(
        "gge-inspiration-newsletter"
      )
    ) {

      return;
    }


    const shareCard =
      document.getElementById(
        "gge-inspiration-share"
      );


    if (
      !shareCard
    ) {

      return;
    }


    const card =
      document.createElement(
        "section"
      );


    card.id =
      "gge-inspiration-newsletter";


    card.className =
      "gge-inspiration-newsletter";


    card.innerHTML = `

      <h2>
        Stay Connected With GiftedGift Empire
      </h2>

      <p>
        Receive faith inspiration, useful ideas,
        resources and new GiftedGift Empire
        content by email.
      </p>


      <form
        id="gge-inspiration-newsletter-form"
      >

        <div
          class="gge-inspiration-newsletter-grid"
        >

          <div>

            <label
              for="gge-inspiration-newsletter-name"
            >
              Name
            </label>

            <input
              id="gge-inspiration-newsletter-name"
              type="text"
              autocomplete="name"
              placeholder="Your name"
            >

          </div>


          <div>

            <label
              for="gge-inspiration-newsletter-email"
            >
              Email Address
            </label>

            <input
              id="gge-inspiration-newsletter-email"
              type="email"
              autocomplete="email"
              required
              placeholder="you@example.com"
            >

          </div>

        </div>


        <div
          class="gge-inspiration-newsletter-honeypot"
          aria-hidden="true"
        >

          <label
            for="gge-inspiration-newsletter-website"
          >
            Website
          </label>

          <input
            id="gge-inspiration-newsletter-website"
            type="text"
            tabindex="-1"
            autocomplete="off"
          >

        </div>


        <label
          class="gge-inspiration-newsletter-consent"
          for="gge-inspiration-newsletter-consent"
        >

          <input
            id="gge-inspiration-newsletter-consent"
            type="checkbox"
            required
          >

          <span>
            I agree to receive GiftedGift Empire emails.
            I can unsubscribe at any time.
          </span>

        </label>


        <button
          id="gge-inspiration-newsletter-submit"
          class="gge-inspiration-newsletter-button"
          type="submit"
        >
          Subscribe
        </button>


        <div
          id="gge-inspiration-newsletter-message"
          class="gge-inspiration-newsletter-message"
          role="status"
          aria-live="polite"
        ></div>

      </form>

    `;


    shareCard
      .insertAdjacentElement(
        "afterend",
        card
      );


    const form =
      document.getElementById(
        "gge-inspiration-newsletter-form"
      );


    const button =
      document.getElementById(
        "gge-inspiration-newsletter-submit"
      );


    const message =
      document.getElementById(
        "gge-inspiration-newsletter-message"
      );



    function showMessage(
      text,
      type
    ) {

      message.className =
        "gge-inspiration-newsletter-message " +
        type;


      message.textContent =
        text;
    }



    form.addEventListener(
      "submit",
      async event => {

        event.preventDefault();


        const name =
          document
            .getElementById(
              "gge-inspiration-newsletter-name"
            )
            .value
            .trim();


        const email =
          document
            .getElementById(
              "gge-inspiration-newsletter-email"
            )
            .value
            .trim();


        const consent =
          document
            .getElementById(
              "gge-inspiration-newsletter-consent"
            )
            .checked;


        const website =
          document
            .getElementById(
              "gge-inspiration-newsletter-website"
            )
            .value
            .trim();


        if (
          !email
        ) {

          showMessage(
            "Please enter your email address.",
            "error"
          );

          return;
        }


        if (
          !consent
        ) {

          showMessage(
            "Please agree to receive the newsletter before subscribing.",
            "error"
          );

          return;
        }


        button.disabled =
          true;


        button.textContent =
          "Subscribing...";


        try {

          const response =
            await fetch(
              NEWSLETTER_URL,
              {

                method:
                  "POST",

                headers: {

                  "Content-Type":
                    "application/json"

                },

                body:
                  JSON.stringify(
                    {

                      name,

                      email,

                      consent:
                        true,

                      website

                    }
                  )

              }
            );


          const data =
            await response.json();


          if (
            !response.ok ||
            data.success !==
              true
          ) {

            throw new Error(
              data.error ||
              "We could not complete your subscription."
            );
          }


          showMessage(
            data.message ||
            "Thank you for subscribing to the GiftedGift Empire newsletter!",
            "success"
          );


          form.reset();

        } catch (
          error
        ) {

          console.error(
            "Daily Inspiration newsletter:",
            error
          );


          showMessage(

            error instanceof Error

              ? error.message

              : "We could not complete your subscription. Please try again.",

            "error"

          );

        } finally {

          button.disabled =
            false;


          button.textContent =
            "Subscribe";
        }

      }
    );
  }



  async function loadRelatedInspirations(
    post
  ) {

    if (
      document.getElementById(
        "gge-related-inspirations"
      )
    ) {

      return;
    }


    let posts =
      [];


    if (
      post.category
    ) {

      const result =
        await db
          .from(
            "daily_inspirations"
          )
          .select(
            "id,category,title,slug,verse_text,message,prayer,image_url,published,created_at"
          )
          .eq(
            "published",
            true
          )
          .eq(
            "category",
            post.category
          )
          .neq(
            "id",
            post.id
          )
          .order(
            "created_at",
            {
              ascending:
                false
            }
          )
          .limit(
            3
          );


      if (
        !result.error &&
        Array.isArray(
          result.data
        )
      ) {

        posts =
          result.data;
      }
    }


    if (
      posts.length <
      3
    ) {

      const result =
        await db
          .from(
            "daily_inspirations"
          )
          .select(
            "id,category,title,slug,verse_text,message,prayer,image_url,published,created_at"
          )
          .eq(
            "published",
            true
          )
          .neq(
            "id",
            post.id
          )
          .order(
            "created_at",
            {
              ascending:
                false
            }
          )
          .limit(
            8
          );


      if (
        !result.error &&
        Array.isArray(
          result.data
        )
      ) {

        const seen =
          new Set(
            posts.map(
              item =>
                item.id
            )
          );


        result.data
          .forEach(
            item => {

              if (
                posts.length <
                  3 &&
                !seen.has(
                  item.id
                )
              ) {

                posts.push(
                  item
                );


                seen.add(
                  item.id
                );
              }

            }
          );
      }
    }


    posts =
      posts.filter(
        item =>
          item.slug
      );


    if (
      !posts.length
    ) {

      return;
    }


    const newsletter =
      document.getElementById(
        "gge-inspiration-newsletter"
      );


    if (
      !newsletter
    ) {

      return;
    }


    const section =
      document.createElement(
        "section"
      );


    section.id =
      "gge-related-inspirations";


    section.className =
      "gge-related-inspirations";


    section.innerHTML = `

      <h2>
        More Daily Inspiration
      </h2>

      <p>
        Continue with more prayers,
        Bible verses and encouragement.
      </p>


      <div
        class="gge-related-inspiration-grid"
      >

        ${posts
          .map(
            item => {

              const image =
                safeURL(
                  item.image_url
                );


              const excerpt =
                shortText(
                  item.verse_text ||
                  item.message ||
                  item.prayer,
                  110
                );


              return `

                <article
                  class="gge-related-inspiration-card"
                >

                  ${
                    image

                      ? `

                        <img
                          class="gge-related-inspiration-image"
                          src="${escapeHTML(image)}"
                          alt="${escapeHTML(
                            item.title ||
                            "Daily Inspiration"
                          )}"
                          loading="lazy"
                        >

                      `

                      : `

                        <div
                          class="gge-related-inspiration-placeholder"
                        >
                          Daily Inspiration
                        </div>

                      `
                  }


                  <div
                    class="gge-related-inspiration-body"
                  >

                    <div
                      class="gge-related-inspiration-category"
                    >
                      ${escapeHTML(
                        item.category ||
                        "Daily Inspiration"
                      )}
                    </div>


                    <h3
                      class="gge-related-inspiration-title"
                    >
                      ${escapeHTML(
                        item.title ||
                        "Daily Inspiration"
                      )}
                    </h3>


                    <p
                      class="gge-related-inspiration-text"
                    >
                      ${escapeHTML(
                        excerpt
                      )}
                    </p>


                    <a
                      class="gge-related-inspiration-link"
                      href="${escapeHTML(
                        getPostURL(
                          item
                        )
                      )}"
                    >
                      Read Inspiration
                    </a>

                  </div>

                </article>

              `;
            }
          )
          .join(
            ""
          )}

      </div>

    `;


    newsletter
      .insertAdjacentElement(
        "afterend",
        section
      );
  }



  async function init() {

    injectStyles();


    const [
      post,
      card
    ] =
      await Promise.all([

        fetchCurrentPost(),

        waitForCard()

      ]);


    if (
      !post ||
      !card
    ) {

      return;
    }


    addShareCard(
      post,
      card
    );


    addNewsletterCard();


    await loadRelatedInspirations(
      post
    );
  }



  if (
    document.readyState ===
      "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      init,
      {
        once:
          true
      }
    );

  } else {

    init();
  }

})();
