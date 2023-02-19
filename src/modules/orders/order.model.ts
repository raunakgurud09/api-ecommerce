import { Document, model, Schema, Types } from 'mongoose'

const { ObjectId } = Schema.Types

interface Items {
  quantity: number
  size: string
  product: Types.ObjectId
}

export interface OrderDocument extends Document {
  user: Types.ObjectId
  items: Items[]
  isPaid: boolean
  paymentMethod: string
  total: number
}

const OrderSchema = new Schema(
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
        size: { type: String, default: 'M' },
        product: {
          type: ObjectId,
          ref: 'Product'
        }
      }
    ],
    total: { type: Number },
    isPaid: { type: Boolean, default: false },
    paymentMethod: { type: String, require: true }
  },
  {
    timestamps: true
  }
)

export const Order = model<OrderDocument>('Order', OrderSchema)
