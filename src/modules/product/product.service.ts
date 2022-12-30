import { Cloudinary } from '../../lib/cloudinary'
import { ProductDocument } from './Product.model'
import Product from './product.provider'

export async function createProduct(input: ProductDocument) {
  try {
    // send Image to cloudinary
    const imageUrl: string = await Cloudinary.upload(
      input.imageUrl,
      'Product',
      { width: 600, height: 600 }
    )

    if (!imageUrl) {
      return { message: "Couldn't upload to cloudinary" }
    }

    const product = Product.create(input, imageUrl)

    return { data: product, message: 'product successfully created' }
  } catch (error) {
    console.log(error)
  }
}
