'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { useId } from 'react';
import { site } from '@/data/site';
import styles from './author-chapter.module.css';

export function AuthorChapter() {
  const id = useId();
  return <section id="sobre" className={styles.root} aria-labelledby="author-title">
    <header className={styles.topline}><p>02 / POR TRÁS DO CUIDADO</p><span aria-hidden="true" /><p>A BELEZA TAMBÉM ESTÁ NAS PESSOAS.</p></header>
    <div className={styles.stage}>
      <div className={styles.copy} data-reveal>
        <h2 id="author-title"><span className={styles.titleMask}>Cuidar é</span><span className={styles.titleMask}>enxergar</span><em className={styles.titleMask}>além.</em></h2>
        <p className={styles.subcopy}>Cada detalhe começa na escuta.</p>
      </div>
      <figure className={styles.photo} data-reveal><Image src={site.images.about} alt="Dra. Laís Paula, da Clínica Paula Estética" fill sizes="(max-width:700px) 88vw, (max-width:1500px) 43vw, 610px" /></figure>
      <article className={styles.card} data-reveal>
        <p className={styles.cardLabel}>DRA. LAÍS PAULA</p>
        <p className={styles.cardCopy}>{site.bio}</p>
        <a className={styles.cta} href={site.instagram} target="_blank" rel="noreferrer"><span>Conheça a clínica</span><span className={styles.ctaCircle} aria-hidden="true"><ArrowUpRight size={24} strokeWidth={1.25} /></span></a>
      </article>
    </div>
    <footer className={styles.closing}>
      <p className={styles.closingEyebrow}>NOSSA FILOSOFIA DE CUIDADO</p>
      <div className={styles.closingRow}>
        <div className={styles.closingMonogram} aria-hidden="true"><strong>lp.</strong></div>
        <p className={styles.closingStatement} data-reveal><span>Precisão em cada escolha.</span><em>Cuidado em cada encontro.</em></p>
        <div className={styles.closingSeal}>
          <svg className={styles.seal} viewBox="0 0 120 120" aria-hidden="true" focusable="false">
            <defs><path id={id} d="M15,60a45,45 0 1,1 90,0a45,45 0 1,1 -90,0" /></defs>
            <text className={styles.sealText} textLength="280" lengthAdjust="spacing"><textPath href={`#${id}`}>ESTÉTICA • EQUILÍBRIO • LAÍS PAULA • </textPath></text>
            <text className={styles.sealMark} x="60" y="70" textAnchor="middle">lp.</text>
          </svg>
        </div>
      </div>
      <p className={styles.closingNote}>Equilíbrio, presença e intenção em cada detalhe.</p>
    </footer>
  </section>;
}
