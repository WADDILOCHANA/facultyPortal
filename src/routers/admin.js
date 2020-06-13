const cookieParser = require('cookie-parser')
const bodyParser=require("body-parser"); 
const express = require('express')
const auth = require('../middleware/auth')
const Admin = require('../models/admin')
const Faculty=require('../models/faculty')
const router = new express.Router()

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ 
    extended: true
})) 
router.use(cookieParser())

//facultyPortal.com/admin without data
router.get('/admin',(req,res)=>{
    res.render('adminLogin')
})

//facultyPortal.com/admin  with data
router.post('/admin',async(req,res)=>{
    try{
        var name = req.body.name 
        var pass = req.body.password
        const admin = await Admin.findByCredentials(name, pass)
        const token = await admin.generateAuthToken()
        await admin.save()
        res.cookie('Authorization', token)
        res.render('adminHome')
    } catch (e) {
        //res.status(400).render('adminLogin')
        res.render('adminLogin',{
            error:"Unable to login"
        })
    }
})

//facultyPortal.com/admin/addFaculty without data
router.get('/admin/addFaculty',auth.authAdmin,async (req,res)=>{
    res.render('addFaculty')
})

//facultyPortal.com/admin/addFacultyDB with data
router.get('/admin/addFacultyDB',auth.authAdmin,async (req,res)=>{
    const faculty=new Faculty({
        name:req.query.name,
        email:req.query.email,
        designation:req.query.desg,
        qualification:req.query.qlfi,
        department:req.query.dep,
        dateOfJoining:req.query.doj
    })
    try{
        await faculty.save()
        res.send({
            msg:'Successfully added'
        })
    }catch(e){
        res.send({
            msg:'Unsuccessfully, Something went wrong!!'
        })
    }
})


//facultyPortal.com/admin/viewFaculty
router.get('/admin/viewFaculty',auth.authAdmin,async(req,res)=>{
    Faculty.find({}).then((facultys)=>{
        res.render('viewFaculty',{
            facultys
        })
    }).catch((e)=>{
        res.send(e)
    })
    
})

//facultyPortal.com/admin/logout
router.get('/admin/logout', auth.authAdmin, async (req, res) => {
    try {
        req.admin.tokens = req.admin.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.admin.save()
        res.render('adminLogin')
    } catch (e) {
        res.status(500).send('your are not logined')
    }
})

module.exports = router