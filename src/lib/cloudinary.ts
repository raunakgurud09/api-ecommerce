import cloudinary from 'cloudinary'
import config from '../configs/index.config'

cloudinary.v2.config({
  cloud_name: config.cloud_name,
  api_key: config.api_key,
  api_secret: config.api_secret
})

export const Cloudinary = {
  upload: async (
    image: Express.Multer.File,
    folder: string,
    { width, height }: { width: number; height: number | string }
  ) => {
    try {
      const res = await cloudinary.v2.uploader.upload(image.path, {
        public_id: `ecommerce-dress-shop/${folder}`,
        transformation: [{ width, height, crop: 'fill' }],
        overwrite: true
      })
      return res.secure_url
    } catch (error) {
      return
    }
  }
}
