import { Request, Response } from 'express'
import { STATUS_CODES } from 'http'
import { get } from 'lodash'
import APIFeatures from '../../utils/ApiFeatures'
import { Product, ProductDocument } from './Product.model'
import { createProduct } from './product.service'

export const getProductHandler = async (req: Request, res: Response) => {
  //find product by id
  try {
    const features = new APIFeatures(Product.find(), Product, req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate()

    const products = await features.query

    const total = await features.count().total

    res.status(200).json({ products, data: { total, count: products.length } })
  } catch (error) {
    res.status(500).json({ message: 'Error in getting products' })
  }
}

export const createProductHandler = async (req: Request, res: Response) => {
  const { name, price, description, category } = req.body
  const image = get(req, 'file')
  
  if (!name && !description && !price && !category) {
    return res
      .status(400)
      .json({ message: 'name, description, category and price are required' })
  }
  const input = {
    name,
    price,
    description,
    category
  } as ProductDocument

  if (!image) return res.status(400).json({ message: 'Image is required' })
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
  try {
    const product = await Product.findByIdAndDelete(productId)
    if (!product)
      return res.status(401).json({ message: "product don't exist" })
    res.status(200).json(product)
  } catch (error) {
    res.status(400).json({ message: 'ERR' })
  }
}
