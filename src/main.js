// 영상: 화면에 보일 때만 재생. 모션 줄이기 설정이면 정지 상태로 두고 컨트롤 표시.
(() => {
  const videos = document.querySelectorAll("video");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) {
    videos.forEach((v) => { v.removeAttribute("autoplay"); v.pause(); v.controls = true; v.preload = "metadata"; });
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const v = e.target;
        if (e.isIntersecting) { v.preload = "auto"; v.play().catch(() => { v.controls = true; }); }
        else v.pause();
      });
    }, { rootMargin: "200px 0px" });
    videos.forEach((v) => { v.pause(); io.observe(v); });
  }

  // 서비스 종료된 스토어 링크: 안내 팝업
  const dlg = document.getElementById("store-notice");
  if (dlg && typeof dlg.showModal === "function") {
    const msg = dlg.querySelector("p");
    document.querySelectorAll("a.store-off").forEach((a) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        msg.textContent = msg.dataset.template.replace("{store}", a.dataset.store);
        dlg.showModal();
      });
    });
    dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
  }

  // 상단 메뉴: 현재 보고 있는 섹션 표시
  const links = [...document.querySelectorAll('.topnav a[href^="#"]')];
  const sections = links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  if (sections.length && "IntersectionObserver" in window) {
    const so = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((a) => a.setAttribute("aria-current", a.getAttribute("href") === `#${e.target.id}` ? "true" : "false"));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((s) => so.observe(s));
  }
})();
