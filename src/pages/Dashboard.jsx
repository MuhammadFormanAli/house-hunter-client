import OwnerDashboard from "../components/OwnerDashboard";
import RenterDashboard from "../components/RenterDashboard";

const Dashboard = () => {

 const role = 'renter'
//  const role = 'owner'
  return (
    <div>
      {role === "owner" && <OwnerDashboard />}
      {role === "renter" && <RenterDashboard />}
      {role === undefined && "No"}
    </div>
  );
};

export default Dashboard;
