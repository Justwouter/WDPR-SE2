import React from 'react';

function Footitem(footeritem) {
  return (
    <li className="list-inline-item"><a href={footeritem.link}>{footeritem.text}</a></li>
  );
}

export default Footitem;
