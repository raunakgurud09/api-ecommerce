import { Request, Response } from 'express'
import { get } from 'lodash'
import { addToCart, getCart, removeFromCart, updateCart } from './cart.service'

export const getCartHandler = async (req: Request, res: Response) => {
  const user = get(req, 'user')
  const { data, message } = await getCart(user)

  res.status(200).json({ data, message })
}

export const addToCartHandler = async (req: Request, res: Response) => {
  const user = get(req, 'user')
  const { productId, qty, size } = get(req, 'body')

  const { data, message } = await addToCart(user, productId, qty, size)

  res.status(200).json({ data, message })
}

export const updateCartHandler = async (req: Request, res: Response) => {
  const user = get(req, 'user')
  const { productId, qty, size } = get(req, 'body')

  const { data, message } = await updateCart(user, productId, qty, size)
  res.status(200).json({ data, message })
}

export const removeCartHandler = async (req: Request, res: Response) => {
  const user = get(req, 'user')
  const { productId } = get(req, 'body')

  const { data, message } = await removeFromCart(user, productId)

  res.status(200).json({ data, message })
}
