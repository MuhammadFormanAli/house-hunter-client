
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";


const AddBookingModal = ({ addConfirm, setAddConfirm }) => {
  const { _id } = addConfirm;
  
  const user = {
    name: 'Forman',
    email: 'email@mail.com',
  };


  const validatePhoneNumber = (value) => {
    const isValid = /^(\+88)?01[0-9]{9}$/.test(value);
    return isValid || "Please enter a valid phone number";
  };

  const { register,formState: { errors },handleSubmit,reset,} = useForm();


  const onSubmit = (data) => {

    const bookingInfo = {
      renterName: user?.name,
      renterEmail: user?.email,
      renterPhoneNumber: data.phoneNumber,
      houseId: _id,
    };

    
    console.log(bookingInfo);

    axios.post("https://house-hunter-server-wheat.vercel.app/booking", bookingInfo)
      
      .then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          reset();
          toast.success(`Booking Successful!`);
          setAddConfirm(null);
        } else {
          toast.error("Booking Failed!");
          setAddConfirm(null);
        }
      });

  };

  return (
    <div>
      <input type="checkbox" id="add-booking-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="card-body items-center ">
            <h2 className="card-title text-xl">Add Booking</h2>

            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  disabled
                  defaultValue={user.name}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  disabled
                  defaultValue={user.email}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Phone Number</span>
                </label>
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="input input-bordered w-full"
                  {...register("phoneNumber", {
                    required: {
                      value: true,
                      message: "Phone number is required",
                    },
                    validate: validatePhoneNumber,
                  })}
                />
                {errors.phoneNumber?.type === "required" && (
                  <label className="label">
                    <span className="label-text-alt text-red-500 text-sm">
                      {errors.phoneNumber.message}
                    </span>
                  </label>
                )}
                {errors.phoneNumber?.type !== "required" && (
                  <label className="label">
                    <span className="label-text-alt text-red-500 text-sm">
                      {errors.phoneNumber && errors.phoneNumber.message}
                    </span>
                  </label>
                )}
              </div>

              <input
                type="submit"
                className="btn btn-primary w-full mt-4 text-white"
                value="Add Now"
              />
            </form>
          </div>
          <div className="modal-action">
            <label htmlFor="add-booking-modal" className="btn px-6 btn-sm">
              Cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBookingModal;