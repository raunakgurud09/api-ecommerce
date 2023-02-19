import Cart from './cart.provider'
import mongoose from 'mongoose'

const { ObjectId } = mongoose.Types

export const getCart = async (user: any) => {
  try {
    const { userId } = user
    const cart = await Cart.findAndPopulate(userId)
    return { data: cart }
  } catch (error) {
    return { message: 'No cart found for this user' }
  }
}

export const addToCart = async (
  user: any,
  productId: string,
  qty: number,
  size: string
) => {
  try {
    let cart = await Cart.findCartByUserId(user.userId)

    if (cart) {
      // Make sure the cart is users cart
      if (user.userId.toString() !== cart.user.toString()) {
        return {
          message:
            'You are not allowed to perform this operation as you not the owner'
        }
      }

      // check that same product exist in cart
      const isProductExist = cart?.items.some((item) =>
        new ObjectId(productId).equals(item.product)
      )
      if (isProductExist) {
        // Same cart same product
        const find = { _id: cart._id, 'items.product': productId }
        const updatePayload = { $inc: { 'items.$.quantity': qty } }
        //     { $rename: { 'items.$.size': size } }

        const options = { new: true }
        cart = await Cart.updateExistingCart(find, updatePayload, options)
      } else {
        // Same cart different Product
        const find = { _id: cart._id }
        const updatePayload = {
          $addToSet: {
            items: { quantity: qty, product: productId, size }
          }
        }
        const options = { new: true }
        cart = await Cart.updateExistingCart(find, updatePayload, options)
      }
    } else {
      // Create new cart
      cart = await Cart.create(user.userId, [
        { quantity: qty, size, product: productId }
      ])
    }

    const cartItem = cart?.items.find((item) =>
      new ObjectId(productId).equals(item.product)
    )

    return { data: cartItem }
  } catch (error) {
    return { message: "Error couldn't create your cart" }
  }
}

export const updateCart = async (
  user: any,
  productId: string,
  qty: number,
  size: string
) => {
  try {
    const find = { user: user.userId, 'items.product': productId }

    // Check authorized user to change

    const updatePayload = {
      $set: { 'items.$.quantity': qty, 'items.$.size': size }
    }
    const options = { new: true }
    const cart = await Cart.updateExistingCart(find, updatePayload, options)
    if (!cart) {
      return { message: 'Cart item not found' }
    }

    return { data: cart }
  } catch (error) {
    return { message: "Couldn't remove product form cart" }
  }
}

export const removeFromCart = async (user: any, productId: string) => {
  try {
    const find = { user: user.userId }
    const updatePayload = { $pull: { items: { product: productId } } }
    const options = { new: true }
    const cart = await Cart.updateExistingCart(find, updatePayload, options)

    if (!cart) {
      return { message: 'Cart item not found' }
    }
    return { data: cart }
  } catch (error) {
    return { message: "Couldn't remove product form cart" }
  }
}
