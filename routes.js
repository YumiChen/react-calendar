var express = require('express')
var router = express.Router()

router.get('/', function (req, res) {
  res.sendfile('index.html', { root: './public' })
})

module.exports = router
