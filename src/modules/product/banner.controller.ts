import { Request, Response } from 'express'
import { get } from 'lodash'
import { Cloudinary } from '../../lib/cloudinary'
import { Banner } from './banner.model'

export const BannerHandler = async (req: Request, res: Response) => {
  try {
    const banners = await Banner.findOne().sort({createdAt: -1})
    res.status(200).json({ data: banners })
  } catch (error) {
    res.status(500).json({ message: 'Error in getting banners' })
  }
}

export const createBanner = async (req: Request, res: Response) => {
  const { name, description,image } = req.body
    // const { image } = req.body.files
  // const image = get(req, 'file')
  // console.log(name,description,image)

  if (!name && !description) {
    return res
      .status(400)
      .json({ message: 'name, description and image are required' })
  }
  try {
    if (!image) return res.status(400).json({message:"Image is required"})

    const imageURL = await Cloudinary.upload(image, `banner/${name}`, {
      height: 400,
      width: 1500
    })

    if (!imageURL)
      return res.status(500).json({ message: 'Banner not uploaded' })

    const banner = await Banner.create({
      name,
      description,
      imageURL
    })
    console.log(banner)
    res.status(201).json({ banner, message: 'Created Banner' })
  } catch (error) {
    res.status(500).json({ message: 'Error in creating banners' })
  }
}
