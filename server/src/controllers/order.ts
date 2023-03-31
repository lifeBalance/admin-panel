import { RequestHandler } from 'express'
import AppDataSource from '../db/appDataSource'
import { Order } from '../entity/order'

export const GetOrders: RequestHandler = async (req, res) => {
  const page = req.query.page || '1'
  const take = 10

  // setup the query
  const orderRepository = AppDataSource.getRepository(Order)
  // fetch the list of products
  const [data, total] = await orderRepository.findAndCount({
    take: take,
    skip: (+page - 1) * take,
    relations: ['order_items']
  })

  res.status(200).json({
    message: 'success',
    orders: data.map((order: Order) => {
      return {
        id: order.id,
        name: order.name,
        email: order.email,
        total: order.total,
        created_at: order.created_at,
        order_items: order.order_items
      }
    }),
    meta: {
      total,
      page: +page,
      last_page: Math.ceil(total / take),
    },
  })
}
