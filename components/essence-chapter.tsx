'use client';

import Image from 'next/image';
import { ArrowUpRight, Heart, Leaf, UserRound } from 'lucide-react';
import { site } from '@/data/site';

const pillars = [
  { title: 'Identidade', copy: 'Seus traços e sua história são o ponto de partida.', Icon: UserRound },
  { title: 'Equilíbrio', copy: 'Escolhas que respeitam proporções e expressão.', Icon: Leaf },
  { title: 'Intenção', copy: 'Cada detalhe pensado para fazer sentido para você.', Icon: Heart },
];

export function EssenceChapter() {
  return <section id="manifesto" className="essence-editorial" aria-labelledby="essence-title">
    <div className="essence-stage">
      <div className="essence-editorial-top"><p>01 / A ESSÊNCIA</p><span aria-hidden="true" /><p>A BELEZA COMEÇA<br />NO QUE É SEU.</p></div>
      <div className="essence-editorial-copy" data-reveal>
        <p className="essence-editorial-prelude">Cada traço conta uma história.</p>
        <h2 id="essence-title"><span className="essence-title-mask">Sua essência.</span><em className="essence-title-mask">Em primeiro</em><span className="essence-title-mask">lugar.</span></h2>
        <p className="essence-editorial-description">Cuidar da sua imagem também é cuidar da forma como você se sente. O nosso olhar busca equilíbrio, leveza e verdade.</p>
        <a className="essence-editorial-cta" href="#sobre"><span>Conheça o olhar por trás do cuidado</span><span className="essence-arrow" aria-hidden="true"><ArrowUpRight size={24} strokeWidth={1.3} /></span></a>
      </div>
      <figure className="essence-smile" data-reveal><Image src={site.images.event} alt="Dra. Laís Paula em um evento de estética" fill sizes="(max-width:700px) 81vw, (max-width:1500px) 39vw, 490px" /></figure>
    </div>
    <div className="essence-values">
      <p className="essence-values-label"><span />OS PILARES DO NOSSO CUIDADO<span /></p>
      <div className="essence-values-grid">{pillars.map(({ title, copy, Icon }, i) =>
        <article className="essence-value" key={title} data-reveal>
          <span className="essence-value-index">0{i + 1}</span>
          <span className="essence-value-icon" aria-hidden="true"><Icon size={30} strokeWidth={1.3} /></span>
          <div><h3>{title}</h3><p>{copy}</p></div>
        </article>
      )}</div>
    </div>
  </section>;
}
