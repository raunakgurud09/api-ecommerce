import { Product, ProductDocument } from './Product.model'

const create = async (
  { name, description, category, price }: ProductDocument,
  imageUrl: string
) => {
  try {
    const product = await Product.create({
      name,
      description,
      imageUrl,
      category,
      price
    })
    return { data: product }
  } catch (error) {
    return { message: 'Product not created' }
  }
}

export default {
  create
}
