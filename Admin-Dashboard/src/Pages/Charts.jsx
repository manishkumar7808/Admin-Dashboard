import React from 'react';
import BarChartComponent from '../Charts/BarChartComponent.jsx';
import AreaChartComponent from '../Charts/AreaChartComponent.jsx';
import LineChartComponent from '../Charts/LineChartComponent.jsx';
import PieChartComponent from '../Charts/PieChartComponent.jsx';

function Charts() {
  return (
    <div className='page-container'>
      <h2>Analytics & Charts</h2>
      <p>Graphical data representation goes here using line, bar, pie or Area charts.</p>
      <BarChartComponent/>
      <AreaChartComponent/>
      <LineChartComponent/>
      <PieChartComponent/>

    </div>
  );
}

export default Charts;