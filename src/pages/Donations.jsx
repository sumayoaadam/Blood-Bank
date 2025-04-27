import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import supabase from "../lib/supabase";

function Donation() {
  const [donors, setDonors] = useState([]);
  const [selectedBloodType, setSelectedBloodType] = useState("A+");

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const { data, error } = await supabase
          .from("donors")
          .select("*")
          .eq("blood_type", selectedBloodType);

        if (error) {
          console.error("Error fetching donors:", error.message);
        } else {
          setDonors(data);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    fetchDonors();
  }, [selectedBloodType]); 

  const bloodTypes = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

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

        <div>
          {donors.length === 0 ? (
            <p className="text-center text-xl text-gray-600">
              No donors available for the selected blood type.
            </p>
          ) : (
            <div className="space-y-8">
              <h3 className="text-2xl font-semibold text-red-900 text-center">
                {selectedBloodType} Donors
              </h3>
              <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-red-900 text-white">
                  <th className="px-6 py-3 text-left">Full Name</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Phone</th>
                  <th className="px-6 py-3 text-left">Address</th>
                  <th className="px-6 py-3 text-left">Action</th>

                  
                </tr>
              </thead>
              <tbody>
              {donors.map((donor, index) => (
                <tr key={donor._id || index} className="border-b hover:bg-gray-100">
                    <td className="px-6 py-3">{donor.full_name}</td>
                    <td className="px-6 py-3">{donor.email}</td>
                    <td className="px-6 py-3">{donor.phone}</td>
                    <td className="px-6 py-3">{donor.address}</td>

                    <td className="px-6 py-3 flex gap-4">
                      <i
                        className="fa-solid fa-pen-to-square text-yellow-500 cursor-pointer"
                        onClick={() => handleUpdate(donor)}
                      />
                      <i
                        className="fa-solid fa-trash text-red-500 cursor-pointer"
                        onClick={() => handleDelete(donor._id)}
                      />
                      <button
                        className="text-black font-semibold"
                        onClick={() => {
                          setSelectedDonor(donor);
                          setShowEmailModal(true);
                        }}
                      >
                        Send Email
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Donation;
