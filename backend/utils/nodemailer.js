const nodemailer = require('nodemailer')
require('dotenv').config()

/**
 * Setup nodemailer account
 */
const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "0e23ea8dbabae0",
    pass: "2e18ffad60605d"
  }
});

/**
 * 
 */
transporter.set('oauth2_provision_cb', (user, renew, callback)=>{
  let accessToken = userTokens[user];
  if(!accessToken){
      return callback(new Error('Unknown user'));
  }else{
      return callback(null, accessToken);
  }
});

/**
 * Send a registration email 
 * @param {*} userObject 
 * @param {*} hash 
 */
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

/**
 * Send an email with a download link
 * @param {*} email 
 * @param {*} hash 
 */
const sendDownloadLink =  async (email, hash) => {

  let info = await transporter.sendMail({
    from: 'securebox',
    to: email,
    subject: 'Download Email',
    text: `Follow this link to download the file: http://localhost:3003/api/files/download/public/${hash}`,
  })
  console.log(`Message sent: ${info.messageId}`
  )
}


module.exports = { sendRegistrationMail, sendDownloadLink }