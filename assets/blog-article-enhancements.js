(function () {
  "use strict";

  const postId = Number(
    window.__BLOG_POST_ID ||
    0
  );


  if (
    !Number.isInteger(postId) ||
    postId <= 0
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


  const RICH_CONTENT_MARKER =
    "<!--GGE_RICH_HTML-->";


  if (
    !window.supabase
  ) {

    console.error(
      "GiftedGift blog enhancement: Supabase library is unavailable."
    );

    return;
  }


  const db =
    window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_PUBLISHABLE_KEY
    );



  /* ==================================================
     BASIC HELPERS
  ================================================== */

  function escapeHTML(
    value
  ) {

    const div =
      document.createElement(
        "div"
      );


    div.textContent =
      value ?? "";


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



  function plainTextFromContent(
    value
  ) {

    let text =
      String(
        value ||
        ""
      );


    if (
      text.startsWith(
        RICH_CONTENT_MARKER
      )
    ) {

      text =
        text.slice(
          RICH_CONTENT_MARKER.length
        );


      const div =
        document.createElement(
          "div"
        );


      div.innerHTML =
        text;


      return cleanText(
        div.textContent ||
        ""
      );
    }


    return cleanText(
      text
        .replace(
          /^#{2,3}\s+/gm,
          ""
        )
        .replace(
          /\*\*/g,
          ""
        )
        .replace(
          /^\[CTA\|(.+?)\|.+\]$/gim,
          "$1"
        )
    );
  }



  function shortText(
    value,
    limit = 160
  ) {

    const text =
      cleanText(
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
        "Invalid URL:",
        error
      );
    }


    return "";
  }



  function getPostURL(
    post
  ) {

    if (
      post?.slug
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
      "/blog"
    );
  }



  function formatDate(
    value
  ) {

    if (
      !value
    ) {

      return "";
    }


    const date =
      new Date(
        value
      );


    if (
      Number.isNaN(
        date.getTime()
      )
    ) {

      return "";
    }


    return date
      .toLocaleDateString(
        undefined,
        {
          year:
            "numeric",

          month:
            "long",

          day:
            "numeric"
        }
      );
  }



  /* ==================================================
     STYLES
  ================================================== */

  function injectStyles() {

    if (
      document.getElementById(
        "gge-blog-enhancement-styles"
      )
    ) {

      return;
    }


    const style =
      document.createElement(
        "style"
      );


    style.id =
      "gge-blog-enhancement-styles";


    style.textContent = `

      .gge-article-category {
        display: inline-flex;
        align-items: center;
        margin: 0 0 14px;
        padding: 7px 12px;
        border-radius: 999px;
        background: #edf3ff;
        color: #123a8c;
        font-size: 13px;
        font-weight: 800;
      }


      .gge-article-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 7px;
        align-items: center;
        margin: 0 0 28px;
        color: #6b7280;
        font-size: 14px;
        line-height: 1.6;
      }


      .gge-article-meta strong {
        color: #333;
      }


      .gge-article-content {
        color: #333;
        font-size: 18px;
        line-height: 1.9;
        overflow-wrap: anywhere;
      }


      .gge-article-content p {
        margin: 0 0 22px;
      }


      .gge-article-content h2 {
        margin: 42px 0 17px;
        padding-left: 15px;
        border-left: 5px solid #d5a900;
        color: #123a8c;
        font-size: 30px;
        font-weight: 800;
        line-height: 1.28;
      }


      .gge-article-content h3 {
        margin: 31px 0 13px;
        color: #242424;
        font-size: 23px;
        font-weight: 800;
        line-height: 1.35;
      }


      .gge-article-content
      .gge-gold-text {
        color: #a87900;
        font-weight: 800;
      }


      .gge-article-content ul,
      .gge-article-content ol {
        margin: 0 0 22px;
        padding-left: 34px;
      }


      .gge-article-content li {
        margin: 8px 0;
      }


      .gge-article-content blockquote {
        margin: 26px 0;
        padding: 17px 20px;
        border-left: 5px solid #d5a900;
        border-radius: 8px;
        background: #fffaf0;
        color: #444;
        line-height: 1.75;
      }


      .gge-inline-cta {
        margin: 26px 0;
        padding: 18px;
        border: 1px solid #ead17a;
        border-left: 5px solid #d5a900;
        border-radius: 12px;
        background: #fffaf0;

        box-shadow:
          0
          5px
          16px
          rgba(0,0,0,.05);
      }


      .gge-inline-cta a,
      .gge-inline-cta-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        max-width: 100%;
        padding: 12px 18px;
        border-radius: 9px;
        background: #123a8c;
        color: #fff !important;
        text-decoration: none;
        font-size: 16px;
        font-weight: 800;
        line-height: 1.35;

        transition:
          transform .15s ease,
          box-shadow .15s ease,
          background .15s ease;
      }


      .gge-inline-cta a:hover,
      .gge-inline-cta-link:hover {
        background: #0d2d70;

        transform:
          translateY(-1px);

        box-shadow:
          0
          5px
          12px
          rgba(18,58,140,.18);
      }


      .gge-youtube-card,
      .gge-newsletter-card,
      .gge-related-section,
      .gge-resource-section {
        margin-top: 34px;

        border:
          1px solid
          #e2e6ed;

        border-radius: 16px;
        background: #fff;
        overflow: hidden;
      }


      .gge-youtube-card {
        padding: 22px;
        background: #fff8f8;
        border-color: #f2d1d1;
      }


      .gge-youtube-card h2,
      .gge-newsletter-card h2,
      .gge-related-section h2,
      .gge-resource-section h2 {
        margin: 0 0 9px;
        color: #123a8c;
        font-size: 24px;
        line-height: 1.3;
      }


      .gge-youtube-card p,
      .gge-newsletter-card p,
      .gge-related-section > p,
      .gge-resource-section > p {
        margin: 0;
        color: #626b75;
        line-height: 1.65;
      }


      .gge-youtube-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-top: 17px;
        padding: 12px 18px;
        border-radius: 9px;
        background: #c90000;
        color: #fff;
        text-decoration: none;
        font-weight: 800;
      }


      .gge-newsletter-card {
        padding: 25px;
        background: #f7faff;
        border-color: #d9e3f7;
      }


      .gge-newsletter-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 14px;
        margin-top: 18px;
      }


      .gge-newsletter-card label {
        display: block;
        margin: 0 0 7px;
        color: #333;
        font-size: 14px;
        font-weight: 700;
      }


      .gge-newsletter-card
      input[type="text"],

      .gge-newsletter-card
      input[type="email"] {
        width: 100%;
        padding: 12px 13px;
        border: 1px solid #cfd7e3;
        border-radius: 8px;
        background: #fff;
        font: inherit;
      }


      .gge-newsletter-consent {
        display: flex !important;
        align-items: flex-start;
        gap: 9px;
        margin-top: 15px !important;
        font-weight: 400 !important;
        line-height: 1.55;
      }


      .gge-newsletter-consent
      input {
        margin-top: 4px;
      }


      .gge-newsletter-honeypot {
        position: absolute !important;
        left: -9999px !important;
        width: 1px !important;
        height: 1px !important;
        overflow: hidden !important;
      }


      .gge-newsletter-button {
        margin-top: 16px;
        padding: 12px 20px;
        border: 0;
        border-radius: 9px;
        background: #f2bd16;
        color: #111;
        font-weight: 800;
        font-size: 16px;
        cursor: pointer;
      }


      .gge-newsletter-button:disabled {
        opacity: .65;
        cursor: not-allowed;
      }


      .gge-newsletter-message {
        display: none;
        margin-top: 14px;
        padding: 11px 12px;
        border-radius: 8px;
        line-height: 1.5;
      }


      .gge-newsletter-message.success {
        display: block;
        background: #e8f7ec;
        color: #17652d;
        border: 1px solid #b8dfc0;
      }


      .gge-newsletter-message.error {
        display: block;
        background: #ffe8e8;
        color: #951d1d;
        border: 1px solid #efbbbb;
      }


      .gge-section-inner {
        padding: 25px;
      }


      .gge-card-grid {
        display: grid;

        grid-template-columns:
          repeat(
            3,
            minmax(
              0,
              1fr
            )
          );

        gap: 17px;
        margin-top: 20px;
      }


      .gge-related-card,
      .gge-resource-card {
        display: flex;
        flex-direction: column;
        min-width: 0;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        overflow: hidden;
        background: #fff;
      }


      .gge-card-image {
        width: 100%;
        height: 160px;
        object-fit: cover;
        background: #f2f3f5;
      }


      .gge-card-image-placeholder {
        height: 160px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 18px;
        background: #f2f3f5;
        color: #7b8088;
        font-weight: 700;
        text-align: center;
      }


      .gge-card-body {
        display: flex;
        flex: 1;
        flex-direction: column;
        padding: 16px;
      }


      .gge-card-kicker {
        margin-bottom: 7px;
        color: #a87900;
        font-size: 12px;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: .4px;
      }


      .gge-card-title {
        margin: 0;
        color: #123a8c;
        font-size: 18px;
        line-height: 1.35;
      }


      .gge-card-text {
        margin: 9px 0 0 !important;
        color: #666 !important;
        font-size: 14px;
        line-height: 1.55 !important;
      }


      .gge-card-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        align-self: flex-start;
        margin-top: auto;
        padding: 10px 13px;
        border-radius: 8px;
        background: #123a8c;
        color: #fff;
        text-decoration: none;
        font-size: 14px;
        font-weight: 800;
      }


      .gge-ad-slot {
        display: none;
        margin: 30px 0;
      }


      @media (
        max-width:
          760px
      ) {

        .gge-card-grid,
        .gge-newsletter-grid {
          grid-template-columns: 1fr;
        }


        .gge-article-content {
          font-size: 17px;
          line-height: 1.82;
        }


        /*
          Do not force heading size when the new editor
          has saved a custom inline size.
        */

        .gge-article-content h2:not([style]) {
          font-size: 26px;
        }


        .gge-article-content h3:not([style]) {
          font-size: 21px;
        }


        .gge-inline-cta a,
        .gge-inline-cta-link {
          width: 100%;
          text-align: center;
        }

      }

    `;


    document.head.appendChild(
      style
    );
  }



  /* ==================================================
     OLD ARTICLE FORMATTING
  ================================================== */

  function inlineFormat(
    text
  ) {

    const safe =
      escapeHTML(
        text
      );


    return safe.replace(
      /\*\*([^*]+)\*\*/g,
      '<strong class="gge-gold-text">$1</strong>'
    );
  }



  function getCTAHTML(
    label,
    url
  ) {

    const safeLink =
      safeURL(
        url
      );


    if (
      !safeLink
    ) {

      return "";
    }


    let external =
      false;


    try {

      external =
        new URL(
          safeLink
        ).origin !==
        new URL(
          SITE_URL
        ).origin;

    } catch (
      error
    ) {

      external =
        true;
    }


    const target =
      external
        ? ' target="_blank"'
        : "";


    const rel =
      external
        ? ' rel="noopener noreferrer"'
        : ' rel="noopener"';


    return (

      '<div class="gge-inline-cta">' +

        '<a href="' +
        escapeHTML(
          safeLink
        ) +
        '"' +
        target +
        rel +
        '>' +

          inlineFormat(
            label
          ) +

        '</a>' +

      '</div>'

    );
  }



  /* ==================================================
     NEW VISUAL EDITOR HTML SAFETY
  ================================================== */

  function sanitizeRichHTML(
    html
  ) {

    const template =
      document.createElement(
        "template"
      );


    template.innerHTML =
      String(
        html ||
        ""
      );


    const allowedTags =
      new Set([
        "P",
        "DIV",
        "BR",
        "H2",
        "H3",
        "STRONG",
        "B",
        "EM",
        "I",
        "U",
        "UL",
        "OL",
        "LI",
        "A",
        "SPAN",
        "BLOCKQUOTE"
      ]);


    const dangerousTags =
      new Set([
        "SCRIPT",
        "STYLE",
        "IFRAME",
        "OBJECT",
        "EMBED",
        "FORM",
        "INPUT",
        "BUTTON",
        "SVG",
        "MATH",
        "META",
        "LINK"
      ]);


    const allowedStyles =
      new Set([
        "color",
        "font-size",
        "font-weight",
        "font-style",
        "text-decoration",
        "text-align"
      ]);


    const elements =
      Array.from(
        template.content
          .querySelectorAll(
            "*"
          )
      );


    elements.forEach(
      element => {

        if (
          dangerousTags.has(
            element.tagName
          )
        ) {

          element.remove();

          return;
        }


        if (
          !allowedTags.has(
            element.tagName
          )
        ) {

          element.replaceWith(
            ...element.childNodes
          );

          return;
        }


        Array.from(
          element.attributes
        )
          .forEach(
            attribute => {

              const name =
                attribute.name
                  .toLowerCase();


              /*
                SAFE INLINE STYLES
              */

              if (
                name ===
                "style"
              ) {

                const safeStyles =
                  [];


                for (
                  const property of
                  element.style
                ) {

                  if (
                    !allowedStyles.has(
                      property
                    )
                  ) {

                    continue;
                  }


                  const value =
                    element.style
                      .getPropertyValue(
                        property
                      )
                      .trim();


                  if (
                    property ===
                    "font-size"
                  ) {

                    const match =
                      value.match(
                        /^(\d{1,2})px$/
                      );


                    if (
                      !match
                    ) {

                      continue;
                    }


                    const size =
                      Number(
                        match[1]
                      );


                    if (
                      size < 10 ||
                      size > 72
                    ) {

                      continue;
                    }
                  }


                  if (
                    property ===
                    "text-align" &&
                    ![
                      "left",
                      "center",
                      "right",
                      "justify"
                    ].includes(
                      value
                    )
                  ) {

                    continue;
                  }


                  if (
                    property ===
                    "font-style" &&
                    ![
                      "normal",
                      "italic"
                    ].includes(
                      value
                    )
                  ) {

                    continue;
                  }


                  if (
                    property ===
                    "font-weight" &&
                    !(
                      value ===
                        "normal" ||
                      value ===
                        "bold" ||
                      /^[1-9]00$/.test(
                        value
                      )
                    )
                  ) {

                    continue;
                  }


                  safeStyles.push(
                    property +
                    ":" +
                    value
                  );
                }


                if (
                  safeStyles.length
                ) {

                  element.setAttribute(
                    "style",
                    safeStyles.join(
                      ";"
                    )
                  );

                } else {

                  element.removeAttribute(
                    "style"
                  );
                }


                return;
              }


              /*
                LINKS
              */

              if (
                element.tagName ===
                  "A" &&
                [
                  "href",
                  "target",
                  "rel"
                ].includes(
                  name
                )
              ) {

                return;
              }


              /*
                CTA LINK CLASS
              */

              if (
                element.tagName ===
                  "A" &&
                name ===
                  "class" &&
                element.classList
                  .contains(
                    "gge-inline-cta-link"
                  )
              ) {

                return;
              }


              /*
                CTA WRAPPER CLASS
              */

              if (
                (
                  element.tagName ===
                    "P" ||
                  element.tagName ===
                    "DIV"
                ) &&
                name ===
                  "class" &&
                element.classList
                  .contains(
                    "gge-inline-cta"
                  )
              ) {

                return;
              }


              /*
                NUMBERED LIST START
              */

              if (
                element.tagName ===
                  "OL" &&
                name ===
                  "start"
              ) {

                const start =
                  Number(
                    attribute.value
                  );


                if (
                  Number.isInteger(
                    start
                  ) &&
                  start > 0
                ) {

                  return;
                }
              }


              element.removeAttribute(
                attribute.name
              );
            }
          );


        /*
          VALIDATE LINKS
        */

        if (
          element.tagName ===
          "A"
        ) {

          const href =
            element.getAttribute(
              "href"
            ) ||
            "";


          const safeLink =
            safeURL(
              href
            );


          if (
            !safeLink
          ) {

            element.removeAttribute(
              "href"
            );


            element.removeAttribute(
              "target"
            );


            element.removeAttribute(
              "rel"
            );


            return;
          }


          element.setAttribute(
            "href",
            safeLink
          );


          try {

            const external =
              new URL(
                safeLink
              ).origin !==
              new URL(
                SITE_URL
              ).origin;


            if (
              external
            ) {

              element.setAttribute(
                "target",
                "_blank"
              );


              element.setAttribute(
                "rel",
                "noopener noreferrer"
              );

            } else {

              element.removeAttribute(
                "target"
              );


              element.setAttribute(
                "rel",
                "noopener"
              );
            }

          } catch (
            error
          ) {

            element.removeAttribute(
              "target"
            );


            element.setAttribute(
              "rel",
              "noopener"
            );
          }
        }

      }
    );


    return template.innerHTML;
  }



  /* ==================================================
     ARTICLE CONTENT RENDERER
  ================================================== */

  function renderArticleContent(
    text
  ) {

    const content =
      document.getElementById(
        "article-content"
      );


    if (
      !content
    ) {

      return;
    }


    const rawText =
      String(
        text ||
        ""
      );


    content.classList.add(
      "gge-article-content"
    );


    content.style.whiteSpace =
      "normal";


    /*
      ==================================================
      NEW VISUAL EDITOR ARTICLES
      ==================================================
    */

    if (
      rawText.startsWith(
        RICH_CONTENT_MARKER
      )
    ) {

      const savedHTML =
        rawText.slice(
          RICH_CONTENT_MARKER.length
        );


      content.innerHTML =
        sanitizeRichHTML(
          savedHTML
        );


      return;
    }


    /*
      ==================================================
      OLD ARTICLES

      This keeps your previous articles compatible.
      ==================================================
    */

    const lines =
      rawText
        .replace(
          /\r\n/g,
          "\n"
        )
        .replace(
          /\r/g,
          "\n"
        )
        .split(
          "\n"
        );


    const html =
      [];


    let paragraph =
      [];


    let listType =
      "";


    let listItems =
      [];


    let listStart =
      1;



    function flushParagraph() {

      if (
        !paragraph.length
      ) {

        return;
      }


      html.push(

        "<p>" +

        paragraph
          .map(
            inlineFormat
          )
          .join(
            "<br>"
          ) +

        "</p>"

      );


      paragraph =
        [];
    }



    function flushList() {

      if (
        !listType ||
        !listItems.length
      ) {

        listType =
          "";


        listItems =
          [];


        listStart =
          1;


        return;
      }


      const openingTag =

        listType ===
          "ol"

          ? (
              '<ol start="' +
              listStart +
              '">'
            )

          : "<ul>";


      html.push(

        openingTag +

        listItems
          .map(
            item =>

              "<li>" +
              inlineFormat(
                item
              ) +
              "</li>"

          )
          .join(
            ""
          ) +

        (
          listType ===
            "ol"

            ? "</ol>"

            : "</ul>"
        )

      );


      listType =
        "";


      listItems =
        [];


      listStart =
        1;
    }



    lines.forEach(
      rawLine => {

        const line =
          rawLine.trim();


        if (
          !line
        ) {

          flushParagraph();

          flushList();

          return;
        }


        /*
          CTA
        */

        const cta =
          line.match(
            /^\[CTA\|(.+?)\|(.+)\]$/i
          );


        if (
          cta
        ) {

          flushParagraph();

          flushList();


          const ctaHTML =
            getCTAHTML(
              cta[1].trim(),
              cta[2].trim()
            );


          if (
            ctaHTML
          ) {

            html.push(
              ctaHTML
            );
          }


          return;
        }


        /*
          SUBHEADING
        */

        const h3 =
          line.match(
            /^###\s+(.+)/
          );


        if (
          h3
        ) {

          flushParagraph();

          flushList();


          html.push(

            "<h3>" +

            inlineFormat(
              h3[1]
            ) +

            "</h3>"

          );


          return;
        }


        /*
          MAIN HEADING
        */

        const h2 =
          line.match(
            /^##\s+(.+)/
          );


        if (
          h2
        ) {

          flushParagraph();

          flushList();


          html.push(

            "<h2>" +

            inlineFormat(
              h2[1]
            ) +

            "</h2>"

          );


          return;
        }


        /*
          BULLET LIST
        */

        const bullet =
          line.match(
            /^(?:[-*•])\s+(.+)/
          );


        if (
          bullet
        ) {

          flushParagraph();


          if (
            listType &&
            listType !==
              "ul"
          ) {

            flushList();
          }


          listType =
            "ul";


          listItems.push(
            bullet[1]
          );


          return;
        }


        /*
          NUMBERED LIST

          Important:
          Every new old-style numbered block remembers
          the real number written by the author.

          Therefore:
          1.
          paragraph
          2.
          paragraph
          3.

          renders as 1, 2, 3 instead of 1, 1, 1.
        */

        const numbered =
          line.match(
            /^(\d+)[.)]\s+(.+)/
          );


        if (
          numbered
        ) {

          flushParagraph();


          const currentNumber =
            Number(
              numbered[1]
            ) ||
            1;


          if (
            listType &&
            listType !==
              "ol"
          ) {

            flushList();
          }


          if (
            listType !==
            "ol"
          ) {

            listStart =
              currentNumber;
          }


          listType =
            "ol";


          listItems.push(
            numbered[2]
          );


          return;
        }


        /*
          NORMAL PARAGRAPH

          If a numbered item came immediately before
          this paragraph, close that list.

          The next numbered item can then use
          its own real starting number.
        */

        if (
          listType
        ) {

          flushList();
        }


        paragraph.push(
          line
        );

      }
    );


    flushParagraph();

    flushList();


    content.innerHTML =
      html.join(
        ""
      );
  }



  /* ==================================================
     IMAGE ALT / TITLE
  ================================================== */

  function applyCoverImageText(
    post
  ) {

    const cover =
      document.getElementById(
        "article-cover"
      );


    if (
      !cover
    ) {

      return;
    }


    const text =
      cleanText(
        post.image_alt_text ||
        post.title ||
        "GiftedGift Empire article"
      );


    cover.alt =
      text;


    cover.title =
      text;
  }



  /* ==================================================
     ARTICLE META
  ================================================== */

  function addArticleMeta(
    post
  ) {

    const title =
      document.getElementById(
        "article-title"
      );


    const oldDate =
      document.getElementById(
        "article-date"
      );


    if (
      !title ||
      !oldDate
    ) {

      return;
    }


    let category =
      document.getElementById(
        "gge-article-category"
      );


    if (
      !category
    ) {

      category =
        document.createElement(
          "div"
        );


      category.id =
        "gge-article-category";


      category.className =
        "gge-article-category";


      title.parentNode
        .insertBefore(
          category,
          title
        );
    }


    if (
      post.category
    ) {

      category.textContent =
        post.category;


      category.style.display =
        "inline-flex";

    } else {

      category.style.display =
        "none";
    }


    let meta =
      document.getElementById(
        "gge-article-meta"
      );


    if (
      !meta
    ) {

      meta =
        document.createElement(
          "div"
        );


      meta.id =
        "gge-article-meta";


      meta.className =
        "gge-article-meta";


      oldDate
        .insertAdjacentElement(
          "afterend",
          meta
        );
    }


    const author =
      cleanText(
        post.author_name ||
        "GiftedGift Empire"
      );


    const published =
      formatDate(
        post.published_at ||
        post.created_at
      );


    const updated =
      formatDate(
        post.updated_at
      );


    const parts =
      [];


    if (
      author
    ) {

      parts.push(

        "<span>By <strong>" +
        escapeHTML(
          author
        ) +
        "</strong></span>"

      );
    }


    if (
      published
    ) {

      parts.push(

        "<span>Published " +
        escapeHTML(
          published
        ) +
        "</span>"

      );
    }


    if (
      updated &&
      updated !==
        published
    ) {

      parts.push(

        "<span>Updated " +
        escapeHTML(
          updated
        ) +
        "</span>"

      );
    }


    meta.innerHTML =
      parts.join(
        '<span aria-hidden="true">•</span>'
      );


    oldDate.style.display =
      "none";
  }



  /* ==================================================
     FUTURE AD SLOTS
  ================================================== */

  function createAdSlot(
    id,
    placement
  ) {

    let slot =
      document.getElementById(
        id
      );


    if (
      slot
    ) {

      return slot;
    }


    slot =
      document.createElement(
        "div"
      );


    slot.id =
      id;


    slot.className =
      "gge-ad-slot";


    slot.dataset.placement =
      placement;


    slot.setAttribute(
      "aria-hidden",
      "true"
    );


    return slot;
  }



  function addFutureAdSlots() {

    const body =
      document.querySelector(
        ".article-body"
      );


    const content =
      document.getElementById(
        "article-content"
      );


    if (
      !body ||
      !content
    ) {

      return;
    }


    const top =
      createAdSlot(
        "blog-ad-top",
        "blog_article_top"
      );


    const middle =
      createAdSlot(
        "blog-ad-middle",
        "blog_article_middle"
      );


    const bottom =
      createAdSlot(
        "blog-ad-bottom",
        "blog_article_bottom"
      );


    content
      .insertAdjacentElement(
        "beforebegin",
        top
      );


    content
      .insertAdjacentElement(
        "afterend",
        middle
      );


    body.appendChild(
      bottom
    );
  }



  /* ==================================================
     YOUTUBE
  ================================================== */

  function addYouTubeCard(
    post
  ) {

    const content =
      document.getElementById(
        "article-content"
      );


    if (
      !content
    ) {

      return;
    }


    const old =
      document.getElementById(
        "gge-youtube-card"
      );


    if (
      old
    ) {

      old.remove();
    }


    const url =
      safeURL(
        post.youtube_url
      );


    if (
      !url
    ) {

      return;
    }


    const card =
      document.createElement(
        "section"
      );


    card.id =
      "gge-youtube-card";


    card.className =
      "gge-youtube-card";


    card.innerHTML = `

      <h2>
        Watch the Related Video
      </h2>

      <p>
        Prefer to watch?
        Open the related GiftedGift Empire
        video on YouTube.
      </p>

      <a
        class="gge-youtube-button"
        href="${escapeHTML(url)}"
        target="_blank"
        rel="noopener noreferrer"
      >
        ▶ Watch on YouTube
      </a>

    `;


    content
      .insertAdjacentElement(
        "afterend",
        card
      );
  }



  /* ==================================================
     NEWSLETTER
  ================================================== */

  function addNewsletterCard() {

    const articleBody =
      document.querySelector(
        ".article-body"
      );


    if (
      !articleBody ||
      document.getElementById(
        "gge-blog-newsletter"
      )
    ) {

      return;
    }


    const card =
      document.createElement(
        "section"
      );


    card.id =
      "gge-blog-newsletter";


    card.className =
      "gge-newsletter-card";


    card.innerHTML = `

      <h2>
        Join the GiftedGift Empire Newsletter
      </h2>

      <p>
        Get useful business ideas,
        digital resources, smart finds,
        fashion inspiration and new
        GiftedGift Empire content.
      </p>


      <form
        id="gge-blog-newsletter-form"
      >

        <div
          class="gge-newsletter-grid"
        >

          <div>

            <label
              for="gge-blog-newsletter-name"
            >
              Name
            </label>

            <input
              id="gge-blog-newsletter-name"
              type="text"
              autocomplete="name"
              placeholder="Your name"
            >

          </div>


          <div>

            <label
              for="gge-blog-newsletter-email"
            >
              Email Address
            </label>

            <input
              id="gge-blog-newsletter-email"
              type="email"
              autocomplete="email"
              required
              placeholder="you@example.com"
            >

          </div>

        </div>


        <div
          class="gge-newsletter-honeypot"
          aria-hidden="true"
        >

          <label
            for="gge-blog-newsletter-website"
          >
            Website
          </label>

          <input
            id="gge-blog-newsletter-website"
            type="text"
            tabindex="-1"
            autocomplete="off"
          >

        </div>


        <label
          class="gge-newsletter-consent"
          for="gge-blog-newsletter-consent"
        >

          <input
            id="gge-blog-newsletter-consent"
            type="checkbox"
            required
          >

          <span>
            I agree to receive
            GiftedGift Empire emails.
            I can unsubscribe at any time.
          </span>

        </label>


        <button
          id="gge-blog-newsletter-submit"
          class="gge-newsletter-button"
          type="submit"
        >
          Subscribe
        </button>


        <div
          id="gge-blog-newsletter-message"
          class="gge-newsletter-message"
          role="status"
          aria-live="polite"
        ></div>

      </form>

    `;


    articleBody.appendChild(
      card
    );


    const form =
      document.getElementById(
        "gge-blog-newsletter-form"
      );


    const button =
      document.getElementById(
        "gge-blog-newsletter-submit"
      );


    const message =
      document.getElementById(
        "gge-blog-newsletter-message"
      );



    function showMessage(
      text,
      type
    ) {

      message.className =
        "gge-newsletter-message " +
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
              "gge-blog-newsletter-name"
            )
            .value
            .trim();


        const email =
          document
            .getElementById(
              "gge-blog-newsletter-email"
            )
            .value
            .trim();


        const consent =
          document
            .getElementById(
              "gge-blog-newsletter-consent"
            )
            .checked;


        const website =
          document
            .getElementById(
              "gge-blog-newsletter-website"
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
            "Newsletter subscription:",
            error
          );


          showMessage(

            error instanceof
              Error

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



  /* ==================================================
     RELATED ITEM MATCHING
  ================================================== */

  function tokenize(
    value
  ) {

    const stop =
      new Set([

        "about",
        "after",
        "again",
        "also",
        "and",
        "are",
        "because",
        "before",
        "best",
        "can",
        "could",
        "for",
        "from",
        "get",
        "guide",
        "how",
        "ideas",
        "into",
        "more",
        "new",
        "not",
        "online",
        "our",
        "that",
        "the",
        "their",
        "them",
        "these",
        "they",
        "this",
        "tips",
        "too",
        "use",
        "using",
        "want",
        "ways",
        "what",
        "when",
        "where",
        "which",
        "with",
        "you",
        "your"

      ]);


    return cleanText(
      value
    )
      .toLowerCase()
      .replace(
        /[^a-z0-9\s]/g,
        " "
      )
      .split(
        /\s+/
      )
      .filter(
        word =>

          word.length >=
            3 &&

          !stop.has(
            word
          )
      );
  }



  function scoreItem(
    item,
    post
  ) {

    const articleTokens =
      new Set(

        tokenize(

          [

            post.title,

            post.category,

            post.excerpt

          ]
            .filter(
              Boolean
            )
            .join(
              " "
            )

        )

      );


    const itemTokens =
      new Set(

        tokenize(

          [

            item.name,

            item.category,

            item.description

          ]
            .filter(
              Boolean
            )
            .join(
              " "
            )

        )

      );


    let score =
      0;


    articleTokens.forEach(
      token => {

        if (
          itemTokens.has(
            token
          )
        ) {

          score +=
            1;
        }

      }
    );


    return score;
  }



  /* ==================================================
     RELATED ARTICLES
  ================================================== */

  async function loadRelatedArticles(
    post
  ) {

    const articleBody =
      document.querySelector(
        ".article-body"
      );


    if (
      !articleBody
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
            "blog_posts"
          )
          .select(
            "id,title,slug,excerpt,image_url,image_alt_text,category,published,published_at,created_at"
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
            "published_at",
            {
              ascending:
                false,

              nullsFirst:
                false
            }
          )
          .limit(
            3
          );


      if (
        !result.error
      ) {

        posts =
          Array.isArray(
            result.data
          )
            ? result.data
            : [];
      }

    }


    if (
      posts.length <
      3
    ) {

      const result =
        await db
          .from(
            "blog_posts"
          )
          .select(
            "id,title,slug,excerpt,image_url,image_alt_text,category,published,published_at,created_at"
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
            6
          );


      if (
        !result.error
      ) {

        const fallback =
          Array.isArray(
            result.data
          )
            ? result.data
            : [];


        const seen =
          new Set(

            posts.map(
              item =>
                item.id
            )

          );


        fallback.forEach(
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


    if (
      !posts.length
    ) {

      return;
    }


    const section =
      document.createElement(
        "section"
      );


    section.id =
      "gge-related-articles";


    section.className =
      "gge-related-section";


    section.innerHTML = `

      <div
        class="gge-section-inner"
      >

        <h2>
          Related Articles
        </h2>

        <p>
          Continue exploring useful
          GiftedGift Empire content.
        </p>


        <div
          class="gge-card-grid"
        >

          ${posts
            .map(
              item => {

                const image =
                  safeURL(
                    item.image_url
                  );


                const imageText =
                  cleanText(
                    item.image_alt_text ||
                    item.title ||
                    "GiftedGift Empire article"
                  );


                return `

                  <article
                    class="gge-related-card"
                  >

                    ${
                      image

                        ? `

                          <img
                            class="gge-card-image"
                            src="${escapeHTML(image)}"
                            alt="${escapeHTML(
                              imageText
                            )}"
                            title="${escapeHTML(
                              imageText
                            )}"
                            loading="lazy"
                          >

                        `

                        : `

                          <div
                            class="gge-card-image-placeholder"
                          >
                            GiftedGift Empire
                          </div>

                        `
                    }


                    <div
                      class="gge-card-body"
                    >

                      <div
                        class="gge-card-kicker"
                      >
                        ${escapeHTML(
                          item.category ||
                          "Blog"
                        )}
                      </div>


                      <h3
                        class="gge-card-title"
                      >
                        ${escapeHTML(
                          item.title ||
                          "Article"
                        )}
                      </h3>


                      <p
                        class="gge-card-text"
                      >
                        ${escapeHTML(
                          shortText(
                            item.excerpt,
                            110
                          )
                        )}
                      </p>


                      <a
                        class="gge-card-link"
                        href="${escapeHTML(
                          getPostURL(
                            item
                          )
                        )}"
                      >
                        Read Article
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

      </div>

    `;


    articleBody.appendChild(
      section
    );
  }



  /* ==================================================
     RELATED RESOURCES
  ================================================== */

  async function loadRelatedResources(
    post
  ) {

    const articleBody =
      document.querySelector(
        ".article-body"
      );


    if (
      !articleBody
    ) {

      return;
    }


    const [
      physicalResult,
      digitalResult
    ] =
      await Promise.all([

        db
          .from(
            "products"
          )
          .select(
            "id,name,slug,description,image_url,category,in_stock,created_at"
          )
          .eq(
            "in_stock",
            true
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
          ),


        db
          .from(
            "digital_products"
          )
          .select(
            "id,name,slug,description,image_url,category,active,created_at"
          )
          .eq(
            "active",
            true
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
          )

      ]);


    const items =
      [];


    if (
      !physicalResult.error
    ) {

      (
        physicalResult.data ||
        []
      )
        .forEach(
          item => {

            items.push({

              ...item,

              resourceType:
                "Product",

              href:

                item.slug

                  ? "/" +
                    encodeURIComponent(
                      item.slug
                    )

                  : "/product?id=" +
                    encodeURIComponent(
                      item.id
                    )

            });

          }
        );
    }


    if (
      !digitalResult.error
    ) {

      (
        digitalResult.data ||
        []
      )
        .forEach(
          item => {

            items.push({

              ...item,

              resourceType:
                "Digital Resource",

              href:

                item.slug

                  ? "/" +
                    encodeURIComponent(
                      item.slug
                    )

                  : "/digital-product?id=" +
                    encodeURIComponent(
                      item.id
                    )

            });

          }
        );
    }


    if (
      !items.length
    ) {

      return;
    }


    items.forEach(
      item => {

        item.__score =
          scoreItem(
            item,
            post
          );

      }
    );


    items.sort(
      (
        a,
        b
      ) => {

        if (
          b.__score !==
          a.__score
        ) {

          return (
            b.__score -
            a.__score
          );
        }


        return String(
          b.created_at ||
          ""
        )
          .localeCompare(
            String(
              a.created_at ||
              ""
            )
          );

      }
    );


    const selected =
      items.slice(
        0,
        3
      );


    const section =
      document.createElement(
        "section"
      );


    section.id =
      "gge-related-resources";


    section.className =
      "gge-resource-section";


    section.innerHTML = `

      <div
        class="gge-section-inner"
      >

        <h2>
          Explore GiftedGift Empire
        </h2>

        <p>
          Useful products and digital resources
          you may also want to explore.
        </p>


        <div
          class="gge-card-grid"
        >

          ${selected
            .map(
              item => {

                const image =
                  safeURL(
                    item.image_url
                  );


                return `

                  <article
                    class="gge-resource-card"
                  >

                    ${
                      image

                        ? `

                          <img
                            class="gge-card-image"
                            src="${escapeHTML(image)}"
                            alt="${escapeHTML(
                              item.name ||
                              item.resourceType
                            )}"
                            loading="lazy"
                          >

                        `

                        : `

                          <div
                            class="gge-card-image-placeholder"
                          >
                            ${escapeHTML(
                              item.resourceType
                            )}
                          </div>

                        `
                    }


                    <div
                      class="gge-card-body"
                    >

                      <div
                        class="gge-card-kicker"
                      >
                        ${escapeHTML(
                          item.resourceType
                        )}
                      </div>


                      <h3
                        class="gge-card-title"
                      >
                        ${escapeHTML(
                          item.name ||
                          "GiftedGift Empire"
                        )}
                      </h3>


                      <p
                        class="gge-card-text"
                      >
                        ${escapeHTML(
                          shortText(
                            item.description,
                            105
                          )
                        )}
                      </p>


                      <a
                        class="gge-card-link"
                        href="${escapeHTML(
                          item.href
                        )}"
                      >
                        View ${escapeHTML(
                          item.resourceType
                        )}
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

      </div>

    `;


    articleBody.appendChild(
      section
    );
  }



  /* ==================================================
     SEO
  ================================================== */

  function updateClientSEO(
    post
  ) {

    const seoTitle =
      cleanText(
        post.seo_title ||
        post.title ||
        "GiftedGift Empire Blog"
      );


    const pageTitle =

      post.seo_title

        ? seoTitle

        : seoTitle +
          " | GiftedGift Empire";


    const contentDescription =
      plainTextFromContent(
        post.content
      );


    const description =
      shortText(

        post.meta_description ||
        post.excerpt ||
        contentDescription,

        160

      );


    const canonical =
      getPostURL(
        post
      );


    const image =

      safeURL(
        post.image_url
      ) ||

      SITE_URL +
      "/my-logo.png";


    const imageAlt =
      cleanText(
        post.image_alt_text ||
        post.title ||
        seoTitle ||
        "GiftedGift Empire article"
      );


    document.title =
      pageTitle;


    const assignments = [

      [
        "page-description-meta",
        "content",
        description
      ],

      [
        "og-type",
        "content",
        "article"
      ],

      [
        "og-title",
        "content",
        seoTitle
      ],

      [
        "og-description",
        "content",
        description
      ],

      [
        "og-url",
        "content",
        canonical
      ],

      [
        "og-image",
        "content",
        image
      ],

      [
        "og-image-alt",
        "content",
        imageAlt
      ],

      [
        "twitter-title",
        "content",
        seoTitle
      ],

      [
        "twitter-description",
        "content",
        description
      ],

      [
        "twitter-image",
        "content",
        image
      ]

    ];


    assignments.forEach(
      (
        [
          id,
          attribute,
          value
        ]
      ) => {

        const element =
          document.getElementById(
            id
          );


        if (
          element
        ) {

          element.setAttribute(
            attribute,
            value
          );
        }

      }
    );


    const canonicalElement =
      document.getElementById(
        "canonical-link"
      );


    if (
      canonicalElement
    ) {

      canonicalElement
        .setAttribute(
          "href",
          canonical
        );
    }


    const authorName =
      cleanText(
        post.author_name ||
        "GiftedGift Empire"
      );


    const author =

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
        post.title ||
        seoTitle,

      "description":
        description,

      "url":
        canonical,

      "mainEntityOfPage": {

        "@type":
          "WebPage",

        "@id":
          canonical

      },

      "author":
        author,

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
            SITE_URL +
            "/my-logo.png"

        }

      }

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


    if (
      image
    ) {

      articleSchema.image =
        [
          image
        ];
    }


    let schema =
      document.getElementById(
        "blog-structured-data"
      );


    if (
      !schema
    ) {

      schema =
        document.createElement(
          "script"
        );


      schema.id =
        "blog-structured-data";


      schema.type =
        "application/ld+json";


      document.head
        .appendChild(
          schema
        );
    }


    schema.textContent =
      JSON.stringify(
        articleSchema
      );
  }



  /* ==================================================
     FETCH CURRENT ARTICLE
  ================================================== */

  async function fetchPost() {

    const result =
      await db
        .from(
          "blog_posts"
        )
        .select(
          "id,title,category,author_name,slug,excerpt,seo_title,meta_description,youtube_url,content,image_url,image_alt_text,promotion_type,promotion_name,promotion_url,promotion_button_text,promotion_image_url,published,published_at,created_at,updated_at"
        )
        .eq(
          "id",
          postId
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
          "GiftedGift blog enhancement:",
          result.error
        );
      }


      return null;
    }


    return result.data;
  }



  /* ==================================================
     START
  ================================================== */

  async function init() {

    injectStyles();


    const post =
      await fetchPost();


    if (
      !post
    ) {

      return;
    }


    addArticleMeta(
      post
    );


    renderArticleContent(
      post.content
    );


    applyCoverImageText(
      post
    );


    addFutureAdSlots();


    addYouTubeCard(
      post
    );


    addNewsletterCard();


    updateClientSEO(
      post
    );


    await Promise.allSettled([

      loadRelatedArticles(
        post
      ),

      loadRelatedResources(
        post
      )

    ]);
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
