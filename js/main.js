/* ==================================================
   GLOBAL BLOG SYSTEM - RiseUp
   Author: You 🙂
================================================== */

const POSTS_URL = "data/posts.json";

/* =========================
   FETCH POSTS (Reusable)
========================= */
async function fetchPosts() {
  try {
    const res = await fetch(POSTS_URL);
    if (!res.ok) throw new Error("Failed to load posts");
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

/* =========================
   RENDER POST CARDS
========================= */
function renderPostCards(posts, container) {
  if (!container) return;

  container.innerHTML = "";

  posts.forEach(post => {
    const card = document.createElement("article");
    card.className = "post";

    card.innerHTML = `
      <img src="${post.image}" alt="${post.title}">
      <div class="post-content">
        <h3>${post.title}</h3>
        <p>${post.description}</p>
        <a href="post.html?id=${post.id}" class="btn">বিস্তারিত পড়ুন</a>
      </div>
    `;

    container.appendChild(card);
  });
}

/* =========================
   HOME PAGE
========================= */
async function initHomePage() {
  const container = document.getElementById("postContainer");
  if (!container) return;

  const posts = await fetchPosts();
  const latestPosts = posts.slice(0, 3);

  renderPostCards(latestPosts, container);
}

/* =========================
   BLOG LIST PAGE
========================= */
async function initBlogPage() {
  const container = document.getElementById("postContainer");
  if (!container) return;

  const posts = await fetchPosts();
  renderPostCards(posts, container);
}

/* =========================
   SINGLE POST PAGE
========================= */
async function initPostPage() {
  const blogContent = document.getElementById("blogContent");
  if (!blogContent) return;

  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));

  if (!id) {
    blogContent.innerHTML = "<h2>পোস্ট পাওয়া যায়নি</h2>";
    return;
  }

  const posts = await fetchPosts();
  const post = posts.find(p => p.id === id);

  if (!post) {
    blogContent.innerHTML = "<h2>পোস্ট পাওয়া যায়নি</h2>";
    return;
  }

  blogContent.innerHTML = `
    <article class="single-post">
      <h1>${post.title}</h1>
      <p class="post-date">📅 ${post.publishedDate}</p>
      <img src="${post.image}" alt="${post.title}">
      <div class="post-body">
        ${post.content}
      </div>
    </article>
  `;
}

/* =========================
   RANDOM QUOTE (HOME)
========================= */
function initQuote() {
  const quoteBox = document.getElementById("quote");
  if (!quoteBox) return;

  const quotes = [
    "আজকের ছোট পদক্ষেপই আগামীকালের বড় সাফল্য।",
    "নিজেকে বিশ্বাস করো — তুমিই তোমার সবচেয়ে বড় শক্তি।",
    "পরিশ্রম কখনো বৃথা যায় না।",
    "স্বপ্ন দেখো, সাহস করো, এগিয়ে যাও।"
  ];

  const random = Math.floor(Math.random() * quotes.length);
  quoteBox.textContent = quotes[random];
}

/* =========================
   INIT APP (AUTO-DETECT PAGE)
========================= */
document.addEventListener("DOMContentLoaded", () => {
  initHomePage();
  initBlogPage();
  initPostPage();
  initQuote();
});
