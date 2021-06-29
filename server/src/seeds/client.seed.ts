import { hash } from "../utils"
import { Factory, Seeder } from "typeorm-seeding"
import { Client } from "../entities/client"


export default class CreateClients implements Seeder {
  public async run(factory: Factory) {
    const secret = "secret"
    await factory(Client)({
      secret: hash(secret)
    }).createMany(3)
  }
}
