import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { google } from 'googleapis'
import { authOptions } from '../auth/[...nextauth]/route'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { to, subject, body } = await req.json()

  const oauth2Client = new google.auth.OAuth2()
  oauth2Client.setCredentials({ access_token: session.accessToken })

  const gmail = google.gmail({ version: 'v1', auth: oauth2Client })

  const message = [
    `To: ${to}`,
    'Content-Type: text/html; charset=utf-8',
    'MIME-Version: 1.0',
    `Subject: ${subject}`,
    '',
    body,
  ].join('\n')

  const encodedMessage = Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')

  try {
    await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}