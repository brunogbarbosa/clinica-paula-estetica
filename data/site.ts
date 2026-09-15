export type Procedure = { name: string; description: string; image: string };

export type Testimonial = { quote: string; name: string };

export const site = {
  name: 'Laís Paula',
  monogram: 'LP',

  headline: 'Harmonização facial com equilíbrio. A sua beleza, mais você.',

  cro: '',
  bio: 'Na Clínica Paula Estética, cada plano começa pela escuta. O cuidado é pensado para valorizar seus traços, sua expressão e a forma como você se reconhece no espelho.',
  education: [] as string[],
  specialties: ['Harmonização facial', 'Rinomodelação', 'Lábios'],

  phone: '',
  whatsapp: '',
  whatsappUrl: '',
  address: 'Atendimento com hora marcada',
  professionalPhilosophy: 'Equilíbrio facial com naturalidade.',

  instagram: 'https://www.instagram.com/__clinicapaulaestetica/',
  instagramHandle: '@__clinicapaulaestetica',

  philosophy: ['EQUILÍBRIO', 'QUE RESPEITA', 'SEU ROSTO.'],

  colors: {
    paper: '#f6f2eb',
    ink: '#1c1714',
    taupe: '#9a7045',
    champagne: '#d6b47a',
    dark: '#15110f',
  },

  images: {
    hero: '/images/lais-hero.png',
    about: '/images/lais-about.png',
    beauty: '/images/lais-beauty.png',
  },

  procedures: [
    { name: 'Harmonização facial', description: 'Um plano individual para equilibrar proporções e preservar sua identidade.', image: '/images/lais-hero.png' },
    { name: 'Rinomodelação', description: 'Detalhes que refinam o perfil com leveza e planejamento.', image: '/images/resultado-nariz.png' },
    { name: 'Lábios', description: 'Contorno, hidratação e volume na medida do que combina com você.', image: '/images/resultado-labios.png' },
  ] as Procedure[],

  office: [] as { src: string; alt: string }[],

  testimonials: [] as Testimonial[],

  results: {
    enabled: true,
    items: [
      { image: '/images/resultado-sobrancelhas.png', label: 'Olhar mais expressivo', alt: 'Registro de antes e depois de harmonização facial na região das sobrancelhas, fornecido pela Clínica Paula Estética', orientation: 'single', beforeShare: 0.5, comparisonRatio: 1.97 },
      { image: '/images/resultado-labios.png', label: 'Lábios com naturalidade', alt: 'Registro de antes e depois de tratamento labial, fornecido pela Clínica Paula Estética', orientation: 'single', beforeShare: 0.5, comparisonRatio: 1.01 },
      { image: '/images/resultado-nariz.png', label: 'Perfil em equilíbrio', alt: 'Registro de antes e depois de rinomodelação, fornecido pela Clínica Paula Estética', orientation: 'single', beforeShare: 0.5, comparisonRatio: 0.97 },
      { image: '/images/resultado-contorno.png', label: 'Harmonia no contorno', alt: 'Registro de antes e depois de harmonização facial, fornecido pela Clínica Paula Estética', orientation: 'single', beforeShare: 0.5, comparisonRatio: 1.01 },
      { image: '/images/resultado-perfil.png', label: 'Leveza no perfil', alt: 'Registro de antes e depois de harmonização facial, fornecido pela Clínica Paula Estética', orientation: 'single', beforeShare: 0.5, comparisonRatio: 1.01 },
    ],
  },

  seo: {
    title: 'Dra. Laís Paula | Clínica Paula Estética',
    description: 'Harmonização facial, rinomodelação e cuidados para realçar a sua beleza com equilíbrio e naturalidade.',
    url: '',
  },
};

export const appointmentUrl = site.whatsappUrl || (site.whatsapp
  ? `https://wa.me/${site.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent('Olá, gostaria de agendar uma avaliação com a Dra. Laís Paula.')}`
  : site.instagram);
