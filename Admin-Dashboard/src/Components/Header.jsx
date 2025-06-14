// import React from 'react';
// import { BsJustify } from 'react-icons/bs';


// function Header({ OpenSidebar, className }) {
//   return (
//     <header className={`dashboard-header ${className}`}>
//       <div className="header-content">
        
//         <span className="menu-toggle" onClick={OpenSidebar} title="Toggle Sidebar">
//           <BsJustify />
//         </span>
//       </div>
//     </header> 
//   );
// }

// export default Header;
// Header.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BsJustify } from 'react-icons/bs';

function Header({ OpenSidebar, className }) {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('token');

  const handleAuthClick = () => {
    if (isAuthenticated) {
      localStorage.removeItem('token'); // Logout
      navigate('/login');
    } else {
      navigate('/login'); // Login
    }
  };

  return (
    <header className={`dashboard-header ${className} flex justify-between items-center p-4 bg-blue-600 text-white shadow-md`}>
      
      {/* Left: Sidebar Toggle Button */}
      <span className="menu-toggle text-2xl cursor-pointer" onClick={OpenSidebar} title="Toggle Sidebar">
        <BsJustify />
      </span>

      {/* Center: Page Title */}
      {/* <h1 className="text-lg font-semibold">Admin Dashboard</h1> */}

      {/* Right: Login/Logout Button */}
      <button
        onClick={handleAuthClick}
        className="bg-white text-blue-600 font-semibold px-4 py-1 rounded shadow hover:bg-gray-100"
      >
        {isAuthenticated ? 'Logout' : 'Login'}
      </button>
    </header>
  );
}

export default Header;
