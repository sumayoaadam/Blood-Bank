import { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import supabase from "../lib/supabase";

const Boxes = () => {
  const [donorCount, setDonorCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: donorData, error: donorError }, { data: userData, error: userError }] = await Promise.all([
          supabase.from("donors").select("*"),
          supabase.from("users").select("*"),
        ]);

        if (donorError) throw donorError;
        if (userError) throw userError;

        setDonorCount(donorData.length);
        setUserCount(userData.length);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setTotal(donorCount + userCount);
  }, [donorCount, userCount]);

  const getPercentage = (count) => {
    return total > 0 ? ((count / total) * 100).toFixed(1) : 0;
  };

  return (
    <div className="flex">
      <Dashboard />
      <div className="p-6 ml-64 w-full">
        
        {/* Sanduuqa tirada */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {[{ label: "Donors", count: donorCount, bg: "bg-red-600" }, 
            { label: "Users", count: userCount, bg: "bg-blue-600" } 

          ].map((item, index) => (
              <div key={index} className={`flex flex-col items-center ${item.bg} shadow-lg rounded-lg p-6`}>
                <h2 className="text-xl font-bold text-white">{item.label}</h2>
                <p className="text-3xl font-semibold text-white">{item.count}</p>
              </div>
          ))}
        </div>

        {/* Qaybta boqolkiiba  */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20 mr-16">
          {[{ label: "Donors", count: donorCount, trailColor: "#ef0202" }, 
            { label: "Users", count: userCount, trailColor: "#062df0" } 

          ].map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <h3 className="text-xl font-semibold text-gray-700">{item.label}</h3>
                <div className="mt-4 w-24 h-24">
                  <CircularProgressbar
                    value={getPercentage(item.count)} 
                    styles={buildStyles({
                      pathColor: "#000", 
                      trailColor: item.trailColor, 
                      strokeLinecap: "round",
                    })}
                  />
                </div>
                <div className="mt-2 text-lg font-medium text-gray-700">
                  {getPercentage(item.count)}%
                </div>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Boxes;
