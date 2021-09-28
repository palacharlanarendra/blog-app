import React from 'react';
class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      username: '',
      confirmPassword: '',
      errors: {
        email: '',
        password: '',
        username: '',
        confirmPassword: '',
      },
    };
  }
  validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  validatePassword = (password) => {
    const re = /^(?=.*?[a-z])(?=.*?[0-9]).{6,}$/;
    return re.test(password);
  };

  handleInput = ({ target }) => {
    let { name, value } = target;
    let errors = this.state.errors;
    switch (name) {
      case 'email':
        errors.email = this.validateEmail(value) ? '' : 'Email is not valid!';
        break;
      case 'password':
        errors.password = this.validatePassword(value)
          ? 'Password must contain numbers , alphabets and more than six letters'
          : '';
        break;
      case 'confirmPassword':
        errors.confirmPassword =
          value.length < 1 ? 'ReEnter password is required' : '';
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
    alert(this.state.email + this.state.password);
  };
  render() {
    let { email, password, username, confirmPassword } = this.state.errors;
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
              <span>{username}</span>
              <input
                value={this.state.email}
                onChange={this.handleInput}
                type='text'
                id='email'
                class='block border border-grey-light w-full p-3 rounded mb-4'
                name='email'
                placeholder='Email'
              />
              <span>{email}</span>
              <input
                value={this.state.password}
                onChange={this.handleInput}
                type='password'
                id='password'
                name='password'
                class='block border border-grey-light w-full p-3 rounded mb-4'
                placeholder='Password'
              />
              <span>{password}</span>
              <input
                value={this.state.confirmPassword}
                onChange={this.handleInput}
                type='password'
                id='confirmPassword'
                name='confirmPassword'
                class='block border border-grey-light w-full p-3 rounded mb-4'
                placeholder='Confirm Password'
              />
              <span>{confirmPassword}</span>
              <button
                type='submit'
                onClick={this.handleSubmit}
                class='w-full text-center py-3 rounded bg-blue-200 text-black hover:bg-blue-400 focus:outline-none my-1'
              >
                Create Account
              </button>
              <div class='text-center text-sm text-grey-dark mt-4'>
                By signing up, you agree to the
                <a
                  class='no-underline border-b border-grey-dark text-grey-dark'
                  href='#'
                >
                  Terms of Service
                </a>{' '}
                and
                <a
                  class='no-underline border-b border-grey-dark text-grey-dark'
                  href='#'
                >
                  Privacy Policy
                </a>
              </div>
            </div>

            <div class='text-grey-dark mt-6'>
              Already have an account?
              <a
                class='no-underline border-b border-blue text-blue'
                href='../login/'
              >
                Log in
              </a>
              .
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Signup;
