import { profile } from './src/data.js'

const url = 'https://saheem-nakhwa.vercel.app/'

export function portfolioSearchHtml(html: string) {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${url}#website`,
        url,
        name: 'Saheem Nakhwa Portfolio',
        alternateName: 'Saheem Portfolio',
        inLanguage: 'en',
        publisher: { '@id': `${url}#person` },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${url}#profile`,
        url,
        name: 'Saheem Nakhwa | Full-Stack Developer',
        isPartOf: { '@id': `${url}#website` },
        mainEntity: { '@id': `${url}#person` },
      },
      {
        '@type': 'Person',
        '@id': `${url}#person`,
        name: profile.name,
        alternateName: ['Saheem', 'Saheem Nakwa'],
        url,
        jobTitle: 'Full-Stack Developer',
        description:
          'Full-stack developer building React interfaces, REST APIs, and database-backed web applications.',
        sameAs: profile.links.map((item) => item.url),
        knowsAbout: [
          'Full-stack web development',
          'MERN stack',
          'React',
          'Node.js',
          'Express.js',
          'REST APIs',
          'MongoDB',
          'MySQL',
          'PHP',
          'C++',
        ],
      },
    ],
  }
  return html.replace(
    '</head>',
    `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script></head>`,
  )
}
