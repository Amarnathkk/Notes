import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.js'
import noteRouter from './routes/note.js'
import connectTOMongoDb from './db/db.js'
import dotenv from 'dotenv'
dotenv.config();

const app = express()


connectTOMongoDb()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/note', noteRouter)

app.get('/', (req, res) => {
    res.send('API Working')
})


app.listen(5000, () => {

    console.log("Server is running");

})