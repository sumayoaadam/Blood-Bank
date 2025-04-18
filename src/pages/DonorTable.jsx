import { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";
import Boxes from "./Boxes";

function DonorTable({ refresh }) {
  const [donors, setDonors] = useState([]);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");

  // State for update form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [healthyStatus, setHealthyStatus] = useState("");

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
  }, [refresh]);

  const handleEmailModalClose = () => {
    setShowEmailModal(false);
    setEmailMessage("");
  };

  const handleEmailSend = async (e) => {
    e.preventDefault();
    const emailData = {
      to: selectedDonor.email,
      subject: "Blood Donation Request",
      text: emailMessage,
    };

    try {
      await axios.post(`http://localhost:9000/send-email`, emailData);
      alert("Email sent successfully!");
      handleEmailModalClose();
    } catch (error) {
      console.log("Error sending email:", error);
    }
  };

  const handleUpdate = (donor) => {
    setSelectedDonor(donor);
    setFullName(donor.FullName);
    setEmail(donor.email);
    setAddress(donor.address);
    setPhone(donor.phone);
    setGender(donor.gender);
    setAge(donor.age);
    setBloodType(donor.bloodType);
    setHealthyStatus(donor.healthyStatus);
    setShowModal(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const updatedDonor = {
      FullName: fullName,
      email,
      address,
      phone,
      gender,
      age,
      bloodType,
      healthyStatus,
    };

    try {
      await axios.put(`http://localhost:9000/update/donor/${selectedDonor._id}`, updatedDonor);
      alert("Donor updated successfully!");
      setShowModal(false);
      refresh(); // Refresh the donor list
    } catch (error) {
      console.log("Error updating donor:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this donor?");
    
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:9000/delete/donor/${id}`);
        alert("Donor deleted successfully!");
        refresh(); // Refresh the donor list
      } catch (error) {
        console.log("Error deleting donor:", error);
      }
    }
  };

  return (
    <div className="flex">
      <Dashboard />
      <div className="container ml-64 mr-10">
        <h2 className="text-3xl font-bold text-center mb-2 text-red-900">List Of Donors</h2>
        
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-red-900 text-white">
                <th className="px-6 py-3 text-left">Full Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Phone</th>
                <th className="px-6 py-3 text-left">Age</th>
                <th className="px-6 py-3 text-left">Gender</th>
                <th className="px-6 py-3 text-left">Address</th>
                <th className="px-6 py-3 text-left">Blood Type</th>
                <th className="px-6 py-3 text-left">Health Status</th>
                <th className="px-6 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {donors.map((donor) => (
                <tr key={donor._id} className="border-b hover:bg-gray-100">
                  <td className="px-6 py-3">{donor.FullName}</td>
                  <td className="px-6 py-3">{donor.email}</td>
                  <td className="px-6 py-3">{donor.phone}</td>
                  <td className="px-6 py-3">{donor.age}</td>
                  <td className="px-6 py-3">{donor.gender}</td>
                  <td className="px-6 py-3">{donor.address}</td>
                  <td className="px-6 py-3">{donor.bloodType}</td>
                  <td className="px-6 py-3">{donor.healthyStatus}</td>
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

        {/* Email Modal */}
        {showEmailModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg">
              <h2 className="text-lg font-bold">Send Email to {selectedDonor?.FullName}</h2>
              <form onSubmit={handleEmailSend}>
                <textarea 
                  value={emailMessage}
                  onChange={(e) => setEmailMessage(e.target.value)} 
                  required 
                  placeholder="Type your message here..." 
                  className="w-full p-2 border border-gray-300 rounded mb-2" 
                  rows="4" 
                />
                <button type="submit" className="bg-red-900 text-white p-2 rounded">Send Email</button>
                <button type="button" onClick={handleEmailModalClose} className="bg-gray-500 text-white p-2 rounded ml-2">Cancel</button>
              </form>
            </div>
          </div>
        )}

        {/* Update Donor Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg">
              <h2 className="text-lg font-bold">Update Donor</h2>
              <form onSubmit={handleUpdateSubmit}>
                <input 
                  type="text" 
                  value={fullName} 
                  onChange={(e) => setFullName(e.target.value)} 
                  required 
                  placeholder="Full Name" 
                  className="w-full p-2 border border-gray-300 rounded mb-2" 
                />
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  placeholder="Email" 
                  className="w-full p-2 border border-gray-300 rounded mb-2" 
                />
                <input 
                  type="text" 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)} 
                  required 
                  placeholder="Address" 
                  className="w-full p-2 border border-gray-300 rounded mb-2" 
                />
                <input 
                  type="text" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  required 
                  placeholder="Phone" 
                  className="w-full p-2 border border-gray-300 rounded mb-2" 
                />
                <input 
                  type="text" 
                  value={gender} 
                  onChange={(e) => setGender(e.target.value)} 
                  required 
                  placeholder="Gender" 
                  className="w-full p-2 border border-gray-300 rounded mb-2" 
                />
                <input 
                  type="number" 
                  value={age} 
                  onChange={(e) => setAge(e.target.value)} 
                  required 
                  placeholder="Age" 
                  className="w-full p-2 border border-gray-300 rounded mb-2" 
                />
                <input 
                  type="text" 
                  value={bloodType} 
                  onChange={(e) => setBloodType(e.target.value)} 
                  required 
                  placeholder="Blood Type" 
                  className="w-full p-2 border border-gray-300 rounded mb-2" 
                />
                <input 
                  type="text" 
                  value={healthyStatus} 
                  onChange={(e) => setHealthyStatus(e.target.value)} 
                  required 
                  placeholder="Health Status" 
                  className="w-full p-2 border border-gray-300 rounded mb-2" 
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Update</button>
                <button type="button" onClick={() => setShowModal(false)} className="bg-gray-500 text-white p-2 rounded ml-2">Cancel</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DonorTable;