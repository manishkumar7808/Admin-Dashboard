// import React from 'react';
// import {
//   BsFillArchiveFill,
//   BsFillGrid3X3GapFill,
//   BsPeopleFill,
//   BsFillBellFill
// } from 'react-icons/bs';
// import {
//   BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
// } from 'recharts';

// const notifications = [
//   { id: 1, type: 'lowStock', message: '5 items are low in stock.' },
//   { id: 2, type: 'refund', message: '2 pending refund requests.' }
// ];

// const recentCustomers = [
//   { name: 'Manish Kumar', email: 'manish@example.com', lastOrder: '2025-06-08', totalSpend: 12000 },
//   { name: 'Aarti Sharma', email: 'aarti@example.com', lastOrder: '2025-06-06', totalSpend: 8700 },
//   { name: 'Rohit Singh', email: 'rohit@example.com', lastOrder: '2025-06-05', totalSpend: 14600 }
// ];

// function Home() {
//   const data = [
//     { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
//     { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
//     { name: 'March', uv: 2000, pv: 9800, amt: 2290 },
//     { name: 'April', uv: 2780, pv: 3908, amt: 2000 },
//     { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
//     { name: 'June', uv: 2390, pv: 3800, amt: 2500 },
//     { name: 'July', uv: 3490, pv: 4300, amt: 2100 }
//   ];

//   return (
//     <main className='main-container'>
//       <div className='main-title'>
//         <h3>DASHBOARD</h3>
//       </div>

//       <div className='main-cards'>
//         <div className='card'>
//           <div className='card-inner'>
//             <h3>PROJECT</h3>
//             <BsFillArchiveFill className='card_icon' />
//           </div>
//           <h1>5</h1>
//         </div>
//         <div className='card'>
//           <div className='card-inner'>
//             <h3>CATEGORIES</h3>
//             <BsFillGrid3X3GapFill className='card_icon' />
//           </div>
//           <h1>12</h1>
//         </div>
//         <div className='card'>
//           <div className='card-inner'>
//             <h3>CUSTOMERS</h3>
//             <BsPeopleFill className='card_icon' />
//           </div>
//           <h1>33</h1>
//         </div>
//         <div className='card'>
//           <div className='card-inner'>
//             <h3>ALERTS</h3>
//             <BsFillBellFill className='card_icon' />
//           </div>
//           <h1>42</h1>
//         </div>
//       </div>

//       <div className='charts'>
//         <ResponsiveContainer width='100%' height={300}>
//           <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
//             <CartesianGrid strokeDasharray='3 3' />
//             <XAxis dataKey='name' />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey='pv' fill='#8884d8' />
//             <Bar dataKey='uv' fill='#82ca9d' />
//           </BarChart>
//         </ResponsiveContainer>

//         <ResponsiveContainer width='100%' height={300}>
//           <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
//             <CartesianGrid strokeDasharray='3 3' />
//             <XAxis dataKey='name' />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type='monotone' dataKey='pv' stroke='#8884d8' activeDot={{ r: 8 }} />
//             <Line type='monotone' dataKey='uv' stroke='#82ca9d' />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>

//       <div className='dashboard-widgets'>
//         <div className='widget reports'>
//           <h3>View Reports</h3>
//           <button>Go to Reports</button>
//         </div>

//         <div className='widget alerts'>
//           <h3>⚠️ Stock Alerts / Notifications</h3>
//           <ul>
//             {notifications.map(note => (
//               <li key={note.id}>{note.message}</li>
//             ))}
//           </ul>
//         </div>

//         <div className='widget customers'>
//           <h3>Recent Customers</h3>
//           <table>
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Last Order Date</th>
//                 <th>Total Spend</th>
//               </tr>
//             </thead>
//             <tbody>
//               {recentCustomers.map((cust, index) => (
//                 <tr key={index}>
//                   <td>{cust.name}</td>
//                   <td>{cust.email}</td>
//                   <td>{cust.lastOrder}</td>
//                   <td>₹{cust.totalSpend}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </main>
//   );
// }

// export default Home;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill
} from 'react-icons/bs';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const notifications = [
  { id: 1, type: 'lowStock', message: '5 items are low in stock.' },
  { id: 2, type: 'refund', message: '2 pending refund requests.' }
];

const recentCustomers = [
  { name: 'Manish Kumar', email: 'manish@example.com', lastOrder: '2025-06-08', totalSpend: 12000 },
  { name: 'Aarti Sharma', email: 'aarti@example.com', lastOrder: '2025-06-06', totalSpend: 8700 },
  { name: 'Rohit Singh', email: 'rohit@example.com', lastOrder: '2025-06-05', totalSpend: 14600 }
];

function Home() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleViewReport = () => {
    navigate('/report');
  };

  const data = [
    { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'March', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'April', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'June', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'July', uv: 3490, pv: 4300, amt: 2100 }
  ];

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>DASHBOARD</h3>
      </div>

      <div className='main-cards'>
        <div className='card'>
          <div className='card-inner'>
            <h3>PROJECT</h3>
            <BsFillArchiveFill className='card_icon' />
          </div>
          <h1>5</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>CATEGORIES</h3>
            <BsFillGrid3X3GapFill className='card_icon' />
          </div>
          <h1>12</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>CUSTOMERS</h3>
            <BsPeopleFill className='card_icon' />
          </div>
          <h1>33</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>ALERTS</h3>
            <BsFillBellFill className='card_icon' />
          </div>
          <h1>42</h1>
        </div>
      </div>

      <div className='charts'>
        <ResponsiveContainer width='100%' height={300}>
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey='pv' fill='#8884d8' />
            <Bar dataKey='uv' fill='#82ca9d' />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width='100%' height={300}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type='monotone' dataKey='pv' stroke='#8884d8' activeDot={{ r: 8 }} />
            <Line type='monotone' dataKey='uv' stroke='#82ca9d' />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className='dashboard-widgets'>
        <div className='widget reports'>
          <h3>View Reports</h3>
          <button className="view-report-btn" onClick={handleViewReport}>View Report</button>
        </div>

        <div className='widget alerts'>
          <h3>⚠️ Stock Alerts / Notifications</h3>
          <ul>
            {notifications.map(note => (
              <li key={note.id}>{note.message}</li>
            ))}
          </ul>
        </div>

        <div className='widget customers' style={{ padding: '16px', margin: '10px', borderRadius: '8px' }}>
          <h3>Recent Customers</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Last Order Date</th>
                  <th>Total Spend</th>
                </tr>
              </thead>
              <tbody>
                {recentCustomers.map((cust, index) => (
                  <tr key={index}>
                    <td>{cust.name}</td>
                    <td>{cust.email}</td>
                    <td>{cust.lastOrder}</td>
                    <td>₹{cust.totalSpend}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Report Details</h2>
            <p>This is your detailed report content.</p>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </main>
  );
}

export default Home;
