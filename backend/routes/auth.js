import express from 'express'
import User from '../models/Usermodel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import middleware from '../middleware/middleware.js'

const router = express.Router()

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body


        const user = await User.findOne({ email })
        if (user) {
            return res.json({ success: false, message: "User already exists" })
        }


        const hashedPassword = await bcrypt.hash(password, 10)


        const newuser = new User({ name, email, password: hashedPassword })
        await newuser.save()

        return res.json({ success: true, message: "New account created successfully" })

    }
    catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Error in adding user" })

    }
})




router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body


        const user = await User.findOne({ email })



        if (!user) {
            return res.json({ success: false, message: "User Not exists" })
        }

        const checkpassword = await bcrypt.compare(password, user.password)

        if (!checkpassword) {
            res.json({ success: false, message: "Wrong credentials" })
        }



        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "5h" })


        return res.json({ success: true, token, user: { name: user.name }, message: "Logged in successfully" })

    }
    catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Error in Logging the user" })

    }
})


router.get("/verify", middleware, async (req, res) => {
    return res.json({ success: true , user:req.user })
})





export default router