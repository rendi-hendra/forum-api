import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'api_tokens'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('name').notNullable()
      table.string('type').notNullable()
      table.string('token', 64).notNullable().unique()

      // table.dateTime('some_time', { useTz: true }).defaultTo(this.now())
      // table.dateTime('expires_at', { precision: 6 }).defaultTo(this.now(6))
      table.timestamp('expires_at', { useTz: true })
      // table.timestamp('expires_at', { precision: 6 })
      table.timestamps(true, true)

      // table.dateTime('created_at', { useTz: true }).notNullable()
      // table.dateTime('updated_at', { useTz: true }).notNullable()

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */

      // table.timestamp('expires_at', { useTz: true })
      // table.timestamp('expires_in', { useTz: true })
      // table.timestamps(true, true)
      // table.timestamp()
      // table.timestamp('created_at', { useTz: true })
      // table.timestamp('updated_at', { useTz: true }).defaultTo(this.now)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
