import { useState } from "react";
import { Link } from "react-router-dom";
// import LoginForm from "../components/LoginForm";
function Header() {
    const [showLogin, setShowLogin] = useState(false);

    const toggleLogin = () => setShowLogin(!showLogin);

    return (
        <div className="flex justify-between px-6 pt-2">
            <div className="flex space-x-5">
                <i className="fa-solid fa-droplet text-red-900 text-2xl ml-2"></i>
                <h1 className="text-red-900 text-2xl font-semibold">Blood Bank</h1>
            </div>

            <ul className="flex space-x-16 text-gray-700 font-semibold text-2xl">
                <li><Link to="/" className="hover:text-red-700">Home</Link></li>
                <li><Link to="/about" className="hover:text-red-700">About</Link></li>
                <li><Link to="/blog" className="hover:text-red-700">Blog</Link></li>
                <li><Link to="/service" className="hover:text-red-700">Service</Link></li>
            </ul>

            <button 
                className="bg-red-900 text-white text-xl font-semibold px-12 py-2 rounded-lg mb-4" onClick={toggleLogin}>Login</button>

            {showLogin && <LoginForm onClose={toggleLogin} />}
        </div>
    );
}

export default Header;