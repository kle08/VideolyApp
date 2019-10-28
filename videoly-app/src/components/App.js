import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Movies from './Movies';
import NotFound from './notFound';
import Rentals from './rentals';
import Customers from './customers';
import NavBar from './navBar';
import ProtectedRoute from './protectedRoute';
import MovieForm from './movieForm';
import LoginForm from './loginForm';
import RegisterForm from './registerForm';
import Logout from './logout';
import auth from '../services/authService';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <>
        <ToastContainer />
        <NavBar user={user} />
        <main className='container'>
          <Switch>
            <Route path='/register' component={RegisterForm} />
            <Route path='/login' component={LoginForm} />
            <Route path='/logout' component={Logout} />
            <ProtectedRoute path='/movies/:id' component={MovieForm} />
            <Route path='/movies'
              render={props => <Movies {...props} user={user} />}
            />
            <Route path='/customers' component={Customers} />
            <Route path='/rentals' component={Rentals} />
            <Route path='/not-found' component={NotFound} />
            <Redirect from='/' to='/movies' />
            <Redirect to='/not-found' />
          </Switch>
        </main>
      </>
    );
  }
}

export default App;
