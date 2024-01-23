
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";


const SignUp = () => {
  

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();


  const onSubmit = (data) => {
    const currentUser = {
      name: data.name,
      phoneNumber: data.number,
      email: data.email,
      password: data.password,
      role: data.userType,
    };
    console.log(currentUser);

    fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(currentUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          // const accessToken = data.data.accessToken;
          // setToken(accessToken);
          // localStorage.setItem("accessToken", accessToken);
          reset();
          toast.success("Sign Up Successful!");
        } else {
          toast.error("Sign Up Failed!");
        }
      });
    
  };



  return (
    <div className="flex mt-10 justify-center items-center">
      <div className="card w-[600px]  shadow-xl border py-12">
        <div className="card-body w-full items-center ">
          <h2 className="card-title text-2xl">Sign Up</h2>

          <form className="w-full mx-auto" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="Full Name"
                className="input input-bordered w-full "
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                })}
              />
              <label className="label">
                {errors.name?.type === "required" && (
                  <span className="label-text-alt text-red-500 text-sm">
                    {errors.name.message}
                  </span>
                )}
              </label>
            </div>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                type="text"
                placeholder="Phone Number"
                className="input input-bordered w-full "
                {...register("number", {
                  required: {
                    value: true,
                    message: "Phone number is required",
                  },
                })}
              />
              <label className="label">
                {errors.number?.type === "required" && (
                  <span className="label-text-alt text-red-500 text-sm">
                    {errors.number.message}
                  </span>
                )}
              </label>
            </div>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email Address"
                className="input input-bordered w-full "
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                  pattern: {
                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                    message: "Provide a valid email",
                  },
                })}
              />
              <label className="label">
                {errors.email?.type === "required" && (
                  <span className="label-text-alt text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
                {errors.email?.type === "pattern" && (
                  <span className="label-text-alt text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </label>
            </div>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered w-full "
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  minLength: {
                    value: 6,
                    message: "Password should be contains 6 characters",
                  },
                })}
              />
              <label className="label">
                {errors.password?.type === "required" && (
                  <span className="label-text-alt text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="label-text-alt text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
              </label>
            </div>
            <label className="label">
              <span className="label-text">User Type</span>
            </label>
            <select
              {...register("userType", { required: true })}
              className="select select-bordered w-full "
            >
              <option value="">Select User Type</option>
              <option value="owner">Owner</option>
              <option value="renter">Renter</option>
            </select>
            {errors.userType?.type === "required" && (
              <label className="label">
                <span className="label-text-alt text-red-500 text-sm">
                  User type is required
                </span>
              </label>
            )}

            <input
              type="submit"
              className="btn btn-primary w-full mt-4 text-white"
              value="SignUp"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
