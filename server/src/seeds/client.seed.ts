import { Factory, Seeder } from "typeorm-seeding"
import { Client } from "../models/client"
import crypto from "crypto"

export default class CreateClients implements Seeder {
  public async run(factory: Factory) {
    const secret = "secret"
    await factory(Client)({
      secret: crypto.createHash("sha512").update(secret).digest("hex")
    }).createMany(3)
  }
}