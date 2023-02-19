import express from 'express'
import requiresUser from '../../middleware/requiresUser.middleware'
import { index } from './order.controller'
const Router = express.Router()

Router.route('/').get(requiresUser, index)

export { Router as orderRouter }
