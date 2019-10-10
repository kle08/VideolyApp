import React from 'react';

const Input = ({ name, onChange, label, value, error }) => {
  return (
    <div className='form-group'>
      <label htmlFor={name}>{label}</label>
      <input
        onChange={onChange}
        value={value}
        id={name}
        name={name}
        type='text'
        className='form-control'
      />
      {error && <div className='alert alert-danger'>{error}</div>}
    </div>
  );
};

export default Input;
