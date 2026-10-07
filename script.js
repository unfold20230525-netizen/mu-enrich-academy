/* =====================================================
   MU ENRICH ACADEMY - script.js
   ハンバーガーメニュー / スクロールフェードイン / FAQアコーディオン
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* -----------------------------------------------
     ハンバーガーメニューの開閉
  ----------------------------------------------- */
  const menuBtn = document.getElementById('menuBtn');
  const navMenu = document.getElementById('navMenu');

  const closeMenu = () => {
    menuBtn.classList.remove('is-active');
    navMenu.classList.remove('is-open');
    menuBtn.setAttribute('aria-expanded', 'false');
  };

  const toggleMenu = () => {
    const isOpen = navMenu.classList.toggle('is-open');
    menuBtn.classList.toggle('is-active', isOpen);
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  };

  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', toggleMenu);

    // ナビリンクをクリックしたらメニューを閉じる
    navMenu.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });
  }

  /* -----------------------------------------------
     ヘッダーの背景（スクロール時に濃くする）
  ----------------------------------------------- */
  const header = document.getElementById('site-header');
  const onScrollHeader = () => {
    if (window.scrollY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };
  window.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();

  /* -----------------------------------------------
     スクロールフェードイン（IntersectionObserver）
  ----------------------------------------------- */
  const revealTargets = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px'
    });

    revealTargets.forEach((target) => revealObserver.observe(target));
  } else {
    // IntersectionObserver未対応ブラウザは即表示
    revealTargets.forEach((target) => target.classList.add('is-visible'));
  }

  /* -----------------------------------------------
     FAQアコーディオン
  ----------------------------------------------- */
  const faqButtons = document.querySelectorAll('.faq-q');

  faqButtons.forEach((btn) => {
    const answer = btn.nextElementSibling;

    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';

      // 他の開いている項目を閉じる（1つだけ開く挙動）
      faqButtons.forEach((otherBtn) => {
        if (otherBtn !== btn && otherBtn.getAttribute('aria-expanded') === 'true') {
          otherBtn.setAttribute('aria-expanded', 'false');
          otherBtn.nextElementSibling.style.maxHeight = null;
        }
      });

      if (isExpanded) {
        btn.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = null;
      } else {
        btn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

});
