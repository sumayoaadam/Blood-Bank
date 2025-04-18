import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import bgImg from "../assets/bgImg.png";

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassowrd] = useState("")
    const navigate = useNavigate()

    const handleLoginUser = (e) => {
        e.preventDefault()
        axios.post("http://localhost:9000/login/user", {
            "email": email,
            "password": password
        }).then((res) => {
            if(res.data.error){
                toast(Incorrect `email or password`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                })
            }
            else if(res.data.isApproved === false){
                toast(this `user is not Accepted`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                })
            }
            else{
                toast(`Successfully logged in`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    onClose: () => navigate("/dashboard")
                })
                localStorage.setItem("user", JSON.stringify(res.data))
            }
        }).catch((error) => console.log(error))
    }

    return (
        <div className="w-full h-screen bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: `url(${bgImg})`}}>
            <div className="bg-white bg-opacity-90 px-20 py-10 rounded-xl shadow-2xl">
                <h1 className="text-4xl font-semibold text-center text-black">Login</h1>

                <form className="pt-10" onSubmit={handleLoginUser}>
                    <label className="text-2xl text-black">Email</label> <br />
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-60 h-10 rounded-xl outline-none p-2 mt-2 mb-6 bg-gray-200" type="text" placeholder="Enter Your Email" /> <br />
                    <label className="text-2xl text-black">Password</label> <br />
                    <input value={password} onChange={(e) => setPassowrd(e.target.value)} className="w-60 h-10 rounded-xl outline-none p-2 mt-2 mb-8 bg-gray-200" type="password" placeholder="Enter Your Password" /> <br />
                    <Link to="/Dashboard"><button  className="bg-red-600 px-8 py-2 rounded-xl text-white text-2xl ml-14">Login</button></Link>

                </form>
                <p className="text-black pt-2">Don't have an account yet? <Link to="/register" className="text-red-600 text-xl">Register</Link></p>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Login;