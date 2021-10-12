import React from 'react';
import { UPDATE_PROFILE } from '../utils/constant';
import { withRouter } from 'react-router';
class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      username: '',
      bio: '',
      email: '',
      password: '',
      errors: {
        image: '',
        username: '',
        bio: '',
        email: '',
        password: '',
      },
    };
  }
  validateField = (Field) => {
    let FieldError;
    if (Field.length < 1) {
      FieldError = "This field can't be empty";
    }
    return FieldError;
  };
  validateBio = (bio) => {
    let bioError;
    if (bio.length < 5) {
      bioError = "This field can't be less than 2 words";
    }

    return bioError;
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
      case 'image':
        errors.image = this.validateField(value);
        break;
      case 'username':
        errors.name = this.validateField(value);
        break;
      case 'bio':
        errors.bio = this.validateBio(value);
        break;
      case 'email':
        errors.email = this.validateField(value);
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
    const { image, username, bio, email, password } = this.state;
    // Default options are marked with *
    let storageKey = localStorage['app__user'];
    fetch(UPDATE_PROFILE, {
      method: 'PUT',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Token ${storageKey}`,
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        user: {
          image,
          username,
          bio,
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
        this.setState({
          image: '',
          username: '',
          bio: '',
          email: '',
          password: '',
        });
        this.props.history.push(`/`);
      })
      .catch((errors) => {
        this.setState({ errors });
      });
  };
  componentDidMount = () => {
    this.setState({
      username: this.props.user.username,
      email: this.props.user.email,
      image: this.props.user.image,
      bio: this.props.user.bio,
      password: this.props.user.password,
    });
  };
  render() {
    let { image, username, bio, email, password } = this.state.errors;

    return (
      <>
        <div class='bg-grey-lighter min-h-screen flex flex-col'>
          <div class='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
            <div class='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
              <h1 class='mb-8 text-3xl text-center'>Update Settings</h1>
              <input
                value={this.state.image}
                onChange={this.handleInput}
                type='text'
                class='block border border-grey-light w-full p-3 rounded mb-4'
                id='image'
                name='image'
                placeholder='image'
              />
              <span>{image}</span>
              <input
                value={this.state.bio}
                onChange={this.handleInput}
                type='text'
                id='bio'
                class='block border border-grey-light w-full p-3 rounded mb-4'
                name='bio'
                placeholder='bio'
              />
              <span>{bio}</span>
              <input
                value={this.state.username}
                onChange={this.handleInput}
                type='text'
                id='name'
                class='block border border-grey-light w-full p-3 rounded mb-4'
                name='username'
                placeholder='name'
              />
              <span>{username}</span>
              <input
                value={this.state.email}
                onChange={this.handleInput}
                type='text'
                id='email'
                name='email'
                class='block border border-grey-light w-full p-3 rounded mb-4'
                placeholder='email'
              />
              <span>{email}</span>
              <input
                value={this.state.password}
                onChange={this.handleInput}
                type='password'
                id='password'
                name='password'
                class='block border border-grey-light w-full p-3 rounded mb-4'
                placeholder='new password'
              />
              <span>{password}</span>
              <button
                type='submit'
                onClick={this.handleSubmit}
                class='w-full text-center py-3 rounded bg-blue-200 text-black hover:bg-blue-400 focus:outline-none my-1'
                disabled={image || username || bio || email || password}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default withRouter(Settings);
