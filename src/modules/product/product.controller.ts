import { Request, Response } from 'express'
import { ProductDocument } from './Product.model'
import { createProduct } from './product.service'

export const getProductHandler = async (req: Request, res: Response) => {
  // Refine input values here
  const { id } = req.body

  // Contact business layer

  // Handle response
  res.status(200).json({ data: {}, message: {} })
}

export const createProductHandler = async (req: Request, res: Response) => {
  const { name, price, description, imageUrl, category } = req.body
  //Validation
  const input = {
    name,
    price,
    description,
    imageUrl,
    category
  } as ProductDocument

  const result = await createProduct(input)

  // Handle response
  res
    .status(200)
    .json({ data: { result }, message: 'Successfully product created' })
}
