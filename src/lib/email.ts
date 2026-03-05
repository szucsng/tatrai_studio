import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXTAUTH_URL}/admin/reset-password?token=${token}`
  
  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: email,
    subject: 'Jelszó visszaállítás',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; padding: 15px 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; color: #999; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔐 Jelszó visszaállítás</h1>
          </div>
          <div class="content">
            <p>Kedves Felhasználó!</p>
            <p>Jelszó visszaállítási kérelmet kaptunk a fiókodhoz. Ha te kezdeményezted ezt, kattints az alábbi gombra a jelszavad visszaállításához:</p>
            <div style="text-align: center;">
              <a href="${resetUrl}" class="button">Jelszó visszaállítása</a>
            </div>
            <p>Vagy másold be ezt a linket a böngésződbe:</p>
            <p style="word-break: break-all; background: #fff; padding: 10px; border-radius: 5px;">${resetUrl}</p>
            <p><strong>Ez a link 1 órán belül lejár.</strong></p>
            <p>Ha nem te kérted a jelszó visszaállítást, hagyd figyelmen kívül ezt az emailt.</p>
          </div>
          <div class="footer">
            <p>Ez egy automatikus email, kérjük ne válaszolj rá.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error('Email küldési hiba:', error)
    return { success: false, error }
  }
}

export async function sendVerificationEmail(email: string, token: string) {
  const verifyUrl = `${process.env.NEXTAUTH_URL}/admin/verify-email?token=${token}`
  
  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: email,
    subject: 'Email cím megerősítése',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; padding: 15px 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; color: #999; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✉️ Email cím megerősítése</h1>
          </div>
          <div class="content">
            <p>Kedves Felhasználó!</p>
            <p>Köszönjük a regisztrációt! Kérjük erősítsd meg az email címedet az alábbi gombra kattintva:</p>
            <div style="text-align: center;">
              <a href="${verifyUrl}" class="button">Email megerősítése</a>
            </div>
            <p>Vagy másold be ezt a linket a böngésződbe:</p>
            <p style="word-break: break-all; background: #fff; padding: 10px; border-radius: 5px;">${verifyUrl}</p>
            <p><strong>Ez a link 24 órán belül lejár.</strong></p>
            <p>Ha nem te regisztráltál, hagyd figyelmen kívül ezt az emailt.</p>
          </div>
          <div class="footer">
            <p>Ez egy automatikus email, kérjük ne válaszolj rá.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error('Email küldési hiba:', error)
    return { success: false, error }
  }
}

export async function sendWelcomeEmail(email: string, name: string) {
  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: email,
    subject: 'Üdvözlünk!',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .footer { text-align: center; margin-top: 20px; color: #999; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Üdvözlünk!</h1>
          </div>
          <div class="content">
            <p>Kedves ${name}!</p>
            <p>Sikeresen megerősítetted az email címedet! Most már teljes hozzáféréssel rendelkezel az admin panelhez.</p>
            <p>A következő funkciók érhetők el számodra:</p>
            <ul>
              <li>Események kezelése</li>
              <li>Képek feltöltése és rendszerezése</li>
              <li>Galéria szerkesztése</li>
              <li>Felhasználói profil kezelése</li>
            </ul>
            <p>Ha bármilyen kérdésed van, ne habozz kapcsolatba lépni velünk!</p>
          </div>
          <div class="footer">
            <p>Ez egy automatikus email, kérjük ne válaszolj rá.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error('Email küldési hiba:', error)
    return { success: false, error }
  }
}
