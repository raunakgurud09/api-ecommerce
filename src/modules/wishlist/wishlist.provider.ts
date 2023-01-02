import { Wishlist } from './wishlist.model'

const findById = async (userId: string) => {
  const wishlist = await Wishlist.find({ user: userId })
  return wishlist
}

const findOne = async (find: object) => {
  const wishlist = await Wishlist.findOne(find)
  return wishlist
}

const create = async (options: object) => {
  const wishlist = await Wishlist.create(options)
  return wishlist
}

const deleteWishlist = async (options: object) => {
  const wishlist = await Wishlist.deleteOne(options)
  return wishlist
}

export default {
  findById,
  findOne,
  create,
  deleteWishlist
}
