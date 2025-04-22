import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Donor from "../assets/Donor.jpg";

function Donatenow({ setDonorList }) {
  const [FullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [healthyStatus, setHealthyStatus] = useState("");
  const [IsLoading,setIsLoading]=useState(false)

  const navigate = useNavigate();

  const handleSaveDate = (e) => {
    e.preventDefault();
    const newDonor = {
      FullName,
      address,
      email,
      phone,
      gender,
      age,
      bloodType,
      healthyStatus,
    };
    
    axios
      .post("http://localhost:9000/create/donor", newDonor)
      .then((response) => {
        alert("Registration Successful! We will contact you soon.");
        setDonorList((prevList) => [...prevList, response.data]); // Add new donor from response
        // After successfully updating the donor list, navigate to dashboard.
        setTimeout(() => {
          navigate("/dashboard");
        }, 500);
      })
      .catch((error) => console.log(error));
  };

  const isPhoneValid = /^\d{10}$/.test(phone);
  const isAgeValid = age >= 1 && age <= 100;
  const isFullNameValid = /^[A-Za-z\s]+$/.test(FullName);

  const handleSubmit =(event)=>{
    event.preventDefault();
    setIsLoading(true);
    setError(null)
    
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-red-900 p-6 mt-24">
      <div className="bg-gradient-to-b from-red-200 p-8 rounded-lg shadow-lg w-full max-w-4xl flex">
        <div className="hidden md:flex flex-1 justify-center items-center ">
          <img src={Donor} alt="Donor" className="w-96 h-96 rounded-lg shadow-lg mr-5" />
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-red-900 text-center mb-6">Donor Registration</h2>
          <form onSubmit={handleSaveDate} className="space-y-4">
            <div className="flex flex-col">
              <label className="text-lg font-semibold text-black">Full Name</label>
              <input type="text" value={FullName} onChange={(e) => setFullName(e.target.value)} required placeholder="Enter Your Name" className="w-full p-3 border border-gray-300 rounded-lg" />
              {!isFullNameValid && <p className="text-red-500">Please use letters only.</p>}
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-semibold text-black">Address</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required placeholder="Enter Your Address" className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-semibold text-black">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Enter Your Email" className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-semibold text-black">Phone</label>
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="Enter Your Phone" className="w-full p-3 border border-gray-300 rounded-lg" />
              {!isPhoneValid && <p className="text-red-500">Phone must be 10 digits.</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-lg font-semibold text-black">Gender</label>
                <select value={gender} onChange={(e) => setGender(e.target.value)} required className="w-full p-3 border border-gray-300 rounded-lg">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-lg font-semibold text-black">Age</label>
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required placeholder="Enter Your Age" className="w-full p-3 border border-gray-300 rounded-lg" />
                {(age && !isAgeValid) && <p className="text-red-500">Age must be between 1 and 100.</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-lg font-semibold text-black">Blood Type</label>
                <select value={bloodType} onChange={(e) => setBloodType(e.target.value)} required className="w-full p-3 border border-gray-300 rounded-lg">
                  <option value="">Select Blood Type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-lg font-semibold text-black">Healthy Status</label>
                <select value={healthyStatus} onChange={(e) => setHealthyStatus(e.target.value)} required className="w-full p-3 border border-gray-300 rounded-lg">
                  <option value="">Are you healthy to donate?</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
            <button onSubmit={handleSubmit} type="submit" disabled={healthyStatus === "No" || !isFullNameValid || !isPhoneValid || !isAgeValid} className={`w-56 ${healthyStatus === "No" || !isFullNameValid || !isPhoneValid || !isAgeValid ? "bg-gray-400 cursor-not-allowed" : "bg-white"} text-red-900 font-semibold py-3 rounded-lg hover:bg-red-900 transition ml-24 mt-5`}>
              Register Here
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Donatenow;
