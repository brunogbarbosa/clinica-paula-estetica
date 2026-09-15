'use client';

import Image from 'next/image';
import { useEffect, useId, useRef } from 'react';
import { ArrowUpRight, Heart, Leaf, UserRound } from 'lucide-react';
import { site } from '@/data/site';

const pillars = [
  { title: 'Identidade', copy: 'Seus traços e sua história são o ponto de partida.', Icon: UserRound },
  { title: 'Equilíbrio', copy: 'Escolhas que respeitam proporções e expressão.', Icon: Leaf },
  { title: 'Intenção', copy: 'Cada detalhe pensado para fazer sentido para você.', Icon: Heart },
];

export function EssenceChapter() {
  const root = useRef<HTMLElement>(null);
  const uid = useId().replace(/:/g, '');

  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    let stop = () => {};
    const setup = () => {
      stop();
      if (media.matches) return;
      const animations: Animation[] = [];
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const element = entry.target as HTMLElement;
          const kind = element.dataset.essenceMotion;
          const delay = Number(element.dataset.delay || 0);
          let frames: Keyframe[] = [
            { opacity: 0, transform: 'translateY(26px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ];
          let duration = 1400;
          if (kind === 'title') frames = [{ opacity: 0, transform: 'translateY(110%)' }, { opacity: 1, transform: 'translateY(0)' }];
          if (kind === 'line') { frames = [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }]; duration = 2200; }
          if (kind === 'bead') {
            frames = [{ opacity: 0, transform: 'translate(-5px, 6px)' }, { opacity: 1, transform: 'translate(3px, -4px)', offset: .6 }, { opacity: 1, transform: 'translate(0, 0)' }];
            duration = 3000;
          }
          animations.push(element.animate(frames, { duration, delay, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' }));
          observer.unobserve(element);
        });
      }, { threshold: .12 });
      section.querySelectorAll('[data-essence-motion]').forEach(element => observer.observe(element));
      stop = () => { observer.disconnect(); animations.forEach(animation => animation.cancel()); };
    };
    setup();
    media.addEventListener('change', setup);
    return () => { stop(); media.removeEventListener('change', setup); };
  }, []);

  return <section id="manifesto" className="essence-editorial" ref={root} aria-labelledby="essence-title">
    <div className="essence-stage">
      <div className="essence-wash" aria-hidden="true" />
      <svg className="essence-thread essence-thread-desktop" viewBox="0 0 1440 740" fill="none" aria-hidden="true">
        <defs><radialGradient id={`${uid}-pearl`} cx="30%" cy="25%"><stop stopColor="#fff9ee" /><stop offset=".5" stopColor="#d6b47a" /><stop offset="1" stopColor="#9a7045" /></radialGradient></defs>
        <path d="M280 790 C720 810 660 530 855 350 S1180 255 1490 360" pathLength="1" data-essence-motion="line" />
        <circle cx="753" cy="474" r="10" fill={`url(#${uid}-pearl)`} data-essence-motion="bead" data-delay="600" />
      </svg>
      <svg className="essence-thread essence-thread-mobile" viewBox="0 0 400 900" fill="none" aria-hidden="true">
        <defs><radialGradient id={`${uid}-pearl-mobile`} cx="30%" cy="25%"><stop stopColor="#fff9ee" /><stop offset=".5" stopColor="#d6b47a" /><stop offset="1" stopColor="#9a7045" /></radialGradient></defs>
        <path d="M-30 625 C110 638 170 799 410 793" pathLength="1" data-essence-motion="line" />
        <circle cx="82" cy="669" r="5.5" fill={`url(#${uid}-pearl-mobile)`} data-essence-motion="bead" data-delay="600" />
      </svg>
      <figure className="essence-smile" data-essence-motion="photo">
        <Image src={site.images.about} alt="Dra. Laís Paula em um registro editorial da clínica" fill sizes="(max-width:700px) 180vw, (max-width:1100px) 82vw, 67vw" />
      </figure>
      <div className="essence-editorial-top">
        <p>01 / A ESSÊNCIA</p><span aria-hidden="true" /><p>A BELEZA COMEÇA<br />NO QUE É SEU.</p>
      </div>
      <div className="essence-editorial-copy">
        <p className="essence-editorial-prelude" data-essence-motion="fade">Cada traço conta uma história.</p>
        <h2 id="essence-title" aria-label="Sua essência. Em primeiro lugar.">
          <span className="essence-title-mask"><span data-essence-motion="title">Sua essência.</span></span>
          <span className="essence-title-mask"><em data-essence-motion="title" data-delay="140">Em primeiro</em></span>
          <span className="essence-title-mask"><span data-essence-motion="title" data-delay="280">lugar.</span></span>
        </h2>
        <p className="essence-editorial-description" data-essence-motion="fade" data-delay="350">Cuidar da sua imagem também é cuidar da forma como você se sente. O nosso olhar busca equilíbrio, leveza e verdade.</p>
        <a className="essence-editorial-cta" href="#sobre" data-essence-motion="fade" data-delay="450"><span>Conheça o olhar por trás do cuidado</span><span className="essence-arrow"><ArrowUpRight size={24} strokeWidth={1.3} /></span></a>
      </div>
      <p className="essence-margin-note">TRAÇOS REAIS<br />HISTÓRIAS ÚNICAS<span aria-hidden="true" /></p>
    </div>
    <div className="essence-values">
      <p className="essence-values-label"><span />OS PILARES DO NOSSO CUIDADO<span /></p>
      <div className="essence-values-grid">
        {pillars.map(({ title, copy, Icon }, i) => <article className="essence-value" key={title} data-essence-motion="fade" data-delay={i * 140}>
          <span className="essence-value-index">0{i + 1}</span>
          <span className="essence-value-icon" aria-hidden="true"><Icon size={30} strokeWidth={1.3} /></span>
          <div><h3>{title}</h3><p>{copy}</p></div>
        </article>)}
      </div>
    </div>
  </section>;
}
