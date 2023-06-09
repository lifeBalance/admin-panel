import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import OrderItemsTable from '../../components/OrderItemTable'
import Paginator from '../../components/Paginator'
import Wrapper from '../../components/Wrapper'

function Orders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [page, setPage] = useState<number>(1)
  const [lastPage, setLastPage] = useState<number>(0)
  const [visible, setVisible] = useState(0)

  function selectVisible(id: number) {
    setVisible(visible === id ? 0 : id)
  }

  async function handleExport() {
    const response = await axios.post('/export', {}, {
      responseType: 'blob',
    })
    // console.log(response)
    if (response.statusText === 'OK') {
      const blob = new Blob([response.data], { type: 'text/csv' })
      const url = window.URL.createObjectURL(response.data)
      const link = document.createElement('a')
      link.href = url
      link.download = 'orders.csv'
      link.click()
    }
  }

  useEffect(() => {
    ;(async () => {
      const response = await axios.get(`/orders?page=${page}`)
      console.log(response.data)
      if (response.statusText === 'OK') {
        setOrders(response.data.orders)
        setLastPage(response.data.meta.last_page)
      }
    })()
  }, [page]) // set the page as a dependency, so when it changes new orders are fetched!!

  return (
    <Wrapper>
      <div className='pt-3 pb-2 mb-3 border-bottom'>
        <a className='btn btn-sm btn-outline-secondary' onClick={handleExport}>
          Export
        </a>
      </div>
      <div className='table-responsive'>
        <table className='table table-striped table-sm'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Email</th>
              <th scope='col'>Total</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 &&
              orders.map((o: Order) => {
                return (
                  <>
                    <tr key={o.id}>
                      <td>{o.id}</td>
                      <td>{o.name}</td>
                      <td>{o.email}</td>
                      <td>{o.total}</td>
                      <td>
                        <a
                          href='#'
                          className='btn btn-sm btn-outline-secondary'
                          onClick={() => selectVisible(o.id)}
                        >
                          Show
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={5} className={`${visible === o.id ? '' : 'd-none'}`}>
                        <OrderItemsTable order_items={o.order_items} />
                      </td>
                    </tr>
                  </>
                )
              })}
          </tbody>
        </table>
      </div>

      <Paginator lastPage={lastPage} setPage={setPage} />
    </Wrapper>
  )
}

export default Orders
