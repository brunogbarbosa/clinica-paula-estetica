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
  const [imageStatus, setImageStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const items = site.results.items;
  const item = active === null ? null : items[active];
  const isOpen = active !== null;

  useEffect(() => {
    if (!isOpen) return;
    const modal = dialog.current;
    const previousOverflow = document.body.style.overflow;
    if (!modal?.open) modal?.showModal();
    document.body.style.overflow = 'hidden';
    return () => { modal?.close(); document.body.style.overflow = previousOverflow; };
  }, [isOpen]);

  const close = () => {
    dialog.current?.close();
    setActive(null);
    opener.current?.focus({ preventScroll: true });
  };
  const move = (delta: number) => {
    setImageStatus('loading');
    setActive(current => current === null ? 0 : (current + delta + items.length) % items.length);
  };

  return <section id="resultados" className="gallery-chapter" aria-labelledby="gallery-title">
    <div className="gallery-top"><Tag>03 / O cuidado, em imagens</Tag><span>{String(items.length).padStart(2, '0')} REGISTROS REAIS</span></div>
    <div className="gallery-heading" data-reveal>
      <h2 id="gallery-title">Beleza real.<br /><em>Identidade singular.</em></h2>
      <p>Registros compartilhados pela clínica. Explore os antes e depois com respeito à individualidade de cada pessoa.</p>
    </div>
    <div className="gallery-grid">{items.map((result, i) =>
      <figure className="gallery-item" key={result.image} data-reveal>
        <button type="button" onClick={event => { opener.current = event.currentTarget; setImageStatus('loading'); setActive(i); }} aria-haspopup="dialog" aria-label={`Ampliar resultado ${pad(i)}: ${result.label}`}>
          <div className="gallery-photo"><Image src={result.image} alt={result.alt} width={result.width} height={result.height} sizes="(max-width:700px) 88vw, (max-width:1450px) 42vw, 600px" /></div>
          <span className="gallery-open" aria-hidden="true"><ArrowUpRight size={23} /></span>
        </button>
        <figcaption><span><small>{pad(i)} /</small> {result.label}</span><span>REGISTRO ORIGINAL</span></figcaption>
      </figure>
    )}</div>
    <div className="gallery-end"><p>Fotografias compartilhadas pela Dra. {site.name}.<br />Resultados individuais. Cada pessoa tem características próprias.</p><ContactLink>O seu primeiro passo</ContactLink></div>
    <dialog ref={dialog} className="result-dialog" aria-labelledby="viewer-title" onCancel={event => { event.preventDefault(); close(); }} onClose={() => setActive(null)} onKeyDown={event => {
      if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
    }}>
      {item && <>
        <div className="viewer-top"><div><Tag>Um olhar mais próximo</Tag><h3 id="viewer-title">{item.label}</h3></div><button type="button" className="viewer-icon" onClick={close} aria-label="Fechar resultado" autoFocus><X /></button></div>
        <div className="viewer-stage" aria-busy={imageStatus === 'loading'}>
          {imageStatus !== 'loaded' && <p className="viewer-loading" role="status">{imageStatus === 'error' ? 'Não foi possível carregar a imagem. Tente outro registro.' : 'Carregando registro…'}</p>}
          <Image key={item.image} src={item.image} alt={item.alt} fill loading="eager" sizes="(max-width:700px) 90vw, 900px" onLoad={() => setImageStatus('loaded')} onError={() => setImageStatus('error')} />
        </div>
        <div className="viewer-bottom"><button type="button" className="viewer-icon" aria-label="Resultado anterior" onClick={() => move(-1)}><ArrowLeft /></button><span aria-live="polite">{pad(active!)} / {String(items.length).padStart(2, '0')}</span><button type="button" className="viewer-icon" aria-label="Próximo resultado" onClick={() => move(1)}><ArrowRight /></button></div>
      </>}
    </dialog>
  </section>;
}

function RealTestimonials() {
  const [index, setIndex] = useState(0);
  if (!site.testimonials.length) return null;
  return <section className="voices-chapter"><Tag>Palavras de quem viveu</Tag><blockquote>&quot;{site.testimonials[index].quote}&quot;</blockquote><p>{site.testimonials[index].name}</p><button className="chapter-link" onClick={() => setIndex((index + 1) % site.testimonials.length)}>Próximo relato<ArrowRight /></button></section>;
}
