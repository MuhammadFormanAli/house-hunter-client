import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const EditHouseModal = ({ editConfirm, setEditConfirm,refetch }) => {
  const {
    _id,
    name,
    city,
    address,
    bedrooms,
    bathrooms,
    roomSize,
    rentPerMonth,
    phoneNumber,
    availabilityDate,
    description,
    picture
  } = editConfirm;

  const validatePhoneNumber = (value) => {
    const isValid = /^(\+88)?01[0-9]{9}$/.test(value);
    return isValid || "Please enter a valid phone number";
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  //   const [error, setErrorMessage] = useState("");

  const onSubmit = (data) => {
    
    if (data.photo[0] == undefined) {
      const houseInfo = {
        name: data.name,
        address: data.address,
        city: data.city,
        bedrooms: parseInt(data.bedrooms),
        bathrooms: parseInt(data.bathrooms),
        roomSize: parseInt(data.roomSize),
        rentPerMonth: parseInt(data.rentPerMonth),
        phoneNumber: data.phoneNumber,
        availabilityDate: data.availabilityDate,
        description: data.description,
        picture,
        owner: "user?._id",
      };
      // console.log(houseInfo);
      axios.put(`https://house-hunter-server-wheat.vercel.app/houses/${_id}`, houseInfo)
        .then((res) => {
          console.log(res.data)
          if (res.data.modifiedCount) {
            toast.success(`House updated successfully!`);
            reset();
            setEditConfirm(null);
            refetch();
          } else {
            toast.error(`Failed to update house!`);
          }
        });

      // todo: have to add edited info in backend without photo edited
    } else {
      const imageStoragekey = "f5de0f96ef15566b396729f30a0f2e28";
      const image = data.photo[0];
      // console.log(data.photo)
      const formData = new FormData();
      formData.append("image", image);
      axios.post(`https://api.imgbb.com/1/upload?key=${imageStoragekey}`, formData)
        
        .then((res) => {
          // console.log(res.data)
          if (res.data.success) {
            const img = res.data.data.url;
            // console.log(img)
            const houseInfo = {
              name: data.name,
              address: data.address,
              city: data.city,
              bedrooms: parseInt(data.bedrooms),
              bathrooms: parseInt(data.bathrooms),
              roomSize: parseInt(data.roomSize),
              rentPerMonth: parseInt(data.rentPerMonth),
              phoneNumber: data.phoneNumber,
              availabilityDate: data.availabilityDate,
              description: data.description,
              owner: "user?._id",
              picture: img,
            };
            // console.log(houseInfo);

            axios.put(`https://house-hunter-server-wheat.vercel.app/houses/${_id}`, houseInfo)
            .then((res) => {
              console.log(res.data)
              if (res.data.modifiedCount) {
                toast.success(`House updated successfully!`);
                reset();
                setEditConfirm(null);
                refetch();
              } else {
                toast.error(`Failed to update house!`);
              }
            });
          }
        });
    }
  };
  return (
    <div>
      <input type="checkbox" id="edit-house-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="card-body items-center ">
            <h2 className="card-title text-xl">Edit House Info</h2>

            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered w-full"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Name is required",
                    },
                  })}
                  defaultValue={name}
                />
                <label className="label">
                  {errors.name?.type === "required" && (
                    <span className="label-text-alt text-red-500 text-sm">
                      {errors.name.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Address</span>
                </label>
                <input
                  type="text"
                  placeholder="Address"
                  className="input input-bordered w-full"
                  {...register("address", {
                    required: {
                      value: true,
                      message: "Address is required",
                    },
                  })}
                  defaultValue={address}
                />
                <label className="label">
                  {errors.address?.type === "required" && (
                    <span className="label-text-alt text-red-500 text-sm">
                      {errors.address.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">City</span>
                </label>
                <input
                  type="text"
                  placeholder="City"
                  className="input input-bordered w-full"
                  {...register("city", {
                    required: {
                      value: true,
                      message: "City is required",
                    },
                  })}
                  defaultValue={city}
                />
                <label className="label">
                  {errors.city?.type === "required" && (
                    <span className="label-text-alt text-red-500 text-sm">
                      {errors.city.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Bedrooms</span>
                </label>
                <input
                  type="number"
                  placeholder="Number of Bedrooms"
                  className="input input-bordered w-full"
                  {...register("bedrooms", {
                    required: {
                      value: true,
                      message: "Number of bedrooms is required",
                    },
                  })}
                  defaultValue={bedrooms}
                />
                <label className="label">
                  {errors.bedrooms?.type === "required" && (
                    <span className="label-text-alt text-red-500 text-sm">
                      {errors.bedrooms.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Bathrooms</span>
                </label>
                <input
                  type="number"
                  placeholder="Number of Bathrooms"
                  className="input input-bordered w-full"
                  {...register("bathrooms", {
                    required: {
                      value: true,
                      message: "Number of bathrooms is required",
                    },
                  })}
                  defaultValue={bathrooms}
                />
                <label className="label">
                  {errors.bathrooms?.type === "required" && (
                    <span className="label-text-alt text-red-500 text-sm">
                      {errors.bathrooms.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Room Size</span>
                </label>
                <input
                  type="number"
                  placeholder="Room Size"
                  className="input input-bordered w-full"
                  {...register("roomSize", {
                    required: {
                      value: true,
                      message: "Room Size is required",
                    },
                  })}
                  defaultValue={roomSize}
                />
                <label className="label">
                  {errors.roomSize?.type === "required" && (
                    <span className="label-text-alt text-red-500 text-sm">
                      {errors.roomSize.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Rent Per Month</span>
                </label>
                <input
                  type="number"
                  placeholder="Rent Per Month"
                  className="input input-bordered w-full"
                  {...register("rentPerMonth", {
                    required: {
                      value: true,
                      message: "Rent per month is required",
                    },
                  })}
                  defaultValue={rentPerMonth}
                />
                <label className="label">
                  {errors.rentPerMonth?.type === "required" && (
                    <span className="label-text-alt text-red-500 text-sm">
                      {errors.rentPerMonth.message}
                    </span>
                  )}
                </label>
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
                  defaultValue={phoneNumber}
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

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Availability Date</span>
                </label>
                <input
                  type="date"
                  placeholder="Phone Number"
                  className="input input-bordered w-full"
                  {...register("availabilityDate", {
                    required: {
                      value: true,
                      message: "Availability date is required",
                    },
                  })}
                  defaultValue={availabilityDate}
                />
                <label className="label">
                  {errors.availabilityDate?.type === "required" && (
                    <span className="label-text-alt text-red-500 text-sm">
                      {errors.availabilityDate.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  cols={30}
                  type="date"
                  placeholder="Description"
                  className="textarea textarea-bordered w-full"
                  {...register("description", {
                    required: {
                      value: true,
                      message: "Description date is required",
                    },
                  })}
                  defaultValue={description}
                />
                <label className="label">
                  {errors.description?.type === "required" && (
                    <span className="label-text-alt text-red-500 text-sm">
                      {errors.description.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Photo</span>
                </label>
                <input
                  type="file"
                  placeholder="Photo"
                  className="input input-bordered w-full"
                  {...register("photo")}
                />
              </div>

              <input
                type="submit"
                className="btn btn-primary w-full mt-4 text-white"
                value="Update Now"
              />
              {/* <div className="mt-2 text-center">
                {error && ( // Display the error message if present
                  <span className=" text-red-500 text-sm ">{error}</span>
                )}
              </div> */}
            </form>
          </div>
          <div className="modal-action">
            <label htmlFor="edit-house-modal" className="btn px-6 btn-sm">
              Cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditHouseModal;
