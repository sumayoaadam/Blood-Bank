import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import bgImg from "../assets/bgImg.png";
import whoWeAreImage from "../assets/whoWeAreImage.png";
import image1 from "../assets/image1.jpg"
import image2 from "../assets/image2.jpeg";
import image3 from "../assets/image3.jpeg";

const Home = () => {
  return (
    <div className="relative w-full h-screen flex items-center justify-start overflow-hidden rounded-lg ml-2 mr-2">
      {/* Background Image with Animation */}
      <motion.div
        className="absolute inset-0 w-full h-full bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImg})` }}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.5 }}
      ></motion.div>

      {/* Gradient Background */}
      <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-red-600 to-transparent"></div>

      {/* Content */}
      <motion.div 
        className="relative z-10 max-w-lg p-10 text-white"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5 }}
      >
        <h1 className="text-5xl font-bold">
          Save a Life. <br /> Donate Blood
        </h1>
        <p className="text-lg mt-4">
          One pint of blood can save a life. Be a hero and donate today!
        </p>
        <div className="mt-6 flex space-x-4">
          <Link to="/Login">
            <button className="bg-white text-red-900 px-6 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-red-700 transition-all">
              Donate Now
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

const WhoWeAre = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12 md:py-20 max-w-7xl mx-auto mt-32">
      {/* Image Section with Animation */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="w-full md:w-1/2 flex justify-center"
      >
        <img src={whoWeAreImage} alt="Doctor with Child" className="rounded-lg w-full max-w-sm md:max-w-md lg:max-w-lg" />
      </motion.div>
      
      {/* Text Section with Animation */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="w-full md:w-1/2 text-center md:text-left mt-8 md:mt-0 px-4"
      >
        <p className="text-red-600 text-sm md:text-base font-bold uppercase">Make An Impact</p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-2">Who We Are</h2>
        <p className="text-gray-600 mt-4 text-sm md:text-base lg:text-lg">
          Your financial gift can <span className="text-red-500 font-semibold">we can help those who rely on the generosity of others to survive.</span> At Blood Bank, our mission is to save lives by ensuring access to safe and sufficient blood for patients in need. We believe that every donation counts and can make a significant impact on someone's life.
Our dedicated team works tirelessly to promote blood donation awareness and organize community drives. We strive to create a supportive environment for donors, recognizing their vital role in our mission.
        </p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="mt-6 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-600 text-sm md:text-base"
        >
        </motion.button>
      </motion.div>
    </section>
  );
};

const WaysToHelp = () => {
  const [imageOpacity, setImageOpacity] = useState([0, 0, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageOpacity((prevOpacity) => {
        const newOpacity = prevOpacity.map((opacity) => {
          if (opacity >= 1) return 1;
          return opacity + 0.01; // animation speed
        });
        return newOpacity;
      });
    }, 20); // animation speed

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="container mx-auto py-12 mt-20">
      <h2 className="text-3xl font-bold text-center mb-8">Ways to Help</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {['Donate Blood', 'Volunteer Team', 'Donate Money'].map((title, index) => (
          <div
            key={title}
            className="bg-gray-100 rounded-lg shadow-md p-6 relative overflow-hidden"
          >
            <img
              src={index === 0 ? image1 : index === 1 ? image2 : image3}
              alt={title}
              style={{ opacity: imageOpacity[index], transition: 'opacity 0.5s ease-in-out' }}
              className="w-full"
            />
            <div className="absolute bottom-0 bg-white p-4 text-center w-full">
              <h3 className="text-xl font-bold mb-2">{title}</h3>
              <p className="text-gray-600 text-sm">{title === 'Donate Blood' ? 'Donate blood today. Help save lives.' : title === 'Volunteer Team' ? 'We are always looking for your help.' : 'Your financial gift can help people who need it most.'}</p>
              <button className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                {title === 'Donate Blood' ? 'Learn more' : title === 'Volunteer Team' ? 'Become a Volunteer' : 'Donate now'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const HomePage = () => {
  return (
    <div>
      <Home />
      <WhoWeAre />
      <WaysToHelp />
      
    </div>
  );
};

export default HomePage;