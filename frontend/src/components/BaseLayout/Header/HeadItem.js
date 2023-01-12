import React from 'react';

function HeadItem(headeritem) {
  return (
    <li className="list-inline-item"><a href={headeritem.link}>{headeritem.text}</a></li>
  );
}

export default HeadItem;
