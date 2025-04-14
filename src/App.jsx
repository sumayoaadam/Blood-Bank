import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home"
import About from "./pages/About"
import Blog from "./pages/Blog";
import Services from "./components/Services"

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
            </Route>
      </Routes>
    </Router>  
    
  )
}
export default App;