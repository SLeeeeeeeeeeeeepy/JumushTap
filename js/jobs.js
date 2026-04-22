document.addEventListener("DOMContentLoaded", () => {
  if (!JT.auth.requireAuth()) return;
  let filters = { category: "all", query: "", sort: "urgent", type: "all" };
  const grid = document.getElementById("jobsGrid");
  const countEl = document.getElementById("jobCount");

  function svgHeart(f) {
    return '<svg width="18" height="18" fill="'+(f?"#F35029":"none")+'" stroke="'+(f?"#F35029":"currentColor")+'" stroke-width="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
  }

  function renderJobCard(j) {
    const saved = JT.saved.isSaved(j.id);
    const applied = JT.apps.isApplied(j.id);
    const typeLabel = {parttime:"Частичная",oneday:"Разовая",regular:"Постоянная",weekend:"Выходные",evening:"Вечер",project:"Проект"}[j.type]||j.type;
    return '<div class="job-card'+(j.urgent?" urgent":"")+'" data-id="'+j.id+'">' +
      '<div class="job-card__top">' +
        '<div class="job-logo" style="background:'+j.color+'20;"><span style="font-size:1.4rem">'+j.logo+'</span></div>' +
        '<div class="job-card__info"><div class="job-card__title">'+j.title+'</div><div class="job-card__company">'+j.company+' · '+j.city+'</div></div>' +
        '<div class="job-card__right"><div class="job-salary">'+j.salary.toLocaleString()+' <span class="job-salary-unit">с/ч</span></div>'+(j.urgent?'<div class="urgent-badge"><i class="ph-fill ph-fire" style="vertical-align:middle;"></i> Срочно</div>':'')+' </div>' +
      '</div>' +
      '<div class="job-card__tags">' +
        '<span class="tag tag--gray"><i class="ph ph-clock" style="vertical-align:middle;"></i> '+j.hours+' ч</span>' +
        '<span class="tag tag--gray">'+(j.remote?'<i class="ph ph-laptop" style="vertical-align:middle;"></i> Удалённо':'<i class="ph-fill ph-map-pin" style="vertical-align:middle;"></i> '+j.distance)+'</span>' +
        '<span class="tag tag--gray">'+typeLabel+'</span>' +
        (applied?'<span class="tag tag--green"><i class="ph ph-check" style="vertical-align:middle;font-weight:bold;"></i> Отклик отправлен</span>':'')+
      '</div>' +
      '<div class="job-card__footer">' +
        '<div class="job-meta"><span class="job-meta-item"><i class="ph-fill ph-star" style="color: #F48227; vertical-align:middle;"></i> '+j.rating+' ('+j.reviews+')</span><span class="job-meta-item"><i class="ph ph-calendar-blank" style="vertical-align:middle;"></i> '+j.postedAt+'</span></div>' +
        '<button class="save-btn'+(saved?" saved":"")+'" data-id="'+j.id+'">'+svgHeart(saved)+'</button>' +
      '</div></div>';
  }

  function renderJobs() {
    currentJobs = JT.jobs.filter(filters);
    if (countEl) countEl.textContent = currentJobs.length;
    if (!grid) return;
    if (currentJobs.length === 0) {
      grid.innerHTML = '<div class="empty-state"><span class="empty-state__icon"><i class="ph ph-magnifying-glass"></i></span><div class="empty-state__title">Вакансий не найдено</div><div class="empty-state__desc">Попробуйте изменить фильтры</div></div>';
      return;
    }
    grid.innerHTML = currentJobs.map(j => renderJobCard(j)).join("");
    grid.querySelectorAll(".save-btn").forEach(btn => {
      btn.addEventListener("click", e => {
        e.preventDefault(); e.stopPropagation();
        const id = parseInt(btn.dataset.id);
        const isSaved = JT.saved.toggle(id);
        btn.classList.toggle("saved", isSaved);
        btn.innerHTML = svgHeart(isSaved);
        JT.toast(isSaved ? "Добавлено в избранное <i class='ph-fill ph-heart' style='vertical-align:middle;'></i>" : "Удалено из избранного", isSaved ? "success" : "info");
      });
    });
    grid.querySelectorAll(".job-card").forEach(card => {
      card.addEventListener("click", e => { if (e.target.closest(".save-btn")) return; window.location.href = "job-detail.html?id="+card.dataset.id; });
    });
  }

  let currentJobs = [];
  const catsScroll = document.getElementById("catsScroll");
  if (catsScroll) {
    CATEGORIES.forEach(c => {
      const chip = document.createElement("button");
      chip.className = "chip" + (c.id === "all" ? " active" : "");
      chip.dataset.cat = c.id;
      chip.innerHTML = c.emoji + " " + c.label;
      chip.addEventListener("click", () => {
        catsScroll.querySelectorAll(".chip").forEach(ch => ch.classList.remove("active"));
        chip.classList.add("active");
        filters.category = c.id;
        renderJobs();
      });
      catsScroll.appendChild(chip);
    });
    const urlCat = new URLSearchParams(location.search).get("category");
    if (urlCat) {
      const tc = catsScroll.querySelector('[data-cat="'+urlCat+'"]');
      if (tc) { catsScroll.querySelectorAll(".chip").forEach(ch => ch.classList.remove("active")); tc.classList.add("active"); filters.category = urlCat; }
    }
  }

  const searchInput = document.getElementById("searchInput");
  if (searchInput) { let t; searchInput.addEventListener("input", () => { clearTimeout(t); t = setTimeout(() => { filters.query = searchInput.value; renderJobs(); }, 300); }); }
  const sortSelect = document.getElementById("sortSelect");
  if (sortSelect) { sortSelect.addEventListener("change", () => { filters.sort = sortSelect.value; renderJobs(); }); }
  document.querySelectorAll(".filter-chip[data-type]").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".filter-chip[data-type]").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      filters.type = chip.dataset.type; renderJobs();
    });
  });
  document.querySelectorAll(".filter-clear").forEach(btn => {
    btn.addEventListener("click", () => {
      filters = { category: "all", query: "", sort: "urgent", type: "all" };
      if (searchInput) searchInput.value = "";
      if (sortSelect) sortSelect.value = "urgent";
      document.querySelectorAll(".filter-chip[data-type]").forEach(c => c.classList.remove("active"));
      document.querySelector('.filter-chip[data-type="all"]') && document.querySelector('.filter-chip[data-type="all"]').classList.add("active");
      if (catsScroll) { catsScroll.querySelectorAll(".chip").forEach((ch,i) => ch.classList.toggle("active", i===0)); }
      renderJobs();
    });
  });

  const mobileFilterBtn = document.getElementById("mobileFilterBtn");
  const filterOverlay = document.getElementById("filterOverlay");
  const filterDrawer = document.getElementById("filterDrawer");
  const drawerClose = document.getElementById("drawerClose");
  function openDrawer() { filterOverlay && filterOverlay.classList.add("open"); filterDrawer && filterDrawer.classList.add("open"); document.body.style.overflow = "hidden"; }
  function closeDrawer() { filterOverlay && filterOverlay.classList.remove("open"); filterDrawer && filterDrawer.classList.remove("open"); document.body.style.overflow = ""; }
  if (mobileFilterBtn) mobileFilterBtn.addEventListener("click", openDrawer);
  if (filterOverlay) filterOverlay.addEventListener("click", closeDrawer);
  if (drawerClose) drawerClose.addEventListener("click", closeDrawer);

  renderJobs();
});
