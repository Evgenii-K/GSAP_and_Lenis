gsap.registerPlugin(ScrollTrigger);

const contentText = document.querySelectorAll('.content_item_row_text');
const contentImage = document.querySelectorAll('.content_media_image');
const introImage = document.querySelector('.intro_media_image');

const initLenis = () => {
  const lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => lenis.raf(time*1000));
  gsap.ticker.lagSmoothing(0);

  initScrollTrigger();
}

const initScrollTrigger = () => {
  const tl = gsap.timeline({
    defaults: { stagger: 0.08, ease: 'power1.inOut' },

    scrollTrigger: {
      trigger: '.app',
      start: 'top top',
      end: '+=8000 bottom',
      scrub: 1.2,
      pin: true
    },
  });

  gsap.set(contentText, { yPercent: 100, autoAlpha: 0, rotate: '5deg' });
  gsap.set(contentImage, { scale: 0 })

  tl.to(introImage, {
      scale: 0.8,
      transformOrigin: 'center bottom'
    })
    .to('.media', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    }, 0);

  tl.to(contentText, { yPercent: 0, autoAlpha: '1', rotate: '0' }, 0.2)
    .to(contentText, { yPercent: -100, autoAlpha: '0' })
    .to(contentImage, { scale: 1 }, 0.5)
    .to(contentImage, { scale: 0 }, 1.5);
}

initLenis()