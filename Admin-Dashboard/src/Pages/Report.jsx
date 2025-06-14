import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const Report = () => {
  const originalData = [
    { month: '2024-01-01', label: 'Jan', sales: 40000 },
    { month: '2024-02-01', label: 'Feb', sales: 30000 },
    { month: '2024-03-01', label: 'Mar', sales: 50000 },
    { month: '2024-04-01', label: 'Apr', sales: 25000 },
    { month: '2024-05-01', label: 'May', sales: 60000 },
  ];

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredData, setFilteredData] = useState(originalData);

  const handleFilter = () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    const newData = originalData.filter((item) => {
      const itemDate = new Date(item.month);
      return itemDate >= start && itemDate <= end;
    });

    setFilteredData(newData);
  };

  const handleExport = () => {
    alert('Exporting report... (PDF/CSV logic can be added here)');
  };

  return (
    <div className="report-page" style={{ padding: '20px' }}>
      <h2>📊 Sales Report</h2>
      <p>Here you can see the detailed analytics, sales trends, and customer insights.</p>

      {/* Date Range Filter */}
      <div style={{ margin: '20px 0' }}>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          style={{ marginLeft: '10px' }}
        />
        <button onClick={handleFilter} style={{ marginLeft: '10px' }}>
          Filter
        </button>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards" style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', flex: 1 }}>
          Total Sales: ₹1,45,000
        </div>
        <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', flex: 1 }}>
          Orders: 120
        </div>
        <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', flex: 1 }}>
          Returns: 3
        </div>
      </div>

      {/* Bar Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sales" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      {/* Top Products Table */}
      <h3 style={{ marginTop: '30px' }}>Top-Selling Products</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Product</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Sold</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Revenue</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>Headphones</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>150</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>₹75,000</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>Smartphones</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>90</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>₹55,000</td>
          </tr>
        </tbody>
      </table>

      {/* Export Button */}
      <button onClick={handleExport} style={{ marginTop: '20px' }}>
        Export Report
      </button>
    </div>
  );
};

export default Report;
