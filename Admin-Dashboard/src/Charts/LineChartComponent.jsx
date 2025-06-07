import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const data = [
  { date: 'Jan', traffic: 400 },
  { date: 'Feb', traffic: 700 },
  { date: 'Mar', traffic: 900 },
  { date: 'Apr', traffic: 1200 },
  { date: 'May', traffic: 1600 },
  { date: 'Jun', traffic: 1800 },
];

function LineChartComponent() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="traffic" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default LineChartComponent;