import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

const app = express()
dotenv.config()
app.use(express.json())
app.use(cookieParser())

// Route imports
import userRoutes from './routes/json.users.routes.js'
import authRoutes from './routes/json.auth.routes.js'

app.use('/users', userRoutes)
app.use('/auth', authRoutes)

app.listen(4000);