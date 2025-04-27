import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Ku dar import ka Link

const Footer = () => {
  return (
    <footer className="bg-red-900 text-white px-24 py-10 md:px mt-20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left Section */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 1 }}
        >
          <div className="flex">
            <i className="fa-solid fa-droplet text-white text-2xl ml-2 mt-9 mr-2"></i>
            <h2 className="text-xl font-bold text-white mt-10">Blood Bank</h2>
          </div>
          <p className="mt-3 text-gray-400">
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
          </p>
          <p className="text-gray-300 mt-5">© 2025 Blood Bank. All rights reserved.</p>
        </motion.div>

        {/* Information Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
        >
          <h3 className="text-lg font-semibold text-white mt-10 ml-4">Information</h3>
          <ul>
            <Link to="/" className="text-white text-2xl mb-2 ml-11 hover:text-red-300 cursor-pointer ">
              <li>Home</li>
            </Link>
            <Link to="/about" className="text-white text-2xl pb-2 hover:text-red-300 cursor-pointer">
              <li>About</li>
            </Link>
            <Link to="/blog" className="text-white text-2xl pb-2 hover:text-red-300 cursor-pointer">
              <li>Blog</li>
            </Link>
            <Link to="/services" className="text-white text-2xl pb-2 hover:text-red-300 cursor-pointer">
              <li>Services</li>
            </Link>
          </ul>
        </motion.div>

        {/* Contact Us Section */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 1 }}
        >
          <h3 className="text-lg font-semibold text-white mt-10">Contact Us</h3>
          <p className="text-gray-400 mt-3">Washington, USA 6036 Richmond, Hwy, Alexandria, VA, 2233</p>
          <p className="text-gray-400 mt-2">Phone: 616865625</p>
          <p className="text-gray-400 mt-2">Email: sumayoaadam36@gmail.com</p>

          <div className="flex space-x-4 mt-5">
            <a href="#" className="text-gray-400 hover:text-white text-xl"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#" className="text-gray-400 hover:text-white text-xl"><i className="fa-brands fa-twitter"></i></a>
            <a href="#" className="text-gray-400 hover:text-white text-xl"><i className="fa-brands fa-google"></i></a>
            <a href="#" className="text-gray-400 hover:text-white text-xl"><i className="fa-brands fa-linkedin-in"></i></a>
            <a href="#" className="text-gray-400 hover:text-white text-xl"><i className="fa-brands fa-instagram"></i></a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;