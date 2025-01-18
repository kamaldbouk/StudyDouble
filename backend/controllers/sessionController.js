const Session = require('../models/sessionModel')
const mongoose = require('mongoose')

// get all sessions
const getSessions = async (req, res) => {
  const sessions = await Session.find({}).sort({createdAt: -1})

  res.status(200).json(sessions)
}

// get a single session
const getSession = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such session'})
  }

  const session = await Session.findById(id)

  if (!session) {
    return res.status(404).json({error: 'No such session'})
  }

  res.status(200).json(session)
}

// create a new session
const createSession= async (req, res) => {
  const {title, creator} = req.body

  // add to the database
  try {
    const session = await Session.create({ title, creator })
    res.status(200).json(session)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a session
const deleteSession= async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such session'})
    }
  
    const session = await Session.findOneAndDelete({_id: id})
  
    if(!session) {
      return res.status(400).json({error: 'No such session'})
    }
  
    res.status(200).json(session)
  }
  
  // update a session
  const updateSession = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such session'})
    }
  
    const session = await Session.findOneAndUpdate({_id: id}, {
      ...req.body
    })
  
    if (!session) {
      return res.status(400).json({error: 'No such session'})
    }
  
    res.status(200).json(session)
  }

module.exports = {
  getSessions,
  getSession,
  createSession,
  deleteSession,
  updateSession
}