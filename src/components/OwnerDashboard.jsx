
import  { useState } from "react";
import HouseRow from "./HouseRow";
import DeleteHouseModal from "./DeleteHouseModal";
import EditHouseModal from "./EditHouseModal";
import AddHouseModal from "./AddHouseModal";
import { useQuery } from "react-query";
import axios from "axios";
// import Loading from "../utils/Loading";


const OwnerDashboard = () => {
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [addConfirm, setAddConfirm] = useState(null);
  const [editConfirm, setEditConfirm] = useState(null);

// const houses =[
//     {
//         "_id": "1",
//         "name": "Cozy Apartment",
//         "city": "New York",
//         "address": "123 Main Street",
//         "bedrooms": 2,
//         "bathrooms": 1,
//         "roomSize": "Medium",
//         "rentPerMonth": 2000,
//         "phoneNumber": "555-1234",
//         "availabilityDate": "2024-02-01",
//         "description": "A cozy apartment in the heart of the city.",
//         "picture": "https://media.istockphoto.com/id/1449212413/photo/row-houses.jpg?s=1024x1024&w=is&k=20&c=2YgBTcwYWtlMcB_YDCses6iUytMCrGr-lTaTi_qxb20="
//       },
//       {
//         "_id": "2",
//         "name": "Luxurious Condo",
//         "city": "Los Angeles",
//         "address": "456 Oak Avenue",
//         "bedrooms": 3,
//         "bathrooms": 2,
//         "roomSize": "Large",
//         "rentPerMonth": 3500,
//         "phoneNumber": "555-5678",
//         "availabilityDate": "2024-03-15",
//         "description": "A luxurious condo with stunning views.",
//         "picture": "https://media.istockphoto.com/id/1449212413/photo/row-houses.jpg?s=1024x1024&w=is&k=20&c=2YgBTcwYWtlMcB_YDCses6iUytMCrGr-lTaTi_qxb20="
//       },
//       {
//         "_id": "3",
//         "name": "Charming Studio",
//         "city": "San Francisco",
//         "address": "789 Pine Street",
//         "bedrooms": 1,
//         "bathrooms": 1,
//         "roomSize": "Small",
//         "rentPerMonth": 1500,
//         "phoneNumber": "555-9876",
//         "availabilityDate": "2024-04-10",
//         "description": "A charming studio in a quiet neighborhood.",
//         "picture": "https://media.istockphoto.com/id/1449212413/photo/row-houses.jpg?s=1024x1024&w=is&k=20&c=2YgBTcwYWtlMcB_YDCses6iUytMCrGr-lTaTi_qxb20="
//       },
//       {
//         "_id": "4",
//         "name": "Modern Townhouse",
//         "city": "Chicago",
//         "address": "101 Elm Lane",
//         "bedrooms": 4,
//         "bathrooms": 3,
//         "roomSize": "Extra Large",
//         "rentPerMonth": 4000,
//         "phoneNumber": "555-4321",
//         "availabilityDate": "2024-05-20",
//         "description": "A modern townhouse with state-of-the-art amenities.",
//         "picture": "https://media.istockphoto.com/id/1449212413/photo/row-houses.jpg?s=1024x1024&w=is&k=20&c=2YgBTcwYWtlMcB_YDCses6iUytMCrGr-lTaTi_qxb20="
//       }
      
      
      
      
// ]

const { data: ownerHouse = [], loading, refetch } = useQuery({
  queryKey: ['ownerHouse'],
  queryFn: async () => {
      const res = await axios(`https://house-hunter-server-wheat.vercel.app/houses`)
      return res.data;
  }
})

  if (loading) {
    return <div>Loading.....</div>;
  }


  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your ALL Houses</h1>
        <label
          onClick={() => setAddConfirm(1)}
          htmlFor="add-house-modal"
          className="btn btn-primary modal-button"
        >
          Add New House
        </label>
      </div>
      <div>
        <div className="border">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Index</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>City</th>
                  <th>Bed Rooms</th>
                  <th>Bath Rooms</th>
                  <th>Size</th>
                  <th>Rent</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {ownerHouse?.map((house, index) => (
                  <HouseRow
                    key={house?._id}
                    house={house}
                    index={index}
                    setEditConfirm={setEditConfirm}
                    setDeleteConfirm={setDeleteConfirm}
                  ></HouseRow>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {deleteConfirm && (
          <DeleteHouseModal
            deleteConfirm={deleteConfirm}
            setDeleteConfirm={setDeleteConfirm}
            refetch={refetch}
          ></DeleteHouseModal>
        )}
        {editConfirm && (
          <EditHouseModal
            editConfirm={editConfirm}
            setEditConfirm={setEditConfirm}
            refetch={refetch}
          ></EditHouseModal>
        )}
      </div>
      {addConfirm && (
        <AddHouseModal
          setAddConfirm={setAddConfirm}
          refetch={refetch}
        ></AddHouseModal>
      )}
    </div>
  );
};

export default OwnerDashboard;
