export type Project = {
  title: string
  description: string
  url: string
  topics: string[]
  image: string
  tools: string[]
}

export const projects: Project[] = [
  {
    title: 'christianmontebon.github.io',
    description: 'My personal website',
    url: 'https://christianmontebon.github.io',
    topics: ['personal'],
    image: '/images/projects/christianmontebon.github.io.png',
    tools: ['React', 'Tailwind CSS', 'Vite', 'TypeScript'],
  },
  {
    title: 'Hayley at One – RSVP',
    description: 'A simple, private RSVP web app for Hayley’s first birthday. Guests receive unique links per invite, can accept or decline without accounts, and are grouped by family or circle for easy headcount tracking.',
    url: 'https://hayleyatone.com',
    topics: ['personal', 'event', 'rsvp'],
    image: '/images/projects/hayley-at-one.png',
    tools: ['React', 'Supabase', 'PostgreSQL', 'Next.js', 'Tailwind CSS', 'TypeScript'],
  },
  // {
  //   title: 'Luminous',
  //   description:
  //     'A web platform for managing business operations and integrations.',
  //   url: 'https://www.joinluminous.com',
  //   tags: ['work']
  // },
  // {
  //   title: 'TAGR',
  //   description:
  //     'A web-based platform for organizing and managing digital content.',
  //   url: 'https://tagr.io',
  //   tags: ['work']
  // },
  // {
  //   title: 'QRThis',
  //   description:
  //     'A simple and practical QR code solution for businesses and individuals.',
  //   url: 'https://qrthis.io',
  //   tags: ['work']
  // },
  // {
  //   title: 'Digikey Conversion Tools',
  //   description:
  //     'Interactive calculators used by thousands of users worldwide.',
  //   url: 'https://www.digikey.ph/en/resources/online-conversion-calculators',
  //   tags: ['work']
  // },
  // {
  //   title: 'House of Joy',
  //   description:
  //     'A website built with clarity and accessibility in mind for a local organization.',
  //   url: 'https://www.houseofjoycdo.org',
  //   tags: ['work']
  // },
  // {
  //   title: 'Highlands Realty PH',
  //   description:
  //     'A real estate website with custom content management features.',
  //   url: 'https://www.highlandsrealtyph.com',
  //   tags: ['work']
  // },
]
