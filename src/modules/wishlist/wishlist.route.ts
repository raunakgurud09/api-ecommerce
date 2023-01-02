import express from 'express'
import requiresUser from '../../middleware/requiresUser.middleware'
import {
  createWishlistHandler,
  deleteWishlistHandler,
  getWishlistHandler
} from './wishlist.controller'
const Router = express.Router()

Router.route('/')
  .get(requiresUser, getWishlistHandler)
  .post(requiresUser, createWishlistHandler)
  .delete(requiresUser, deleteWishlistHandler)

export { Router as wishlistRouter }
