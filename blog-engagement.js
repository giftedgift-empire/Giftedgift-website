(function () {
  "use strict";

  const articleId =
    Number(
      window.__BLOG_POST_ID ||
      new URLSearchParams(
        window.location.search
      ).get(
        "id"
      ) ||
      0
    );

  if (
    !Number.isInteger(
      articleId
    ) ||
    articleId <= 0
  ) {
    return;
  }

  if (
    !window.supabase
  ) {
    return;
  }


  const db =
    window.supabase.createClient(
      "https://mvoxizdzjmtcvokowhpd.supabase.co",
      "sb_publishable_5wjUjC6amD7e2H_3h_7UQw_TY6orH16"
    );


  const visitorKey =
    "giftedgift_blog_visitor_id";


  let visitorId =
    localStorage.getItem(
      visitorKey
    );


  if (
    !visitorId
  ) {

    visitorId =

      window.crypto &&
      typeof crypto.randomUUID ===
        "function"

        ? crypto.randomUUID()

        : (
            "visitor-" +
            Date.now() +
            "-" +
            Math.random()
              .toString(
                36
              )
              .slice(
                2
              )
          );


    localStorage.setItem(
      visitorKey,
      visitorId
    );

  }


  let likeCount =
    0;


  let liked =
    false;


  let approvedComments =
    [];


  let currentPost =
    null;


  const T = {

    en: {

      like:
        "Like",

      liked:
        "Liked",

      comments:
        "Comments",

      share:
        "Share",

      shareTitle:
        "Share This Article",

      shareText:
        "Share this article with someone who may find it useful.",

      pinterest:
        "Save on Pinterest",

      facebook:
        "Facebook",

      whatsapp:
        "WhatsApp",

      copy:
        "Copy Link",

      copied:
        "Link copied.",

      noComments:
        "No approved comments yet. Be the first to leave one.",

      yourName:
        "Your Name",

      namePlaceholder:
        "Enter your name",

      yourComment:
        "Your Comment",

      commentPlaceholder:
        "Write your comment...",

      postComment:
        "Post Comment",

      sending:
        "Submitting...",

      pending:
        "Thank you! Your comment has been submitted and is waiting for approval.",

      error:
        "Your comment could not be submitted. Please try again."

    },


    fr: {

      like:
        "J’aime",

      liked:
        "Aimé",

      comments:
        "Commentaires",

      share:
        "Partager",

      shareTitle:
        "Partager cet article",

      shareText:
        "Partagez cet article avec une personne qui pourrait le trouver utile.",

      pinterest:
        "Enregistrer sur Pinterest",

      facebook:
        "Facebook",

      whatsapp:
        "WhatsApp",

      copy:
        "Copier le lien",

      copied:
        "Lien copié.",

      noComments:
        "Aucun commentaire approuvé pour le moment.",

      yourName:
        "Votre nom",

      namePlaceholder:
        "Entrez votre nom",

      yourComment:
        "Votre commentaire",

      commentPlaceholder:
        "Écrivez votre commentaire...",

      postComment:
        "Publier le commentaire",

      sending:
        "Envoi...",

      pending:
        "Merci ! Votre commentaire a été envoyé et attend l’approbation.",

      error:
        "Votre commentaire n’a pas pu être envoyé. Veuillez réessayer."

    },


    de: {

      like:
        "Gefällt mir",

      liked:
        "Gefällt mir",

      comments:
        "Kommentare",

      share:
        "Teilen",

      shareTitle:
        "Diesen Artikel teilen",

      shareText:
        "Teilen Sie diesen Artikel mit jemandem, für den er hilfreich sein könnte.",

      pinterest:
        "Auf Pinterest speichern",

      facebook:
        "Facebook",

      whatsapp:
        "WhatsApp",

      copy:
        "Link kopieren",

      copied:
        "Link kopiert.",

      noComments:
        "Noch keine freigegebenen Kommentare.",

      yourName:
        "Ihr Name",

      namePlaceholder:
        "Namen eingeben",

      yourComment:
        "Ihr Kommentar",

      commentPlaceholder:
        "Kommentar schreiben...",

      postComment:
        "Kommentar senden",

      sending:
        "Wird gesendet...",

      pending:
        "Danke! Ihr Kommentar wurde gesendet und wartet auf Freigabe.",

      error:
        "Ihr Kommentar konnte nicht gesendet werden."

    },


    nl: {

      like:
        "Vind ik leuk",

      liked:
        "Leuk gevonden",

      comments:
        "Reacties",

      share:
        "Delen",

      shareTitle:
        "Dit artikel delen",

      shareText:
        "Deel dit artikel met iemand die er iets aan kan hebben.",

      pinterest:
        "Opslaan op Pinterest",

      facebook:
        "Facebook",

      whatsapp:
        "WhatsApp",

      copy:
        "Link kopiëren",

      copied:
        "Link gekopieerd.",

      noComments:
        "Nog geen goedgekeurde reacties.",

      yourName:
        "Uw naam",

      namePlaceholder:
        "Voer uw naam in",

      yourComment:
        "Uw reactie",

      commentPlaceholder:
        "Schrijf uw reactie...",

      postComment:
        "Reactie plaatsen",

      sending:
        "Verzenden...",

      pending:
        "Bedankt! Uw reactie is verzonden en wacht op goedkeuring.",

      error:
        "Uw reactie kon niet worden verzonden."

    }

  };


  function lang() {

    const value =
      String(
        document
          .documentElement
          .lang ||
        "en"
      )
        .toLowerCase();


    return T[
      value
    ]

      ? value

      : "en";

  }


  function t(
    key
  ) {

    return (
      T[
        lang()
      ][
        key
      ] ||
      T.en[
        key
      ] ||
      key
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
        lang() ===
          "en"

          ? "en-GB"

          : lang(),

        {

          timeZone:
            "Europe/Paris",

          year:
            "numeric",

          month:
            "long",

          day:
            "numeric"

        }
      );

  }


  function getShareUrl() {

    const canonical =
      document.querySelector(
        'link[rel="canonical"]'
      );


    return (
      canonical &&
      canonical.href

        ? canonical.href

        : window.location.href
    );

  }


  function addStyles() {

    if (
      document.getElementById(
        "gge-blog-engagement-style"
      )
    ) {
      return;
    }


    const style =
      document.createElement(
        "style"
      );


    style.id =
      "gge-blog-engagement-style";


    style.textContent =
      `

      .gge-blog-engagement {
        margin-top: 30px;
        padding-top: 24px;
        border-top: 1px solid #e7e7e7;
      }

      .gge-blog-engagement-bar {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }

      .gge-blog-engagement-button {
        border: 1px solid #d8dde7;
        background: #fff;
        color: #123a8c;
        padding: 11px 16px;
        border-radius: 999px;
        font: inherit;
        font-weight: 800;
        cursor: pointer;
      }

      .gge-blog-engagement-button:hover {
        background: #f7f9ff;
      }

      .gge-blog-engagement-button.liked {
        background: #fff0f3;
        border-color: #f1b5c2;
        color: #b42345;
      }

      .gge-blog-engagement-button:disabled {
        cursor: default;
        opacity: 1;
      }

      .gge-blog-panel {
        display: none;
        margin-top: 20px;
        padding: 22px;
        border: 1px solid #e2e6ed;
        border-radius: 14px;
        background: #f9fbff;
      }

      .gge-blog-panel.open {
        display: block;
      }

      .gge-blog-panel h3 {
        margin: 0 0 8px;
        color: #123a8c;
        font-size: 22px;
      }

      .gge-blog-panel > p {
        margin: 0;
        color: #666;
        line-height: 1.6;
      }

      .gge-blog-share-buttons {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 16px;
      }

      .gge-blog-share-link,
      .gge-blog-share-action {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 42px;
        border: 0;
        border-radius: 8px;
        padding: 10px 14px;
        background: #123a8c;
        color: #fff;
        text-decoration: none;
        font: inherit;
        font-weight: 800;
        cursor: pointer;
      }

      .gge-blog-share-link.pinterest {
        background: #bd081c;
      }

      .gge-blog-share-link.facebook {
        background: #1877f2;
      }

      .gge-blog-share-link.whatsapp {
        background: #168b47;
      }

      .gge-blog-share-action.copy {
        background: #f2bd16;
        color: #111;
      }

      .gge-blog-share-message {
        min-height: 20px;
        margin-top: 10px;
        color: #17652d;
        font-weight: 700;
        font-size: 14px;
      }

      .gge-blog-comment-list {
        margin: 18px 0;
      }

      .gge-blog-comment-item {
        padding: 14px;
        margin-bottom: 10px;
        background: #fff;
        border: 1px solid #e4e7ec;
        border-radius: 10px;
      }

      .gge-blog-comment-name {
        font-weight: 800;
        color: #123a8c;
        margin-bottom: 5px;
      }

      .gge-blog-comment-text {
        white-space: pre-line;
        line-height: 1.6;
        color: #444;
      }

      .gge-blog-comment-date {
        margin-top: 7px;
        color: #888;
        font-size: 12px;
      }

      .gge-blog-no-comments {
        color: #777;
        margin: 18px 0;
      }

      .gge-blog-comment-form {
        margin-top: 18px;
        padding: 18px;
        background: #fff;
        border-radius: 12px;
      }

      .gge-blog-comment-form label {
        display: block;
        font-weight: 800;
        margin: 0 0 7px;
      }

      .gge-blog-comment-form input,
      .gge-blog-comment-form textarea {
        width: 100%;
        padding: 12px;
        border: 1px solid #ccc;
        border-radius: 8px;
        font: inherit;
        margin-bottom: 14px;
      }

      .gge-blog-comment-form textarea {
        min-height: 110px;
        resize: vertical;
      }

      .gge-blog-comment-submit {
        width: 100%;
        border: 0;
        border-radius: 8px;
        background: #123a8c;
        color: #fff;
        padding: 13px;
        font-weight: 800;
        cursor: pointer;
      }

      .gge-blog-comment-submit:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      .gge-blog-comment-status {
        display: none;
        margin-top: 12px;
        padding: 11px;
        border-radius: 8px;
      }

      .gge-blog-comment-status.success {
        display: block;
        background: #e8f7ec;
        color: #17652d;
        border: 1px solid #b8dfc0;
      }

      .gge-blog-comment-status.error {
        display: block;
        background: #ffe8e8;
        color: #951d1d;
        border: 1px solid #efbbbb;
      }

      .gge-blog-honeypot {
        position: absolute !important;
        left: -9999px !important;
        width: 1px !important;
        height: 1px !important;
        overflow: hidden !important;
      }

      @media (max-width: 650px) {

        .gge-blog-engagement-bar,
        .gge-blog-share-buttons {
          flex-direction: column;
        }

        .gge-blog-engagement-button,
        .gge-blog-share-link,
        .gge-blog-share-action {
          width: 100%;
        }

      }

      `;


    document.head
      .appendChild(
        style
      );

  }


  async function fetchData() {

    const [
      postResult,
      likesResult,
      commentsResult
    ] =
      await Promise.all([

        db
          .from(
            "blog_posts"
          )
          .select(
            "id,title,slug,image_url,published"
          )
          .eq(
            "id",
            articleId
          )
          .eq(
            "published",
            true
          )
          .maybeSingle(),


        db
          .from(
            "blog_likes"
          )
          .select(
            "visitor_id"
          )
          .eq(
            "blog_post_id",
            articleId
          ),


        db
          .from(
            "blog_comments"
          )
          .select(
            "id,name,comment_text,created_at"
          )
          .eq(
            "blog_post_id",
            articleId
          )
          .eq(
            "approved",
            true
          )
          .order(
            "created_at",
            {
              ascending:
                true
            }
          )

      ]);


    if (
      postResult.error ||
      !postResult.data
    ) {
      return false;
    }


    currentPost =
      postResult.data;


    if (
      !likesResult.error &&
      Array.isArray(
        likesResult.data
      )
    ) {

      likeCount =
        likesResult
          .data
          .length;


      liked =
        likesResult
          .data
          .some(
            row =>
              row.visitor_id ===
              visitorId
          );

    }


    if (
      !commentsResult.error &&
      Array.isArray(
        commentsResult.data
      )
    ) {

      approvedComments =
        commentsResult.data;

    }


    return true;

  }


  async function addLike(
    button
  ) {

    if (
      liked
    ) {
      return;
    }


    button.disabled =
      true;


    const result =
      await db
        .from(
          "blog_likes"
        )
        .insert({

          blog_post_id:
            articleId,

          visitor_id:
            visitorId

        });


    if (
      result.error &&
      result.error.code !==
        "23505"
    ) {

      console.error(
        "Blog like:",
        result.error
      );


      button.disabled =
        false;


      return;

    }


    liked =
      true;


    likeCount +=
      1;


    refresh();

  }


  function renderComments() {

    const list =
      document.getElementById(
        "gge-blog-comment-list"
      );


    if (
      !list
    ) {
      return;
    }


    list.innerHTML =
      "";


    if (
      !approvedComments.length
    ) {

      const empty =
        document.createElement(
          "div"
        );


      empty.className =
        "gge-blog-no-comments";


      empty.textContent =
        t(
          "noComments"
        );


      list.appendChild(
        empty
      );


      return;

    }


    approvedComments
      .forEach(
        comment => {

          const item =
            document.createElement(
              "div"
            );


          item.className =
            "gge-blog-comment-item";


          const name =
            document.createElement(
              "div"
            );


          name.className =
            "gge-blog-comment-name";


          name.textContent =
            comment.name ||
            "Visitor";


          const text =
            document.createElement(
              "div"
            );


          text.className =
            "gge-blog-comment-text";


          text.textContent =
            comment.comment_text ||
            "";


          const date =
            document.createElement(
              "div"
            );


          date.className =
            "gge-blog-comment-date";


          date.textContent =
            formatDate(
              comment.created_at
            );


          item.appendChild(
            name
          );


          item.appendChild(
            text
          );


          item.appendChild(
            date
          );


          list.appendChild(
            item
          );

        }
      );

  }


  function buildShareButtons() {

    const box =
      document.getElementById(
        "gge-blog-share-buttons"
      );


    if (
      !box ||
      !currentPost
    ) {
      return;
    }


    const url =
      getShareUrl();


    const title =
      currentPost.title ||
      document.title;


    const image =
      currentPost.image_url ||
      "";


    const text =
      title +
      " — GiftedGift Empire";


    const links =
      [

        {

          className:
            "pinterest",

          label:
            t(
              "pinterest"
            ),

          href:
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
              text
            )

        },


        {

          className:
            "facebook",

          label:
            t(
              "facebook"
            ),

          href:
            "https://www.facebook.com/sharer/sharer.php?u=" +
            encodeURIComponent(
              url
            )

        },


        {

          className:
            "whatsapp",

          label:
            t(
              "whatsapp"
            ),

          href:
            "https://wa.me/?text=" +
            encodeURIComponent(
              text +
              "\n\n" +
              url
            )

        }

      ];


    box.innerHTML =
      "";


    links.forEach(
      item => {

        const link =
          document.createElement(
            "a"
          );


        link.className =
          "gge-blog-share-link " +
          item.className;


        link.href =
          item.href;


        link.target =
          "_blank";


        link.rel =
          "noopener noreferrer";


        link.textContent =
          item.label;


        box.appendChild(
          link
        );

      }
    );


    const copy =
      document.createElement(
        "button"
      );


    copy.type =
      "button";


    copy.className =
      "gge-blog-share-action copy";


    copy.textContent =
      t(
        "copy"
      );


    copy.addEventListener(
      "click",
      async function () {

        try {

          await navigator
            .clipboard
            .writeText(
              url
            );


        } catch (
          error
        ) {

          const area =
            document.createElement(
              "textarea"
            );


          area.value =
            url;


          document.body
            .appendChild(
              area
            );


          area.select();


          document.execCommand(
            "copy"
          );


          area.remove();

        }


        document
          .getElementById(
            "gge-blog-share-message"
          )
          .textContent =
            t(
              "copied"
            );

      }
    );


    box.appendChild(
      copy
    );


    if (
      typeof navigator.share ===
        "function"
    ) {

      const native =
        document.createElement(
          "button"
        );


      native.type =
        "button";


      native.className =
        "gge-blog-share-action";


      native.textContent =
        t(
          "share"
        );


      native.addEventListener(
        "click",
        async function () {

          try {

            await navigator
              .share({

                title,

                text,

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
                "Native share error:",
                error
              );

            }

          }

        }
      );


      box.appendChild(
        native
      );

    }

  }


  function refresh() {

    const like =
      document.getElementById(
        "gge-blog-like"
      );


    const comments =
      document.getElementById(
        "gge-blog-comments"
      );


    const share =
      document.getElementById(
        "gge-blog-share"
      );


    if (
      like
    ) {

      like.textContent =
        (
          liked

            ? (
                "❤️ " +
                t(
                  "liked"
                )
              )

            : (
                "♡ " +
                t(
                  "like"
                )
              )
        ) +
        " · " +
        likeCount;


      like.classList.toggle(
        "liked",
        liked
      );


      like.disabled =
        liked;

    }


    if (
      comments
    ) {

      comments.textContent =
        "💬 " +
        t(
          "comments"
        ) +
        " · " +
        approvedComments.length;

    }


    if (
      share
    ) {

      share.textContent =
        "↗ " +
        t(
          "share"
        );

    }


    const shareTitle =
      document.getElementById(
        "gge-blog-share-title"
      );


    const shareText =
      document.getElementById(
        "gge-blog-share-text"
      );


    const nameLabel =
      document.getElementById(
        "gge-blog-name-label"
      );


    const commentLabel =
      document.getElementById(
        "gge-blog-comment-label"
      );


    const nameInput =
      document.getElementById(
        "gge-blog-comment-name"
      );


    const commentInput =
      document.getElementById(
        "gge-blog-comment-text"
      );


    const submit =
      document.getElementById(
        "gge-blog-comment-submit"
      );


    const commentsHeading =
      document.getElementById(
        "gge-blog-comments-heading"
      );


    if (
      shareTitle
    ) {
      shareTitle.textContent =
        t(
          "shareTitle"
        );
    }


    if (
      shareText
    ) {
      shareText.textContent =
        t(
          "shareText"
        );
    }


    if (
      nameLabel
    ) {
      nameLabel.textContent =
        t(
          "yourName"
        );
    }


    if (
      commentLabel
    ) {
      commentLabel.textContent =
        t(
          "yourComment"
        );
    }


    if (
      nameInput
    ) {
      nameInput.placeholder =
        t(
          "namePlaceholder"
        );
    }


    if (
      commentInput
    ) {
      commentInput.placeholder =
        t(
          "commentPlaceholder"
        );
    }


    if (
      submit
    ) {
      submit.textContent =
        t(
          "postComment"
        );
    }


    if (
      commentsHeading
    ) {
      commentsHeading.textContent =
        t(
          "comments"
        );
    }


    renderComments();


    buildShareButtons();

  }


  function bindCommentForm() {

    const form =
      document.getElementById(
        "gge-blog-comment-form"
      );


    if (
      !form
    ) {
      return;
    }


    form.addEventListener(
      "submit",
      async function (
        event
      ) {

        event.preventDefault();


        const name =
          document
            .getElementById(
              "gge-blog-comment-name"
            )
            .value
            .trim();


        const commentText =
          document
            .getElementById(
              "gge-blog-comment-text"
            )
            .value
            .trim();


        const website =
          document
            .getElementById(
              "gge-blog-comment-website"
            )
            .value
            .trim();


        const status =
          document.getElementById(
            "gge-blog-comment-status"
          );


        const button =
          document.getElementById(
            "gge-blog-comment-submit"
          );


        status.className =
          "gge-blog-comment-status";


        if (
          website
        ) {

          form.reset();


          status.textContent =
            t(
              "pending"
            );


          status.classList.add(
            "success"
          );


          return;

        }


        if (
          !name ||
          !commentText
        ) {

          status.textContent =
            !name

              ? t(
                  "namePlaceholder"
                )

              : t(
                  "commentPlaceholder"
                );


          status.classList.add(
            "error"
          );


          return;

        }


        button.disabled =
          true;


        button.textContent =
          t(
            "sending"
          );


        const result =
          await db
            .from(
              "blog_comments"
            )
            .insert({

              blog_post_id:
                articleId,

              name,

              comment_text:
                commentText,

              approved:
                false,

              approved_at:
                null

            });


        button.disabled =
          false;


        button.textContent =
          t(
            "postComment"
          );


        if (
          result.error
        ) {

          console.error(
            "Blog comment:",
            result.error
          );


          status.textContent =
            t(
              "error"
            );


          status.classList.add(
            "error"
          );


          return;

        }


        form.reset();


        status.textContent =
          t(
            "pending"
          );


        status.classList.add(
          "success"
        );

      }
    );

  }


  function buildUI(
    anchor
  ) {

    if (
      document.getElementById(
        "gge-blog-engagement"
      )
    ) {
      return;
    }


    const wrapper =
      document.createElement(
        "section"
      );


    wrapper.id =
      "gge-blog-engagement";


    wrapper.className =
      "gge-blog-engagement";


    wrapper.innerHTML =
      `

      <div class="gge-blog-engagement-bar">

        <button
          id="gge-blog-like"
          class="gge-blog-engagement-button"
          type="button"
        ></button>

        <button
          id="gge-blog-comments"
          class="gge-blog-engagement-button"
          type="button"
        ></button>

        <button
          id="gge-blog-share"
          class="gge-blog-engagement-button"
          type="button"
        ></button>

      </div>


      <section
        id="gge-blog-share-panel"
        class="gge-blog-panel"
        aria-hidden="true"
      >

        <h3
          id="gge-blog-share-title"
        ></h3>

        <p
          id="gge-blog-share-text"
        ></p>

        <div
          id="gge-blog-share-buttons"
          class="gge-blog-share-buttons"
        ></div>

        <div
          id="gge-blog-share-message"
          class="gge-blog-share-message"
          aria-live="polite"
        ></div>

      </section>


      <section
        id="gge-blog-comments-panel"
        class="gge-blog-panel"
        aria-hidden="true"
      >

        <h3>
          💬
          <span
            id="gge-blog-comments-heading"
          ></span>
        </h3>


        <div
          id="gge-blog-comment-list"
          class="gge-blog-comment-list"
        ></div>


        <form
          id="gge-blog-comment-form"
          class="gge-blog-comment-form"
        >

          <label
            id="gge-blog-name-label"
            for="gge-blog-comment-name"
          ></label>

          <input
            id="gge-blog-comment-name"
            type="text"
            maxlength="80"
            required
            autocomplete="name"
          >


          <label
            id="gge-blog-comment-label"
            for="gge-blog-comment-text"
          ></label>

          <textarea
            id="gge-blog-comment-text"
            maxlength="1000"
            required
          ></textarea>


          <div
            class="gge-blog-honeypot"
            aria-hidden="true"
          >

            <label
              for="gge-blog-comment-website"
            >
              Website
            </label>

            <input
              id="gge-blog-comment-website"
              type="text"
              tabindex="-1"
              autocomplete="off"
            >

          </div>


          <button
            id="gge-blog-comment-submit"
            class="gge-blog-comment-submit"
            type="submit"
          ></button>


          <div
            id="gge-blog-comment-status"
            class="gge-blog-comment-status"
            aria-live="polite"
          ></div>

        </form>

      </section>

      `;


    anchor.insertAdjacentElement(
      "afterend",
      wrapper
    );


    document
      .getElementById(
        "gge-blog-like"
      )
      .addEventListener(
        "click",
        function (
          event
        ) {

          addLike(
            event.currentTarget
          );

        }
      );


    document
      .getElementById(
        "gge-blog-comments"
      )
      .addEventListener(
        "click",
        function () {

          const panel =
            document.getElementById(
              "gge-blog-comments-panel"
            );


          const open =
            !panel
              .classList
              .contains(
                "open"
              );


          panel
            .classList
            .toggle(
              "open",
              open
            );


          panel.setAttribute(
            "aria-hidden",
            open
              ? "false"
              : "true"
          );

        }
      );


    document
      .getElementById(
        "gge-blog-share"
      )
      .addEventListener(
        "click",
        function () {

          const panel =
            document.getElementById(
              "gge-blog-share-panel"
            );


          const open =
            !panel
              .classList
              .contains(
                "open"
              );


          panel
            .classList
            .toggle(
              "open",
              open
            );


          panel.setAttribute(
            "aria-hidden",
            open
              ? "false"
              : "true"
          );

        }
      );


    bindCommentForm();


    refresh();

  }


  async function waitForArticle() {

    for (
      let i = 0;
      i < 100;
      i += 1
    ) {

      const single =
        document.getElementById(
          "single-article"
        );


      const content =
        document.getElementById(
          "article-content"
        );


      if (
        single &&
        content &&
        single.style.display ===
          "block"
      ) {

        return content;

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


  async function start() {

    addStyles();


    const anchor =
      await waitForArticle();


    if (
      !anchor
    ) {
      return;
    }


    const okay =
      await fetchData();


    if (
      !okay
    ) {
      return;
    }


    buildUI(
      anchor
    );


    new MutationObserver(
      function () {

        refresh();

      }
    )
      .observe(
        document.documentElement,
        {

          attributes:
            true,

          attributeFilter:
            [
              "lang"
            ]

        }
      );

  }


  start();

})();
