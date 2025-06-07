import React from 'react';
import Orders from '../Tables/Orders';
import Users from '../Tables/Users';
import Projects from '../Tables/Projects';
function Tables() {
  return (
    <div className='page-container'>
   
      <Orders/>
      <Users/>
      <Projects/>

    </div>
  );
}
export default Tables;