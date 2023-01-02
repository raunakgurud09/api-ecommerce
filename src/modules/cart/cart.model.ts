import { Document, model, Schema } from 'mongoose'
import { ProductDocument } from '../product/Product.model'
import { UserDocument } from '../user/user.model'

const { ObjectId } = Schema.Types

export interface Items {
  quantity: number
  size: string
  product: ProductDocument['_id']
}

export interface CartDocument extends Document {
  user: UserDocument['_id']
  items: Items[]
}

const cartSchema = new Schema(
  {
    user: {
      type: ObjectId,
      ref: 'User'
    },
    items: [
      {
        quantity: {
          type: Number,
          default: 1
        },
        size: {
          type: String,
          default: 'M'
        },
        product: {
          type: ObjectId,
          ref: 'Product'
        }
      }
    ]
  },
  {
    timestamps: true
  }
)

export const Cart = model<CartDocument>('Cart', cartSchema)
