import { Request, Response } from 'express'
import { createUserSchema } from './user.schema'
import Auth from './auth.service'
import validateRequest from '../../middleware/validate.middleware'
import { attachCookiesToResponse } from '../../utils/attachCookiesToResponse'

export const register = async (req: Request, res: Response) => {
  validateRequest(createUserSchema) // Not working
  const { name, email, password, role } = req.body

  if (!email && !password && !name) {
    return res.status(400).json({ message: 'Email and Password are required' })
  }

  const user = await Auth.create({ name, email, password, role })

  res.status(200).json(user)
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  if (!email && !password) {
    return res.status(400).json({ message: 'Email and password are required.' })
  }

  const { accessToken, message } = await Auth.login({ email, password })

  if (!accessToken) return res.status(400).json(message)
  attachCookiesToResponse(res, 'x-access-token', accessToken)

  res.status(200).json({ token: accessToken, message })
  // console.log(res.header)
}

export const logout = async (req: Request, res: Response) => {
  res.cookie('refreshToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now())
  })
  res.status(200).json({ msg: 'user logged out!' })
}

// const loginViaGoogle = async (req, res) => {
//   const { idToken } = req.body
//   if (!idToken) {
//     return res.status(402).json({ error: { message: 'id Token is required' } })
//   }
//   try {
//     const response = await Google.verifyIdToken(idToken)
//   } catch (error) {}
// }

module.exports = {
  register,
  login,
  logout
  // loginViaGoogle,
  // sendOTP,
  // checkVerificationEmail
}
