import { RequestHandler } from 'express'
import { Parser } from 'json2csv'
import AppDataSource from '../db/appDataSource'
import { Order } from '../entity/order'
import { OrderItem } from '../entity/order.item'

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

export const ExportOrders:RequestHandler = async (req, res) => {
  const parser = new Parser({
    fields: ['ID', 'Name', 'Email', 'Product Title', 'Price', 'Quantity']
  })
  const orderRepository = AppDataSource.getRepository(Order)
  const orders = await orderRepository.find({
    relations: ['order_items']
  })

  interface jsonItem {
    ID: string | number,
    Name: string,
    Email: string,
    'Product Title': string,
    Price: string | number,
    Quantity: string | number
  }

  const json: jsonItem[] = []

  orders.forEach((order: Order) => {
    json.push({
      ID: order.id,
      Name: order.name,
      Email: order.email,
      'Product Title': '',
      Price: '',
      Quantity: ''
    })
    order.order_items.forEach((item: OrderItem) => {
      json.push({
        ID: '',
        Name: '',
        Email: '',
        'Product Title': item.product_title,
        Price: item.price,
        Quantity: item.quantity
      })
    })
  })

  const csv = parser.parse(json)
  res.header('Content-Type', 'text/csv').attachment('orders.csv').send(csv)
}
