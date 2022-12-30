// "use strict";
import express from 'express'
import connectDB from './utils/connectDB'
import deserializeUser from './middleware/deserializeUser.middleware'
import config from './configs/index.config'
import cookieParser from 'cookie-parser'

const app = express()
app.use(cookieParser())
app.use(deserializeUser)

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Database

// Routes
import { authRouter } from './modules/auth/router'
import { userRouter } from './modules/user/user.router'

app.get('/', (req, res) => res.send('working'))
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', userRouter)

const PORT = config.port as number

app.listen(PORT, async () => {
  await connectDB()
  console.log(`server is running on ${PORT}...`)
})
