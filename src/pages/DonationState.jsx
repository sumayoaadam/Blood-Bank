import { useEffect, useState } from "react";
import axios from "axios";
// import { Pie } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function DonationStats() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalDonors, setTotalDonors] = useState(0);
  const [totalDonations, setTotalDonations] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await axios.get("http://localhost:9000/read/users");
        const donorsRes = await axios.get("http://localhost:9000/read/donor");
        const donationsRes = await axios.get("http://localhost:9000/read/donationsws");

        setTotalUsers(usersRes.data.length);
        setTotalDonors(donorsRes.data.length);
        setTotalRequests(donationsRes.data.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const donorPercentage = totalUsers ? ((totalDonors / totalUsers) * 100).toFixed(2) : 0;
  const donationPercentage = totalUsers ? ((totalDonations / totalUsers) * 100).toFixed(2) : 0;

  const data = {
    labels: ["Donors", "Donations"],
    datasets: [
      {
        data: [totalDonors, totalDonations],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF4364", "#2A82C9", "#E6B23D"],
      },
    ],
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-3xl font-bold text-red-900 mb-6">Donation Statistics</h2>
      <div className="grid grid-cols-3 gap-10 text-center">
        <div className="bg-red-900 text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold">Total Users</h3>
          <p className="text-3xl font-bold">{totalUsers}</p>
        </div>
        <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold">Total Donors</h3>
          <p className="text-3xl font-bold">{totalDonors}</p>
          <p className="text-lg">{donorPercentage}% of users</p>
        </div>
        <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold">Total Donations</h3>
          <p className="text-3xl font-bold">{totalDonations}</p>
          <p className="text-lg">{requestPercentage}% of users</p>
        </div>
        <div className="bg-green-600 text-white p-6 rounded-lg shadow-lg col-span-3">
        </div>
      </div>
      <div className="mt-10 w-96">
        <Pie data={data} />
      </div>
    </div>
  );
}

export default DonationStats;