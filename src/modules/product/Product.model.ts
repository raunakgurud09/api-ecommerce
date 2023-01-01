import { Document, model, Schema } from 'mongoose';

export interface ProductDocument extends Document {
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
  category: string;
}

const productSchema = new Schema(
  {
    name: String,
    price: Number,
    description: String,
    imageUrl: String,
    category: String
  },
  {
    timestamps: true
  }
);

productSchema.index({ name: 'text' }, { weights: { name: 3 } });

export const Product = model<ProductDocument>('Product', productSchema);
