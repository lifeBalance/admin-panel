import { DataSource } from 'typeorm'
import { User } from '../entity/user'
import { Role } from '../entity/role'
import { Permission } from '../entity/permission'
import { Product } from '../entity/product'
import { faker } from '@faker-js/faker'
import { randomInt } from 'crypto'

async function seed() {
  // Create connection to the database
  const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost', // name of Docker service? naaaah, just localhost 🤔
    port: 3306,
    username: 'root',
    password: '1234',
    database: 'node_admin',
    entities: [User, Role, Permission, Product],
    // logging: true,
    synchronize: true,
  })

  try {
    await AppDataSource.initialize()
  } catch (error) {
    console.log(error)
  }

  const productRepository = AppDataSource.getRepository(Product)

  for (let i = 0; i < 30; i++) {
    // console.log(p)
    await productRepository.save({
      title: faker.lorem.words(2),
      description: faker.lorem.words(20),
      image: faker.image.imageUrl(200, 200, 'cat', true),
      price: randomInt(10, 100)
    })
  }

  process.exit(0) // otherwise stdout hangs...
}

seed()
