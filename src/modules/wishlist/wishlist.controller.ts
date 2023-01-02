import { Request, Response } from 'express'
import { get } from 'lodash'
import { createWishlist, deleteWishlist, getWishlist } from './wishlist.service'

export const getWishlistHandler = async (req: Request, res: Response) => {
  const user = get(req, 'user')

  const { data, message } = await getWishlist(user)

  res.status(200).json({ data, message })
}

export const createWishlistHandler = async (req: Request, res: Response) => {
  const user = get(req, 'user')
  const { productId } = get(req, 'body')

  const { data, message } = await createWishlist(user, productId)

  res.status(200).json({ data, message })
}

export const deleteWishlistHandler = async (req: Request, res: Response) => {
  const user = get(req, 'user')
  const { productId } = get(req, 'body')

  const { data, message } = await deleteWishlist(user, productId)

  res.status(200).json({ data, message })
}
