'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { site } from '@/data/site';
import styles from './experience-statement.module.css';

export function ExperienceStatement() {
  return <section id="identidade" className={styles.root} aria-labelledby="experience-statement-title">
    <header className={styles.topline}><p>04 / SUA EXPERIÊNCIA</p><span aria-hidden="true" /></header>
    <div className={styles.heading} data-reveal>
      <h2 id="experience-statement-title"><span className={styles.titleMask}>Beleza com</span><em className={styles.titleMask}>identidade.</em></h2>
      <p className={styles.subtitle}>DETALHES QUE FAZEM SENTIDO.</p>
    </div>
    <figure className={styles.photo} data-reveal><Image src={site.images.beauty} alt="Dra. Laís Paula em um evento profissional de estética" fill sizes="(max-width:700px) 88vw, (max-width:1500px) 41vw, 615px" /></figure>
    <blockquote className={styles.quote} data-reveal><span className={styles.quoteMark} aria-hidden="true">&quot;</span><div><p>Mais do que estética,<br />é sobre se reconhecer.</p><footer><cite>LAÍS PAULA</cite></footer></div></blockquote>
    <a className={styles.cta} href="#experiencia"><span>CONHEÇA A EXPERIÊNCIA</span><ArrowUpRight size={25} strokeWidth={1.4} aria-hidden="true" /></a>
  </section>;
}
