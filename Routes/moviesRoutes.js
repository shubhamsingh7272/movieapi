const express = require('express')

const moviesController = require('./../Controllers/moviesController')

const router = express.Router()



router.param('id',moviesController.checkId)

router.route('/')
.get(moviesController.getAllMovie)
.post(moviesController.validateBody,moviesController.createMovie)


router.route('/:id')
.get(moviesController.getMovie)
.put(moviesController.updateMovie)
.delete(moviesController.deleteMovie)



module.exports = router