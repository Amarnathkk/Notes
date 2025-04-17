import express from 'express'
import Note from '../models/Note.js'
import middleware from '../middleware/middleware.js'

const router = express.Router()


router.post("/add", middleware, async (req, res) => {
    try {

        const { title, description } = req.body

        const newNote = new Note({
            title,
            description,
            userId: req.user.id
        })

        await newNote.save()
        res.json({ success: true, message: "Note Created Successfully" })

    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error in adding your note" })
    }
})


router.get("/", middleware, async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user.id })
        res.json({ success: true, notes })
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "Can't fetch the notes" })

    }
})

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const updateNote = await Note.findByIdAndUpdate(id, req.body)
        res.json({ success: true, updateNote })

    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "Can't Update the notes" })

    }
})


router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const updateNote = await Note.findByIdAndDelete(id)
        res.json({ success: true, updateNote })

    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "Can't Delete the notes" })

    }
})






export default router