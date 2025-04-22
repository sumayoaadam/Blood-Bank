import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home"
import About from "./pages/About"
import Blog from "./pages/Blog";
import Services from "./components/Services"
import Login from "./pages/Login"
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Boxes from "./pages/Boxes";
import DonorTable from "./pages/DonorTable";
import Donation from "./pages/Donations";
import Donatenow from "./pages/Donatenow";
import DonorManager from "./components/DonorManager";
import { AuthProvider } from "./context/AuthContext";
import UnAuthenticatedRoute from "./components/UnAuthenticatedRoute";



function App(){
  return(
   <AuthProvider>
        <Router>
          <Routes>
                {/* Layout-ka guud ee leh Header & Footer */}
                <Route element={<MainLayout />}>
                    <Route path="/"  element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/service" element={<Services />} />
                    <Route path="/donatenow" element={<Donatenow />} />
                    <Route path="/donorManager" element={<DonorManager />} />


                  


                </Route>
                <Route>
                    <Route path="/login" 
                    element={
                      <UnAuthenticatedRoute>
                          <Login />
                      </UnAuthenticatedRoute>} />

                    <Route path="/register" element={
                      <UnAuthenticatedRoute>
                          <Register />
                      </UnAuthenticatedRoute>} />
                      
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/boxes"  element={<Boxes />} />
                    <Route path="/donorTable" element={<DonorTable />} />
                    <Route path="/donation" element={<Donation />} />



                </Route>

          </Routes>
        </Router>  
    </AuthProvider>
   
    
    
  )
}
export default App;