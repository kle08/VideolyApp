import React from 'react';

const ListGroup = ({ items, textProperty, valueProperty, onItemSelect }) => {
  return (
    <ul className='list-group'>
      {items.map(item => (
        <li
          onClick={() => onItemSelect(item)}
          key={items[valueProperty]}
          className='list-group-item'
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id'
};
export default ListGroup;
