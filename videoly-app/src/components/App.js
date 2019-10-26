import React, { Component } from 'react';
import Movies from './Movies';
import { Route, Redirect, Switch } from 'react-router-dom';
import NotFound from './notFound';
import Rentals from './rentals';
import Customers from './customers';
import NavBar from './navBar';
import MovieForm from './movieForm';
import LoginForm from './loginForm';
import RegisterForm from './registerForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  render() {
    return (
      <>
        <ToastContainer />
        <NavBar />
        <main className='container'>
          <Switch>
            <Route path='/register' component={RegisterForm} />
            <Route path='/login' component={LoginForm} />
            <Route path='/movies/:id' component={MovieForm} />
            <Route path='/movies' component={Movies}></Route>
            <Route path='/customers' component={Customers}></Route>
            <Route path='/rentals' component={Rentals}></Route>
            <Route path='/not-found' component={NotFound}></Route>
            <Redirect from='/' to='/movies' />
            <Redirect to='/not-found' />
          </Switch>
        </main>
      </>
    );
  }
}

export default App;
