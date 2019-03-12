const User = require('../models/User')

const { OAuth2Client } = require('google-auth-library')

const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID)

exports.findOrCreateUser = async token => {
  // verify auth tokn
  const googleUser = await verifyAuthToken(token)

  // check if the user exists in our db
  // you will get undefined or user object -> create or return existing one
  const user = await checkIfUserExists(googleUser.email)

  // if user exists return them otherwise, create new user in db
  return user ? user : createNewUser(googleUser)
}

const verifyAuthToken = async token => {
  try {
    // loging ticket
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.OAUTH_CLIENT_ID
    })

    return ticket.getPayload()
  } catch(e) {
    console.error("Error verifying auth token ", e)
  }
}

const checkIfUserExists = async email => await User.findOne({ email }).exec()

const createNewUser = googleUser => {
  const { name, email, picture } = googleUser

  const user = { name, email, picture }
  
  return new User(user).save()
}
