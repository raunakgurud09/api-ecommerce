import { Request, Response } from 'express'
import { get } from 'lodash'
import { Product, ProductDocument } from './Product.model'
import { createProduct } from './product.service'

export const getProductHandler = async (req: Request, res: Response) => {
  //find product by id
  const products = await Product.find({})

  res.status(200).json({ products })
}

export const createProductHandler = async (req: Request, res: Response) => {
  const { name, price, description, category,image } = req.body
  // const image = get(req, 'file')
  // const image = get(req, 'file')

  const input = {
    name,
    price,
    description,
    category
  } as ProductDocument

  const result = await createProduct(input, image)

  res.status(200).json(result)
}

export const getSingleProductHandler = async (req: Request, res: Response) => {
  const { productId } = req.params
  //find product by id
  const product = await Product.findById(productId)

  if (!product) return { message: 'Product not found' }

  const relatedProducts = await Product.find({
    category: product.category,
    _id: { $ne: product._id }
  }).limit(8)

  res.status(200).json({ product, relatedProducts })
}

export const updateProductHandler = async (req: Request, res: Response) => {
  const { productId } = req.params
  //find product by id
  const product = await Product.findById(productId)

  res.status(200).json(product)
}

export const deleteProductHandler = async (req: Request, res: Response) => {
  const { productId } = req.params
  //find product by id
  const product = await Product.findByIdAndDelete(productId)

  res.status(200).json(product)
}
