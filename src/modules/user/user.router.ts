import express from 'express'
const Router = express.Router()

import multer from 'multer'
const storage = multer.diskStorage({})

import {
  getAuthorizedUser,
  getUserProfileHandler,
  uploadAvatarHandler,
  verifyUserHandler
} from './user.controller'

// import { createUserSchema, createUserSessionSchema } from '../auth/user.schema'

// import validateRequest from '../../middleware/validate.middleware'

// import {
//   createUserSessionHandler,
//   getUserSessionsHandler,
//   invalidateUserSessionHandler
// } from '../../controller/session.controller'

import requiresUser from '../../middleware/requiresUser.middleware'
import authorizePermissions from '../../middleware/auth.middleware'

const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true)
  } else {
    cb('invalid image file!', false)
  }
}
const uploads = multer({ storage, fileFilter })


Router.route('/profile').get(requiresUser, getUserProfileHandler)

Router.post(
  '/upload-avatar',
  requiresUser,
  uploads.single('image'),
  uploadAvatarHandler
)

Router.post('/verify-email',requiresUser,verifyUserHandler)

//authorize user only path
Router.get(
  '/authorized',
  requiresUser,
  authorizePermissions('user'),
  getAuthorizedUser
)


export { Router as userRouter }
