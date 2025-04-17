import jwt from 'jsonwebtoken'
import User from '../models/Usermodel.js'


const middleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]

        if (!token) {
            return res.json({ success: false, message: "Unauthorized" })
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        if (!decoded) {
            return res.json({ success: false, message: "Wrong Token" })

        }

        const user = await User.findById({ _id: decoded.id })

        if (!user) {
            return res.json({ success: false, message: "no user" })

        }

        const newUser = { name: user.name, id: user._id }
        req.user = newUser
        next()
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Kindly login to your account" });
    }
}

export default middleware