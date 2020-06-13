const mongoose = require('mongoose')

const facultySchema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase: true,
    },
    designation:{
        type:String,
        required:true,
        trim:true,
    },
    qualification:{
        type:String,
        required:true,
        trim:true
    },
    department:{
        type:String,
        required:true,
        trim:true
    },
    dateOfJoining:{
        type:Date
    }
})

facultySchema.pre('save', async function (next) {
    const faculty = this
    next()
})

const Faculty = mongoose.model('FacultySchema', facultySchema)

module.exports = Faculty