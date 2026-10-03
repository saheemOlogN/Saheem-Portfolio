import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from 'react'
import { experience, profile, projects, skills } from '../../data'
import { signalCompanion } from '../Companion'
import './terminal.css'
const commandNames = [
  'help',
  'whoami',
  'skills',
  'experience',
  'projects',
  'contact',
  'github',
  'resume',
  'clear',
  'exit',
  'gear5',
  '67',
]
type Entry = { command?: string; output: string }
export function Terminal({
  username = 'Saheem-Portfolio',
  onClose,
}: {
  username?: string
  onClose: () => void
}) {
  const [entries, setEntries] = useState<Entry[]>([
    {
      output:
        'Welcome to Saheem-Portfolio.\nType help to explore. This terminal runs portfolio commands.',
    },
  ])
  const [command, setCommand] = useState(''),
    [history, setHistory] = useState<string[]>([]),
    [historyIndex, setHistoryIndex] = useState<number | null>(null)
  const draft = useRef(''),
    input = useRef<HTMLInputElement>(null),
    content = useRef<HTMLDivElement>(null)
  useEffect(() => {
    input.current?.focus()
  }, [])
  useEffect(() => {
    if (content.current)
      content.current.scrollTop = content.current.scrollHeight
  }, [entries])
  function submit(event: FormEvent) {
    event.preventDefault()
    const value = command.trim()
    if (!value) return
    const key = value.toLowerCase()
    setHistory((previous) => [...previous, value])
    setHistoryIndex(null)
    setCommand('')
    draft.current = ''
    if (key === 'exit') {
      onClose()
      return
    }
    if (key === 'clear') {
      setEntries([])
      return
    }
    const responses: Record<string, string> = {
      help: 'Available commands:\n  whoami      About me\n  skills      My technology stack\n  experience  Where I have worked\n  projects    Projects and repositories\n  contact     Email and social profiles\n  github      Open my GitHub\n  resume      Open my resume\n  clear       Clear terminal\n  exit        Close terminal\n\nUse ↑ / ↓ for history. Tab completes commands.',
      whoami:
        'Saheem Nakhwa — full-stack developer.\nBuilding React interfaces, backend APIs, and useful web applications.\nStudying Computer Science and Engineering (AI & ML).',
      skills: Object.entries(skills)
        .map(([category, items]) => `${category}: ${items.join(', ')}`)
        .join('\n'),
      experience: experience
        .map(
          (job) =>
            `${job.role} at ${job.company}\n${job.date} · ${job.location}`,
        )
        .join('\n\n'),
      projects: projects
        .map(
          (project) =>
            `${project.name}\n${project.description}\n${project.repo}`,
        )
        .join('\n\n'),
      contact: `${profile.email}\n${profile.links.map((link) => `${link.name}: ${link.url}`).join('\n')}`,
    }
    let output = responses[key]
    if (key === 'github' || key === 'resume') {
      window.open(
        key === 'github' ? profile.links[0].url : '/Saheem_Nakhwa_Resume.pdf',
        '_blank',
        'noopener,noreferrer',
      )
      output = `${key === 'github' ? 'GitHub' : 'Resume'} requested in a new tab.`
    }
    if (key === 'gear5' || key === '67') {
      signalCompanion(key)
      output = key === '67' ? 'Six… seven.' : 'Imagination unlocked.'
    }
    setEntries((previous) => [
      ...previous,
      {
        command: value,
        output:
          output ??
          `Unknown command: ${value}\nType help to see available commands.`,
      },
    ])
    input.current?.focus()
  }
  function keyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault()
      if (!history.length) return
      if (historyIndex === null) draft.current = command
      const next =
        event.key === 'ArrowUp'
          ? Math.max(0, (historyIndex ?? history.length) - 1)
          : Math.min(history.length, (historyIndex ?? history.length) + 1)
      setHistoryIndex(next === history.length ? null : next)
      setCommand(next === history.length ? draft.current : history[next])
    }
    if (event.key === 'Tab' && !event.shiftKey && command.trim()) {
      const matches = commandNames.filter((name) =>
        name.startsWith(command.trim().toLowerCase()),
      )
      if (matches.length === 1) {
        event.preventDefault()
        setCommand(matches[0])
      }
    }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'l') {
      event.preventDefault()
      setEntries([])
    }
  }
  return (
    <div className="interactive-terminal">
      <div className="terminal-titlebar">
        <div className="terminal-lights">
          <button
            className="terminal-close-dot"
            onClick={onClose}
            aria-label="Close terminal"
            title="Close terminal"
          >
            ×
          </button>
          <span className="terminal-yellow-dot" />
          <span className="terminal-green-dot" />
        </div>
        <span>{username}</span>
        <span className="terminal-title-spacer" aria-hidden="true" />
      </div>
      <div className="terminal-scroll" ref={content}>
        <div role="log" aria-live="polite" aria-relevant="additions">
          {entries.map((entry, index) => (
            <div className="terminal-entry" key={index}>
              {entry.command && (
                <div>
                  <span className="terminal-prompt">{username}:~$ </span>
                  {entry.command}
                </div>
              )}
              <div className="terminal-output">{entry.output}</div>
            </div>
          ))}
        </div>
        <form className="terminal-input-row" onSubmit={submit}>
          <label htmlFor="terminal-command" className="terminal-prompt">
            {username}:~$
          </label>
          <input
            ref={input}
            id="terminal-command"
            aria-label="Terminal command"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            value={command}
            onChange={(event) => {
              setCommand(event.target.value)
              setHistoryIndex(null)
            }}
            onKeyDown={keyDown}
          />
        </form>
      </div>
      <div className="terminal-footer">
        Enter to run · Escape or click outside to close
      </div>
    </div>
  )
}
