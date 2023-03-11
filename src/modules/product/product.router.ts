import express from 'express'
import {
  createProductHandler,
  deleteProductHandler,
  getProductHandler,
  getSingleProductHandler,
  updateProductHandler
} from './product.controller'
import authorizePermissions from '../../middleware/auth.middleware'
import requiresUser from '../../middleware/requiresUser.middleware'
import { uploads } from '../user/user.router'
import { BannerHandler, createBanner } from './banner.controller'
import { categoryHandler, createCategory } from './category.controller'

const Router = express.Router()

Router.route('/categories').get(categoryHandler)
Router.route('/categories').post(
  requiresUser,
  authorizePermissions('admin'),
  uploads.single('image'),
  createCategory
)
Router.route('/banners').get(BannerHandler)
Router.route('/banners').post(
  requiresUser,
  authorizePermissions('admin'),
  uploads.single('image'),
  createBanner
)

Router.route('/')
  .get(getProductHandler)
  .post(
    requiresUser,
    authorizePermissions('admin'),
    uploads.single('image'),
    createProductHandler
  )

Router.route('/:productId')
  .get(getSingleProductHandler)
  .patch(
    requiresUser,
    authorizePermissions('admin'),
    uploads.single('image'),
    updateProductHandler
  )
  .delete(requiresUser, authorizePermissions('admin'), deleteProductHandler)

export { Router as productRouter }
