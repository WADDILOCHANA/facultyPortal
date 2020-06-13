const jwt = require('jsonwebtoken')
const Admin = require('../models/admin')
const Clerk = require('../models/clerk')

const authAdmin = async (req, res, next) => {
    try {
        const token =req.cookies["Authorization"]
        const decoded = jwt.verify(token, 'iDonotKnow')
        const admin = await Admin.findOne({ _id: decoded._id, 'tokens.token': token })
        
        if (!admin) {
            throw new Error()
        }
        req.token = token
        req.admin = admin
        next()
        
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

const authClerk = async (req, res, next) => {
    try {
        const token =req.cookies["Authorization"]
        const decoded = jwt.verify(token, 'iDonotKnow')
        const clerk = await Clerk.findOne({ _id: decoded._id, 'tokens.token': token })
        
        if (!clerk) {
            throw new Error()
        }
        req.token = token
        req.clerk = clerk
        next()
        
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}


module.exports ={ 
    authAdmin,
    authClerk
}