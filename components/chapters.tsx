'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react';
import { appointmentUrl, site } from '@/data/site';
import { AuthorChapter } from './author-chapter';
import { EssenceChapter } from './essence-chapter';
import { ExperienceStatement } from './experience-statement';

const pad = (n: number) => String(n + 1).padStart(2, '0');
function Tag({ children }: { children: React.ReactNode }) { return <p className="chapter-tag">{children}</p>; }
function ContactLink({ children = 'Falar com a clínica' }: { children?: React.ReactNode }) { return <a className="chapter-link" href={appointmentUrl} target="_blank" rel="noreferrer">{children}<ArrowUpRight size={22} /></a>; }

export function Chapters() {
  return <>
    <EssenceChapter />
    <AuthorChapter />
    {site.results.enabled && <ResultGallery />}
    <ExperienceStatement />
    <section id="experiencia" className="ritual-chapter"><div className="ritual-intro"><Tag>O seu tempo / Sua experiência</Tag><h2>Cada encontro.<br />Um novo<br /><em>cuidado.</em></h2><p>E ele começa com você.</p></div><div className="ritual-list">{[['Escuta', 'Um momento para compartilhar o que você procura. Para conversar, perguntar e se sentir à vontade.'], ['Planejamento', 'Suas necessidades orientam as escolhas. Cada etapa é conversada, cada detalhe tem um propósito.'], ['Cuidado', 'Atenção ao seu conforto e à sua individualidade, do começo ao fim.'], ['Acompanhamento', 'O encontro termina. O cuidado continua, com orientações e espaço para suas dúvidas.']].map(([title, copy], i) => <article key={title} data-reveal><span>{pad(i)}</span><div><h3>{title}</h3><p>{copy}</p></div><ArrowUpRight size={22} strokeWidth={1} /></article>)}</div></section>
    <RealTestimonials />
    <section className="social-chapter"><Tag>Mais perto, todos os dias.</Tag><a href={site.instagram} target="_blank" rel="noreferrer"><span>Acompanhe<br /><em>o nosso olhar.</em></span><ArrowUpRight strokeWidth={.7} /></a><div><span>{site.instagramHandle}</span><span>INSTAGRAM</span></div></section>
    <section id="contato" className="closing-chapter"><Tag>O próximo passo é seu.</Tag><h2 data-reveal>Seu cuidado<br />começa com<br /><em>uma conversa.</em></h2><div className="closing-bottom"><p>Um primeiro encontro.<br />Novas possibilidades.</p><ContactLink /><span>{site.address}</span></div><span className="closing-monogram" aria-hidden="true">{site.monogram.toLowerCase()}.</span></section>
  </>;
}

function ResultGallery() {
  const [active, setActive] = useState<number | null>(null);
  const [compare, setCompare] = useState(false);
  const [value, setValue] = useState(50);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const items = site.results.items;
  const item = active === null ? null : items[active];

  useEffect(() => {
    if (active !== null) { if (!dialog.current?.open) dialog.current?.showModal(); document.body.style.overflow = 'hidden'; }
    else { dialog.current?.close(); document.body.style.overflow = ''; }
    return () => { document.body.style.overflow = ''; };
  }, [active]);

  const close = () => { setActive(null); opener.current?.focus(); };
  const move = (delta: number) => { setActive(current => current === null ? 0 : (current + delta + items.length) % items.length); setValue(50); setCompare(false); };

  return <section id="resultados" className="gallery-chapter"><div className="gallery-top"><Tag>O cuidado, em imagens</Tag><span>{String(items.length).padStart(2, '0')} REGISTROS REAIS</span></div><div className="gallery-heading" data-reveal><h2>Beleza real.<br /><em>Identidade singular.</em></h2><p>Registros compartilhados pela clínica. Explore os antes e depois com respeito à individualidade de cada pessoa.</p></div><div className="gallery-grid">{items.map((result, i) => <figure className={`gallery-item gallery-item-${i}`} key={result.image} data-reveal><button onClick={event => { opener.current = event.currentTarget; setCompare(false); setValue(50); setActive(i); }} aria-label={`Ampliar resultado ${pad(i)}: ${result.label}`}><div className="gallery-photo"><Image src={result.image} alt={result.alt} fill sizes="(max-width:700px) 88vw, (max-width:1000px) 45vw, 42vw" /></div><span className="gallery-open"><ArrowUpRight size={23} /></span></button><figcaption><span><small>{pad(i)} /</small> {result.label}</span><span>{result.orientation === 'single' ? 'REGISTRO' : 'ANTES & DEPOIS'}</span></figcaption></figure>)}</div><div className="gallery-end"><p>Fotografias compartilhadas pela Dra. {site.name}.<br />Resultados individuais. Cada pessoa tem características próprias.</p><ContactLink>O seu primeiro passo</ContactLink></div>
    <dialog ref={dialog} className="result-dialog" aria-labelledby="viewer-title" onCancel={close} onClose={() => setActive(null)} onKeyDown={event => { if ((event.target as HTMLElement).tagName === 'INPUT') return; if (event.key === 'ArrowRight') { event.preventDefault(); move(1); } if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); } }}>{item && <><div className="viewer-top"><div><Tag>Um olhar mais próximo</Tag><h3 id="viewer-title">{item.label}</h3></div><button className="viewer-icon" onClick={close} aria-label="Fechar resultado"><X /></button></div><div className="viewer-stage">{compare && item.orientation !== 'single' ? <div className={`comparison ${item.orientation === 'vertical' ? 'vertical' : ''}`} style={{ aspectRatio: item.comparisonRatio }}><div className="compare-half after" style={{ backgroundImage: `url(${item.image})`, backgroundSize: `100% ${100 / (1 - item.beforeShare)}%` }} /><div className="compare-half before" style={{ backgroundImage: `url(${item.image})`, backgroundSize: `100% ${100 / item.beforeShare}%`, clipPath: `inset(0 ${100 - value}% 0 0)` }} /><div className="comparison-line" style={{ left: `${value}%` }}><span>↔</span></div><span className="compare-label left">Antes</span><span className="compare-label right">Depois</span></div> : <Image src={item.image} alt={item.alt} fill sizes="90vw" />}</div>{compare && <label className="viewer-range">Deslize para comparar<input type="range" min="0" max="100" value={value} onChange={event => setValue(+event.target.value)} aria-label="Proporção entre antes e depois" /></label>}<div className="viewer-bottom"><button className="viewer-icon" aria-label="Resultado anterior" onClick={() => move(-1)}><ArrowLeft /></button><span aria-live="polite">{pad(active!)} / {String(items.length).padStart(2, '0')}</span>{item.orientation !== 'single' && <button className="viewer-mode" aria-pressed={compare} onClick={() => { setCompare(!compare); setValue(50); }}>{compare ? 'Ver foto original' : 'Comparar antes e depois'}</button>}<button className="viewer-icon" aria-label="Próximo resultado" onClick={() => move(1)}><ArrowRight /></button></div>{compare && <p className="viewer-note">Recortes do registro original. Enquadramentos podem variar.</p>}</>}</dialog>
  </section>;
}

function RealTestimonials() {
  const [index, setIndex] = useState(0);
  if (!site.testimonials.length) return null;
  return <section className="voices-chapter"><Tag>Palavras de quem viveu</Tag><blockquote>&quot;{site.testimonials[index].quote}&quot;</blockquote><p>{site.testimonials[index].name}</p><button className="chapter-link" onClick={() => setIndex((index + 1) % site.testimonials.length)}>Próximo relato<ArrowRight /></button></section>;
}
