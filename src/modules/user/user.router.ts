import express from 'express'
const Router = express.Router()

import { createUserHandle, getAuthorizedUser } from './user.controller'

// import { createUserSchema, createUserSessionSchema } from '../auth/user.schema'

// import validateRequest from '../../middleware/validate.middleware'

// import {
//   createUserSessionHandler,
//   getUserSessionsHandler,
//   invalidateUserSessionHandler
// } from '../../controller/session.controller'

import requiresUser from '../../middleware/requiresUser.middleware'
import authorizePermissions from '../../middleware/auth.middleware'

//Register user
// Router.post('/user', validateRequest(createUserSchema), createUserHandle)

//Login user
// Router.post(
//   '/sessions',
//   validateRequest(createUserSessionSchema),
//   createUserSessionHandler
// )

// Get all session of a user
// Router.get('/sessions', requiresUser, getUserSessionsHandler)

//Logout
// Router.delete('/sessions', requiresUser, invalidateUserSessionHandler)

//authorize user only path
Router.get(
  '/authorized',
  requiresUser,
  authorizePermissions('user'),
  getAuthorizedUser
)

//get all available shows

export { Router as userRouter }
