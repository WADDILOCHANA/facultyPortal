const path=require('path')
const hbs=require('hbs')
require('./db/mongoose')
const express=require('express')
const adminRouter = require('./routers/admin')
const clerkRouter = require('./routers/clerk')
const newAccounts=require('./db/accounts')

const app=express()
const port=process.env.PORT || 3000

app.set('view engine','hbs')
app.set('views',path.join(__dirname,'../templates/views'))
app.use(express.static(path.join(__dirname,'../public')))
hbs.registerPartials(path.join(__dirname,'../templates/partials'))

app.use(adminRouter)
app.use(clerkRouter)

//facultyPortal.com
app.get('',(req,res)=>{
    newAccounts.newAdmin()
    newAccounts.newClerk()
    res.render('index')
})

//facultyPortal.com/xxxx
app.get('*',(req,res)=>{
    res.send('error')
})

app.listen(port,()=>{
    console.log("server started..")
})