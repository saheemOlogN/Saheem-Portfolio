import { useEffect, useRef, useState, type FormEvent } from 'react'
import { createPortal } from 'react-dom'
import { profile } from '../data'
import './HireMe.css'

export default function HireMe() {
  const dialog = useRef<HTMLDialogElement>(null)
  const opener = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState('')
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    dialog.current?.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])
  function close() {
    dialog.current?.close()
    setOpen(false)
    opener.current?.focus()
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const read = (key: string) => String(data.get(key) ?? '').trim()
    if (!read('name') || !read('details')) {
      setStatus(
        'Please enter your name and a few details about the opportunity.',
      )
      return
    }
    const message = [
      `Hi Saheem, I'd like to discuss a ${read('type').toLowerCase()} opportunity.`,
      '',
      `Name: ${read('name')}`,
      `Email: ${read('email')}`,
      read('company') && `Company / team: ${read('company')}`,
      read('timeline') && `Timeline / duration: ${read('timeline')}`,
      read('budget') && `Budget / compensation: ${read('budget')}`,
      '',
      read('details'),
    ]
      .filter(Boolean)
      .join('\n')
    const channel =
      (event.nativeEvent as SubmitEvent).submitter?.getAttribute('value') ??
      'email'
    if (channel === 'whatsapp') {
      window.open(
        `https://wa.me/918237682408?text=${encodeURIComponent(message)}`,
        '_blank',
        'noopener,noreferrer',
      )
      setStatus('Continue in WhatsApp to review and send your message.')
    } else {
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(`${read('type')} enquiry — ${read('name')}`)}&body=${encodeURIComponent(message)}`
      setStatus(
        'Continue in your email app to review and send. If it did not open, email saheem.nakhwa24@gmail.com.',
      )
    }
  }
  return (
    <>
      <button
        ref={opener}
        type="button"
        className="arcade-button primary-action"
        aria-haspopup="dialog"
        onClick={() => {
          setStatus('')
          setOpen(true)
        }}
      >
        Hire Me
      </button>
      {createPortal(
        <dialog
          ref={dialog}
          className="hire-dialog"
          aria-labelledby="hire-title"
          onCancel={(event) => {
            event.preventDefault()
            close()
          }}
          onClose={() => {
            setOpen(false)
            opener.current?.focus()
          }}
          onClick={(event) => {
            if (event.target !== event.currentTarget) return
            const rect = event.currentTarget.getBoundingClientRect()
            if (
              event.clientX < rect.left ||
              event.clientX > rect.right ||
              event.clientY < rect.top ||
              event.clientY > rect.bottom
            )
              close()
          }}
        >
          <div className="hire-heading">
            <h2 id="hire-title">Let's work together.</h2>
            <button
              type="button"
              onClick={close}
              aria-label="Close enquiry form"
            >
              ×
            </button>
          </div>
          <p className="hire-intro">Tell me what you have in mind.</p>
          <form onSubmit={submit}>
            <div className="hire-fields">
              <label>
                Your name
                <input
                  name="name"
                  required
                  maxLength={100}
                  autoComplete="name"
                  autoFocus
                />
              </label>
              <label>
                Your email
                <input
                  name="email"
                  type="email"
                  required
                  maxLength={180}
                  autoComplete="email"
                />
              </label>
              <label>
                Opportunity
                <select name="type" required defaultValue="">
                  <option value="" disabled>
                    Select an opportunity
                  </option>
                  <option>Internship</option>
                  <option>Freelance</option>
                  <option>Full-time role</option>
                  <option>Part-time role</option>
                  <option>Collaboration</option>
                  <option>Other</option>
                </select>
              </label>
              <label>
                Company / team <span>(optional)</span>
                <input
                  name="company"
                  maxLength={120}
                  autoComplete="organization"
                />
              </label>
              <label>
                Timeline / duration <span>(optional)</span>
                <input
                  name="timeline"
                  maxLength={100}
                  placeholder="e.g. 3 months, starting in July"
                />
              </label>
              <label>
                Budget / compensation <span>(optional)</span>
                <input
                  name="budget"
                  maxLength={100}
                  placeholder="Amount, currency, or open to discussion"
                />
              </label>
              <label className="hire-details">
                About the opportunity
                <textarea
                  name="details"
                  required
                  rows={4}
                  maxLength={1500}
                  placeholder="Role or project, responsibilities, and what you're looking for…"
                />
              </label>
            </div>
            <p className="hire-note">
              Choose where to send it. You can review the message before
              sending.
            </p>
            <div className="hire-actions">
              <button
                type="submit"
                name="channel"
                value="whatsapp"
                className="arcade-button primary-action"
              >
                WhatsApp ↗
              </button>
              <button
                type="submit"
                name="channel"
                value="email"
                className="arcade-button secondary-action"
              >
                Email ↗
              </button>
            </div>
            <p className="hire-status" role="status">
              {status}
            </p>
          </form>
        </dialog>,
        document.body,
      )}
    </>
  )
}
