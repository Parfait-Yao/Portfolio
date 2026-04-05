import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendContactEmail(data: {
  name: string
  email: string
  subject: string
  body: string
}) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY missing. Email not sent.")
    return null
  }

  return resend.emails.send({
    from: 'Portfolio Contact <onboarding@resend.dev>',
    to: 'parfaitericyao123@gmail.com', // As specified in the blueprint
    replyTo: data.email,
    subject: `[Portfolio] ${data.subject} — de ${data.name}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #E2E8F0; border-radius: 12px; padding: 24px;">
        <h2 style="color: #6366F1; margin-top: 0;">Nouveau message de votre portfolio</h2>
        <p><strong>De :</strong> ${data.name} (${data.email})</p>
        <p><strong>Sujet :</strong> ${data.subject}</p>
        <hr style="border: 0; border-top: 1px solid #E2E8F0; margin: 20px 0;" />
        <p style="white-space: pre-line; line-height: 1.6; color: #1E293B;">${data.body}</p>
      </div>
    `,
  })
}
