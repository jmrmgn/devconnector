import React from 'react';

const Footer = () => {
   return (
      <footer className="bg-dark text-white mt-5 p4 text-center">
         Copyright &copy; {new Date().getFullYear} Devconnector
      </footer>
   );
};

export default Footer;