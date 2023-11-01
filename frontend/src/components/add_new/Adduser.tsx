import { useForm } from "react-hook-form";
import userService from "../services/user-service";
import { useNavigate } from "react-router-dom";

const Adduser = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleformsubmit = (data: any) => {
    console.log(data, "from add pagechild");
    userService
      .create(data)
      .then((res) => {
        window.alert("successfully created user " + " " + res.data.username);
        navigate("/table");
      })
      .catch((err) => {
        window.alert(err.message + " " + err.response.data);
      });

    reset();
  };

  return (
    <div className="bg-secondary vh-100 ">
      <div className="container-fluid bg-secondary d-flex justify-content-center align-items-center pt-5">
        <div className="container   col-4 border   rounded border-info ">
          <div className="text-center py-3">
            <h1>Create Account</h1>
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
              <label htmlFor="floatingInput"> enter new user name</label>

              {errors.username?.type === "required" && (
                <p className="text-info">required</p>
              )}
              {errors.username?.type === "minLength" && (
                <p className="text-info">min length 3 charecters</p>
              )}
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="floatingInput1"
                placeholder="password"
                {...register("password", { required: true, minLength: 5 })}
              />
              <label htmlFor="floatingInput1">enter new password</label>

              {errors.password?.type === "required" && (
                <p className="text-info">required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-info">min length 5 charecters</p>
              )}
            </div>

            <div>
              <button type="submit" className="btn btn-primary w-100 my-3 ">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Adduser;
