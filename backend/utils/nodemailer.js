const nodemailer = require('nodemailer')
require('dotenv').config()

var user = 'securebox20@gmail.com'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    type: 'OAuth2',
    user: 'securebox20@gmail.com',
    clientId: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    refreshToken: process.env.REFRESHTOKEN,
  }
})

transporter.set('oauth2_provision_cb', (user, renew, callback)=>{
  let accessToken = userTokens[user];
  if(!accessToken){
      return callback(new Error('Unknown user'));
  }else{
      return callback(null, accessToken);
  }
});


const sendRegistrationMail =  async (userObject, hash) => {

  let info = await transporter.sendMail({
    from: 'securebox',
    to: userObject.email,
    subject: 'Confirmation Email',
    text: `Follow this link to confirm your registration: http://localhost:3003/api/registration/verify/${hash}`,
  })
  console.log(`Message sent: ${info.messageId}`
  )


}

module.exports = { sendRegistrationMail }