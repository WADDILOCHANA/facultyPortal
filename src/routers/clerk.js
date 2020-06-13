const cookieParser = require('cookie-parser')
const bodyParser=require("body-parser"); 
const express = require('express')
const auth = require('../middleware/auth')
const Clerk = require('../models/clerk')
const Faculty=require('../models/faculty')
const router = new express.Router()

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ 
    extended: true
})) 
router.use(cookieParser())

//facultyPortal.com/clerk without data
router.get('/clerk',(req,res)=>{
    res.render('clerkLogin')
})

//facultyPortal.com/clerk  with data
router.post('/clerk',async(req,res)=>{
    try{
        var name = req.body.name 
        var pass = req.body.password
        const clerk = await Clerk.findByCredentials(name, pass)
        const token = await clerk.generateAuthToken()
        await clerk.save()
        res.cookie('Authorization', token)
        res.render('clerkHome')
    } catch (e) {
        //res.status(400).render('adminLogin')
        res.render('clerkLogin',{
            error:"Unable to login"
        })
    }
})

//facultyPortal.com/clerk/logout
router.get('/clerk/logout', auth.authClerk, async (req, res) => {
    try {
        req.clerk.tokens = req.clerk.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.clerk.save()
        res.render('clerkLogin')
    } catch (e) {
        res.status(500).send('your are not logined')
    }
})

module.exports = router