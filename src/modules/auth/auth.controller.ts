import { Request, Response } from 'express'
import { createUserSchema } from './user.schema'
import Auth from './auth.service'
import validateRequest from '../../middleware/validate.middleware'
import { STATUS_CODES } from 'http'
import { attachCookiesToResponse } from '../../utils/attachCookiesToResponse'

export const register = async (req: Request, res: any) => {
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

  res.status(200).json(message)
  // console.log(res.header)
}

export const logout = async (req: Request, res: Response) => {
  res.cookie('refreshToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now())
  })
  res.status(200).json({ msg: 'user logged out!' })
}

// const sendOTP = async (req, res) => {
//   const { email } = req.body
//   if (!email) {
//     return res
//       .status(StatusCodes.BAD_REQUEST)
//       .json({ message: 'Email is required' })
//   }
//   const user = await User.findOne({ email })

//   if (!user) {
//     return res
//       .status(StatusCodes.UNAUTHORIZED)
//       .json({ message: 'No user with this email is found' })
//   }

//   const optCode = optGenerator.generate(6, {
//     digits: true,
//     lowerCaseAlphabets: false,
//     upperCaseAlphabets: false,
//     specialChars: false
//   })
//   const expireTime = new Date().getTime() + 300 * 1000 // 5 MIN
//   try {
//     user.code = [
//       await OTP.create({
//         expiresIn: expireTime,
//         code: optCode
//       })
//     ]

//     await user.save()

//     const result = await sendMail(email, optCode)
//     res.status(StatusCodes.OK).json({ result })
//   } catch (error) {
//     console.log(error.message)
//   }
// }

// const verifyEmail = async (req, res) => {
//   const { email } = req.body
//   if (!email) {
//     return res
//       .status(StatusCodes.BAD_REQUEST)
//       .json({ message: 'Email is required' })
//   }
//   const user = await User.findOne({ email })

//   if (!user) {
//     return res
//       .status(StatusCodes.UNAUTHORIZED)
//       .json({ message: 'No user with this email is found' })
//   }
//   const origin = 'http://localhost:5000/api/v1'
//   const verificationToken = crypto.randomBytes(40).toString('hex')

//   user.verificationToken = verificationToken
//   await user.save()

//   try {
//     const result = await sendVerificationMail({
//       name: user.name,
//       email,
//       verificationToken,
//       origin
//     })
//     res.status(StatusCodes.OK).json({ result })
//   } catch (error) {
//     console.log(error.message)
//   }
// }

// const loginViaGoogle = async (req, res) => {
//   const { idToken } = req.body
//   if (!idToken) {
//     return res.status(402).json({ error: { message: 'id Token is required' } })
//   }
//   try {
//     const response = await Google.verifyIdToken(idToken)
//   } catch (error) {}
// }

// const checkVerificationEmail = async (req, res) => {
//   const { token, email } = req.query
//   const user = await User.findOne({ email })

//   if (!user) {
//     return res
//       .status(StatusCodes.BAD_REQUEST)
//       .json({ message: 'No user with this email is found' })
//   }

//   if (user.verificationToken !== token) {
//     return res
//       .status(StatusCodes.UNAUTHORIZED)
//       .json({ message: 'verification code did not match' })
//   }

//   user.isVerified = true
//   user.verificationToken = ''

//   await user.save()

//   res.status(StatusCodes.OK).json({ msg: 'Email Verified' })
// }

// const resetPassword = async (req, res) => {
//   const { email, password } = req.body
//   try {
//     changePassword(email, password)
//     res.status(StatusCodes.OK).json({ msg: 'Success! Password Updated.' })
//   } catch (error) {
//     console.log(error)
//   }
// }

module.exports = {
  register,
  login,
  logout
  // loginViaGoogle,
  // sendOTP,
  // checkVerificationEmail
}
