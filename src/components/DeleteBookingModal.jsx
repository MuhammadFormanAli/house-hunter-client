/* eslint-disable react/no-unknown-property */
import axios from "axios";
import { toast } from "react-toastify";

const DeleteBookingModal = ({  setDeleteConfirm, deleteBookingId,refetch  }) => {
  const id = deleteBookingId;


  const handleBookingDelete = () => {

  console.log(id)
  axios.delete(`https://house-hunter-server-wheat.vercel.app/booking/${id}`)
    .then((res) => {
      if (res.data.deletedCount) {
        toast.success(`Booking deleted Successfully!`);
        setDeleteConfirm(false);
        refetch();
      } else {
        toast.error(`Failed to delete booking!`);
      }
    });

  };
  return (
    <div>
      <input type="checkbox" id="delete-booking-modal" class="modal-toggle" />
      <div class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
          <h3 class="font-bold text-lg">
            Are you sure want to delete this booking?
          </h3>
          <div class="modal-action">
            <button
              className="btn btn-error  px-6 btn-sm"
              onClick={handleBookingDelete}
            >
              Delete
            </button>
            <label for="delete-booking-modal" class="btn px-6 btn-sm">
              Cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteBookingModal;
