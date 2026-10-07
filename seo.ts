import {
  profile,
  projects,
  projectDetails,
  experience,
  education,
  skills,
} from './src/data.js'

const url = 'https://saheem-nakhwa.vercel.app/'
const escape = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[
        character
      ]!,
  )
const link = (name: string, href: string) =>
  `<a href="${escape(href)}">${escape(name)}</a>`

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
  const content = `<main id="main" class="portfolio-world">
    <section id="hero" class="chapter wrap">
      <h1>Saheem Nakhwa — Full-Stack Developer</h1>
      <p>I build web apps, work with APIs, and spend a little too long figuring out why my C++ code fails.</p>
      <nav aria-label="Portfolio sections">${['About', 'Experience', 'Projects', 'Skills', 'Education', 'Contact'].map((name) => link(name, `#${name.toLowerCase()}`)).join(' · ')}</nav>
    </section>
    <section id="about" class="chapter wrap"><h2>About Saheem Nakhwa</h2>
      <p>I'm Saheem Nakhwa, a full-stack developer working across React interfaces, REST APIs, and databases. My experience spans freelance projects, business applications, and backend testing. I build MERN applications with React, Node.js, Express, and MongoDB, alongside PHP and MySQL.</p>
    </section>
    <section id="experience" class="chapter wrap"><h2>Experience</h2>${experience.map((item) => `<article><h3>${escape(item.role)} — ${escape(item.company)}</h3><p>${escape(item.date)} · ${escape(item.location)}</p><ul>${item.points.map((point) => `<li>${escape(point)}</li>`).join('')}</ul></article>`).join('')}</section>
    <section id="projects" class="chapter wrap"><h2>Projects</h2>${projects.map((item, index) => `<article><h3>${escape(item.name)}</h3><p>${escape(item.description)}</p><p>${escape(item.tech.join(', '))}</p><ul>${item.features.map((feature) => `<li>${escape(feature)}</li>`).join('')}</ul>${index === 1 ? '' : link(`${item.name} source code`, item.repo)}${projectDetails[index].demo ? ' · ' + link(`Visit ${item.name}`, projectDetails[index].demo!) : ''}</article>`).join('')}</section>
    <section id="skills" class="chapter wrap"><h2>Skills</h2>${Object.entries(
      skills,
    )
      .map(
        ([name, items]) =>
          `<h3>${escape(name)}</h3><p>${escape(items.join(', '))}</p>`,
      )
      .join('')}</section>
    <section id="education" class="chapter wrap"><h2>Education</h2>${education.map((item) => `<article><h3>${escape(item.school)}</h3><p>${escape(item.degree)} · ${escape(item.date)}</p><p>${escape(item.result)}</p></article>`).join('')}</section>
    <section id="contact" class="chapter wrap"><h2>Contact Saheem Nakhwa</h2><p>${link(profile.email, `mailto:${profile.email}`)}</p><p>${profile.links.map((item) => link(item.name, item.url)).join(' · ')} · ${link('Resume', '/Saheem_Nakhwa_Resume.pdf')}</p></section>
  </main>`

  return html
    .replace(
      '</head>',
      `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script></head>`,
    )
    .replace('<div id="root"></div>', `<div id="root">${content}</div>`)
}
