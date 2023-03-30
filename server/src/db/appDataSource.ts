import { DataSource } from 'typeorm'
import { Role } from '../entity/role'
import { User } from '../entity/user'

// Create connection to the database
const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost', // name of Docker service? naaaah, just localhost 🤔
  port: 3306,
  username: 'root',
  password: '1234',
  database: 'node_admin',
  entities: [
    User,
    Role
  ],
  logging: false,
  synchronize: true
})

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!')
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err)
  })

export default AppDataSource