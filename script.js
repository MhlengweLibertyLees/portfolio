/*
  script.js
  - Welcome message
  - Preloader
  - AOS + GSAP intro animation
  - Skill bars (observable)
  - Theme toggle
  - Smooth internal scroll, contact form (mailto)
  - Back to top
*/

document.addEventListener('DOMContentLoaded', function(){

  /* Welcome message */
  const welcomeMessage = document.getElementById('welcomeMessage');
  const hour = new Date().getHours();
  let msg = 'Welcome to my portfolio';
  if(hour < 12) msg = 'Good Morning — Welcome!';
  else if(hour < 18) msg = 'Good Afternoon — Welcome!';
  else msg = 'Good Evening — Welcome!';
  if(welcomeMessage) welcomeMessage.textContent = msg;

  /* Preloader hide once page loads */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', function(){
    setTimeout(()=>{ if(preloader) preloader.style.display = 'none'; }, 350);
  });

  /* Initialize AOS */
  if(window.AOS) AOS.init({duration:700,once:true,mirror:false,offset:80});

  /* GSAP intro animation (subtle) */
  try {
    if(window.gsap){
      gsap.from('#hero .display-5', {y: 18, opacity: 0, duration: .8, ease: 'power3.out', delay: .2});
      gsap.from('#hero .lead', {y: 10, opacity: 0, duration: .7, ease: 'power3.out', delay: .35});
      gsap.from('#hero .avatar-lg', {scale: .9, opacity: 0, duration: .9, ease: 'elastic.out(1, .6)', delay: .45});
      // navbar
      gsap.from('#mainNav .navbar-brand', {y: -8, opacity: 0, duration: .7, delay: .1});
    }
  } catch(e) { /* ignore if GSAP missing */ }

  /* Back to top button */
  const backBtn = document.getElementById('backToTop');
  window.addEventListener('scroll', ()=> {
    if(window.scrollY > 300) backBtn.style.display = 'block';
    else backBtn.style.display = 'none';
  });
  backBtn.addEventListener('click', ()=> window.scrollTo({top:0,behavior:'smooth'}));

  /* Theme toggle */
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');

  function setTheme(t){
    if(t === 'dark') document.body.classList.add('dark');
    else document.body.classList.remove('dark');
    localStorage.setItem('pref-theme', t);
    if(themeToggle) themeToggle.setAttribute('aria-pressed', t === 'dark');
    if(themeIcon) themeIcon.className = t === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
  }

  const saved = localStorage.getItem('pref-theme') || 'light';
  setTheme(saved);

  if(themeToggle){
    themeToggle.addEventListener('click', ()=> {
      const cur = document.body.classList.contains('dark') ? 'dark' : 'light';
      setTheme(cur === 'dark' ? 'light' : 'dark');
    });
  }

  /* Smooth scrolling for internal links + close collapse */
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href.length > 1){
        const target = document.querySelector(href);
        if(target){
          e.preventDefault();
          target.scrollIntoView({behavior:'smooth',block:'start'});
          const bsCollapse = document.querySelector('.navbar-collapse.show');
          if(bsCollapse) new bootstrap.Collapse(bsCollapse).hide();
        }
      }
    });
  });

  /* Skill bar animation */
  const skillBars = document.querySelectorAll('.skill-bar');
  if('IntersectionObserver' in window && skillBars.length){
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          const el = entry.target;
          const val = Math.min(100, Number(el.getAttribute('data-skill') || 50));
          const fill = el.querySelector('.fill');
          if(fill){
            // animate with GSAP if available else simple CSS width change
            if(window.gsap){
              gsap.to(fill, {width: val + '%', duration: 0.9, ease: 'power2.out'});
            } else {
              fill.style.width = val + '%';
            }
          }
          obs.unobserve(el);
        }
      });
    }, {threshold: 0.35});

    skillBars.forEach(sb => {
      if(!sb.querySelector('.fill')){
        const fill = document.createElement('div');
        fill.className = 'fill';
        fill.style.width = '0%';
        sb.appendChild(fill);
      }
      obs.observe(sb);
    });
  }

  /* Project modal dynamic content (Bootstrap 5) */
  const projectModal = document.getElementById('projectModal');
  if(projectModal){
    projectModal.addEventListener('show.bs.modal', function(e){
      const btn = e.relatedTarget;
      if(!btn) return;
      const title = btn.getAttribute('data-title');
      const desc = btn.getAttribute('data-desc');
      const tEl = document.getElementById('projectModalTitle');
      const bEl = document.getElementById('projectModalBody');
      if(tEl) tEl.textContent = title || 'Project';
      if(bEl) bEl.textContent = desc || '';
    });
  }

  /* Contact form validation + mailto */
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');
      [name,email,message].forEach(f=>f.classList.remove('is-invalid'));
      let ok = true;
      if(!name.value.trim()){ name.classList.add('is-invalid'); ok=false; }
      if(!email.value || !/.+@.+\..+/.test(email.value)){ email.classList.add('is-invalid'); ok=false; }
      if(!message.value.trim()){ message.classList.add('is-invalid'); ok=false; }
      if(!ok) return;
      const subject = encodeURIComponent('Portfolio contact from ' + name.value.trim());
      const body = encodeURIComponent(message.value.trim() + '\n\n---\n' + 'Contact: ' + name.value.trim() + ' — ' + email.value.trim());
      window.location.href = `mailto:libertyengetelo@gmail.com?subject=${subject}&body=${body}`;
    });
  }

});
