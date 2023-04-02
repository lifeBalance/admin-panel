import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Paginator from '../../components/Paginator'
import Wrapper from '../../components/Wrapper'

function Products() {
  const [products, setProducts] = useState([])
  const [page, setPage] = useState<number>(1)
  const [lastPage, setLastPage] = useState<number>(0)

  useEffect(() => {
    ;(async () => {
      const response = await axios.get(`/products?page=${page}`)
      console.log(response)
      if (response.statusText === 'OK') {
        setProducts(response.data.products)
        setLastPage(response.data.meta.last_page)
      }
    })()
  }, [page])


  async function onDelete(id: number) {
    if (window.confirm('You sure you wanna delete this product?')) {
      await axios.delete(`/products/${id}`)
      setProducts((prev) => prev.filter((p: Product) => p.id !== id))
    }
  }

  return (
    <Wrapper>
      <div className='table-responsive'>
        <table className='table table-striped table-sm'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Image</th>
              <th scope='col'>Title</th>
              <th scope='col'>Description</th>
              <th scope='col'>Price</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 &&
              products.map((p: Product) => {
                return (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>
                      <img src={p.image} height='50' />
                    </td>
                    <td>{p.title}</td>
                    <td>{p.description}</td>
                    <td>{p.price}</td>
                    <td>
                      <div className='btn-group mr-2'>
                        <Link
                          to={`/products/${p.id}/edit`}
                          state={p}
                          className='btn btn-sm btn-outline-secondary'
                        >
                          Edit
                        </Link>
                        <a
                          // href='#'
                          className='btn btn-sm btn-outline-secondary'
                          onClick={() => onDelete(p.id)}
                        >
                          Delete
                        </a>
                      </div>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>

      <Paginator lastPage={lastPage} setPage={setPage} />
    </Wrapper>
  )
}

export default Products
