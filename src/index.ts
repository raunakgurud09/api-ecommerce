// "use strict";
import express from 'express'
import connectDB from './utils/connectDB'
import deserializeUser from './middleware/deserializeUser.middleware'
import config from './configs/index.config'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

const app = express()
app.use(cookieParser())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(deserializeUser)

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Database

// Routes
import { authRouter } from './modules/auth/router'
import { userRouter } from './modules/user/user.router'
import { adminRouter } from './modules/admin/admin.router'

app.get('/', (req, res) => res.send('working'))
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/admin', adminRouter)

const PORT = config.port as number

app.listen(PORT, async () => {
  await connectDB()
  console.log(`server is running on ${PORT}...`)
})
