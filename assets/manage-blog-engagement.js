(function () {
  "use strict";

  const ADMIN_USER_ID =
    "57a302e5-9a38-443b-8568-cc32c5a91bdf";

  const db =
    supabase.createClient(
      "https://mvoxizdzjmtcvokowhpd.supabase.co",
      "sb_publishable_5wjUjC6amD7e2H_3h_7UQw_TY6orH16"
    );

  let postTitles = {};


  function addStyles() {

    const style =
      document.createElement(
        "style"
      );

    style.textContent = `

      .blog-comment-admin {
        margin-top: 24px;
      }

      .blog-comment-admin-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
      }

      .blog-comment-count {
        background: #fff3cd;
        color: #6b5500;
        padding: 7px 12px;
        border-radius: 999px;
        font-weight: 700;
      }

      .blog-comment-card {
        padding: 16px;
        margin-top: 14px;
        border: 1px solid #ddd;
        border-radius: 10px;
        background: #fafafa;
      }

      .blog-comment-card.pending {
        border-left: 5px solid #f2bd16;
      }

      .blog-comment-card.approved {
        border-left: 5px solid #2e8b57;
      }

      .blog-comment-post {
        font-weight: 800;
        color: #123a8c;
        margin-bottom: 7px;
      }

      .blog-comment-name {
        font-weight: 800;
        margin-bottom: 7px;
      }

      .blog-comment-text {
        line-height: 1.6;
        white-space: pre-line;
        margin-bottom: 10px;
      }

      .blog-comment-date {
        font-size: 12px;
        color: #777;
        margin-bottom: 12px;
      }

      .blog-comment-actions {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }

      .blog-comment-actions button {
        flex: 1;
        min-width: 120px;
      }

      .approve-blog-comment {
        background: #2e8b57;
        color: white;
      }

      .delete-blog-comment {
        background: #c62828;
        color: white;
      }

      .blog-comment-empty {
        margin-top: 15px;
        padding: 20px;
        text-align: center;
        background: #f5f5f5;
        border-radius: 8px;
      }

    `;

    document.head.appendChild(
      style
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

    return new Date(
      value
    ).toLocaleString(
      "en-GB",
      {
        timeZone:
          "Europe/Paris"
      }
    );

  }


  function createSection() {

    if (
      document.getElementById(
        "blog-comment-admin"
      )
    ) {
      return;
    }


    const main =
      document.querySelector(
        "main"
      );


    const section =
      document.createElement(
        "section"
      );


    section.id =
      "blog-comment-admin";


    section.className =
      "card blog-comment-admin";


    section.innerHTML = `

      <div class="blog-comment-admin-header">

        <h2>
          💬 Blog Comment Moderation
        </h2>

        <span
          id="blog-pending-count"
          class="blog-comment-count"
        >
          Pending: 0
        </span>

      </div>

      <div
        id="blog-comment-admin-list"
      >
        Loading comments...
      </div>

    `;


    main.appendChild(
      section
    );

  }


  async function loadComments() {

    const list =
      document.getElementById(
        "blog-comment-admin-list"
      );


    const postsResult =
      await db
        .from(
          "blog_posts"
        )
        .select(
          "id,title"
        );


    postTitles =
      {};


    if (
      !postsResult.error
    ) {

      postsResult.data.forEach(
        post => {

          postTitles[
            post.id
          ] =
            post.title;

        }
      );

    }


    const result =
      await db
        .from(
          "blog_comments"
        )
        .select(
          "id,blog_post_id,name,comment_text,approved,created_at,approved_at"
        )
        .order(
          "created_at",
          {
            ascending:
              false
          }
        );


    if (
      result.error
    ) {

      console.error(
        result.error
      );

      list.innerHTML =
        "Comments could not be loaded.";

      return;

    }


    const comments =
      result.data || [];


    const pending =
      comments.filter(
        item =>
          !item.approved
      );


    document
      .getElementById(
        "blog-pending-count"
      )
      .textContent =
        "Pending: " +
        pending.length;


    list.innerHTML =
      "";


    if (
      !comments.length
    ) {

      list.innerHTML = `

        <div class="blog-comment-empty">
          No blog comments yet.
        </div>

      `;

      return;

    }


    comments.forEach(
      comment => {

        const card =
          document.createElement(
            "div"
          );


        card.className =
          "blog-comment-card " +
          (
            comment.approved
              ? "approved"
              : "pending"
          );


        card.innerHTML = `

          <div class="blog-comment-post">
            ${escapeHTML(
              postTitles[
                comment.blog_post_id
              ] ||
              "Blog Article"
            )}
          </div>

          <div class="blog-comment-name">
            ${escapeHTML(
              comment.name
            )}
          </div>

          <div class="blog-comment-text">
            ${escapeHTML(
              comment.comment_text
            )}
          </div>

          <div class="blog-comment-date">
            ${formatDate(
              comment.created_at
            )}
          </div>

          <div class="blog-comment-actions">

            ${
              !comment.approved

                ? `
                  <button
                    class="approve-blog-comment"
                    data-id="${comment.id}"
                    type="button"
                  >
                    Approve
                  </button>
                `

                : ""
            }

            <button
              class="delete-blog-comment"
              data-id="${comment.id}"
              type="button"
            >
              Delete
            </button>

          </div>

        `;


        list.appendChild(
          card
        );

      }
    );


    document
      .querySelectorAll(
        ".approve-blog-comment"
      )
      .forEach(
        button => {

          button.addEventListener(
            "click",
            function () {

              approveComment(
                Number(
                  this.dataset.id
                )
              );

            }
          );

        }
      );


    document
      .querySelectorAll(
        ".delete-blog-comment"
      )
      .forEach(
        button => {

          button.addEventListener(
            "click",
            function () {

              deleteComment(
                Number(
                  this.dataset.id
                )
              );

            }
          );

        }
      );

  }


  async function approveComment(
    id
  ) {

    const result =
      await db
        .from(
          "blog_comments"
        )
        .update({

          approved:
            true,

          approved_at:
            new Date()
              .toISOString()

        })
        .eq(
          "id",
          id
        );


    if (
      result.error
    ) {

      alert(
        "Could not approve comment."
      );

      return;

    }


    await loadComments();

  }


  async function deleteComment(
    id
  ) {

    if (
      !confirm(
        "Delete this comment?"
      )
    ) {
      return;
    }


    const result =
      await db
        .from(
          "blog_comments"
        )
        .delete()
        .eq(
          "id",
          id
        );


    if (
      result.error
    ) {

      alert(
        "Could not delete comment."
      );

      return;

    }


    await loadComments();

  }


  function escapeHTML(
    value
  ) {

    return String(
      value || ""
    )
      .replace(
        /&/g,
        "&amp;"
      )
      .replace(
        /</g,
        "&lt;"
      )
      .replace(
        />/g,
        "&gt;"
      )
      .replace(
        /"/g,
        "&quot;"
      )
      .replace(
        /'/g,
        "&#039;"
      );

  }


  async function start() {

    const sessionResult =
      await db.auth
        .getSession();


    const session =
      sessionResult
        .data
        .session;


    if (
      !session ||
      session.user.id !==
        ADMIN_USER_ID
    ) {
      return;
    }


    addStyles();

    createSection();

    await loadComments();

  }


  start();

})();
