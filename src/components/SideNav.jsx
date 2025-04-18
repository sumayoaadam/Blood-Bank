import { NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
import Dashboard from "../pages/Dashboard"



function SideNav() {

    const [isAdmin, setIsAdmin] = useState("admin")

    const userName = localStorage.getItem("user")

    useEffect(() => {
        if(JSON.parse(userName).role === "user"){
            setIsAdmin("user")
        }
    }, [])

    return <div className="flex">
        <Dashboard/>

        <div className="text-2xl flex flex-col space-y-10 pl-10 pt-16 text-primeryColor">


            <NavLink style={{display: isAdmin === "user" ? "none" : ""}} to="/donors"> <i class="fa-solid fa-hand-holding-droplet"></i> Donors</NavLink>




            <NavLink style={{display: isAdmin === "user" ? "none" : ""}} to="/users"> <i class="fa-solid fa-users"></i> Users</NavLink>
            

        </div>
        



    </div >
}

export default SideNav