import { Cloudinary } from '../../lib/cloudinary'
import { ProductDocument } from './Product.model'
import Product from './product.provider'

export const createProduct = async (
  input: ProductDocument,
  image: string
) => {
  try {
    // send Image to cloudinary

    const imageUrl = await Cloudinary.upload(image, `products/${input.name}`, {
      height: 600,
      width: 600
    })
    if (!imageUrl) return { message: 'Product not uploaded' }

    const { data, message } = await Product.create(input, imageUrl)

    return { data, message }
  } catch (error) {
    console.log(error)
  }
}

export default {}
