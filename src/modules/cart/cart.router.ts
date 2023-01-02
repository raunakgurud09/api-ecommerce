import express from 'express'
import requiresUser from '../../middleware/requiresUser.middleware'
import { addToCartHandler, getCartHandler, removeCartHandler, updateCartHandler } from './cart.controller'
const Router = express.Router()

Router.route('/')
  .get(requiresUser, getCartHandler)
  .post(requiresUser, addToCartHandler)
  .put(requiresUser,updateCartHandler)
  .delete(requiresUser,removeCartHandler)

export { Router as cartRouter }
