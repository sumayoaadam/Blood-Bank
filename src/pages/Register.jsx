import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion";
import bgImg from "../assets/bgImg.png";

function Register() {

    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassowrd] = useState("")

    const navigate = useNavigate()

    const handleRegisterUser = (e) => {
        e.preventDefault()
        axios.post("http://localhost:9000/Register/user", {
            "userName": userName,
            "email": email,
            "password": password
        }).then((res) => {
            toast(`User Registered`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                onClose: () => navigate("/login")
            })
        }).catch((error) => console.log(error))
    }

    return <div className="relative w-full h-screen flex items-center justify-start overflow-hidden rounded-lg ml-2 mr-2">
    {/* Background Image with Animation */}
    <motion.div
      className="absolute inset-0 w-full h-full bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImg})` }}
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 100 }}
      transition={{ duration: 1.5 }}
    ></motion.div>

    {/* Gradient Background */}
    <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-red-600 to-transparent  "></div>
    
    {/* Content */}
    <motion.div
    className="relative z-10 max-w-lg p-10 text-white"
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 1.5 }}
  > 
  {/* <div className="pt-16 bg-seconderyColor px-20 shadow-2xl shadow-black"> */}
        <h1 className="text-4xl text-textColor font-semibold text-center">Register</h1>

        <form className="pt-1">
            <label className="text-2xl text-textColor">User Name</label> <br />
            <input value={userName} onChange={(e) => setUserName(e.target.value)} className="w-60 h-10 rounded-xl outline-none p-2 mt-2 mb-6 bg-white text-black" type="text" placeholder="Enter Your User Name" /> <br />
            <label className="text-2xl text-textColor">Email</label> <br />
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-60 h-10 rounded-xl outline-none p-2 mt-2 mb-6 bg-white text-black" type="text" placeholder="Enter Your Email" /> <br />
            <label className="text-2xl text-textColor">Password</label> <br />
            <input value={password} onChange={(e) => setPassowrd(e.target.value)} className="w-60 h-10 rounded-xl outline-none p-2 mt-2 mb-8 bg-white text-black" type="password" placeholder="Enter Your Password" /> <br />
            <button onClick={handleRegisterUser} className="bg-white px-8 py-2 rounded-xl text-black text-2xl ml-14">Register</button>
    
        </form>
        <p className="text-textColor pt-2">Already Register have an account? <Link to="/login" className="text-primeryColor text-xl">Login</Link></p>

    {/* </div> */}

    

    </motion.div>
           



    <ToastContainer/>

    </div>
}

export default Register