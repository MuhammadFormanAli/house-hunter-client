/* eslint-disable react/no-unknown-property */
import { toast } from "react-toastify";

const DeleteBookingModal = ({ deleteConfirm, setDeleteConfirm }) => {
  const { _id } = deleteConfirm;


  const handleBookingDelete = () => {
console.log(_id)
    toast.success(`Booking deleted Successfully!`);
    setDeleteConfirm(null);
    // refetch();

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
