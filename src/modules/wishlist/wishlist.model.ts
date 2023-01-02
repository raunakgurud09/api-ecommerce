import { Document, model, Schema, Types } from 'mongoose'

const { ObjectId } = Schema.Types

export interface wishlistDocument extends Document {
  user: Types.ObjectId
  product: Types.ObjectId
}

const wishlistSchema = new Schema({
  user: {
    type: ObjectId,
    ref: 'User'
  },
  product: {
    type: ObjectId,
    ref: 'Product'
  }
})

export const Wishlist = model<wishlistDocument>('Wishlist', wishlistSchema)
