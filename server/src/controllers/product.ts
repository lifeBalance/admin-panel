import { RequestHandler } from 'express'
import AppDataSource from '../db/appDataSource'
import { Product } from '../entity/product'

export const GetProducts: RequestHandler = async (req, res) => {
  // setup the query
  const productRepository = AppDataSource.getRepository(Product)
  // fetch the list of products
  const products = await productRepository.find()

  res.status(200).json({ message: 'success', products: products })
}

export const CreateProduct: RequestHandler = async (req, res) => {
  const { title, description, image, price } = req.body

  // setup the query
  const productRepository = AppDataSource.getRepository(Product)
  // update the user in the db
  const product = await productRepository.save({
    title,
    description,
    image,
    price,
  })

  res.status(201).json({ message: 'success', product: product })
}

export const GetProduct: RequestHandler = async (req, res) => {
  const { id: productId } = req.params

  // setup the query
  const productRepository = AppDataSource.getRepository(Product)
  // find the product in the db
  const product = await productRepository.findOneBy({ id: +productId })

  // If the product with that id exists return it
  if (product) {
    return res.status(200).json({ message: 'success', product: product })
  }
  // Otherwise return some feedback
  res.status(400).json({ message: 'user not found' })
}

export const UpdateProduct: RequestHandler = async (req, res) => {
  const { id: productId } = req.params
  const { title, description, image, price } = req.body

  // setup the query
  const productRepository = AppDataSource.getRepository(Product)
  // update the product in the db
  const result = await productRepository.update(productId, {
    title,
    description,
    image,
    price,
  })

  // If the product with that id was updated (she existed in the DB)
  if (result.affected === 1) {
    const product = await productRepository.findOneBy({id: +productId})
    return res.status(202).json({ product })
  }

  // Otherwise return some feedback
  res.status(400).json({ message: 'product not found' })
}

export const DeleteProduct: RequestHandler = async (req, res) => {
  const { id: productId } = req.params

  // setup the query
  const productRepository = AppDataSource.getRepository(Product)
  // update the user in the db
  const result = await productRepository.delete(productId)

  // If the user with that id was deleted (she existed in the DB)
  if (result.affected === 1) {
    return res.status(204).json(null)
  }
  // Otherwise return some feedback
  res.status(400).json({ message: 'product not found' })
}
