import { Product } from '../product/Product.model'
import { Cart } from './cart.model'

export const findCartByUserId = async (userId: string) => {
  return await Cart.findOne({ user: userId })
}

export const findAndPopulate = async (userId: string) => {
  const cart = await Cart.findOne({ user: userId }).populate('items.product')
  return cart
}

export const updateExistingCart = async (
  find: object,
  updatePayload: object,
  options: object
) => {
  const cart = await Cart.findOneAndUpdate(find, updatePayload, options)

  return cart
}

export const findOne = async (userId: string) => {
  const cart = await Cart.findOne({ user: userId })
  return cart
}

export const create = async (user: any, items: any) => {
  const cart = await Cart.create({
    user,
    items
  })

  return cart
}

export default {
  findCartByUserId,
  updateExistingCart,
  create,
  findOne,
  findAndPopulate
}
