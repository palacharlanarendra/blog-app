import React from 'react';
import { SIGNUP_URL } from '../utils/constant';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',
      errors: {
        email: '',
        password: '',
        username: '',
      },
    };
  }
  validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  validatePassword = (password) => {
    let passwordError;
    if (password.length < 7) {
      passwordError = "Password can't be less than 6 characters";
    }
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/;
    if (!re.test(password)) {
      passwordError = 'Password must contain a character and a Number';
    }
    return passwordError;
  };

  handleInput = ({ target }) => {
    let { name, value } = target;
    let errors = this.state.errors;
    switch (name) {
      case 'email':
        errors.email = this.validateEmail(value) ? '' : 'Email is not valid!';
        break;
      case 'password':
        errors.password = this.validatePassword(value);

        break;
      case 'confirmPassword':
        errors.confirmPassword = this.validatePassword(value);
        break;
      case 'username':
        errors.username =
          value.length < 3 ? 'Username must be at least 3 characters' : '';
        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const { username, email, password } = this.state;
    // Default options are marked with *
    fetch(SIGNUP_URL, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        user: {
          username,
          email,
          password,
        },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        } else {
          return res.json();
        }
      })
      .then(({ user }) => {
        this.props.updatedUser(user);
        this.setState({ username: '', password: '', email: '' });
        this.props.history.push('/Signin');
      })
      .catch((errors) => {
        console.log(errors);
        this.setState({ errors });
      });
  };
  render() {
    let { email, password, username } = this.state.errors;
    return (
      <>
        <div class='bg-grey-lighter min-h-screen flex flex-col'>
          <div class='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
            <div class='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
              <h1 class='mb-8 text-3xl text-center'>Sign up</h1>
              <input
                value={this.state.username}
                onChange={this.handleInput}
                type='text'
                class='block border border-grey-light w-full p-3 rounded mb-4'
                id='username'
                name='username'
                placeholder='User Name'
              />
              <span className="text-red-500 block my-2">{username}</span>
              <input
                value={this.state.email}
                onChange={this.handleInput}
                type='text'
                id='email'
                class='block border border-grey-light w-full p-3 rounded '
                name='email'
                placeholder='Email'
              />
              <span className="text-red-500 block my-2">{email}</span>
              <input
                value={this.state.password}
                onChange={this.handleInput}
                type='password'
                id='password'
                name='password'
                class='block border border-grey-light w-full p-3 rounded '
                placeholder='Password'
              />
              <span className="text-red-500 block my-2">{password}</span>
              <button
                type='submit'
                onClick={this.handleSubmit}
                class='w-full text-center py-3 rounded bg-blue-200 text-black hover:bg-blue-400 focus:outline-none my-1'
                disabled={email || password || username}
              >
                Create Account
              </button>
              <div class='text-center text-sm text-grey-dark '>
                By signing up, you agree to the
                
                  Terms of Service
                and
               
                Privacy Policy

              </div>
            </div>

            <div class='text-grey-dark mt-6'>
              Already have an account?
              <NavLink to="/signin"
                class='no-underline border-b border-blue text-blue'
              >
                {' '} Log in
              </NavLink>
              .
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default withRouter(Signup);
