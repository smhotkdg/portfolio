// content/*.json → _site/ 정적 사이트 생성. 외부 패키지 없이 Node 18+ 로 실행: node build.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(ROOT, "_site");
const read = (name) => JSON.parse(fs.readFileSync(path.join(ROOT, "content", `${name}.json`), "utf8"));

const site = read("site");
const profile = read("profile");
const teaching = read("teaching");
const research = read("research");
const games = read("games");
const career = read("career");
const education = read("education");
const activities = read("activities");

/* ---------- helpers ---------- */
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const isTodo = (v) => typeof v === "string" && v.startsWith("TODO");
const txt = (v) => (isTodo(v) ? `<span class="todo">입력 필요</span>` : esc(v));
const exists = (p) => fs.existsSync(path.join(ROOT, p));
const up = (depth) => "../".repeat(depth);
const src = (p, depth) => up(depth) + p.split("/").map(encodeURIComponent).join("/");

function period(start, end) {
  if (isTodo(start)) return txt(start);
  if (end === null) return `${esc(start)} – 현재`;
  if (!end || end === start) return esc(start);
  return `${esc(start)} – ${esc(end)}`;
}

function ext(url, label, cls = "") {
  return `<a class="${cls}" href="${esc(url)}" target="_blank" rel="noopener">${esc(label)}</a>`;
}

const notice = site.storeNotice?.enabled ? site.storeNotice : null;
const isClosedStore = (l) => notice && notice.stores.includes(l.type);
function links(list) {
  if (!list?.length) return "";
  return `<ul class="links">${list
    .map((l) =>
      isClosedStore(l)
        ? `<li><a class="store-off" href="#store-notice" data-store="${esc(l.label)}">${esc(l.label)}</a></li>`
        : `<li>${ext(l.url, l.label)}</li>`
    )
    .join("")}</ul>`;
}

function noticeDialog() {
  if (!notice) return "";
  return `<dialog id="store-notice" class="notice" aria-labelledby="store-notice-title">
  <h2 id="store-notice-title">${esc(notice.title)}</h2>
  <p data-template="${esc(notice.body)}">${esc(notice.body.replace("{store}", "스토어"))}</p>
  <form method="dialog"><button type="submit" autofocus>${esc(notice.button)}</button></form>
</dialog>`;
}

function chips(list, cls = "") {
  if (!list?.length) return "";
  return `<ul class="chips ${cls}">${list.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>`;
}

function metrics(list) {
  if (!list?.length) return "";
  return `<ul class="metrics">${list.map((m) => `<li><b>${esc(m.value)}</b><span>${esc(m.label)}</span></li>`).join("")}</ul>`;
}

function bullets(list, cls = "") {
  if (!list?.length) return "";
  return `<ul class="bullets ${cls}">${list.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>`;
}

// 원본 GIF 옆에 같은 이름의 .mp4/.jpg 가 있으면 영상으로 재생, 없으면 원본 그대로
function media(p, depth, alt) {
  const base = p.replace(/\.gif$/i, "");
  if (/\.gif$/i.test(p) && exists(base + ".mp4")) {
    return `<figure class="clip">
      <video src="${src(base + ".mp4", depth)}" poster="${src(base + ".jpg", depth)}" muted loop playsinline autoplay preload="none" aria-label="${esc(alt)}"></video>
      <figcaption><a href="${src(p, depth)}" target="_blank" rel="noopener">원본 GIF</a></figcaption>
    </figure>`;
  }
  return `<figure class="clip"><img src="${src(p, depth)}" alt="${esc(alt)}" loading="lazy"></figure>`;
}

function gallery(images, depth, alt) {
  if (!images?.length) return "";
  return `<div class="gallery">${images
    .map((p, i) => `<a href="${src(p, depth)}" target="_blank" rel="noopener"><img src="${src(p, depth)}" alt="${esc(alt)} 자료 ${i + 1}" loading="lazy"></a>`)
    .join("")}</div>`;
}

const sectionHead = (title, en, extra = "") =>
  `<div class="sec-head"><h2>${title}</h2><span class="en">${en}</span>${extra}</div>`;

/* ---------- page shell ---------- */
const NAV = [
  ["teaching", "강의"],
  ["now", "진행 중"],
  ["research", "연구"],
  ["games", "게임 개발"],
  ["career", "경력·학력"],
  ["activities", "수상·활동"],
];

// CSS·JS 내용이 바뀌면 주소도 바뀌게 해서 브라우저 캐시 때문에 옛 파일이 쓰이지 않도록 함
const VER = crypto.createHash("sha1")
  .update(fs.readFileSync(path.join(ROOT, "src", "styles.css")))
  .update(fs.readFileSync(path.join(ROOT, "src", "main.js")))
  .digest("hex").slice(0, 8);

const builtAt = new Date().toLocaleDateString("ko-KR", { timeZone: "Asia/Seoul", year: "numeric", month: "2-digit", day: "2-digit" }).replace(/\.\s?/g, ".").replace(/\.$/, "");

function page({ title, description, depth, body, image, pathName }) {
  const home = depth ? `${up(depth)}index.html` : "";
  return `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(site.url + (pathName || ""))}">
<meta property="og:image" content="${esc(site.url + (image || profile.avatar))}">
<link rel="canonical" href="${esc(site.url + (pathName || ""))}">
<link rel="icon" href="${up(depth)}assets/favicon.ico">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans+KR:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="${up(depth)}styles.css?v=${VER}">
</head>
<body>
<a class="skip" href="#main">본문으로 건너뛰기</a>
<nav class="topnav" aria-label="섹션">
  <div class="topnav-in">
    <a class="brand" href="${home || "#top"}">${esc(profile.name)}</a>
    <ul>${NAV.map(([id, label]) => `<li><a href="${home}#${id}">${label}</a></li>`).join("")}</ul>
  </div>
</nav>
<main id="main">
${body}
</main>
<footer class="foot">
  <div class="wrap">
    <span>© ${new Date().getFullYear()} ${esc(profile.name)} · ${esc(profile.nameEn)}</span>
    <span>최종 업데이트 ${builtAt}</span>
    <a href="${esc(site.repo)}" target="_blank" rel="noopener">GitHub에서 보기</a>
  </div>
</footer>
${noticeDialog()}
<script src="${up(depth)}main.js?v=${VER}" defer></script>
</body>
</html>
`;
}

/* ---------- index sections ---------- */
function hero() {
  const p = profile;
  const funded = research.filter((r) => r.category !== "student").length;
  const facts = [
    [p.careerTotal, "실무 경력"],
    [`${games.length}종`, "모바일 게임 개발"],
    [`${funded}건`, "연구·수탁 과제"],
    ["ISVC'15", "국제학회 논문"],
  ];
  return `<header class="hero wrap" id="top">
  <div class="hero-text">
    <p class="en-name">${esc(p.nameEn)}</p>
    <h1>${esc(p.name)}</h1>
    <p class="position">${esc(p.position)}</p>
    <p class="headline">${esc(p.headline)}</p>
    <div class="summary">${p.summary.map((s) => `<p>${esc(s)}</p>`).join("")}</div>
    <dl class="contacts">${p.contacts
      .map((c) => `<div><dt>${esc(c.label)}</dt><dd>${c.url ? ext(c.url, c.value) : `<span class="selectable">${esc(c.value)}</span>`}</dd></div>`)
      .join("")}</dl>
  </div>
  <div class="hero-side">
    <img class="avatar" src="${src(p.avatar, 0)}" alt="${esc(p.name)} 사진" width="160" height="160">
    <ul class="facts">${facts.map(([v, l]) => `<li><b>${esc(v)}</b><span>${esc(l)}</span></li>`).join("")}</ul>
    ${chips(p.keywords, "keywords")}
  </div>
</header>`;
}

function teachingSection() {
  const terms = teaching.terms
    .map(
      (t) => `<div class="table-scroll"><table class="courses">
      <caption>${esc(t.term)}</caption>
      <thead><tr><th scope="col">과목</th><th scope="col">구분</th><th scope="col">내용</th></tr></thead>
      <tbody>${t.courses
        .map((c) => `<tr><th scope="row">${esc(c.name)}</th><td class="mono">${esc(c.credits)}학점 · ${esc(c.level)}</td><td>${esc(c.summary)}</td></tr>`)
        .join("")}</tbody></table></div>`
    )
    .join("");
  const talks = teaching.talks
    .map((t) => `<div class="row"><div class="when">${esc(t.date)}</div><div><h3>${esc(t.title)}</h3><p class="sub">${esc(t.subtitle)} · ${esc(t.venue)}</p></div></div>`)
    .join("");
  return `<section class="wrap section" id="teaching">
  ${sectionHead("강의", "Teaching")}
  ${terms}
  <div class="split">
    <div><h3 class="minor">공개강의 · 발표</h3><div class="rows">${talks}</div></div>
    <div><h3 class="minor">교육 자료</h3>${bullets(teaching.materials)}</div>
  </div>
</section>`;
}

function nowSection() {
  const rows = teaching.projects
    .map(
      (p) => `<article class="row">
      <div class="when">${period(p.start, p.end)}${p.end === null ? `<span class="status live">진행 중</span>` : ""}</div>
      <div>
        <h3>${esc(p.title)}</h3>
        <p class="sub">${esc(p.subtitle)}</p>
        <p>${esc(p.summary)}</p>
        ${metrics(p.metrics)}
        ${chips(p.stack, "stack")}
        ${links(p.links)}
      </div>
    </article>`
    )
    .join("");
  return `<section class="wrap section" id="now">
  ${sectionHead("진행 중인 프로젝트", "Current work")}
  <div class="rows">${rows}</div>
</section>`;
}

function researchRow(r) {
  const meta = [r.sponsor ? `지원 ${r.sponsor}` : null, r.org].filter(Boolean).map(esc).join(" · ");
  return `<article class="row research-row">
    <div class="when">${period(r.start, r.end)}</div>
    <div class="research-body">
      <a class="thumb" href="research/${r.id}.html" tabindex="-1" aria-hidden="true">${r.cover ? `<img src="${src(r.cover, 0)}" alt="" loading="lazy">` : ""}</a>
      <div>
        <h3><a href="research/${r.id}.html">${esc(r.title)}</a></h3>
        <p class="sub">${meta}</p>
        <p>${esc(r.summary)}</p>
        ${metrics(r.metrics)}
        ${chips(r.stack, "stack")}
      </div>
    </div>
  </article>`;
}

function researchSection() {
  const main = research.filter((r) => r.category !== "student");
  const student = research.filter((r) => r.category === "student");
  return `<section class="wrap section" id="research">
  ${sectionHead("연구", "Research")}
  <h3 class="minor">연구 · 수탁 과제</h3>
  <div class="rows">${main.map(researchRow).join("")}</div>
  <h3 class="minor">학부 프로젝트</h3>
  <div class="rows">${student.map(researchRow).join("")}</div>
</section>`;
}

/* 게임 개발 일정 차트: 월 단위 막대 + 창업 시점 차선 점선 */
function ym(s) {
  const [y, m] = s.split(".").map(Number);
  return y * 12 + (m - 1);
}
function gameChart() {
  const startYear = Math.min(...games.map((g) => Number(g.start.slice(0, 4))));
  const hoit = career.find((c) => c.id === "hoitstudio");
  const endYear = Number(hoit.end.slice(0, 4));
  const m0 = startYear * 12;
  const months = (endYear + 1) * 12 - m0;
  const labelW = 150, colW = 9, rowH = 26, top = 30;
  const W = labelW + months * colW + 8;
  const sorted = [...games].sort((a, b) => ym(a.start) - ym(b.start));
  const H = top + sorted.length * rowH + 8;
  const x = (m) => labelW + (m - m0) * colW;
  let svg = "";
  for (let y = startYear; y <= endYear; y++) {
    const gx = x(y * 12);
    svg += `<line class="grid" x1="${gx}" y1="${top - 8}" x2="${gx}" y2="${H - 4}"/><text class="tick" x="${gx + 4}" y="${top - 14}">${y}</text>`;
  }
  const f = x(ym(hoit.start));
  svg += `<line class="lane" x1="${f}" y1="${top - 8}" x2="${f}" y2="${H - 4}"/><text class="lane-label" x="${f + 4}" y="${H - 8}">Hoit Studio 창업 ${esc(hoit.start)}</text>`;
  sorted.forEach((g, i) => {
    const y = top + i * rowH;
    const a = x(ym(g.start));
    const b = x(ym(g.end || g.start) + 1);
    svg += `<a href="games/${g.id}.html"><text class="glabel" x="0" y="${y + 16}">${esc(g.title)}</text>
      <rect class="bar" x="${a}" y="${y + 5}" width="${Math.max(b - a, colW)}" height="14" rx="2"><title>${esc(g.title)} ${esc(g.start)} – ${esc(g.end)} (개발 ${esc(g.devDuration)})</title></rect>
      <text class="dur" x="${b + 6}" y="${y + 16}">${esc(g.devDuration)}</text></a>`;
  });
  return `<figure class="chart">
    <div class="chart-scroll"><svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="게임별 개발 기간 타임라인">${svg}</svg></div>
    <figcaption>막대는 기획부터 출시·초기 운영까지의 기간, 오른쪽 숫자는 실제 개발 기간입니다.</figcaption>
  </figure>`;
}

function gameCard(g) {
  return `<li class="game-card">
    <a href="games/${g.id}.html">
      <img src="${src(g.cover, 0)}" alt="" loading="lazy">
      <div class="gc-body">
        <h3>${esc(g.title)}</h3>
        <p class="sub">${esc(g.subtitle)}</p>
        <p class="gc-meta"><span class="mono">${period(g.start, g.end)}</span><span>${esc(g.genre)}</span></p>
        ${chips(g.platforms.length ? g.platforms : ["미출시"], "platforms")}
      </div>
    </a>
  </li>`;
}

function opsBlock() {
  const ops = profile.studio?.operations;
  if (!ops?.length) return "";
  return `<div class="ops">
    <h3 class="minor">출시 후 운영</h3>
    <div class="ops-grid">${ops
      .map((o) => `<div class="op"><h4>${esc(o.title)}</h4><p>${esc(o.desc)}</p>${chips(o.tools, "stack")}</div>`)
      .join("")}</div>
  </div>`;
}

function gamesSection() {
  return `<section class="wrap section" id="games">
  ${sectionHead("게임 개발", "Games", `<span class="sec-note">Hoit Studio · Unity · 팀 3명</span>`)}
  ${gameChart()}
  ${opsBlock()}
  <ul class="game-grid">${games.map(gameCard).join("")}</ul>
</section>`;
}

function careerSection() {
  const jobs = career
    .map(
      (c) => `<article class="row">
      <div class="when">${period(c.start, c.end)}</div>
      <div>
        <h3>${esc(c.org)} <span class="title">${esc(c.title)}</span></h3>
        ${c.unit ? `<p class="sub">${esc(c.unit)}</p>` : ""}
        <p>${esc(c.summary)}</p>
        ${bullets(c.details, "compact")}
      </div>
    </article>`
    )
    .join("");
  const edu = education
    .map(
      (e) => `<article class="row">
      <div class="when">${period(e.start, e.end)}</div>
      <div>
        <h3>${esc(e.school)} <span class="title">${esc(e.major)} ${esc(e.degree)}</span></h3>
        ${e.thesis ? `<p>${esc(e.thesis.ko)}</p><p class="sub en-text">${esc(e.thesis.en)}</p>` : ""}
      </div>
    </article>`
    )
    .join("");
  return `<section class="wrap section" id="career">
  ${sectionHead("경력 · 학력", "Experience", `<span class="sec-note">총 ${esc(profile.careerTotal)}</span>`)}
  <div class="rows">${jobs}</div>
  <h3 class="minor">학력</h3>
  <div class="rows">${edu}</div>
</section>`;
}

const TYPE_LABEL = { award: "수상", program: "선정", exhibition: "전시", publication: "논문", conference: "학회", contract: "계약", training: "교육" };

const sortKey = (s) => (isTodo(s) ? "0" : String(s).padEnd(10, "."));
function activitiesSection() {
  const rows = [...activities]
    .sort((a, b) => sortKey(b.start).localeCompare(sortKey(a.start)))
    .map((a) => {
      const extra = (a.images || []).filter((p) => p !== a.cover);
      return `<article class="row activity">
      <div class="when">${period(a.start, a.end === null ? undefined : a.end)}</div>
      <div class="activity-body">
        ${a.cover ? `<img class="act-thumb" src="${src(a.cover, 0)}" alt="" loading="lazy">` : ""}
        <div>
          <p class="type">${TYPE_LABEL[a.type] || ""}</p>
          <h3>${esc(a.title)}</h3>
          <p class="sub">${esc(a.org)}${a.desc ? ` · ${esc(a.desc)}` : ""}</p>
          ${links(a.links)}
          ${extra.length ? `<details class="photos"><summary>사진 ${extra.length}장</summary>${gallery(extra, 0, a.title)}</details>` : ""}
        </div>
      </div>
    </article>`;
    })
    .join("");
  return `<section class="wrap section" id="activities">
  ${sectionHead("수상 · 활동", "Awards & Activities")}
  <div class="rows">${rows}</div>
</section>`;
}

/* ---------- detail pages ---------- */
function dl(pairs) {
  return `<dl class="facts-dl">${pairs
    .filter(([, v]) => v !== null && v !== undefined && v !== "")
    .map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`)
    .join("")}</dl>`;
}

function pager(list, i, dir, label) {
  const prev = list[i - 1], next = list[i + 1];
  return `<nav class="pager" aria-label="${label} 이동">
    ${prev ? `<a href="${prev.id}.html"><span>이전</span>${esc(prev.title)}</a>` : "<span></span>"}
    ${next ? `<a class="next" href="${next.id}.html"><span>다음</span>${esc(next.title)}</a>` : "<span></span>"}
  </nav>`;
}

function gamePage(g, i) {
  const c = g.contribution;
  const contrib = c
    ? `<ul class="contrib">${[["개발", c.dev], ["UI/UX", c.uiux], ["기획", c.design]]
        .map(([k, v]) => `<li><span>${k}</span><span class="meter"><span style="width:${Number(v)}%"></span></span><b>${v}</b></li>`)
        .join("")}</ul>`
    : "";
  const awards = (g.awards || []).map((id) => activities.find((a) => a.id === id)).filter(Boolean);
  const body = `<article class="wrap detail">
  <p class="crumb"><a href="../index.html#games">← 게임 개발</a></p>
  <header class="detail-head">
    <p class="type">${esc(g.genre)}${g.titleEn ? ` · ${esc(g.titleEn)}` : ""}</p>
    <h1>${esc(g.title)}</h1>
    <p class="lead">${esc(g.subtitle)}</p>
  </header>
  <img class="detail-cover" src="${src(g.cover, 1)}" alt="${esc(g.title)} 배너">
  <div class="detail-grid">
    <div class="detail-main">
      <p class="lead-text">${esc(g.summary)}</p>
      ${g.goal ? `<h2 class="minor">목표</h2><p>${esc(g.goal)}</p>` : ""}
      ${g.work?.length ? `<h2 class="minor">한 일</h2>${bullets(g.work)}` : ""}
      ${g.lessons?.length ? `<h2 class="minor">배운 점</h2>${bullets(g.lessons)}` : ""}
      ${awards.length ? `<h2 class="minor">관련 수상 · 활동</h2><ul class="bullets">${awards.map((a) => `<li>${esc(a.title)} <span class="mono muted">${esc(a.start)}</span></li>`).join("")}</ul>` : ""}
    </div>
    <aside class="detail-side">
      ${dl([
        ["기간", period(g.start, g.end)],
        ["개발 기간", esc(g.devDuration)],
        ["팀", g.team ? `${g.team}명` : null],
        ["엔진", esc(g.engine)],
        ["플랫폼", g.platforms.length ? g.platforms.map(esc).join(", ") : "미출시"],
        ["스튜디오", esc(g.studio)],
      ])}
      ${contrib ? `<h2 class="minor">담당 비중</h2>${contrib}` : ""}
      ${links(g.links)}
    </aside>
  </div>
  <h2 class="minor">플레이 영상</h2>
  <div class="clips">${g.media.map((m, k) => media(m, 1, `${g.title} 플레이 영상 ${k + 1}`)).join("")}</div>
  ${pager(games, i, "games", "게임")}
</article>`;
  return page({ title: `${g.title} | ${profile.name}`, description: g.summary, depth: 1, body, image: g.cover, pathName: `games/${g.id}.html` });
}

function researchPage(r, i) {
  const body = `<article class="wrap detail">
  <p class="crumb"><a href="../index.html#research">← 연구</a></p>
  <header class="detail-head">
    <p class="type">${{ funded: "연구 과제", contract: "수탁 과제", student: "학부 프로젝트" }[r.category]}</p>
    <h1>${esc(r.title)}</h1>
    ${r.subtitle ? `<p class="lead">${esc(r.subtitle)}</p>` : ""}
  </header>
  <div class="detail-grid">
    <div class="detail-main">
      <p class="lead-text">${esc(r.summary)}</p>
      ${metrics(r.metrics)}
      ${r.highlights?.length ? `<h2 class="minor">주요 내용</h2>${bullets(r.highlights)}` : ""}
    </div>
    <aside class="detail-side">
      ${dl([
        ["기간", period(r.start, r.end)],
        ["수행 기간", r.duration ? esc(r.duration) : null],
        ["지원", r.sponsor ? esc(r.sponsor) : null],
        ["소속", esc(r.org)],
        ["팀", r.team ? `${r.team}명` : null],
        ["역할", r.role ? esc(r.role) : null],
      ])}
      ${chips(r.stack, "stack")}
      ${links(r.links)}
    </aside>
  </div>
  ${r.images?.length ? `<h2 class="minor">자료</h2>${gallery(r.images, 1, r.title)}` : ""}
  ${pager(research, i, "research", "연구")}
</article>`;
  return page({ title: `${r.title} | ${profile.name}`, description: r.summary, depth: 1, body, image: r.cover, pathName: `research/${r.id}.html` });
}

/* ---------- write ---------- */
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(path.join(OUT, "games"), { recursive: true });
fs.mkdirSync(path.join(OUT, "research"), { recursive: true });

const indexBody = [hero(), teachingSection(), nowSection(), researchSection(), gamesSection(), careerSection(), activitiesSection()].join("\n");
fs.writeFileSync(path.join(OUT, "index.html"), page({ title: site.title, description: site.description, depth: 0, body: indexBody, pathName: "" }));
games.forEach((g, i) => fs.writeFileSync(path.join(OUT, "games", `${g.id}.html`), gamePage(g, i)));
research.forEach((r, i) => fs.writeFileSync(path.join(OUT, "research", `${r.id}.html`), researchPage(r, i)));

fs.cpSync(path.join(ROOT, "src", "styles.css"), path.join(OUT, "styles.css"));
fs.cpSync(path.join(ROOT, "src", "main.js"), path.join(OUT, "main.js"));
fs.cpSync(path.join(ROOT, "assets"), path.join(OUT, "assets"), { recursive: true });
fs.writeFileSync(path.join(OUT, ".nojekyll"), "");

// 빠진 파일 점검
const missing = [];
for (const f of [games, research, activities, [profile]]) {
  JSON.stringify(f).replace(/"(assets\/[^"]+)"/g, (_, p) => (exists(p) ? "" : missing.push(p), ""));
}
if (missing.length) {
  console.error("없는 파일:", missing);
  process.exit(1);
}
console.log(`built: index + ${games.length} games + ${research.length} research → _site/`);
