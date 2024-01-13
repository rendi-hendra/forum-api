import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ThreadValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string({ trim: true }, [rules.maxLength(255)]),
    content: schema.string({ trim: true }),
    category_id: schema.number([rules.exists({ table: 'categories', column: 'id' })]),
    // category: schema.string([rules.exists({ table: 'categories', column: 'title' })]),
  })

  public messages: CustomMessages = {}
}
