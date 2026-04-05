import React from 'react';

const Sidebar = () => {
  const links = [
    'Main page', 'Contents', 'Current events', 'Random article', 'About Wikipedia', 'Contact us', 'Donate'
  ];

  return (
    <aside className="wikipedia-sidebar">
      <nav>
        <ul>
          {links.map(link => (
            <li key={link}><a href="#">{link}</a></li>
          ))}
        </ul>
      </nav>
      <div className="sidebar-section-title">Contribute</div>
      <nav>
        <ul>
          <li><a href="#">Help</a></li>
          <li><a href="#">Learn to edit</a></li>
          <li><a href="#">Community portal</a></li>
          <li><a href="#">Recent changes</a></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
