'use client';

import Image from 'next/image';
import { useId } from 'react';
import { ArrowRight } from 'lucide-react';
import { appointmentUrl, site } from '@/data/site';
import { useCampaignMotion } from './use-campaign-motion';

const editorialMarkers = [
  { value: '01', label: 'ESCUTA ANTES DE TUDO' },
  { value: '02', label: 'EQUILÍBRIO EM CADA PLANO' },
  { value: '03', label: 'NATURALIDADE COMO GUIA' },
];

function SmileSeal() {
  const id = useId().replace(/:/g, '');

  return <div className="campaign-seal" role="img" aria-label="Equilíbrio facial com naturalidade">
    <svg viewBox="0 0 180 180" fill="none" aria-hidden="true">
      <defs>
        <path id={`${id}-top`} d="M18 90a72 72 0 0 1 144 0" />
        <path id={`${id}-bottom`} d="M12 90a78 78 0 0 0 156 0" />
      </defs>
      <circle pathLength="1" cx="90" cy="90" r="54" stroke="currentColor" strokeWidth=".7" />
      <text fill="currentColor" textAnchor="middle">
        <textPath href={`#${id}-top`} startOffset="50%">BELEZA COM IDENTIDADE</textPath>
      </text>
      <text fill="currentColor" textAnchor="middle">
        <textPath href={`#${id}-bottom`} startOffset="50%">CLÍNICA PAULA ESTÉTICA</textPath>
      </text>
      <path pathLength="1" d="M89 67c-8 0-13-8-22-2-10 7-6 22-2 32 5 11 3 22 9 24 6 2 7-13 11-19 3-4 6-4 9 2 4 7 4 19 10 17 7-3 5-15 10-27 5-12 6-23-2-29-9-6-15 2-23 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>;
}

export function CampaignHero() {
  const motionRef = useCampaignMotion();

  return <section ref={motionRef} id="inicio" className="campaign" aria-labelledby="campaign-title">
    <div className="campaign-organic campaign-organic-one" aria-hidden="true" />
    <div className="campaign-organic campaign-organic-two" aria-hidden="true" />
    <div className="campaign-contour" aria-hidden="true" />
    <div className="campaign-inner">
      <div className="campaign-copy">
        <p className="campaign-kicker">CLÍNICA PAULA ESTÉTICA</p>
        <h1 id="campaign-title" aria-label="Sua beleza, mais você">
          <span className="campaign-title-line"><span>SUA BELEZA,</span></span>
          <span className="campaign-title-line"><span>MAIS</span></span>
          <span className="campaign-title-line"><span>VOCÊ.</span></span>
        </h1>
        <p className="campaign-subtitle">Harmonização facial, lábios e perfil<br />com equilíbrio e naturalidade.</p>
        <div className="campaign-action"><a className="campaign-cta" href={appointmentUrl} target="_blank" rel="noreferrer"><span>FALAR COM A CLÍNICA</span><ArrowRight size={22} strokeWidth={1.2} /></a></div>
      </div>
      <figure className="campaign-portrait">
        <div className="campaign-silhouette"><Image className="campaign-original" src={site.images.hero} alt="Dra. Laís Paula na clínica" fill priority sizes="(max-width:700px) 145vw, (max-width:1100px) 77vw, 60vw" /></div>
      </figure>
      <SmileSeal />
      <p className="campaign-editorial">Detalhes<br />que revelam<br /><em>você.</em><span aria-hidden="true" /></p>
      <div className="campaign-metrics" aria-label="Pilares do atendimento">
        {editorialMarkers.map(marker => <div className="campaign-metric" key={marker.value}><strong>{marker.value}</strong><span>{marker.label}</span></div>)}
      </div>
      <div className="campaign-signature"><span aria-hidden="true" /><div><p>DRA. LAÍS PAULA</p><em>Harmonização facial<br className="campaign-signature-break" /> com intenção e leveza.</em></div></div>
    </div>
  </section>;
}
