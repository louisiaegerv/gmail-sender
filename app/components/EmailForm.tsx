'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function EmailForm() {
  const [to, setTo] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('Sending...')

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to, subject, body }),
      })

      if (response.ok) {
        setStatus('Email sent successfully!')
        setTo('')
        setSubject('')
        setBody('')
      } else {
        setStatus('Failed to send email. Please try again.')
      }
    } catch (error) {
      setStatus('An error occurred. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="to" className="block text-sm font-medium text-gray-700">
          To:
        </label>
        <Input
          type="email"
          id="to"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
          Subject:
        </label>
        <Input
          type="text"
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="body" className="block text-sm font-medium text-gray-700">
          Body:
        </label>
        <Textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          rows={5}
        />
      </div>
      <Button type="submit">Send Email</Button>
      {status && <p className="mt-4 text-sm text-gray-600">{status}</p>}
    </form>
  )
}