import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bgImg from "../assets/bgImg.png";
import {signUp} from "../lib/auth"



function Register() {
    const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (event) => {

    event.preventDefault();

    setIsLoading(true);
    setError(null)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        console.error("Email-ka ma ahan mid sax ah");
        setIsLoading(false);
        return
    }

    if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        setIsLoading(false);
        return;
      }
      if (password !== confirmPassword) {
        setError("Password do not match");
        setIsLoading(false);
        return;
      }
      try {

        console.log("Email being submitted:", email.trim());
        await signUp(email.trim(), password, username.trim())
  
        setSuccess(true);
  
        setTimeout(() => {
          navigate('/Login')
        }, 3000)
  
      } catch (error) {
        console.error(error)
        setError(error.message || "Failed to create account. Please try again")
      } finally {
        setIsLoading(false)
      }
  
  
  
  
    }
  
    if (success) {
  
  
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full text-center">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="text-green-500 text-5xl mb-4">✓</div>
              <h2 className="text-2xl font-bold mb-2">Account Created!</h2>
              <p className="text-gray-600 mb-4">
                Your account has been created successfully. Please check your email for verification.
              </p>
              <p className="text-gray-500 text-sm">
                Redirecting to sign in page in a few seconds...
              </p>
            </div>
          </div>
        </div>
      )
    }
  
    

    return <div className="w-full h-screen bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: `url(${bgImg})`}}>
        
        
       <div className="bg-white bg-opacity-123 px-23 py-3 rounded-xl shadow-2xl">
    
        <h1 className="text-4xl text-textColor font-semibold text-center">Register</h1>
        {
            error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )
          }

        <form onSubmit={handleSubmit} className="pt-10">
            <div>
            <label className="text-2xl text-textColor">User Name</label> <br />
            <input value={username} onChange={(e) => setUsername(e.target.value)} required className="w-60 h-10 rounded-xl outline-none p-2 mt-2 mb-6 bg-gray-300" type="text" placeholder="Enter Your User Name" /> 
            </div>

            <div className="">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
            <label className="text-2xl text-textColor">Password</label> <br />
            <input value={password} onChange={(e) => setPassword(e.target.value)} className="w-60 h-10 rounded-xl outline-none p-2 mt-2 mb-8 bg-gray-300" type="password" placeholder="Enter Your Password" />            
            </div>

            <div>
            <label className="text-2xl text-textColor">confirm Password</label> <br />
            <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required minLength={6} className="w-60 h-10 rounded-xl outline-none p-2 mt-2 mb-8 bg-gray-300" type="password" placeholder="Enter Your Password" /> 
            </div>
        
            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition duration-200 disabled:cursor-not-allowed disabled:bg-orange-500"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}

            </button>
        </form>
        <p className="text-textColor pt-2">Already have an account? <Link to="/login" className="text-primeryColor text-xl">Login</Link></p>
        

    </div>

    <ToastContainer />

</div>
}

export default Register