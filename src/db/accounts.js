const Admin = require('../models/admin')
const Clerk = require('../models/clerk')
const bcrypt = require('bcryptjs')

const newAdmin= async()=>{
    const adminCheck = await Admin.findOne({ username :'admin' })
    if (adminCheck) {
        return 
    }
    password = await bcrypt.hash('admin@123', 8)
    const admin=new Admin({
        username:'admin',
        password:password
    })
    try{
        await admin.save()
        console.log("Admin created!!")
    } catch(e){
        console.log("error")
    }
}

const newClerk= async()=>{
    const clerkCheck = await Clerk.findOne({ username :'clerk' })
    if (clerkCheck) {
        return 
    }
    password = await bcrypt.hash('clerk@123', 8)
    const clerk=new Clerk({
        username:'clerk',
        password:password
    })
    try{
        await clerk.save()
        console.log("Clerk created!!")
    } catch(e){
        console.log("error")
    }
}

module.exports={
    newAdmin,
    newClerk
}

/*const Faculty=require('../models/faculty')

const newFaculty= async()=>{
    const faculty=new Faculty({
        name:'Akash',
        email:'akashpentaA@gmail.com',
        designation:'dfcad',
        qualification:'fca',
        department:'vsas',
        dateOfJoining:Date('2020-06-04')
    })
    try{
        await faculty.save()
    }catch(e){
        console.log(e)
    }
}
newFaculty()*/