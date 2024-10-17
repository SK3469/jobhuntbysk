import React from 'react';
import { Linkedin, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className=" bg-violet-800 text-white text-center py-4 fixed bottom-0 w-full flex justify-between items-center px-4">
      <div className='w-full'>
        <p className="text-lg font-bold">
          © 2024 Job Hunt <span className="text-sm pl-5 text-center font-thin">| Powered by SBK IT Solutions Ltd. | All Rights Reserved</span>
        </p>
      </div>
      <div className="flex space-x-4">
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
          <Linkedin className="w-6 h-6 text-white hover:text-gray-300" />
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <Facebook className="w-6 h-6 text-white hover:text-gray-300" />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <Twitter className="w-6 h-6 text-white hover:text-gray-300" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
