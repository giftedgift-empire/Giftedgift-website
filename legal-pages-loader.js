/* =========================================
   GIFTEDGIFT EMPIRE
   SHARED LEGAL PAGE LOADER
========================================= */

(function () {

  const SUPABASE_URL =
    "https://mvoxizdzjmtcvokowhpd.supabase.co";


  const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_5wjUjC6amD7e2H_3h_7UQw_TY6orH16";


  if (
    typeof supabase === "undefined"
  ) {

    console.error(
      "Supabase library is not loaded."
    );

    return;

  }


  const supabaseClient =
    supabase.createClient(
      SUPABASE_URL,
      SUPABASE_PUBLISHABLE_KEY
    );


  /* =========================================
     IDENTIFY CURRENT LEGAL PAGE
  ========================================= */

  const filename =
    window.location.pathname
      .split("/")
      .pop()
      .split("?")[0]
      .split("#")[0];


  const PAGE_MAP = {

    "returns-refunds.html":
      "returns-refunds",

    "shipping-policy.html":
      "shipping-policy",

    "terms-conditions.html":
      "terms-conditions",

    "legal-notice.html":
      "legal-notice"

  };


  const slug =
    PAGE_MAP[filename];


  if (!slug) {

    return;

  }


  /* =========================================
     FORMAT DATE
  ========================================= */

  function formatDate(value) {

    if (!value) {
      return "";
    }


    const date =
      new Date(value);


    if (
      Number.isNaN(
        date.getTime()
      )
    ) {

      return "";

    }


    return date.toLocaleDateString(
      "en-GB",
      {
        day: "numeric",
        month: "long",
        year: "numeric"
      }
    );

  }


  /* =========================================
     LOAD PAGE
  ========================================= */

  async function loadLegalPage() {

    const titleBox =
      document.querySelector(
        ".hero h1"
      );


    const updatedBox =
      document.querySelector(
        ".updated"
      );


    const contentBox =
      document.querySelector(
        ".policy-card, .legal-card"
      );


    if (
      !titleBox ||
      !contentBox
    ) {

      console.error(
        "Legal page content area was not found."
      );

      return;

    }


    try {

      const {
        data,
        error
      } =
        await supabaseClient
          .from("legal_pages")
          .select(
            "title, content_html, updated_at"
          )
          .eq(
            "slug",
            slug
          )
          .maybeSingle();


      if (error) {

        /*
          Supabase problem:
          leave existing static HTML visible.
        */

        console.error(
          "Legal page load error:",
          error
        );

        return;

      }


      /*
        No public row means the page
        has been unpublished.
      */

      if (!data) {

        if (updatedBox) {

          updatedBox.style.display =
            "none";

        }


        contentBox.innerHTML = `

          <div
            style="
              text-align:center;
              padding:45px 15px;
            "
          >

            <h2>
              Page Currently Unavailable
            </h2>

            <p>
              This legal page is not currently published.
            </p>

            <p>
              Please contact GiftedGift Empire if
              you need assistance.
            </p>

            <p>

              <a
                href="mailto:gift@giftedgiftempire.com"
              >
                gift@giftedgiftempire.com
              </a>

            </p>

          </div>

        `;


        return;

      }


      /* =========================================
         TITLE
      ========================================= */

      const title =
        String(
          data.title || ""
        ).trim();


      if (title) {

        titleBox.textContent =
          title;


        document.title =
          title +
          " | GiftedGift Empire";

      }


      /* =========================================
         UPDATED DATE
      ========================================= */

      const formattedDate =
        formatDate(
          data.updated_at
        );


      if (
        formattedDate &&
        updatedBox
      ) {

        updatedBox.textContent =
          "Last updated: " +
          formattedDate;

      }


      /* =========================================
         CONTENT
      ========================================= */

      const content =
        String(
          data.content_html || ""
        ).trim();


      if (content) {

        contentBox.innerHTML =
          content;

      }


    } catch (error) {

      /*
        Network problem:
        keep static fallback content visible.
      */

      console.error(
        "Legal page error:",
        error
      );

    }

  }


  loadLegalPage();

})();
