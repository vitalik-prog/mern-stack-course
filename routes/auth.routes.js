const {Router} = require('express')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const router = Router()
const config = require('config')
const UserModel = require('../models/User.model')

//  /api/auth/registration
router.post('/registration', [
  check('email', 'Wrong email').isEmail(),
  check('password', 'Password must be more then 6 symbols').isLength({ min: 6 })
  ], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Wrong data during registration'
      })
    }

    const { email, password } = req.body
    const candidate = await UserModel.findOne({ email })
    if (candidate) {
      return res.status(400).json({ message: 'User with this email existed' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new UserModel({ email, password: hashedPassword })
    await user.save()
    res.status(201).json({ message: 'User created' })

  } catch (e) {
    res.status(500).json({ message: 'Something wrong, try again' })
  }
})
//  /api/auth/login
router.post('/login',[
  check('email', 'Email not valid').normalizeEmail().isEmail(),
  check('password', "Password can't be empty").exists()
  ], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Wrong data during login'
      })
    }

    const { email, password } = req.body
    const user = await UserModel.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'User does not exist' })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
      return res.status(400).json({ message: 'Password wrong' })
    }
    const token = jwt.sign(
      { userId: user.id },
      config.get('jwtSecret'),
      { expiresIn: '1h' }
    )
    res.status(200).json({ token, userId: user.id })

  } catch (e) {
    res.status(500).json({ message: 'Something wrong, try again' })
  }
})

module.exports = router
