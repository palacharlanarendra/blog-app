import React from 'react';
import {NavLink} from 'react-router-dom'

function HeroSection() {
  return (
    <>
      <section className='hero__section bg-blue-200'>
        <div className='container'>
          <div class='container flex flex-col px-6 py-10 mx-auto space-y-6 lg:h-128 lg:py-16 lg:flex-row lg:items-center lg:space-x-6'>
            <div class='w-full lg:w-1/2 hero_content'>
              <div class='lg:max-w-lg'>
                <h1 class='text-2xl font-medium tracking-wide text-gray-800 dark:text-white lg:text-4xl'>
                  Medium is a place to write, read, and connect
                </h1>
                <p class='mt-2 text-gray-600 dark:text-gray-300'>
                  It's easy and free to post your thinking on any topic and
                  connect with millions of readers.
                </p>
                <NavLink to="/newpost">
                  <button class='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-lg shadow'>
                    Start Writing
                  </button>
                </NavLink>
              </div>
            </div>
            <div class='flex items-center justify-center'>
              <img
                class='object-cover w-full h-full max-w-2xl rounded-md'
                src='./images/heroimage.png'
                alt='glasses'
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default HeroSection;
