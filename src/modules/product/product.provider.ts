import { Product, ProductDocument } from './Product.model'

const create = (input: ProductDocument, imageUrl: string) => {
  console.log('create')
  try {
    const product = Product.create({
      name,
      description,
      imageUrl,
      category,
      price
    })
    return product
  } catch (error) {
    return error?.message
  }
}

export default {
  create
}
