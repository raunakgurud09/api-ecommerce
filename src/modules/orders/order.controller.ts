import { Request, Response } from 'express'
import { get } from 'lodash'
import { getOrder } from './order.service'

export const index = async (req: Request, res: Response) => {
  const user = get(req, 'user')

  const { data, message } = await getOrder(user)
  res.status(200).json({ data, message })
}
