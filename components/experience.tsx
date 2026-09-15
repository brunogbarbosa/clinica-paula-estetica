'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { CampaignHero } from './campaign-hero';
import { Chapters } from './chapters';
import { appointmentUrl, site } from '@/data/site';

function Appointment({ className = '' }: { className?: string }) {
  return <a className={`appointment ${className}`} href={appointmentUrl} target="_blank" rel="noreferrer">Falar com a clínica <ArrowUpRight size={19} /></a>;
}

function Label({ children }: { children: React.ReactNode }) { return <p className="eyebrow">{children}</p>; }

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 70);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const modal = dialog.current;
    const previousOverflow = document.body.style.overflow;
    if (!modal?.open) modal?.showModal();
    document.body.style.overflow = 'hidden';
    const onResize = () => { if (window.innerWidth > 900) setOpen(false); };
    window.addEventListener('resize', onResize);
    return () => {
      modal?.close();
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const close = () => { dialog.current?.close(); setOpen(false); trigger.current?.focus({ preventScroll: true }); };

  return <>
    <header className={scrolled ? 'header scrolled' : 'header'}>
      <a className="wordmark" href="#inicio" aria-label={`${site.name}, início`}><span className="brand-monogram" aria-hidden="true">lp.</span><span className="brand-type">CLÍNICA PAULA<small>ESTÉTICA FACIAL</small></span></a>
      <nav className="desktop-nav" aria-label="Navegação principal"><a href="#sobre">A doutora</a><a href="#experiencia">A experiência</a>{site.results.enabled && <a href="#resultados">Resultados</a>}</nav>
      <Appointment className="header-cta" />
      <button className="mobile-menu icon-button" ref={trigger} aria-label="Abrir menu" aria-controls="mobile-navigation" aria-expanded={open} onClick={() => setOpen(true)}><Menu /></button>
    </header>
    <dialog ref={dialog} id="mobile-navigation" className="menu-dialog" aria-label="Menu de navegação" onCancel={event => { event.preventDefault(); close(); }} onClose={() => setOpen(false)}>
      <button className="menu-close icon-button" aria-label="Fechar menu" onClick={close}><X /></button>
      <Label>{site.name}</Label>
      <nav aria-label="Navegação mobile">{[['A doutora', 'sobre'], ['A experiência', 'experiencia'], ['Resultados', 'resultados'], ['Vamos conversar', 'contato']].filter(([, id]) => id !== 'resultados' || site.results.enabled).map(([name, id]) => <a key={id} href={`#${id}`} onClick={close}>{name}<ArrowUpRight /></a>)}</nav>
    </dialog>
  </>;
}

export function Experience() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return;
    const animations: Animation[] = [];
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      animations.push(entry.target.animate([{ opacity: 0, transform: 'translateY(22px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 850, easing: 'cubic-bezier(.2,.7,.2,1)' }));
      observer.unobserve(entry.target);
    }), { threshold: .08 });
    root.current?.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
    const stop = () => { if (media.matches) { animations.forEach(animation => animation.cancel()); observer.disconnect(); } };
    media.addEventListener('change', stop);
    return () => { observer.disconnect(); animations.forEach(animation => animation.cancel()); media.removeEventListener('change', stop); };
  }, []);

  return <div ref={root}><a className="skip-link" href="#manifesto">Pular para o conteúdo</a><Header /><main><CampaignHero /><Chapters /></main><footer className="footer"><div className="footer-main"><a href="#inicio" className="footer-name">{site.name.toUpperCase()}</a><div><a href={site.instagram} target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={14} /></a>{(site.whatsapp || site.whatsappUrl) && <a href={appointmentUrl} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight size={14} /></a>}{site.phone && <a href={`tel:${site.phone.replace(/[^\d+]/g, '')}`}>{site.phone}</a>}</div><div><p>{site.address}</p><a href="#inicio">Voltar ao início ↑</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {site.name}</span><span>HARMONIZAÇÃO FACIAL</span></div></footer></div>;
}
