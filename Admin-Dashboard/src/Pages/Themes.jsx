import React from 'react';

function Themes({
  darkMode, setDarkMode,
  fontSize, setFontSize,
  layout, setLayout,
  showSidebar, setShowSidebar,
  showCardShadow, setShowCardShadow
}) {
  return (
    <div className='page-container'>
      <h2>Themes </h2>

      <label>
        🌗 Dark Mode:
        <input type='checkbox' checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
      </label>

      <br />
      <label>
        🖋️ Font Size:
        <select value={fontSize} onChange={(e) => setFontSize(e.target.value)}>
          <option value='14px'>Small</option>
          <option value='16px'>Medium</option>
          <option value='18px'>Large</option>
        </select>
      </label>

      <br />
      <label>
        🧱 Layout:
        <select value={layout} onChange={(e) => setLayout(e.target.value)}>
          <option value='full'>Full Width</option>
          <option value='boxed'>Boxed</option>
        </select>
      </label>

      <br />
      <label>
        ✅ Show Sidebar:
        <input type='checkbox' checked={showSidebar} onChange={() => setShowSidebar(!showSidebar)} />
      </label>

      <br />
      <label>
        ✨ Show Card Shadows:
        <input type='checkbox' checked={showCardShadow} onChange={() => setShowCardShadow(!showCardShadow)} />
      </label>
    </div>
  );
}

export default Themes;