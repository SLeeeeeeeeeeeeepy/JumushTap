const JT = {
  STORAGE_KEY_USER: 'jt_user', STORAGE_KEY_APPS: 'jt_apps', STORAGE_KEY_SAVED: 'jt_saved',
  auth: {
    getUser() { try { return JSON.parse(localStorage.getItem('jt_user')); } catch { return null; } },
    isLoggedIn() { return !!this.getUser(); },
    login(email, password) {
      const users = JSON.parse(localStorage.getItem('jt_users') || '[]');
      const u = users.find(x => x.email === email);
      if (!u) return { ok: false, msg: 'Пользователь не найден' };
      if (u.password !== btoa(password)) return { ok: false, msg: 'Неверный пароль' };
      const safe = { id: u.id, name: u.name, email: u.email, role: u.role, avatar: u.avatar, city: u.city, skills: u.skills || [] };
      localStorage.setItem('jt_user', JSON.stringify(safe));
      return { ok: true, user: safe };
    },
    register(data) {
      let users = JSON.parse(localStorage.getItem('jt_users') || '[]');
      if (users.find(x => x.email === data.email)) return { ok: false, msg: 'Email уже используется' };
      const u = { id: Date.now().toString(), ...data, password: btoa(data.password), avatar: data.avatar || '' };
      users.push(u); localStorage.setItem('jt_users', JSON.stringify(users));
      const safe = { id: u.id, name: u.name, email: u.email, role: u.role, avatar: u.avatar, city: u.city, skills: u.skills || [] };
      localStorage.setItem('jt_user', JSON.stringify(safe)); return { ok: true, user: safe };
    },
    logout() { localStorage.removeItem('jt_user'); window.location.href = 'index.html'; },
    requireAuth() { if (!this.isLoggedIn()) { window.location.href = 'login.html?next=' + encodeURIComponent(location.href); return false; } return true; }
  },
  jobs: {
    getAll() { return MOCK_JOBS; },
    getById(id) { return MOCK_JOBS.find(j => j.id == id) || null; },
    filter({ category, query, minSalary, maxSalary, type, sort } = {}) {
      let jobs = [...MOCK_JOBS];
      if (category && category !== 'all') jobs = jobs.filter(j => j.category === category);
      if (query) { const q = query.toLowerCase(); jobs = jobs.filter(j => j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q) || j.description.toLowerCase().includes(q)); }
      if (minSalary) jobs = jobs.filter(j => j.salary >= +minSalary);
      if (maxSalary) jobs = jobs.filter(j => j.salary <= +maxSalary);
      if (type && type !== 'all') jobs = jobs.filter(j => j.type === type);
      if (sort === 'salary_desc') jobs.sort((a, b) => b.salary - a.salary);
      else if (sort === 'salary_asc') jobs.sort((a, b) => a.salary - b.salary);
      else if (sort === 'new') jobs.sort((a, b) => b.id - a.id);
      else jobs.sort((a, b) => (b.urgent ? 1 : 0) - (a.urgent ? 1 : 0));
      return jobs;
    }
  },
  saved: {
    getAll() { return JSON.parse(localStorage.getItem('jt_saved') || '[]'); },
    toggle(jobId) {
      let saved = this.getAll(); const idx = saved.indexOf(jobId);
      if (idx >= 0) saved.splice(idx, 1); else saved.push(jobId);
      localStorage.setItem('jt_saved', JSON.stringify(saved)); return idx < 0;
    },
    isSaved(jobId) { return this.getAll().includes(jobId); }
  },
  apps: {
    getAll() { return JSON.parse(localStorage.getItem('jt_apps') || '[]'); },
    apply(jobId) {
      let apps = this.getAll(); if (apps.find(a => a.jobId === jobId)) return { ok: false, msg: 'Вы уже откликнулись' };
      apps.push({ jobId, date: new Date().toISOString(), status: 'pending' });
      localStorage.setItem('jt_apps', JSON.stringify(apps)); return { ok: true };
    },
    isApplied(jobId) { return !!this.getAll().find(a => a.jobId === jobId); }
  },
  toast(msg, type = 'info', dur = 3000) {
    let c = document.querySelector('.toast-container');
    if (!c) { c = document.createElement('div'); c.className = 'toast-container'; document.body.appendChild(c); }
    const icons = { success: '<i class="ph-fill ph-check-circle" style="color: #22c55e; font-size:1.2em; vertical-align:middle;"></i>', error: '<i class="ph-fill ph-x-circle" style="color: #F35029; font-size:1.2em; vertical-align:middle;"></i>', info: '<i class="ph-fill ph-info" style="color: #29858D; font-size:1.2em; vertical-align:middle;"></i>' };
    const t = document.createElement('div'); t.className = 'toast toast--' + type;
    t.innerHTML = '<span>' + (icons[type]||icons.info) + '</span><span>' + msg + '</span>';
    c.appendChild(t); setTimeout(() => { t.style.animation = 'slideIn 0.3s ease reverse'; setTimeout(() => t.remove(), 300); }, dur);
  }
};

const MOCK_JOBS = [
  { id:1, title:'Курьер на велосипеде', company:'Glovo Bishkek', category:'delivery', salary:800, type:'parttime', hours:'2-6', distance:'2.3 км', urgent:true, remote:false, city:'Бишкек', description:'Ищем активных курьеров для доставки еды по центру города.', requirements:['Велосипед','Телефон','Выносливость'], logo:'<i class="ph ph-moped"></i>', color:'#F48227', postedAt:'2026-04-22', rating:4.7, reviews:234 },
  { id:2, title:'Промоутер на мероприятие', company:'Event Pro KG', category:'promo', salary:1200, type:'oneday', hours:'6-8', distance:'1.1 км', urgent:false, remote:false, city:'Бишкек', description:'Требуются промоутеры для раздачи листовок.', requirements:['Коммуникабельность','Презентабельный вид'], logo:'<i class="ph ph-tent"></i>', color:'#29858D', postedAt:'2026-04-21', rating:4.5, reviews:89 },
  { id:3, title:'Помощник SMM-менеджера', company:'Digital Studio', category:'it', salary:600, type:'parttime', hours:'4', distance:'удалённо', urgent:false, remote:true, city:'Удалённо', description:'Ищем помощника SMM-команде.', requirements:['Instagram / TikTok','Грамотность'], logo:'<i class="ph ph-device-mobile"></i>', color:'#F35029', postedAt:'2026-04-22', rating:4.8, reviews:56 },
  { id:4, title:'Официант на выходные', company:'Café Central', category:'food', salary:900, type:'weekend', hours:'8', distance:'0.8 км', urgent:true, remote:false, city:'Бишкек', description:'Официанты на выходные дни.', requirements:['Опыт желателен','Улыбка'], logo:'<i class="ph ph-coffee"></i>', color:'#F48227', postedAt:'2026-04-20', rating:4.6, reviews:178 },
  { id:5, title:'Репетитор по математике', company:'Частный заказ', category:'education', salary:1500, type:'regular', hours:'2', distance:'до 5 км', urgent:false, remote:true, city:'Бишкек', description:'Репетитор по математике 10 класс.', requirements:['Высшее образование','Терпение'], logo:'<i class="ph ph-ruler"></i>', color:'#29858D', postedAt:'2026-04-19', rating:4.9, reviews:23 },
  { id:6, title:'Кассир в магазин', company:'Fix Price KG', category:'retail', salary:700, type:'parttime', hours:'6', distance:'1.5 км', urgent:false, remote:false, city:'Бишкек', description:'Кассиры на неполный день.', requirements:['Честность','Опыт'], logo:'<i class="ph ph-shopping-cart"></i>', color:'#F48227', postedAt:'2026-04-21', rating:4.2, reviews:312 },
  { id:7, title:'Уборщик офиса (вечер)', company:'CleanPro', category:'cleaning', salary:650, type:'evening', hours:'3', distance:'2.0 км', urgent:false, remote:false, city:'Бишкек', description:'Уборщик офиса после 18:00.', requirements:['Аккуратность'], logo:'<i class="ph ph-broom"></i>', color:'#797979', postedAt:'2026-04-18', rating:4.0, reviews:67 },
  { id:8, title:'Фотограф на мероприятие', company:'Joy Events', category:'promo', salary:2500, type:'oneday', hours:'5', distance:'на месте', urgent:true, remote:false, city:'Бишкек', description:'Разовая съёмка.', requirements:['Камера','Портфолио'], logo:'<i class="ph ph-camera"></i>', color:'#F35029', postedAt:'2026-04-22', rating:4.9, reviews:45 },
  { id:9, title:'Веб-разработчик (HTML/CSS)', company:'StartupLab KG', category:'it', salary:1200, type:'parttime', hours:'4', distance:'удалённо', urgent:false, remote:true, city:'Удалённо', description:'Вёрстка лендингов.', requirements:['HTML/CSS'], logo:'<i class="ph ph-laptop"></i>', color:'#29858D', postedAt:'2026-04-20', rating:4.7, reviews:18 },
  { id:10, title:'Грузчик на склад', company:'LogisticsPro', category:'other', salary:1000, type:'oneday', hours:'8', distance:'5.2 км', urgent:true, remote:false, city:'Бишкек', description:'Грузчики на склад электроники.', requirements:['Сила','Ответственность'], logo:'<i class="ph ph-package"></i>', color:'#F48227', postedAt:'2026-04-22', rating:3.9, reviews:98 },
  { id:11, title:'Переводчик (англ)', company:'Business Center', category:'it', salary:1800, type:'oneday', hours:'3', distance:'1.8 км', urgent:false, remote:false, city:'Бишкек', description:'Переводчик для переговоров.', requirements:['Английский C1+'], logo:'<i class="ph ph-globe"></i>', color:'#29858D', postedAt:'2026-04-19', rating:5.0, reviews:12 },
  { id:12, title:'Поставщик листовок', company:'PromoCity', category:'promo', salary:550, type:'parttime', hours:'3-4', distance:'в р-не работы', urgent:false, remote:false, city:'Бишкек', description:'Разнос листовок.', requirements:['Активность'], logo:'<i class="ph ph-mailbox"></i>', color:'#F35029', postedAt:'2026-04-21', rating:3.8, reviews:204 },
  { id:13, title:'Монтажёр видео', company:'MediaKG', category:'it', salary:1500, type:'project', hours:'гибко', distance:'удалённо', urgent:false, remote:true, city:'Удалённо', description:'Нарезка Reels/TikTok.', requirements:['CapCut'], logo:'<i class="ph ph-clapperboard"></i>', color:'#F35029', postedAt:'2026-04-17', rating:4.6, reviews:33 },
  { id:14, title:'Стикер-мен', company:'PromoBrand', category:'promo', salary:700, type:'weekend', hours:'6', distance:'3.0 км', urgent:true, remote:false, city:'Бишкек', description:'Промо в костюме.', requirements:['Энергичность'], logo:'<i class="ph ph-mask-happy"></i>', color:'#F48227', postedAt:'2026-04-22', rating:4.3, reviews:28 }
];

const CATEGORIES = [
  { id:'all', label:'Все', emoji:'<i class="ph-fill ph-star"></i>' },
  { id:'delivery', label:'Доставка', emoji:'<i class="ph ph-moped"></i>' },
  { id:'it', label:'IT', emoji:'<i class="ph ph-laptop"></i>' },
  { id:'promo', label:'Промо', emoji:'<i class="ph ph-megaphone"></i>' },
  { id:'food', label:'Общепит', emoji:'<i class="ph ph-pizza"></i>' },
  { id:'retail', label:'Торговля', emoji:'<i class="ph ph-shopping-bag"></i>' },
  { id:'education', label:'Репетиторство', emoji:'<i class="ph ph-books"></i>' },
  { id:'cleaning', label:'Уборка', emoji:'<i class="ph ph-broom"></i>' },
  { id:'other', label:'Другое', emoji:'<i class="ph-fill ph-sparkle"></i>' }
];
window.JT = JT; window.MOCK_JOBS = MOCK_JOBS; window.CATEGORIES = CATEGORIES;
