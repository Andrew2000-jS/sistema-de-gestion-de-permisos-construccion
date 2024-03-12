import nodemailer from 'nodemailer'

type CredentialsType = { user: string, pass: string }

interface GmailProps {
  html: string
  from: string
  to: string
  subject: string
  auth: CredentialsType
}

export const sendGmail = async ({ html, to, from, subject, auth }: GmailProps): Promise<void> => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth
    })

    const mailOptions = {
      from,
      to,
      subject,
      html
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Ocurrio un error al enviar el email:', error)
      } else {
        console.log('Email enviado: ' + info.response)
      }
    })
  } catch (error) {
    console.log(error)
  }
}
