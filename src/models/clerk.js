const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const clerkSchema=new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique:true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

clerkSchema.methods.generateAuthToken = async function () {
    const clerk = this
    const token = jwt.sign({ _id: clerk._id.toString() }, 'iDonotKnow')

    clerk.tokens = clerk.tokens.concat({ token })
    await clerk.save()

    return token
}

clerkSchema.statics.findByCredentials = async (username, password) => {
    const clerk = await Clerk.findOne({ username :username })
    if (!clerk) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, clerk.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return clerk
}

clerkSchema.pre('save', async function (next) {
    const clerk = this
    next()
})

const Clerk = mongoose.model('Clerk', clerkSchema)

module.exports = Clerk