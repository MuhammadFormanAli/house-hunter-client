
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";


const AddBookingModal = ({ addConfirm, setAddConfirm }) => {
  const { _id } = addConfirm;
  const user = {
    name: 'Forman',
    email: 'email@mail.com',
    
    renter: '1234_id',
    
  };


  const validatePhoneNumber = (value) => {
    const isValid = /^(\+88)?01[0-9]{9}$/.test(value);
    return isValid || "Please enter a valid phone number";
  };

  const {
    register,formState: { errors },handleSubmit,reset,} = useForm();

  const [error, setError] = useState("");

  const onSubmit = (data) => {
    const bookingInfo = {
      name: user?.name,
      email: user?.email,
      phoneNumber: data.phoneNumber,
      renter: user?._id,
      house: _id,
    };
    reset();
          toast.success(`Booking Successful!`);
          setAddConfirm(null);
          setError('')
    console.log(bookingInfo);
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
              <div className="mt-2 text-center">
                {error && ( // Display the error message if present
                  <span className=" text-red-500 text-sm ">{error}</span>
                )}
              </div>
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