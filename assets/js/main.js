/* ericschimel.com — rebuilt static site */
(function () {
  'use strict';

  /* header background on scroll */
  var header = document.getElementById('site-header');
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* mobile menu */
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* subtle parallax on hero images */
  var heroImgs = document.querySelectorAll('.hero-img');
  if (heroImgs.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', function () {
      heroImgs.forEach(function (img) {
        var rect = img.closest('.hero').getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        img.style.transform = 'translateY(' + rect.top * -0.25 + 'px) scale(1.15)';
      });
    }, { passive: true });
  }

  /* dot nav active section */
  var dots = document.querySelectorAll('.dot-nav a');
  if (dots.length && 'IntersectionObserver' in window) {
    var byId = {};
    dots.forEach(function (a) { byId[a.getAttribute('data-section')] = a; });
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          dots.forEach(function (a) { a.classList.remove('active'); });
          var a = byId[e.target.id];
          if (a) a.classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -40% 0px' });
    document.querySelectorAll('section.panel').forEach(function (s) { obs.observe(s); });
  }

  /* slideshows */
  document.querySelectorAll('.slideshow').forEach(function (show) {
    var slides = show.querySelectorAll('.slide');
    if (slides.length < 2) return;
    var thumbs = [];
    var next = show.nextElementSibling;
    if (next && next.classList.contains('thumbs')) {
      thumbs = next.querySelectorAll('.thumb');
    }
    var idx = 0;
    var timer = null;
    var delay = parseInt(show.getAttribute('data-autoplay') || '0', 10);

    function go(n) {
      slides[idx].classList.remove('is-active');
      if (thumbs[idx]) thumbs[idx].classList.remove('is-active');
      idx = (n + slides.length) % slides.length;
      slides[idx].classList.add('is-active');
      if (thumbs[idx]) thumbs[idx].classList.add('is-active');
    }
    function restart() {
      if (!delay) return;
      clearInterval(timer);
      timer = setInterval(function () { go(idx + 1); }, delay);
    }
    var prevBtn = show.querySelector('.slideshow-arrow.prev');
    var nextBtn = show.querySelector('.slideshow-arrow.next');
    if (prevBtn) prevBtn.addEventListener('click', function () { go(idx - 1); restart(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { go(idx + 1); restart(); });
    thumbs.forEach(function (t) {
      t.addEventListener('click', function () {
        go(parseInt(t.getAttribute('data-index'), 10));
        restart();
      });
    });
    restart();
  });

  /* background video hero (maker section) — inject muted looping YouTube embed */
  document.querySelectorAll('.hero-video[data-video-id]').forEach(function (holder) {
    var id = holder.getAttribute('data-video-id');
    if (!id) return;
    var iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube-nocookie.com/embed/' + id +
      '?autoplay=1&mute=1&loop=1&playlist=' + id +
      '&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1';
    iframe.setAttribute('allow', 'autoplay; encrypted-media');
    iframe.setAttribute('tabindex', '-1');
    iframe.setAttribute('title', 'Background video');
    holder.appendChild(iframe);
  });
})();
