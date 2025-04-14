import { motion } from "framer-motion";
import blog1 from "../assets/blog1.jpeg";
import blog2 from "../assets/blog2.jpeg";
import blog3 from "../assets/blog3.jpeg";

function Blog() {
  return (
    <div className="bg-white md:px-20 text-gray-800 mt-16">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2 
          className="text-6xl font-semi-bold text-red-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Blood Bank Blog
        </motion.h2>
        <motion.p 
          className="text-lg text-gray-700 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Stay updated with the latest news, inspiring stories, and critical insights about blood donation and its life-saving impact.
        </motion.p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
        {blogPosts.map((post, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition duration-500 overflow-hidden transform hover:-translate-y-2"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <motion.img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-60 object-cover rounded-lg mb-4 transition-transform transform hover:scale-105"
              whileHover={{ scale: 1.1 }}
            />
            <h3 className="text-3xl font-bold text-gray-900 mb-3">{post.title}</h3>
            <p className="text-gray-700 leading-relaxed">{post.description}</p>
            <motion.button 
              className="mt-6 px-6 py-3 bg-red-900 text-white text-lg font-semibold rounded-lg hover:bg-red-700 transition duration-300 shadow-md hover:shadow-xl"
              whileHover={{ scale: 1.1 }}
            >
              Read More
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const blogPosts = [
  {
    title: "The Importance of Blood Donation",
    description: "Discover why donating blood is essential and how it can save lives in emergency situations.",
    image: blog1,
  },
  {
    title: "How to Prepare for Blood Donation",
    description: "Learn about the steps to take before donating blood to ensure a smooth and healthy experience.",
    image: blog2,
  },
  {
    title: "Real Stories: Lives Saved by Blood Donors",
    description: "Read inspiring stories of individuals who survived because of generous blood donors.",
    image: blog3,
  },
];

export default Blog;