import wishlistProvider from './wishlist.provider'

export const getWishlist = async (user: any) => {
  const { userId } = user
  const wishlist = wishlistProvider.findById(userId)

  if (!wishlist) return { message: 'Wishlist is Empty' }

  return { data: wishlist }
}

export const createWishlist = async (user: any, productId: string) => {
  try {
    const find = {
      user: user.userId,
      product: productId
    }
    let wishlist = await wishlistProvider.findOne(find)

    if (wishlist) {
      return { message: 'Product is already on your wishlist' }
    }
    const options = {
      user: user.userId,
      product: productId
    }
    wishlist = await wishlistProvider.create(options)
    wishlist = await wishlist.populate('product')

    return { data: wishlist, message: 'Added to wishlist' }
  } catch (error) {
    return { message: "Error! couldn't be added to wishlist" }
  }
}

export const deleteWishlist = async (user: any, productId: string) => {
  try {
    const options = {
      user: user.userId,
      product: productId
    }
    const wishlist = await wishlistProvider.findOne(options)

    if (!wishlist) {
      return { message: 'Product is not on your wishlist' }
    }

    await wishlist.remove()

    return { data: null, message: 'Removed from wishlist' }
  } catch (error) {
    return { message: "Error! couldn't be added to wishlist" }
  }
}
