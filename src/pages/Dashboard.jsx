import OwnerDashboard from "../components/OwnerDashboard";

const Dashboard = () => {

//  const role = 'owner'
 const role = 'owner'
  return (
    <div>
      {role === "owner" && <OwnerDashboard />}
      {/* {role === "renter" && <Booking></Booking>} */}
      {role === undefined && "No"}
    </div>
  );
};

export default Dashboard;
