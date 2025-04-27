import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import supabase from "../lib/supabase";
import emailjs from "emailjs-com";

function DonorTable({ refresh }) {
  const [donors, setDonors] = useState([]);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [healthyStatus, setHealthyStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const { data, error } = await supabase
          .from("donors")
          .select("*");
  
        if (error) {
          console.error("Error fetching donors:", error.message);
          setError("Failed to fetch donors");
        } else {
          console.log("Fetched donors: ", data); 
          setDonors(data);
        }
      } catch (err) {
        setError("Failed to fetch donors");
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchDonors();
  }, [refresh]);
  

  const handleUpdate = (donor) => {
    console.log("Donor Selected:", donor);  
  
    
    setSelectedDonor(donor);
    setFullName(donor.full_name);
    setEmail(donor.email);
    setAddress(donor.address);
    setPhone(donor.phone);
    setGender(donor.gender);
    setAge(donor.age);
    setBloodType(donor.blood_type);
    setHealthyStatus(donor.healthy_status);
  
    
    setShowModal(true);
  };
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    console.log("Current Data:", selectedDonor);
    console.log("Selected Donor:", selectedDonor);
    console.log("Selected Donor ID:", selectedDonor?.id);
    
    const updatedDonor = {
      full_name: fullName,
      email: email,
      address: address,
      phone: phone,
      gender: gender,
      age: age,
      blood_type: bloodType,
      healthy_status: healthyStatus,
    };
  
    const { data, error } = await supabase
      .from("donors")
      .update(updatedDonor)
      .eq("id", selectedDonor.id);
  
    if (error) {
      alert("Failed to update donor.");
      console.error(error);
    } else {
      const { data: updatedDonorData, error: fetchError } = await supabase
        .from("donors")
        .select("*")
        .eq("id", selectedDonor.id)
        .single();
  
      if (fetchError) {
        alert("Failed to fetch updated donor data.");
        console.error(fetchError);
      } else {
        console.log("Updated Donor Data:", updatedDonorData);
        alert("Donor updated successfully!");
        setShowModal(false);
        window.location.reload(); 
      }
    }
  };
  
  
  

  const handleDelete = async (donorId) => {
    const { error } = await supabase
      .from("donors")
      .delete()
      .eq("id", donorId);
  
    if (error) {
      alert("Failed to delete donor.");
      console.error(error);
    } else {
      setDonors(donors.filter((donor) => donor.id !== donorId));
      alert("Donor deleted successfully!");
    }
  };

  const handleEmailSend = async (e) => {
    e.preventDefault();
  
    const templateParams = {
      to_email: selectedDonor.email,
      message: emailMessage,
    };
  
    try {
      const result = await emailjs.send(
        "service_qkany7o",    
        "template_uxmkbif",   
        templateParams,
        "txqZzrM3AjEEbv1PF"    
      );
      alert("Email sent successfully!");
      setShowEmailModal(false);
    } catch (error) {
      console.error(error);
      alert("Failed to send email.");
    }
  };
  const handleEmailModalClose = () => {
    setShowEmailModal(false);
    setEmailMessage("");
  };


  return (
    <div className="flex">
      <Dashboard />
      <div className="container ml-64 mr-10">
        <h2 className="text-3xl font-bold text-center mb-2 text-red-900">List Of Donors</h2>

        {isLoading ? (
          <p className="text-center text-gray-500 my-4">Loading donors...</p>
        ) : error ? (
          <p className="text-center text-red-500 my-4">{error}</p>
          
        ) : (
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
              {donors.map((donor, index) => (
                <tr key={donor._id || index} className="border-b hover:bg-gray-100">
                    <td className="px-6 py-3">{donor.full_name}</td>
                    <td className="px-6 py-3">{donor.email}</td>
                    <td className="px-6 py-3">{donor.phone}</td>
                    <td className="px-6 py-3">{donor.age}</td>
                    <td className="px-6 py-3">{donor.gender}</td>
                    <td className="px-6 py-3">{donor.address}</td>
                    <td className="px-6 py-3">{donor.blood_type}</td>
                    <td className="px-6 py-3">{donor.healthy_status}</td>
                    <td className="px-6 py-3 flex gap-4">
                      <i
                        className="fa-solid fa-pen-to-square text-yellow-500 cursor-pointer"
                        onClick={() => handleUpdate(donor)}
                      />
                      <i
                        className="fa-solid fa-trash text-red-500 cursor-pointer"
                        onClick={() => handleDelete(donor.id)}
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
        )}

        {/* Email Modal */}
        {showEmailModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg">
              <h2 className="text-lg font-bold">Send Email to {selectedDonor?.fullName}</h2>
              <form onSubmit={handleEmailSend}>
                <textarea
                  value={emailMessage}
                  onChange={(e) => setEmailMessage(e.target.value)}
                  required
                  placeholder="Type your message here..."
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                  rows="4"
                />
                <button type="submit" className="bg-red-900 text-white p-2 rounded">
                  Send Email
                </button>
                <button
                  type="button"
                  onClick={handleEmailModalClose}
                  className="bg-gray-500 text-white p-2 rounded ml-2"
                >
                  Cancel
                </button>
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
                {[["Full Name", fullName, setFullName],
                  ["Email", email, setEmail],
                  ["Address", address, setAddress],
                  ["Phone", phone, setPhone],
                  ["Gender", gender, setGender],
                  ["Age", age, setAge],
                  ["Blood Type", bloodType, setBloodType],
                  ["Health Status", healthyStatus, setHealthyStatus]].map(([label, value, setter], i) => (
                    <input
                      key={i}
                      type={label === "Email" ? "email" : label === "Age" ? "number" : "text"}
                      value={value}
                      onChange={(e) => setter(e.target.value)}
                      required
                      placeholder={label}
                      className="w-full p-2 border border-gray-300 rounded mb-2"
                    />
                  ))}
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 text-white p-2 rounded ml-2"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DonorTable;
