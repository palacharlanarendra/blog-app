/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header class='bg-blue-200 dark:bg-gray-800 fixed header'>
      <nav class='border-b dark:border-gray-700'>
        <div class='container px-6 py-4 mx-auto lg:flex lg:justify-between lg:items-center'>
          <div class='flex items-center justify-between'>
            <div>
              <a class='text-2xl font-bold text-gray-800 dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300'>
                <strong className='header__icon'>
                  <img src='./images/medium.svg' alt='medium logo' />
                </strong>
              </a>
            </div>

            {/* <!-- Mobile menu button --> */}
            <div class='lg:hidden'>
              <button
                type='button'
                class='text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400'
                aria-label='Toggle menu'
              >
                <svg viewBox='0 0 24 24' class='w-6 h-6 fill-current'>
                  <path d='M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z'></path>
                </svg>
              </button>
            </div>
          </div>

          {/* <!-- Mobile Menu open: "block", Menu closed: "hidden" --> */}
          <div class='items-center lg:flex'>
            <div class='flex flex-col mt-4 space-y-8 lg:flex-row lg:items-center lg:mt-0 lg:space-y-0 lg:space-x-16'>
              <button className='block font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-400 hover:underline'>
                Our story
              </button>
              <button className='block font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-400 hover:underline'>
                Membership
              </button>
              <button className='block font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-400 hover:underline'>
                Write
              </button>
              <NavLink
                activeclassName='active'
                to='/signin'
                className='block font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-400 hover:underline'
              >
                Signin
              </NavLink>

              <NavLink
                to='/signup'
                className='flex items-center px-5 py-2 text-sm font-medium tracking-wide text-center text-white capitalize transition-colors duration-200 transform bg-gray-700 rounded-lg hover:bg-gray-600 focus:outline-none focus:bg-gray-600'
              >
                Get started
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
