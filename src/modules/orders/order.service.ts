import { Order } from './order.model'

export const getOrder = async (user: any) => {
  try {
    const { userId } = user
    const order = await Order.find({ user: userId })
      .populate('items.product')
      .sort('-createdAt')
    return { data: order }
  } catch (error) {
    return { message: "Can't find the order" }
  }
}

export const createOrder = async (
  user: any,
  paymentMethod: string,
  total: number
) => {
  try {
  } catch (error) {
    return { message: "Order isn't create" }
  }
}
