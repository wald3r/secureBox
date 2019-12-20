const nodemailer = require('nodemailer')



const transporter = nodemailer.createTransport({
  host: 'smtp.googlemail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'securebox20@gmail.com',
    pass: 'Securebox45#!',
  }
})

const sendRegistrationMail =  async (user, hash) => {

  let info = await transporter.sendMail({
    from: 'securebox',
    to: user.email,
    subject: 'Confirmation Email',
    text: `Follow this link to confirm your registration: http://localhost:3003/api/registration/verify/${hash}`,
  })
  console.log(`Message sent: ${info.messageId}`
  )


}

module.exports = { sendRegistrationMail }