import React from 'react';
import { Link } from 'react-router-dom';
import {
  BsCart3, BsGrid1X2Fill, BsFillGearFill,
  BsPalette, BsTable, BsBarChartLine, BsCalendar, BsKanban
} from 'react-icons/bs';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          📊Admin Dashboard
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <Link to='/'>
            <BsGrid1X2Fill className='icon' /> Dashboard
          </Link>
        </li>
       
        <li className='sidebar-list-item'>
          <Link to='/tables'>
            <BsTable className='icon' /> Tables
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to='/charts'>
            <BsBarChartLine className='icon' /> Charts
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to='/calendar'>
            <BsCalendar className='icon' /> Calendar
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to='/kanban'>
            <BsKanban className='icon' /> Kanban Board
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to='/themes'>
            <BsPalette className='icon' /> Themes
          </Link>
        </li>
       
      </ul>
    </aside>
  );
}

export default Sidebar;
