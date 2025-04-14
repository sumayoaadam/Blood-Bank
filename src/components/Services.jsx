import { motion } from "framer-motion";
import service1 from "../assets/service1.jpeg";
import service2 from "../assets/service2.jpeg";
import service3 from "../assets/service3.jpeg";

function Services() {
  return (
    <div className="bg-white md:px-20 text-gray-800 py-16">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <motion.h1 
          className="text-5xl font-bold text-red-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Blood Bank Services
        </motion.h1>
        <motion.p 
          className="text-lg text-gray-700 mt-4 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Explore the various services we offer to ensure a safe and reliable blood donation process.
        </motion.p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-500 overflow-hidden transform hover:-translate-y-2 flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <motion.img 
              src={service.image} 
              alt={service.title} 
              className="w-full h-60 object-cover rounded-lg mb-6 transition-transform transform hover:scale-105"
              whileHover={{ scale: 1.1 }}
            />
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-700 leading-relaxed mb-4">{service.description}</p>
            </div>
            <motion.button 
              className="mt-auto px-6 py-3 bg-red-900 text-white text-lg font-semibold rounded-lg hover:bg-red-700 transition duration-300 shadow-md hover:shadow-xl"
              whileHover={{ scale: 1.1 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const services = [
  {
    title: "Blood Donation Process",
    description: "A step-by-step guide on how we collect and store blood safely.",
    image: service1,
  },
  {
    title: "Emergency Blood Supply",
    description: "Providing urgent blood supply for hospitals and clinics in critical cases.",
    image: service2,
  },
  {
    title: "Donor Health Check",
    description: "Ensuring all blood donors meet the necessary health standards before donation.",
    image: service3,
  },
];

export default Services;