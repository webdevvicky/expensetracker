import { useForm } from "react-hook-form";
import expenceService from "../services/expence-service";
import catagoryService from "../services/catagory-service";

export interface NewCatagory {
  catname: string;
  status: boolean;
}

const AddCatagory = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleformsubmit = (data: any) => {
    catagoryService
      .create(data)
      .then((res) => {
        window.confirm("added new category  " + res.data.catname);
      })
      .catch((err) => {
        window.alert(err.message + " " + err.response.data);
        console.log(err);
      });
    reset();
  };

  return (
    <div>
      <div className="container  ">
        <div className="py-5 text-center ">
          <h1>Add new catagory</h1>
        </div>
        <form
          onSubmit={handleSubmit(handleformsubmit)}
          className="form-floating"
        >
          <div className="form-floating mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="enter new catagory"
              {...register("catname", { required: true, minLength: 3 })}
            />
            <label>Enter new catagory</label>

            {errors.catname?.type === "required" && (
              <p className="text-danger">required</p>
            )}
            {errors.catname?.type === "minLength" && (
              <p className="text-danger">min lenght 3 char</p>
            )}
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              value="true"
              id="flexRadioDefault1"
              defaultChecked
              {...register("status")}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Active
            </label>
          </div>
          <div className="form-check mb-4">
            <input
              className="form-check-input"
              type="radio"
              value="false"
              {...register("status")}
            />
            <label className="form-check-label">Not active</label>
          </div>

          <div>
            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCatagory;
