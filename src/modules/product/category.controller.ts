import { Request, Response } from 'express'
import { get } from 'lodash'
import { Cloudinary } from '../../lib/cloudinary'
import { Category } from './category.model'

export const categoryHandler = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find()
    res.status(200).json({ data: categories })
  } catch (error) {
    res.status(500).json({ message: 'Error in getting categories' })
  }
}

export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body
  //   const { image } = req.body.files
  const image = get(req, 'file')

  if (!name) {
    return res.status(400).json({ message: 'name is required' })
  }
  try {
    if (!image) return res.status(400).json({ message: 'Image is required' })

    const imageURL = await Cloudinary.uploadFile(image, `category/${name}`, {
      height: 600,
      width: 600
    })
    if (!imageURL)
      return res.status(500).json({ message: 'Category image not uploaded' })

    const category = await Category.create({
      name,
      imageURL
    })

    res.status(201).json({ category, message: 'Category created' })
  } catch (error) {
    res.status(500).json({ message: 'Error in creating Category' })
  }
}
