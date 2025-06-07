import React, { useState } from 'react';


const orderData = [
  { id: 101, product: 'Laptop', quantity: 2, status: 'Shipped', date: '2025-06-01' },
  { id: 102, product: 'Headphones', quantity: 1, status: 'Processing', date: '2025-06-04' },
  { id: 103, product: 'Smartphone', quantity: 3, status: 'Delivered', date: '2025-06-03' },
  { id: 104, product: 'Keyboard', quantity: 5, status: 'Shipped', date: '2025-06-02' },
  { id: 105, product: 'Mouse', quantity: 4, status: 'Processing', date: '2025-06-05' },
  { id: 106, product: 'Monitor', quantity: 2, status: 'Delivered', date: '2025-06-01' },
];


function Orders() {
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredOrders = orderData.filter(order =>
    statusFilter === 'All' || order.status === statusFilter
  );

  return (
    <div className='page-container'>
      <h2>Orders</h2>
      <div className="filter">
        <label>Status Filter: </label>
        <select onChange={(e) => setStatusFilter(e.target.value)}>
          <option>All</option>
          <option>Processing</option>
          <option>Shipped</option>
          <option>Delivered</option>
        </select>
      </div>
      <table>
        <thead>
          <tr><th>Order ID</th><th>Product</th><th>Quantity</th><th>Status</th><th>Date</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {filteredOrders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.product}</td>
              <td>{order.quantity}</td>
              <td><span className={`badge badge-${order.status.toLowerCase()}`}>{order.status}</span></td>
              <td>{order.date}</td>
              <td><button onClick={() => alert(`Invoice for order #${order.id}`)}>Invoice</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;