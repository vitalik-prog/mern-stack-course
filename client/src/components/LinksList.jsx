import React from 'react';
import {Link} from "react-router-dom";

const LinksList = ({ links }) => {
  if (!links.length) {
    return <p className='center'>There's no links yet.</p>
  }

  return (
    <table>
      <thead>
      <tr>
        <th>№</th>
        <th>From</th>
        <th>To (cropped link):</th>
        <th>Open</th>
      </tr>
      </thead>
      <tbody>
      { links.map((link, index) =>
        <tr key={link._id}>
          <td>{index + 1}</td>
          <td>{link.from}</td>
          <td>{link.to}</td>
          <td>
            <Link to={`/detail/${link._id}`} className='btn yellow darken-4'><i className="material-icons">open_in_new</i></Link>
          </td>
        </tr>
      ) }
      </tbody>
    </table>
  );
};

export default LinksList;