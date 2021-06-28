import Faker from "faker"
import { define } from "typeorm-seeding"
import { Client } from "../entities/client"

interface Context {
  secret: string
}
define(Client, (faker: typeof Faker, context: Context | undefined) => {
  const { secret } = context as Context

  const client = new Client()
  client.id = faker.random.uuid()
  client.secret = secret
  return client
})