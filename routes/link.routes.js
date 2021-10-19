const {Router} = require('express')
const Link = require('../models/Link.model')
const authMiddleware = require('../middlewares/auth.middleware')
const config = require('config')
const shortId = require('shortid')
const router = Router()

router.post('/generate', authMiddleware, async (req, res) => {
  try {
    const baseUrl = config.get('baseUrl')
    const {from} = req.body
    const code = shortId.generate()
    const existedLink = await Link.findOne({ from })
    if (existedLink) {
      return res.json({ link: existedLink })
    }
    const to = baseUrl + '/t/' + code
    const link = new Link({
      code, to, from, owner: req.user.userId
    })
    await link.save()
    res.status(201).json({ link })
  } catch (e) {
    res.status(500).json({ message: 'Something wrong, try again' })
  }
})

router.get('/', authMiddleware, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId })
    res.json(links)
  } catch (e) {
    res.status(500).json({ message: 'Something wrong, try again' })
  }
})

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id)
    res.json(link)
  } catch (e) {
    res.status(500).json({ message: 'Something wrong, try again' })
  }
})

module.exports = router