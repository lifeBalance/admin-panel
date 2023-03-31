import { DataSource } from 'typeorm'
import { User } from '../entity/user'
import { Role } from '../entity/role'
import { Permission } from '../entity/permission'
import { Product } from '../entity/product'
import { faker } from '@faker-js/faker'
import { randomInt } from 'crypto'
import { Order } from '../entity/order'
import { OrderItem } from '../entity/order.item'

async function seed() {
  // Create connection to the database
  const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost', // name of Docker service? naaaah, just localhost 🤔
    port: 3306,
    username: 'root',
    password: '1234',
    database: 'node_admin',
    entities: [User, Role, Permission, Product, Order, OrderItem],
    // logging: true,
    synchronize: true,
  })

  try {
    await AppDataSource.initialize()
  } catch (error) {
    console.log(error)
  }

  const orderRepository = AppDataSource.getRepository(Order)
  const orderItemRepository = AppDataSource.getRepository(OrderItem)

  for (let i = 0; i < 30; i++) {
    // console.log(p)
    const order = await orderRepository.save({
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
    })

    for (let j = 0; j < randomInt(1, 5); j++) {
      await orderItemRepository.save({
        order,
        product_title: faker.lorem.words(2),
        price: randomInt(10, 100),
        quantity: randomInt(1, 5),
      })
    }
  }

  process.exit(0) // otherwise stdout hangs...
}

seed()
