import {  useState } from "react";

import { useForm } from "react-hook-form";

import { toast } from "react-toastify";

const Login = () => {
  

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [error, setError] = useState("");

  const onSubmit = (data) => {
    const currentUser = {
      email: data.email,
      password: data.password,
    };

    reset();
    setError('')
    toast.success("Logged In!");
    console.log(currentUser)
  };

  return (
    <div className="flex  justify-center items-center my-10">
      <div className="card w-96 bg-base-100 shadow-xl border">
        <div className="card-body items-center  ">
          <h2 className="card-title text-2xl">Login</h2>

          <form className="w-full " onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email Address"
                className="input input-bordered w-full max-w-xs"
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
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered w-full max-w-xs"
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
            <input
              type="submit"
              className="btn btn-primary w-full mt-4 text-white"
              value="Login"
            />
            <div className="mt-2 text-center">
              {error && ( // Display the error message if present
                <span className=" text-red-500 text-sm ">{error}</span>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
