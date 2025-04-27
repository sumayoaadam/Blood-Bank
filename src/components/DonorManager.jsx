import { useState } from "react";
import AddDonor from "../pages/DonateRegister";
import DonorTable from "../pages/DonorTable";

function DonorManager() {
  const [refresh, setRefresh] = useState(false);

  const handleRegistration = () => {
    setRefresh((prev) => !prev); 
  };

  return (
    <div>
      <AddDonor onRegister={handleRegistration} />
      <DonorTable refresh={refresh} />
    </div>
  );
}

export default DonorManager;