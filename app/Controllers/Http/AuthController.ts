import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/RegisterValidator'
import { DateTime } from 'luxon'

export default class AuthController {
  public async register({ request, response }: HttpContextContract) {
    const validateData = await request.validate(RegisterValidator)
    try {
      const user = await User.create(validateData)

      return response.status(201).json({
        user,
      })
    } catch (error) {
      return response.status(400).json({
        message: error.message,
      })
    }
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const { email, password } = request.all()

    try {
      const date = DateTime.now().plus({ days: 3 })

      const token = await auth.use('api').attempt(email, password, {
        expires_at: date.toString(),
      })

      return response.status(200).json({
        user: token.user,
        token: token.token,
      })
    } catch (error) {
      return response.status(401).json({
        message: error.message,
      })
    }
  }
}
