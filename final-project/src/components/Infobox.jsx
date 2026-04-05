import React from 'react';

const Infobox = () => {
  return (
    <table className="infobox">
      <thead>
        <tr>
          <th colSpan="2" className="infobox-title">Example.com</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan="2" className="infobox-image">
             [Image Placeholder]
          </td>
        </tr>
        <tr>
          <th>Established</th>
          <td>1999; 27 years ago</td>
        </tr>
        <tr>
          <th>Registrar</th>
          <td>ICANN</td>
        </tr>
        <tr>
          <th>Website</th>
          <td><a href="https://example.com">example.com</a></td>
        </tr>
        <tr>
          <th>Registration</th>
          <td>Restricted</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Infobox;
