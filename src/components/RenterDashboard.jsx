
import  { useState } from "react";
import BookingRow from "./BookingRow";
import DeleteBookingModal from "./DeleteBookingModal";
import { useQuery } from "react-query";
import axios from "axios";


const RenterDashboard = () => {
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteBookingId, setDeleteBookingId]=useState(null)


  const email = 'email@mail.com'



const { data: booking = [], loading, refetch } = useQuery({
  queryKey: ['booking'],
  queryFn: async () => {
      const res = await axios(`https://house-hunter-server-wheat.vercel.app/booking?email=${email}`)
      return res.data;
  }
})

console.log('from booking',booking)

  if (loading) {
    return <div>loading..</div>;
  }

  return (
    <div className="p-10">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Your Bookings</h1>
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
                {booking?.map((booking, index) => (
                  <BookingRow
                    key={booking?._id}
                    house={booking?.house}
                    bookingId = {booking?._id}
                    index={index}
                    refetch={refetch}
                    setDeleteConfirm={setDeleteConfirm}
                    setDeleteBookingId = {setDeleteBookingId}
                  ></BookingRow>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {deleteConfirm && (
          <DeleteBookingModal
            deleteConfirm={deleteConfirm}
            setDeleteConfirm={setDeleteConfirm}
            deleteBookingId ={deleteBookingId}
            refetch={refetch}
          ></DeleteBookingModal>
        )}
      </div>
    </div>
  );
};

export default RenterDashboard;
