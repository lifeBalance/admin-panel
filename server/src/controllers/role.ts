import { RequestHandler } from 'express'
import AppDataSource from '../db/appDataSource'
import { Role } from '../entity/role'

export const GetRoles: RequestHandler = async (req, res) => {
  const rolesRepository = AppDataSource.getRepository(Role)
  // Fetch all permissions and send them
  res.status(200).json({ roles: await rolesRepository.find() })
}

export const CreateRole: RequestHandler = async (req, res) => {
  const { name, permissions }: { name: string; permissions: number[] } = req.body
  const rolesRepository = AppDataSource.getRepository(Role)
  const role = await rolesRepository.save({
    name,
    permissions: permissions.map((id) => ({ id: id })),
  })
  res.status(201).json({ role: role })
}

export const GetRole: RequestHandler = async (req, res) => {
  const { id: roleId } = req.params
  const rolesRepository = AppDataSource.getRepository(Role)

  // Fetch permission by id and send it
  res.status(200).json({
    role: await rolesRepository.findOne({
      where: { id: +roleId },
      relations: ['permissions'],
    }),
  })
}

export const UpdateRole: RequestHandler = async (req, res) => {
  const { id: roleId } = req.params
  const { name, permissions }: { name: string; permissions: number[] } = req.body
  const rolesRepository = AppDataSource.getRepository(Role)

  const role = await rolesRepository.save({
    id: +roleId,
    name,
    permissions: permissions.map((id) => ({ id: id })),
  })

  // Fetch all permissions and send them
  res.status(202).json({
    role: role,
  })
}

export const DeleteRole: RequestHandler = async (req, res) => {
  const { id: roleId } = req.params
  const rolesRepository = AppDataSource.getRepository(Role)

  const role = await rolesRepository.delete(+roleId)

  // Fetch all permissions and send them
  res.status(204).json({ role: null })
}
