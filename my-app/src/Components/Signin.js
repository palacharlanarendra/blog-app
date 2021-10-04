import React from 'react';
import { NavLink } from 'react-router-dom';
import { SIGNIN_URL } from '../utils/constant';
import { withRouter } from 'react-router';
class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {
        email: '',
        password: '',
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
      default:
        break;
    }
    this.setState({ errors, [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    // Default options are marked with *
    fetch(SIGNIN_URL, {
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
        this.setState({ password: '', email: '' });
        this.props.history.push('/');
      })
      .catch((errors) => {
        console.log(errors);
        this.setState((prevState) => {
          return {
            ...prevState,
            errors: {
              ...prevState.errors,
              email: 'Email or Password is incorrect!',
            },
          };
        });
      });
  };

  render() {
    let { email, password } = this.state.errors;
    return (
      <>
        <section class='min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12'>
          <div class='p-10 xs:p-0 mx-auto md:w-full md:max-w-md'>
            <div class='bg-white shadow w-full rounded-lg divide-y divide-gray-200'>
              <form class='px-5 py-7'>
                <h2 class='font-bold text-center text-2xl mb-5'>Sign In</h2>  
                <label class='font-semibold text-sm text-gray-600 pb-1 block'>
                  E-mail
                </label>
                <input
                  value={this.state.email}
                  onChange={this.handleInput}
                  type='text'
                  id='email'
                  name='email'
                  placeholder='Email'
                  class='border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full'
                />
                <span className="text-red-500 block my-2">{email}</span>
                <label class='font-semibold text-sm text-gray-600 pb-1 block'>
                  Password
                </label>
                <input
                  value={this.state.password}
                  onChange={this.handleInput}
                  type='password'
                  id='password'
                  name='password'
                  placeholder='Password'
                  class='border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full'
                />
                <span className="text-red-500 block my-2">{password}</span>
                <button
                  type='button'
                  class='transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block'
                  onClick={this.handleSubmit}
                >
                  <span class='inline-block mr-2'>Login</span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    class='w-4 h-4 inline-block'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M17 8l4 4m0 0l-4 4m4-4H3'
                    />
                  </svg>
                </button>
              </form>
              {this.state.isLoggedIn ? <p>user loggedin</p> : ''}
            </div>
            <div class='py-5'>
              <div class='grid grid-cols-2 gap-1'>
                <div class='text-center sm:text-left whitespace-nowrap'>
                  <button class='transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      class='w-4 h-4 inline-block align-text-top'
                    >
                      <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        stroke-width='2'
                        d='M10 19l-7-7m0 0l7-7m-7 7h18'
                      />
                    </svg>
                    <NavLink class='inline-block ml-1 border py-1 px-3 ' to='/'>
                      {' '}Back to Home
                    </NavLink>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}
export default withRouter(Signin);
