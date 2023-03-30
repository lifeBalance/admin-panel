import { DataSource } from 'typeorm'
import { User } from '../entity/user'
import { Role } from '../entity/role'
import { Permission } from '../entity/permission'

async function seed() {
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
      Role,
      Permission
    ],
    // logging: true,
    synchronize: true
  })

  try {
    await AppDataSource.initialize()
  } catch (error) {
    console.log(error)
  }

  const permissionRepository = AppDataSource.getRepository(Permission)

  const perms = [
    'view_users',
    'edit_users',
    'view_roles',
    'edit_roles',
    'view_products',
    'edit_products',
    'view_orders',
    'edit_orders',
  ]
  const permissions = []

  for (let p of perms) {
    // console.log(p)
    permissions.push(await permissionRepository.save({ name: p }))
  }

  const roleRepository = AppDataSource.getRepository(Role)
  await roleRepository.save({
    name: 'Admin',
    permissions: permissions
  })

  // We need the value at index 3 set to null (ragged array).
  delete permissions[3]

  await roleRepository.save({
    name: 'Editor',
    permissions: permissions
  })

  // We need the values in these indices set to null (ragged array).
  delete permissions[1]
  delete permissions[5]
  delete permissions[7]

  await roleRepository.save({
    name: 'Viewer',
    permissions: permissions
  })

  process.exit(0) // otherwise stdout hangs...
}

seed()
