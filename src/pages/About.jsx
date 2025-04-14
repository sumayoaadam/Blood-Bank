import aboutImg from "../assets/aboutImg.jpeg"
import { motion } from "framer-motion";

function About() {
  return (
    <div className=" py-16 px-6 md:px-20 ml-11 mr-9 mt-40 rounded-lg">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
        {/* Left Section - Image */}
        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img src={aboutImg} alt="About Blood Bank" className="w-[600px] rounded-lg shadow-lg" />
        </motion.div>

        {/* Right Section - Text */}
        <motion.div
          className="w-full md:w-1/2 mt-8 md:mt-0 md:pl-12"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-red-900 mb-6">About Our Blood Bank</h2>
          <p className="text-lg leading-relaxed text-gray-700">
            Our blood bank is dedicated to providing life-saving blood donations to those in need.
            We ensure that every unit of blood is safely collected, tested, and stored for emergency use.
          </p>
          <p className="text-lg leading-relaxed text-gray-700 mt-4">
            Our mission is to make blood donation easy, accessible, and reliable for everyone. 
            Join us today and become a part of this life-saving journey.
          </p>
          <button className="mt-6 px-6 py-3 bg-red-900 text-white text-xl font-semibold rounded-lg shadow-md hover:bg-red-700 transition">
            Learn More
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default About;