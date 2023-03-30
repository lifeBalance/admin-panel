import { RequestHandler } from 'express'
import AppDataSource from '../db/appDataSource'
import { Permission } from '../entity/permission'

export const Permissions: RequestHandler = async (req, res) => {
  const permissionsRepository = AppDataSource.getRepository(Permission)
  // Fetch all permissions and send them
  res.status(200).json({permissions: await permissionsRepository.find()})
}
