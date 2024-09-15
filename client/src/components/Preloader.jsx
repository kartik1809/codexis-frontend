import React from 'react';
import './Preloader.css';

const Preloader = () => {
  return (
    <div className='bg-gray-950 absolute flex items-center justify-center z-50 left-0 h-full w-full'>
      <div className='flex flex-col gap-4'>
        <img src="/logo.png" alt="Loading..." className='w-24 h-24 animate-spin' />
        <h1 className='text-4xl font-bold font-bangers text-gray-200 text-center pulse-fade-animation'>
          Codexis
        </h1>
      </div>
    </div>
  );
};

export default Preloader;
