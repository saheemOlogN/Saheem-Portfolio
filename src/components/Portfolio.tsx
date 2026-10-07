import { useReducedMotion } from './MotionPreference'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import {
  experience,
  projects,
  projectDetails,
  skills,
  skillIcons,
  education,
  achievements,
  profile,
} from '../data'
import FadeContent from './FadeContent'
import Character from './Character'
import HireMe from './HireMe'
import Activity from './Activity'
import TargetCursor from './TargetCursor'
import './Portfolio.css'

function Heading({ line }: { line: string }) {
  return (
    <div className="chapter-heading">
      <h2>{line}</h2>
    </div>
  )
}
function Chapter({ id, children }: { id: string; children: ReactNode }) {
  return (
    <section
      id={id}
      className="chapter wrap"
      aria-label={id === 'activity' ? 'Coding activity' : id}
    >
      <FadeContent>{children}</FadeContent>
    </section>
  )
}
export function DetailIcon({ kind }: { kind: string }) {
  return (
    <svg
      className="detail-icon"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinejoin="miter"
      aria-hidden="true"
    >
      {kind === 'hat' ? (
        <>
          <path d="M5 30h38v6H5zM12 29l4-15h16l4 15" fill="#d3b46d" />
          <path d="M13 24h22v6H13" fill="#ae6665" />
        </>
      ) : kind === 'chess' ? (
        <>
          <path
            d="M12 40h24v-5H12zM17 34l3-9-6-3 4-12 13 5 3 9-6 9M19 10V6l8 7"
            fill="#b7c8c9"
          />
          <path d="M23 17h3" stroke="#151c2a" />
        </>
      ) : kind === 'cube' ? (
        <>
          <path
            d="M8 13l16-8 16 8v22l-16 8-16-8zM8 13l16 8 16-8M24 21v22M8 24l16 8 16-8M16 9l16 8v22M32 9l-16 8v22"
            fill="#759795"
          />
        </>
      ) : kind === 'ball' ? (
        <>
          <circle cx="24" cy="24" r="18" fill="#dbd6c6" />
          <path
            d="m24 15 9 6-4 10H18l-3-10zM24 6v9M7 19l8 2M14 39l4-8M36 38l-7-7M42 18l-9 3"
            fill="#263446"
          />
        </>
      ) : (
        <>
          <path
            d="M15 7h18v14l-5 7h-8l-5-7zM15 11H7v9l8 5M33 11h8v9l-8 5M24 28v9M15 41h18v-4H15z"
            fill="#b99b59"
          />
          <path
            d="m24 12 2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"
            fill="#eee0b1"
            strokeWidth="1"
          />
        </>
      )}
    </svg>
  )
}
function About() {
  return (
    <Chapter id="about">
      <div className="about-centered">
        <Heading line="Behind the keyboard." />
        <div className="about-pixel-copy">
          <p>
            I'm <strong>Saheem Nakhwa</strong>, a{' '}
            <strong>full-stack developer</strong> working across{' '}
            <em>React interfaces</em>, <em>REST APIs</em>, and{' '}
            <em>databases</em>. My experience spans freelance projects, business
            applications, and backend testing. I build MERN applications with
            React, Node.js, Express, and MongoDB, alongside PHP and MySQL.
          </p>
          <p>
            I'm studying <strong>Computer Science and Engineering</strong> with
            a focus on <em>AI and Machine Learning</em> at Finolex Academy of
            Management and Technology. I enjoy building things and working
            through <em>data structures and algorithms</em>.
          </p>
        </div>
      </div>
    </Chapter>
  )
}
function Experience() {
  const [selected, setSelected] = useState<number | null>(0)
  return (
    <Chapter id="experience">
      <Heading line="Checkpoints" />
      <div className="career-timeline">
        {experience.map((job, i) => (
          <article
            className={`career-entry ${selected === i ? 'selected' : ''}`}
            key={job.company}
          >
            <div className="career-date">
              <span className="timeline-dot" />
              {job.date}
              <small>{job.location}</small>
            </div>
            <div className="career-body">
              <p className="career-company">{job.company}</p>
              <h3>{job.role}</h3>
              <button
                className="responsibility-toggle"
                aria-expanded={selected === i}
                aria-controls={`role-${i}`}
                onClick={() => setSelected(selected === i ? null : i)}
              >
                {selected === i
                  ? 'Hide responsibilities'
                  : 'View responsibilities'}{' '}
                <span aria-hidden="true">{selected === i ? '−' : '+'}</span>
              </button>
              <div id={`role-${i}`} hidden={selected !== i}>
                <ul>
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Chapter>
  )
}
function Projects() {
  const viewport = useRef<HTMLDivElement>(null)
  const [edges, setEdges] = useState({ start: true, end: false })
  useEffect(() => {
    const node = viewport.current
    if (!node) return
    const update = () =>
      setEdges({
        start: node.scrollLeft < 2,
        end: node.scrollLeft + node.clientWidth >= node.scrollWidth - 2,
      })
    const observer = new ResizeObserver(update)
    observer.observe(node)
    node.addEventListener('scroll', update, { passive: true })
    update()
    return () => {
      observer.disconnect()
      node.removeEventListener('scroll', update)
    }
  }, [])
  function shift(direction: number) {
    const node = viewport.current
    if (!node) return
    const card = node.querySelector<HTMLElement>('.project-card')
    if (!card) return
    node.scrollBy({
      left: direction * (card.offsetWidth + 22),
      behavior:
        document.documentElement.dataset.motion === 'paused'
          ? 'instant'
          : 'smooth',
    })
  }
  return (
    <Chapter id="projects">
      <Heading line="Where did my time Go?" />
      <div
        className="project-carousel"
        role="region"
        aria-label="Projects carousel"
      >
        <button
          className="project-arrow project-arrow-prev"
          aria-label="Previous projects"
          aria-controls="project-track"
          disabled={edges.start}
          onClick={() => shift(-1)}
        >
          ←
        </button>
        <div className="project-grid" id="project-track" ref={viewport}>
          {Array.from({ length: 4 }, (_, i) => {
            const project = projects[i]
            return (
              <article
                className={
                  'project-card' + (!project ? ' project-card-placeholder' : '')
                }
                key={i}
              >
                <h3>{project?.name ?? `Project ${i + 1}`}</h3>
                <p>{project?.description ?? 'Details coming soon.'}</p>
                {project ? (
                  <>
                    {project.tech.length > 0 && (
                      <div className="tags">
                        {project.tech.map((t) => (
                          <span key={t}>{t}</span>
                        ))}
                      </div>
                    )}
                    <div className="project-actions">
                      <a
                        className="text-link"
                        href={project.repo}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Repository ↗
                      </a>
                      {projectDetails[i]?.demo && (
                        <a
                          className="text-link"
                          href={projectDetails[i].demo!}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Live demo ↗
                        </a>
                      )}
                    </div>
                  </>
                ) : (
                  <span className="project-pending">In the works</span>
                )}
              </article>
            )
          })}
        </div>
        <button
          className="project-arrow project-arrow-next"
          aria-label="Next projects"
          aria-controls="project-track"
          disabled={edges.end}
          onClick={() => shift(1)}
        >
          →
        </button>
      </div>
    </Chapter>
  )
}
function Skills() {
  const [category, setCategory] = useState('All')
  const list = Object.entries(skills).filter(
    ([group]) => category === 'All' || category === group,
  )
  return (
    <Chapter id="skills">
      <Heading line="Tools in my inventory." />
      <div className="inventory">
        <div
          className="skill-filters"
          role="group"
          aria-label="Filter skills by category"
        >
          {['All', ...Object.keys(skills)].map((group) => (
            <button
              key={group}
              aria-pressed={category === group}
              onClick={() => setCategory(group)}
            >
              {group}
            </button>
          ))}
        </div>
        <p className="inventory-status" role="status">
          {category === 'All' ? 'All categories' : category} ·{' '}
          {list.reduce((n, [, items]) => n + items.length, 0)} skills
        </p>
        <div className="inventory-items">
          {list.flatMap(([group, items]) =>
            items.map((name) => (
              <div className="inventory-item" key={name}>
                {skillIcons[name] ? (
                  <img
                    src={`/icons/${skillIcons[name]}.svg`}
                    alt=""
                    width="25"
                    height="25"
                    loading="lazy"
                  />
                ) : (
                  <span className="generic-tech" aria-hidden="true">
                    {name === 'VS Code'
                      ? '〈〉'
                      : name === 'SQL'
                        ? 'DB'
                        : name === 'REST APIs'
                          ? 'API'
                          : '⌘'}
                  </span>
                )}
                <div>
                  <span>{name}</span>
                  <small>{group}</small>
                </div>
              </div>
            )),
          )}
        </div>
      </div>
      <p className="foundations">
        Foundations: Data Structures & Algorithms · OOP · DBMS · Operating
        Systems · Computer Networks
      </p>
    </Chapter>
  )
}
function Achievements() {
  const reduced = useReducedMotion()
  const [expandedEducation, setExpandedEducation] = useState<number | null>(0)

  return (
    <Chapter id="achievements">
      {!reduced && (
        <TargetCursor
          spinDuration={2}
          hideDefaultCursor
          parallaxOn
          hoverDuration={0.2}
          cursorColor="#ffffff"
          cursorColorOnTarget="#B497CF"
        />
      )}
      <div id="side-quests-cursor">
        <Heading line="Side Quests" />
        <div className="trophy-shelf">
          {achievements.map((name, i) => (
            <article className="cursor-target" key={name}>
              <div className={`trophy-badge badge-${i}`}>
                <DetailIcon kind="trophy" />
              </div>
              <h3>{name}</h3>
            </article>
          ))}
        </div>
      </div>
      <div className="education-timeline">
        <h3 className="education-heading">Education</h3>
        <div className="career-timeline">
          {education.map((item, i) => (
            <article
              className={`career-entry ${expandedEducation === i ? 'selected' : ''}`}
              key={item.school}
            >
              <div className="career-date">
                <span className="timeline-dot" />
                {item.date || 'SSC'}
              </div>
              <div className="career-body">
                <h3>{item.school}</h3>
                <p className="education-degree">{item.degree}</p>
                <button
                  className="responsibility-toggle"
                  aria-expanded={expandedEducation === i}
                  aria-controls={`education-detail-${i}`}
                  onClick={() =>
                    setExpandedEducation(expandedEducation === i ? null : i)
                  }
                >
                  {expandedEducation === i ? 'Hide result' : 'View result'}
                  <span aria-hidden="true">
                    {expandedEducation === i ? '−' : '+'}
                  </span>
                </button>
                <p
                  className="education-result"
                  id={`education-detail-${i}`}
                  hidden={expandedEducation !== i}
                >
                  {item.result}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Chapter>
  )
}
function Contact() {
  const [copied, setCopied] = useState('')
  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied('Email copied. Ready when you are.')
    } catch {
      setCopied('Copy unavailable. Select the email address below to copy it.')
    }
  }
  return (
    <Chapter id="contact">
      <div className="contact-invitation">
        <div className="contact-avatar" aria-hidden="true">
          <Character />
        </div>
        <h2>
          Got an idea?
          <br />
          <span>I'm in.</span>
        </h2>
        <p className="contact-note">
          A web app, an internship, or your next team member.
          <br />
          Tell me what you're working on.
        </p>
        <div className="contact-primary-actions">
          <HireMe />
          <a
            className="contact-resume"
            href="/Saheem_Nakhwa_Resume.pdf"
            target="_blank"
            rel="noreferrer"
          >
            View my resume ↗
          </a>
        </div>
        <div className="contact-email-row">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <button type="button" onClick={copy} aria-label="Copy email address">
            Copy
          </button>
        </div>
        <p className="contact-copy-status" role="status">
          {copied}
        </p>
        <div className="contact-profile-links">
          {profile.links.map((link) => (
            <a key={link.name} href={link.url} target="_blank" rel="noreferrer">
              {link.name} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </div>
    </Chapter>
  )
}
export default function Portfolio() {
  return (
    <div className="portfolio-world">
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Achievements />
      <Chapter id="activity">
        <Heading line="Small steps, committed." />
        <Activity />
      </Chapter>
      <Contact />
    </div>
  )
}
