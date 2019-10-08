import React, { Component } from 'react';

class LoginForm extends Component {
  render() {
    return (
      <div>
        <h1>Login</h1>
        <form>
          <div className='form-group'>
            <label htmlFor='username'>Username</label>
            <input id='username' type='text' className='form-control' />
          </div>
          <div className='form-group'>
            <label htmlFor='passowrd'>Password</label>
            <input id='passowrd' type='text' className='form-control' />
          </div>
          <button className='btn btn-primary'>Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
