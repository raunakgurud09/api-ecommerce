import { Request, Response } from 'express'
import { get } from 'lodash'
import Users from './user.service'
// import { createUser } from './user.service'

export async function uploadAvatarHandler(req: Request, res: Response) {
  // const image = req.file

  const image = get(req, 'file')
  const user = get(req, 'user')

  const result = await Users.uploadAvatar(user, image)

  res.status(200).json({ result })
}

export async function getUserProfileHandler(req: Request, res: Response) {
  const user = get(req, 'user')
  const { foundUser, message } = await Users.profile(user)

  res.status(200).json({ user: foundUser, message })
}

export async function getAuthorizedUser(req: Request, res: Response) {
  const user = get(req, 'user')
  res.status(200).send(user)
}

export async function verifyUserHandler(req: Request, res: Response) {
  //check weather the same as user called

  res.status(200).json({})
}
