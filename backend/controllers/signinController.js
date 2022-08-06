const userModel = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const showSignin = async (req, res) => {

  res.render('signin');
}

const handleSignin = async (req, res) => {
  const { emailId, password } = req.body;
  if(!emailId || !password )
    return res.sendStatus(400); //bad request

  try {
    const foundUser = await userModel.findOne({ email: emailId });
    if(!foundUser) return res.status(401).json({ 'message': 'Invalid Credentials.' });

    // checking for correct password
    if(await bcrypt.compare(password, foundUser.password)) {

      const accessToken = jwt.sign(
        { "uuid": foundUser.uuid },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
      );
      
      const refreshToken = jwt.sign(
        { "uuid": foundUser.uuid },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
      );

      foundUser.refreshToken = refreshToken;
      await foundUser.save();

      res.cookie(
        'ajwt',
        accessToken,
        { httpOnly: true, maxAge: 15 * 60 * 1000 }
      )
      res.cookie(
        'rjwt',
        refreshToken,
        { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }
      )

      res.redirect('/');

    } else {
      return res.status(401).json({ 'message': 'Invalid Credentials' });
    }

  } catch (err) {
    console.log(err.message);
    res.redirect('/signin');
  }
}

module.exports = { handleSignin, showSignin }
