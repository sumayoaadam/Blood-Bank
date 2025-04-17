import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home"
import About from "./pages/About"
import Blog from "./pages/Blog";
import Services from "./components/Services"
import Login from "./pages/Login"
import Register from "./pages/Register";


function App(){
  return(
    <Router>
      <Routes>
            {/* Layout-ka guud ee leh Header & Footer */}
            <Route element={<MainLayout />}>
                <Route path="/"  element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/service" element={<Services />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />


            </Route>
      </Routes>
    </Router>  
    
  )
}
export default App;