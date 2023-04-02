import { useState } from "react"

function OrderItemsTable({ order_items }: { order_items: OrderItem[] }) {
  const [visible, setVisible] = useState(false)

  return (
    <table className='table table-sm'>
      <thead>
        <tr>
          <th>#</th>
          <th>Product Title</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {order_items.length > 0 &&
          order_items.map((oi: OrderItem) => {
            return (
              <tr key={oi.id}>
                <td>{oi.id}</td>
                <td>{oi.product_title}</td>
                <td>{oi.quantity}</td>
                <td>{oi.price}</td>
              </tr>
            )
          })}
      </tbody>
    </table>
  )
}

export default OrderItemsTable
