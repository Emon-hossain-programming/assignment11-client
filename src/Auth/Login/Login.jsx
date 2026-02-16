import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const { LoginUser } = useAuth();
  const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleLogin = (data) => {
    console.log(data);
    LoginUser(data.email,data.password)
      .then((res) => {
        console.log(res.user);
        navigate('/')
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <h3 className="text-3xl text-center font-bold">Welcome back</h3>
      <p className="text-xl text-center">Please Login</p>
      <div className="card-body">
        <form onSubmit={handleSubmit(handleLogin)}>
          <fieldset className="fieldset">
            {/* email */}
            <label className="label">Email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              className="input"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email is reauired</p>
            )}
            {/* password */}
            <label className="label">Password</label>
            <input
              {...register("password", { required: true, minLength: 6 })}
              type="password"
              className="input"
              placeholder="Password"
            />
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">
                password must be 6 caracters or longer
              </p>
            )}
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-neutral mt-4">Login</button>
          </fieldset>
         
        </form>
         <SocialLogin></SocialLogin>
          <p>
            New to out account : please{" "}
            <Link
              state={location.state}
              className="font-bold text-blue-600 underline"
              to="/register"
            >
              Register
            </Link>
          </p>
        
      </div>
    </div>
  );
};

export default Login;
