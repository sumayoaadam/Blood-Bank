import { useState} from "react";
import { Link } from "react-router-dom";


function Dashboard() {
  const [bloodData, setBloodData] = useState([]);
  const [stats, setStats] = useState({ totalDonors: 0, totalRequests: 0, approvedRequests: 0, totalBlood: 0 });

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="h-screen w-[20%] fixed bg-gray-800 text-white p-5  ">
        <h2 className="text-3xl font-bold text-red-900"> <i className="fa-solid fa-droplet text-3xl mr-3 mt-2"></i>Blood Bank</h2>
        <ul className="space-y-4 mt-10">
        <li><Link to="/Boxes" className="hover:text-red-400 flex items-center gap-2 font-semibold py-4 text-2xl"><i className="fa-brands fa-microsoft text-red-900"></i> Dasboard</Link></li>
          <li><Link to="/" className="hover:text-red-400 flex items-center gap-2 font-semibold py-4 text-2xl"><i className="fa-solid fa-house text-red-900"></i> Home</Link></li>
          <li><Link to="/DonorTable" className="hover:text-red-400 flex items-center gap-2 font-semibold py-4 text-2xl"><i className="fa-solid fa-user text-red-900"></i> Donors</Link></li>
          <li><Link to="/Donation" className="hover:text-red-400 flex items-center gap-2 font-semibold py-4 text-2xl"><i className="fa-solid fa-hand-holding-droplet text-red-900"></i> Donation</Link></li>
          <li><Link to="/users" className="hover:text-red-400 flex items-center gap-2 font-semibold py-4 text-2xl"><i className="fa-solid fa-user text-red-900"></i>  Users</Link></li>


         

        </ul>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-6 mt-5  from-red-200 to-gray-100">
        
        
        
        {/* Blood Stock */}
        <div className="grid grid-cols-4 gap-6 mt-6">
          {bloodData.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md text-center ">
              <h3 className="text-2xl font-bold flex justify-center items-center gap-2 text-red-900">
                {item.type} <span>🩸</span>
              </h3>
              <p className="text-gray-700 text-lg">{item.count}</p>
            </div>
          ))}
        </div>



      </main>
    </div>
  );
}

export default Dashboard;