const express = require('express')
const {
  getSessions, 
  getSession, 
  createSession, 
  deleteSession, 
  updateSession
} = require('../controllers/sessionController')

const router = express.Router()

// GET all workouts
router.get('/', getSessions)

// GET a single workout
router.get('/:id', getSession)

// POST a new workout
router.post('/', createSession)

// DELETE a workout
router.delete('/:id', deleteSession)

// UPDATE a workout
router.patch('/:id', updateSession)

module.exports = router