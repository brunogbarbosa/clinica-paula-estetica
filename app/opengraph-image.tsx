import { ImageResponse } from 'next/og';

export const alt = 'Dra. Laís Paula — Clínica Paula Estética';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '68px 78px', color: '#f6f2eb', background: '#15110f', fontFamily: 'Georgia' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 22, letterSpacing: 5 }}><span>CLÍNICA PAULA</span><span style={{ color: '#d6b47a', fontSize: 14, letterSpacing: 4, marginTop: 10 }}>ESTÉTICA FACIAL</span></div>
        <div style={{ display: 'flex', color: '#d6b47a', fontSize: 52, fontStyle: 'italic' }}>lp.</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 760 }}><div style={{ display: 'flex', color: '#d6b47a', fontFamily: 'Arial', fontSize: 16, letterSpacing: 4 }}>HARMONIZAÇÃO FACIAL</div><div style={{ display: 'flex', fontSize: 74, lineHeight: 1.02, marginTop: 22 }}>Sua beleza,<br />mais você.</div></div>
      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbbca8', fontFamily: 'Arial', fontSize: 18 }}><span>Equilíbrio em cada detalhe.</span><span>@__clinicapaulaestetica</span></div>
    </div>,
    { ...size },
  );
}
