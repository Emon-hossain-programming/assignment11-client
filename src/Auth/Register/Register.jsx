import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAxios from "../../Hooks/useAxios";


const Register = () => {
  const axiosSecure=useAxios()
   const { RegisterUser} =useAuth()
   const navigate=useNavigate()
   const location=useLocation()
  const { register, handleSubmit } = useForm();
  const handleRegister = (data) => {
    const { email,  name,  } = data;
    RegisterUser(data.email,data.password)
    .then(res=>{
      console.log(res.data);
      
      const userInfo = {
              name: name,
              email: email,
              role: "citizen", 
              status: "active",
              isPremium: false,
              createdAt: new Date()
            };

            axiosSecure.post('/registerdUsers',userInfo)
            .then(res=>{
              if (res.data.insertedId) {
                  console.log("User added to DB");
                  navigate("/");
                }

            })
        
        
    })
    .catch(err=>{
        console.log(err);
    })
  };

  
  return (
    <div className="flex justify-center items-center mt-4">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className="text-5xl font-bold">Register!</h1>
          <form onSubmit={handleSubmit(handleRegister)}>
            <fieldset className="fieldset">
              {/* email */}
              <label className="label">Email</label>
              <input
                {...register("email")}
                type="email"
                className="input"
                placeholder="Email"
              />
              {/* password */}
              <label className="label">Password</label>
              <input
                {...register("password")}
                type="password"
                className="input"
                placeholder="Password"
              />

              <button className="btn btn-neutral mt-4">Register</button>
            </fieldset>
           
          </form>
            <SocialLogin></SocialLogin>
           <p>Already have an account : please 
            <Link state={location.state} className="font-bold text-blue-600 underline" to='/login'>Login</Link></p>
        </div>
       
      </div>
    </div>
  );
};

export default Register;
