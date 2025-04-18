import { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";
import Boxes from "./Boxes";

function Donation() {
  const [donors, setDonors] = useState([]);
  const [selectedBloodType, setSelectedBloodType] = useState("A+");

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await axios.get("http://localhost:9000/read/donor");
        setDonors(response.data);
      } catch (error) {
        console.log("Error fetching donors:", error);
      }
    };

    fetchDonors();
  }, []);

  const bloodTypes = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  const filteredDonors = donors.filter(
    (donor) => donor.bloodType === selectedBloodType
  );

  const downloadPDF = () => {
    window.location.href = "http://localhost:9000/download-pdf";
  };

  return (
    <div className="flex">
      <Dashboard />

      <div className="flex-1 container ml-60">
        <h2 className="text-4xl font-bold text-center mb-6 text-red-900">
          Donations and Blood Types
        </h2>

        <div className="mb-8 text-center">
          <label className="text-lg font-semibold text-black">
            Select Blood Type:
          </label>
          <select
            value={selectedBloodType}
            onChange={(e) => setSelectedBloodType(e.target.value)}
            className="px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-200"
          >
            {bloodTypes.map((bloodType, index) => (
              <option key={index} value={bloodType}>
                {bloodType}
              </option>
            ))}
          </select>
        </div>

      
        <div className="text-center mb-6">
          <button
            onClick={downloadPDF}
            className="bg-red-900 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-400 transition-all duration-200"
          >
            Download PDF
          </button>
        </div>

        <div>
          {filteredDonors.length === 0 ? (
            <p className="text-center text-xl text-gray-600">
              No donors available for the selected blood type.
            </p>
          ) : (
            <div className="space-y-8">
              <h3 className="text-2xl font-semibold text-red-900 text-center">
                {selectedBloodType} Donors
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDonors.map((donor) => (
                  <div
                    key={donor._id}
                    className="bg-red-900 rounded-lg shadow-lg p-6 mr-10 transform hover:scale-105 transition-all duration-200"
                  >
                    <p className="text-white">{donor.FullName}</p>
                    <p className="text-white">{donor.address}</p>
                    <p className="text-white">{donor.email}</p>
                    <p className="text-white">{donor.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Donation;