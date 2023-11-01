import { useForm } from "react-hook-form";
useNavigate;

import loginService from "../services/login-service";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Login = () => {
  const [passerror, setPasserror] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleformsubmit = (data: any) => {
    loginService
      .create(data)
      .then(() => {
        navigate("/table");
      })
      .catch((err) => {
        const passworderror = err.response.status === 401 ? true : false;
        setPasserror(passworderror);

        window.alert(err.response.data);
      });
  };

  return (
    <div className="container-fluid bg-secondary vh-100 d-flex justify-content-center align-items-center">
      <div className="container   col-4 border   rounded border-info ">
        <div className="text-center">
          <h1>Login</h1>
        </div>
        <form
          onSubmit={handleSubmit(handleformsubmit)}
          className="form-floating"
        >
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="user name"
              {...register("username", { required: true, minLength: 3 })}
            />
            <label htmlFor="floatingInput">user name</label>

            {errors.username?.type === "required" && (
              <p className="text-danger">required</p>
            )}
            {errors.username?.type === "minLength" && (
              <p className="text-danger">min lenght 3 charecters</p>
            )}
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingInput1"
              placeholder="password"
              {...register("password", { required: true, minLength: 3 })}
            />
            <label htmlFor="floatingInput1">password</label>

            {errors.password?.type === "required" && (
              <p className="text-danger">required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-danger">min lenght 3 charecters</p>
            )}
            {passerror && <p className="text-danger">wrong password</p>}
          </div>

          <div>
            <button type="submit" className="btn btn-primary w-100 my-3 ">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
