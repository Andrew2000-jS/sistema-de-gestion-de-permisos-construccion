import { sendGmail } from '@src/auth/context/utils'

export async function sendEmail (params: { to: string, html: string, subject: string }): Promise<void> {
  const { to, html, subject } = params
  const auth = {
    user: 'alcaldiacarirubanabot@gmail.com',
    pass: 'snza gbhs aval rovd'
  }

  try {
    await sendGmail({
      html,
      auth,
      from: auth.user,
      to,
      subject
    })
  } catch (error) {
    console.log(error)
    throw new Error((error as string))
  }
}
