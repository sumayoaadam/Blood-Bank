import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import bgImg from "../assets/bgImg.png";
import { signIn } from '../lib/auth'
// import { useAuth } from '../context/AuthContext'



function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassowrd] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)


  const navigate = useNavigate()

  const handleSubmit = async (event) => {

    event.preventDefault();

    setIsLoading(true)
    setError(null)
    console.log("Login attempt with:", email, password);

    try {

      await signIn(email, password);

      navigate('/Dashboard')

    } catch (error) {
      setError(error.message || "Failed to sign in . Please check your credentials.")
      console.log("error", error)
    } finally {
      setIsLoading(false)
    }
  }

    return (
        <div className="w-full h-screen bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: `url(${bgImg})`}}>
            <div className="bg-white bg-opacity-90 px-20 py-10 rounded-xl shadow-2xl">
                <h1 className="text-4xl font-semibold text-center text-black">Login</h1>
                <div className="bg-white rounded-lg shadow-md p-8">


{error && (
  <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
    {error}
  </div>
)}

                <form  className="pt-10" onSubmit={handleSubmit}>
                    <label className="text-2xl text-black">Email</label> <br />
                    <input value={email} onChange={(e) => setEmail(e.target.value)} required className="w-60 h-10 rounded-xl outline-none p-2 mt-2 mb-6 bg-gray-200" type="text" placeholder="Enter Your Email" /> <br />
                    <label className="text-2xl text-black">Password</label> <br />
                    <input value={password} onChange={(e) => setPassowrd(e.target.value)} required className="w-60 h-10 rounded-xl outline-none p-2 mt-2 mb-8 bg-gray-200" type="password" placeholder="Enter Your Password" /> <br />
                    <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition duration-200 disabled:cursor-not-allowed disabled:bg-orange-700"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sing In'}

            </button>

                </form>
                </div>
                <p className="text-black pt-2">Don't have an account yet? <Link to="/register" className="text-red-600 text-xl">Register</Link></p>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Login;