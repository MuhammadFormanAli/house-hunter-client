
import axios from "axios";
import { toast } from "react-toastify";

const DeleteHouseModal = ({ deleteConfirm, setDeleteConfirm, refetch }) => {
  const { _id } = deleteConfirm;

  
  const handleProductDelete = () => {
    axios.delete(`https://house-hunter-server-wheat.vercel.app/houses/${_id}`)
      .then((res) => {
        if (res.data.deletedCount) {
          toast.success(`House deleted Successfully!`);
          setDeleteConfirm(null);
          refetch();
        } else {
          toast.error(`Failed to delete house!`);
        }
      });
  };
  return (
    <div>
      <input type="checkbox" id="delete-house-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are you sure want to delete this house?
          </h3>
          <div className="modal-action">
            <button
              className="btn btn-error  px-6 btn-sm"
              onClick={handleProductDelete}
            >
              Delete
            </button>
            <label htmlFor="delete-house-modal" className="btn px-6 btn-sm">
              Cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteHouseModal;
