// content/*.json → _site/ 정적 사이트 생성 (한국어: /, 영어: /en/)
// 외부 패키지 없이 Node 18+ 로 실행: node build.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(ROOT, "_site");
const readJson = (rel) => JSON.parse(fs.readFileSync(path.join(ROOT, "content", rel), "utf8"));
const FILES = ["site", "profile", "teaching", "research", "games", "career", "education", "activities"];

/* ---------- 번역 병합: content/en/*.json 의 문장만 한국어 데이터 위에 덮어씀 ---------- */
const isObj = (v) => v && typeof v === "object" && !Array.isArray(v);
function merge(base, over) {
  if (over === undefined) return base;
  if (Array.isArray(base) && Array.isArray(over)) {
    if (base.length && isObj(base[0])) {
      // 객체 배열: id 가 있으면 id 로, 없으면 순서대로 맞춤
      return base.map((b, i) => {
        const o = b.id !== undefined ? over.find((x) => x.id === b.id) : over[i];
        return merge(b, o);
      });
    }
    return over; // 문자열 배열은 통째로 교체
  }
  if (isObj(base) && isObj(over)) {
    const out = { ...base };
    for (const k of Object.keys(over)) out[k] = merge(base[k], over[k]);
    return out;
  }
  return over;
}
function loadData(lang) {
  const d = {};
  for (const n of FILES) {
    const base = readJson(`${n}.json`);
    const p = path.join(ROOT, "content", lang, `${n}.json`);
    d[n] = lang === "ko" || !fs.existsSync(p) ? base : merge(base, readJson(`${lang}/${n}.json`));
  }
  return d;
}

/* ---------- 화면 고정 문구 ---------- */
const UI = {
  ko: {
    htmlLang: "ko", present: "현재", todo: "입력 필요", skip: "본문으로 건너뛰기", navLabel: "섹션",
    nav: [["teaching", "강의"], ["now", "진행 중"], ["research", "연구"], ["games", "게임 개발"], ["career", "경력·학력"], ["activities", "수상·활동"]],
    updated: "최종 업데이트", viewGithub: "GitHub에서 보기", store: "스토어", photo: "사진",
    facts: (careerTotal, nGames, nResearch) => [[careerTotal, "실무 경력"], [`${nGames}종`, "모바일 게임 개발"], [`${nResearch}건`, "연구·수탁 과제"], ["ISVC'15", "국제학회 논문"]],
    teaching: "강의", course: "과목", kind: "구분", content: "내용", credits: (c, l) => `${c}학점 · ${l}`,
    talks: "공개강의 · 발표", materials: "교육 자료",
    now: "진행 중인 프로젝트", live: "진행 중",
    research: "연구", researchMain: "연구 · 수탁 과제", researchStudent: "학부 프로젝트",
    sponsorLabel: { funded: "지원", contract: "발주" },
    category: { funded: "연구 과제", contract: "수탁 과제", student: "학부 프로젝트" },
    games: "게임 개발", gamesNote: (n) => `Hoit Studio · Unity · 팀 ${n}명`,
    founded: (d) => `Hoit Studio 창업 ${d}`, chartAria: "게임별 개발 기간 타임라인",
    chartCaption: "막대는 기획부터 출시·초기 운영까지의 기간, 오른쪽 숫자는 실제 개발 기간입니다.",
    devShort: "개발", ops: "출시 후 운영", unreleased: "미출시",
    career: "경력 · 학력", careerNote: (t) => `총 ${t}`, education: "학력",
    activities: "수상 · 활동",
    type: { award: "수상", program: "선정", exhibition: "전시", publication: "논문", conference: "학회", contract: "계약", training: "교육" },
    photos: (n) => `사진 ${n}장`,
    back: { games: "← 게임 개발", research: "← 연구" },
    story: "개발 이야기", goal: "목표", work: "한 일", lessons: "배운 점", related: "관련 수상 · 활동",
    period: "기간", devPeriod: "개발 기간", runPeriod: "수행 기간", team: "팀", people: (n) => `${n}명`,
    engine: "엔진", platform: "플랫폼", studio: "스튜디오", share: "담당 비중",
    contrib: ["개발", "UI/UX", "기획"], videos: "플레이 영상", originalGif: "원본 GIF", video: "플레이 영상",
    highlights: "주요 내용", org: "소속", role: "역할", files: "자료", fileAlt: "자료",
    prev: "이전", next: "다음", move: "이동", banner: "배너", avatarAlt: "사진",
  },
  en: {
    htmlLang: "en", present: "Present", todo: "TBD", skip: "Skip to content", navLabel: "Sections",
    nav: [["teaching", "Teaching"], ["now", "Current"], ["research", "Research"], ["games", "Games"], ["career", "Experience"], ["activities", "Awards"]],
    updated: "Last updated", viewGithub: "View on GitHub", store: "the store", photo: "Photo",
    facts: (careerTotal, nGames, nResearch) => [[careerTotal, "Industry experience"], [`${nGames}`, "Mobile games built"], [`${nResearch}`, "Research & contract projects"], ["ISVC'15", "International paper"]],
    teaching: "Teaching", course: "Course", kind: "Credits", content: "Description", credits: (c, l) => `${c} credits · ${l}`,
    talks: "Talks & public lectures", materials: "Teaching materials",
    now: "Current projects", live: "Ongoing",
    research: "Research", researchMain: "Funded & contract research", researchStudent: "Undergraduate projects",
    sponsorLabel: { funded: "Funded by", contract: "Client" },
    category: { funded: "Funded research", contract: "Contract project", student: "Undergraduate project" },
    games: "Games", gamesNote: (n) => `Hoit Studio · Unity · team of ${n}`,
    founded: (d) => `Hoit Studio founded ${d}`, chartAria: "Development timeline by game",
    chartCaption: "Bars span planning through launch and early operation; the number on the right is actual development time.",
    devShort: "dev", ops: "Live operations", unreleased: "Unreleased",
    career: "Experience · Education", careerNote: (t) => `${t} total`, education: "Education",
    activities: "Awards & Activities",
    type: { award: "Award", program: "Program", exhibition: "Exhibition", publication: "Paper", conference: "Conference", contract: "Contract", training: "Training" },
    photos: (n) => `${n} photos`,
    back: { games: "← Games", research: "← Research" },
    story: "Behind the game", goal: "Goal", work: "What I did", lessons: "Lessons", related: "Related awards & activities",
    period: "Period", devPeriod: "Dev time", runPeriod: "Duration", team: "Team", people: (n) => `${n} people`,
    engine: "Engine", platform: "Platforms", studio: "Studio", share: "My share",
    contrib: ["Dev", "UI/UX", "Design"], videos: "Gameplay", originalGif: "Original GIF", video: "gameplay video",
    highlights: "Highlights", org: "Affiliation", role: "Role", files: "Materials", fileAlt: "figure",
    prev: "Previous", next: "Next", move: "navigation", banner: "banner", avatarAlt: "photo",
  },
};
const LANGS = [
  { code: "ko", prefix: "", label: "KO" },
  { code: "en", prefix: "en/", label: "EN" },
];

/* ---------- 언어별로 바뀌는 상태 ---------- */
let L, T, D, site, profile, teaching, research, games, career, education, activities, notice;

/* ---------- helpers ---------- */
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const isTodo = (v) => typeof v === "string" && v.startsWith("TODO");
const txt = (v) => (isTodo(v) ? `<span class="todo">${T.todo}</span>` : esc(v));
const exists = (p) => fs.existsSync(path.join(ROOT, p));
const up = (depth) => "../".repeat(depth); // 같은 언어 안에서 이동
const root = (depth) => "../".repeat(depth + D); // 사이트 루트(assets, css, js)
const src = (p, depth) => root(depth) + p.split("/").map(encodeURIComponent).join("/");

function period(start, end) {
  if (isTodo(start)) return txt(start);
  if (end === null) return `${esc(start)} – ${T.present}`;
  if (!end || end === start) return esc(start);
  return `${esc(start)} – ${esc(end)}`;
}

function ext(url, label, cls = "") {
  return `<a class="${cls}" href="${esc(url)}" target="_blank" rel="noopener">${esc(label)}</a>`;
}

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
  <p data-template="${esc(notice.body)}">${esc(notice.body.replace("{store}", T.store))}</p>
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
      <figcaption><a href="${src(p, depth)}" target="_blank" rel="noopener">${T.originalGif}</a></figcaption>
    </figure>`;
  }
  return `<figure class="clip"><img src="${src(p, depth)}" alt="${esc(alt)}" loading="lazy"></figure>`;
}

function gallery(images, depth, alt) {
  if (!images?.length) return "";
  return `<div class="gallery">${images
    .map((p, i) => `<a href="${src(p, depth)}" target="_blank" rel="noopener"><img src="${src(p, depth)}" alt="${esc(alt)} ${T.fileAlt} ${i + 1}" loading="lazy"></a>`)
    .join("")}</div>`;
}

const sectionHead = (title, en, extra = "") =>
  `<div class="sec-head"><h2>${title}</h2>${L === "ko" ? `<span class="en">${en}</span>` : ""}${extra}</div>`;

/* ---------- page shell ---------- */
// CSS·JS 내용이 바뀌면 주소도 바뀌게 해서 브라우저 캐시 때문에 옛 파일이 쓰이지 않도록 함
const VER = crypto.createHash("sha1")
  .update(fs.readFileSync(path.join(ROOT, "src", "styles.css")))
  .update(fs.readFileSync(path.join(ROOT, "src", "main.js")))
  .digest("hex").slice(0, 8);

const builtAt = new Date().toLocaleDateString("ko-KR", { timeZone: "Asia/Seoul", year: "numeric", month: "2-digit", day: "2-digit" }).replace(/\.\s?/g, ".").replace(/\.$/, "");

function page({ title, description, depth, body, image, pathName = "" }) {
  const home = depth ? `${up(depth)}index.html` : "";
  const self = LANGS.find((x) => x.code === L);
  const target = pathName || "index.html";
  const alt = LANGS.map((x) => `<link rel="alternate" hreflang="${x.code}" href="${esc(site.url + x.prefix + pathName)}">`).join("\n");
  const switcher = LANGS.map((x) =>
    x.code === L
      ? `<span aria-current="true">${x.label}</span>`
      : `<a href="${root(depth)}${x.prefix}${target}" hreflang="${x.code}" lang="${x.code}">${x.label}</a>`
  ).join("");
  return `<!doctype html>
<html lang="${T.htmlLang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(site.url + self.prefix + pathName)}">
<meta property="og:image" content="${esc(site.url + (image || profile.avatar))}">
<link rel="canonical" href="${esc(site.url + self.prefix + pathName)}">
${alt}
<link rel="alternate" hreflang="x-default" href="${esc(site.url + pathName)}">
<link rel="icon" href="${root(depth)}assets/favicon.ico">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans+KR:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="${root(depth)}styles.css?v=${VER}">
</head>
<body>
<a class="skip" href="#main">${T.skip}</a>
<nav class="topnav" aria-label="${T.navLabel}">
  <div class="topnav-in">
    <a class="brand" href="${home || "#top"}">${esc(profile.name)}</a>
    <ul>${T.nav.map(([id, label]) => `<li><a href="${home}#${id}">${label}</a></li>`).join("")}</ul>
    <div class="lang-switch">${switcher}</div>
  </div>
</nav>
<main id="main">
${body}
</main>
<footer class="foot">
  <div class="wrap">
    <span>© ${new Date().getFullYear()} ${esc(profile.name)} · ${esc(profile.nameEn)}</span>
    <span>${T.updated} ${builtAt}</span>
    <a href="${esc(site.repo)}" target="_blank" rel="noopener">${T.viewGithub}</a>
  </div>
</footer>
${noticeDialog()}
<script src="${root(depth)}main.js?v=${VER}" defer></script>
</body>
</html>
`;
}

/* ---------- index sections ---------- */
function hero() {
  const p = profile;
  const funded = research.filter((r) => r.category !== "student").length;
  const facts = T.facts(p.careerTotal, games.length, funded);
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
    <img class="avatar" src="${src(p.avatar, 0)}" alt="${esc(p.name)} ${T.avatarAlt}" width="160" height="160">
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
      <thead><tr><th scope="col">${T.course}</th><th scope="col">${T.kind}</th><th scope="col">${T.content}</th></tr></thead>
      <tbody>${t.courses
        .map((c) => `<tr><th scope="row">${esc(c.name)}</th><td class="mono">${esc(T.credits(c.credits, c.level))}</td><td>${esc(c.summary)}</td></tr>`)
        .join("")}</tbody></table></div>`
    )
    .join("");
  const talks = teaching.talks
    .map((t) => `<div class="row"><div class="when">${esc(t.date)}</div><div><h3>${esc(t.title)}</h3><p class="sub">${esc(t.subtitle)} · ${esc(t.venue)}</p></div></div>`)
    .join("");
  return `<section class="wrap section" id="teaching">
  ${sectionHead(T.teaching, "Teaching")}
  ${terms}
  <div class="split">
    <div><h3 class="minor">${T.talks}</h3><div class="rows">${talks}</div></div>
    <div><h3 class="minor">${T.materials}</h3>${bullets(teaching.materials)}</div>
  </div>
</section>`;
}

function nowSection() {
  const rows = teaching.projects
    .map(
      (p) => `<article class="row">
      <div class="when">${period(p.start, p.end)}${p.end === null ? `<span class="status live">${T.live}</span>` : ""}</div>
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
  ${sectionHead(T.now, "Current work")}
  <div class="rows">${rows}</div>
</section>`;
}

function researchRow(r) {
  const sp = r.sponsor ? `${T.sponsorLabel[r.category] || T.sponsorLabel.funded} ${r.sponsor}` : null;
  const meta = [sp, r.org].filter(Boolean).map(esc).join(" · ");
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
  ${sectionHead(T.research, "Research")}
  <h3 class="minor">${T.researchMain}</h3>
  <div class="rows">${main.map(researchRow).join("")}</div>
  <h3 class="minor">${T.researchStudent}</h3>
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
  const labelW = L === "ko" ? 150 : 190, colW = 9, rowH = 26, top = 30;
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
  svg += `<line class="lane" x1="${f}" y1="${top - 8}" x2="${f}" y2="${H - 4}"/><text class="lane-label" x="${f + 4}" y="${H - 8}">${esc(T.founded(hoit.start))}</text>`;
  sorted.forEach((g, i) => {
    const y = top + i * rowH;
    const a = x(ym(g.start));
    const b = x(ym(g.end || g.start) + 1);
    svg += `<a href="games/${g.id}.html"><text class="glabel" x="0" y="${y + 16}">${esc(g.title)}</text>
      <rect class="bar" x="${a}" y="${y + 5}" width="${Math.max(b - a, colW)}" height="14" rx="2"><title>${esc(g.title)} ${esc(g.start)} – ${esc(g.end)} (${T.devShort} ${esc(g.devDuration)})</title></rect>
      <text class="dur" x="${b + 6}" y="${y + 16}">${esc(g.devDuration)}</text></a>`;
  });
  return `<figure class="chart">
    <div class="chart-scroll"><svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${T.chartAria}">${svg}</svg></div>
    <figcaption>${T.chartCaption}</figcaption>
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
        ${chips(g.platforms.length ? g.platforms : [T.unreleased], "platforms")}
      </div>
    </a>
  </li>`;
}

function opsBlock() {
  const ops = profile.studio?.operations;
  if (!ops?.length) return "";
  return `<div class="ops">
    <h3 class="minor">${T.ops}</h3>
    <div class="ops-grid">${ops
      .map((o) => `<div class="op"><h4>${esc(o.title)}</h4><p>${esc(o.desc)}</p>${chips(o.tools, "stack")}</div>`)
      .join("")}</div>
  </div>`;
}

function gamesSection() {
  const team = games[0]?.team || 3;
  return `<section class="wrap section" id="games">
  ${sectionHead(T.games, "Games", `<span class="sec-note">${esc(T.gamesNote(team))}</span>`)}
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
    .map((e) => {
      const thesis = !e.thesis ? "" : L === "ko"
        ? `<p>${esc(e.thesis.ko)}</p><p class="sub en-text">${esc(e.thesis.en)}</p>`
        : `<p>${esc(e.thesis.en)}</p>`;
      const deg = L === "ko" ? `${esc(e.major)} ${esc(e.degree)}` : `${esc(e.degree)} in ${esc(e.major)}`;
      return `<article class="row">
      <div class="when">${period(e.start, e.end)}</div>
      <div>
        <h3>${esc(e.school)} <span class="title">${deg}</span></h3>
        ${thesis}
      </div>
    </article>`;
    })
    .join("");
  return `<section class="wrap section" id="career">
  ${sectionHead(T.career, "Experience", `<span class="sec-note">${esc(T.careerNote(profile.careerTotal))}</span>`)}
  <div class="rows">${jobs}</div>
  <h3 class="minor">${T.education}</h3>
  <div class="rows">${edu}</div>
</section>`;
}

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
          <p class="type">${T.type[a.type] || ""}</p>
          <h3>${esc(a.title)}</h3>
          <p class="sub">${esc(a.org)}${a.desc ? ` · ${esc(a.desc)}` : ""}</p>
          ${links(a.links)}
          ${extra.length ? `<details class="photos"><summary>${T.photos(extra.length)}</summary>${gallery(extra, 0, a.title)}</details>` : ""}
        </div>
      </div>
    </article>`;
    })
    .join("");
  return `<section class="wrap section" id="activities">
  ${sectionHead(T.activities, "Awards & Activities")}
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

function pager(list, i) {
  const prev = list[i - 1], next = list[i + 1];
  return `<nav class="pager" aria-label="${T.move}">
    ${prev ? `<a href="${prev.id}.html"><span>${T.prev}</span>${esc(prev.title)}</a>` : "<span></span>"}
    ${next ? `<a class="next" href="${next.id}.html"><span>${T.next}</span>${esc(next.title)}</a>` : "<span></span>"}
  </nav>`;
}

function gamePage(g, i) {
  const c = g.contribution;
  const contrib = c
    ? `<ul class="contrib">${[c.dev, c.uiux, c.design]
        .map((v, k) => `<li><span>${T.contrib[k]}</span><span class="meter"><span style="width:${Number(v)}%"></span></span><b>${v}</b></li>`)
        .join("")}</ul>`
    : "";
  const awards = (g.awards || []).map((id) => activities.find((a) => a.id === id)).filter(Boolean);
  const body = `<article class="wrap detail">
  <p class="crumb"><a href="../index.html#games">${T.back.games}</a></p>
  <header class="detail-head">
    <p class="type">${esc(g.genre)}${g.titleEn ? ` · ${esc(g.titleEn)}` : ""}</p>
    <h1>${esc(g.title)}</h1>
    <p class="lead">${esc(g.subtitle)}</p>
  </header>
  <img class="detail-cover" src="${src(g.cover, 1)}" alt="${esc(g.title)} ${T.banner}">
  <div class="detail-grid">
    <div class="detail-main">
      <p class="lead-text">${esc(g.summary)}</p>
      ${g.story?.length
        ? `<h2 class="minor">${T.story}</h2><div class="story">${g.story.map((t) => `<p>${esc(t)}</p>`).join("")}</div>`
        : g.goal ? `<h2 class="minor">${T.goal}</h2><p>${esc(g.goal)}</p>` : ""}
      ${g.work?.length ? `<h2 class="minor">${T.work}</h2>${bullets(g.work)}` : ""}
      ${g.lessons?.length ? `<h2 class="minor">${T.lessons}</h2>${bullets(g.lessons)}` : ""}
      ${awards.length ? `<h2 class="minor">${T.related}</h2><ul class="bullets">${awards.map((a) => `<li>${esc(a.title)} <span class="mono muted">${esc(a.start)}</span></li>`).join("")}</ul>` : ""}
    </div>
    <aside class="detail-side">
      ${dl([
        [T.period, period(g.start, g.end)],
        [T.devPeriod, esc(g.devDuration)],
        [T.team, g.team ? T.people(g.team) : null],
        [T.engine, esc(g.engine)],
        [T.platform, g.platforms.length ? g.platforms.map(esc).join(", ") : T.unreleased],
        [T.studio, esc(g.studio)],
      ])}
      ${contrib ? `<h2 class="minor">${T.share}</h2>${contrib}` : ""}
      ${links(g.links)}
    </aside>
  </div>
  <h2 class="minor">${T.videos}</h2>
  <div class="clips">${g.media.map((m, k) => media(m, 1, `${g.title} ${T.video} ${k + 1}`)).join("")}</div>
  ${pager(games, i)}
</article>`;
  return page({ title: `${g.title} | ${profile.name}`, description: g.summary, depth: 1, body, image: g.cover, pathName: `games/${g.id}.html` });
}

function researchPage(r, i) {
  const body = `<article class="wrap detail">
  <p class="crumb"><a href="../index.html#research">${T.back.research}</a></p>
  <header class="detail-head">
    <p class="type">${T.category[r.category]}</p>
    <h1>${esc(r.title)}</h1>
    ${r.subtitle ? `<p class="lead">${esc(r.subtitle)}</p>` : ""}
  </header>
  <div class="detail-grid">
    <div class="detail-main">
      <p class="lead-text">${esc(r.summary)}</p>
      ${metrics(r.metrics)}
      ${r.highlights?.length ? `<h2 class="minor">${T.highlights}</h2>${bullets(r.highlights)}` : ""}
    </div>
    <aside class="detail-side">
      ${dl([
        [T.period, period(r.start, r.end)],
        [T.runPeriod, r.duration ? esc(r.duration) : null],
        [T.sponsorLabel[r.category] || T.sponsorLabel.funded, r.sponsor ? esc(r.sponsor) : null],
        [T.org, esc(r.org)],
        [T.team, r.team ? T.people(r.team) : null],
        [T.role, r.role ? esc(r.role) : null],
      ])}
      ${chips(r.stack, "stack")}
      ${links(r.links)}
    </aside>
  </div>
  ${r.images?.length ? `<h2 class="minor">${T.files}</h2>${gallery(r.images, 1, r.title)}` : ""}
  ${pager(research, i)}
</article>`;
  return page({ title: `${r.title} | ${profile.name}`, description: r.summary, depth: 1, body, image: r.cover, pathName: `research/${r.id}.html` });
}

/* ---------- write ---------- */
fs.rmSync(OUT, { recursive: true, force: true });
const leftovers = [];

for (const lang of LANGS) {
  L = lang.code;
  T = UI[L];
  D = lang.prefix ? 1 : 0;
  ({ site, profile, teaching, research, games, career, education, activities } = loadData(L));
  notice = site.storeNotice?.enabled ? site.storeNotice : null;

  const dir = path.join(OUT, lang.prefix);
  fs.mkdirSync(path.join(dir, "games"), { recursive: true });
  fs.mkdirSync(path.join(dir, "research"), { recursive: true });

  const pages = [];
  const indexBody = [hero(), teachingSection(), nowSection(), researchSection(), gamesSection(), careerSection(), activitiesSection()].join("\n");
  pages.push(["index.html", page({ title: site.title, description: site.description, depth: 0, body: indexBody })]);
  games.forEach((g, i) => pages.push([`games/${g.id}.html`, gamePage(g, i)]));
  research.forEach((r, i) => pages.push([`research/${r.id}.html`, researchPage(r, i)]));
  for (const [rel, html] of pages) {
    fs.writeFileSync(path.join(dir, rel), html);
    if (L !== "ko") {
      // 번역이 빠져 한글이 남은 곳 찾기 (이름 표기와 언어 전환 버튼은 제외)
      const body = html.replace(/<head>[\s\S]*?<\/head>/, "").replace(/<[^>]+>/g, " ").replace(/data-template="[^"]*"/g, "");
      const allowed = [profile.nameEn, ...games.map((g) => g.titleEn).filter(Boolean)];
      let rest = body;
      for (const a of allowed) rest = rest.split(a).join("");
      const hits = rest.match(/[가-힣][^<>\n]{0,30}/g);
      if (hits) leftovers.push(`${lang.prefix}${rel}: ${[...new Set(hits)].slice(0, 3).join(" | ")}`);
    }
  }
}

fs.cpSync(path.join(ROOT, "src", "styles.css"), path.join(OUT, "styles.css"));
fs.cpSync(path.join(ROOT, "src", "main.js"), path.join(OUT, "main.js"));
fs.cpSync(path.join(ROOT, "assets"), path.join(OUT, "assets"), { recursive: true });
fs.writeFileSync(path.join(OUT, ".nojekyll"), "");

// 빠진 파일 점검
const missing = [];
for (const n of ["games", "research", "activities", "profile"]) {
  fs.readFileSync(path.join(ROOT, "content", `${n}.json`), "utf8").replace(/"(assets\/[^"]+)"/g, (_, p) => (exists(p) ? "" : missing.push(p), ""));
}
if (missing.length) {
  console.error("없는 파일:", missing);
  process.exit(1);
}
if (leftovers.length) console.warn(`번역이 빠진 곳 ${leftovers.length}개 (영어 페이지에 한국어 그대로 표시됨):\n  ` + leftovers.join("\n  "));
console.log(`built: ko + en · index + ${games.length} games + ${research.length} research → _site/`);
