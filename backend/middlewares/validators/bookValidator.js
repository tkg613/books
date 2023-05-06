const {check, validationResult} = require('express-validator')

exports.bookValidator = [
  check('title', 'Status is required.').not().isEmpty(),
  check('description', 'Descriptin is required.').not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()})
    }
    next()
  }
]

exports.commentValidator = [
  check('text', 'Text is required.').not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()})
    }
    next()
  }
]