import { useForm } from "react-hook-form";
import Input from "./Input";
import typeService from "../services/type-service";
import { useState, useEffect } from "react";
import catagoryService from "../services/catagory-service";
import productService from "../services/product-service";
import { useNavigate } from "react-router-dom";
export interface IFormValues {
  productname: string;
  price: number;
  typeid: Type[];
  catid: Category[];
}

export interface Category {
  _id: string;
  catname: string;
  status: boolean;
}
export interface Type {
  _id: string;
  method: string;
  catid: string;
}

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormValues>();

  const [type, setType] = useState<Type[]>([]);
  const [catagory, setCatagory] = useState<Category[]>([]);
  const navigate = useNavigate();

  ////// getting type data //////////////
  useEffect(() => {
    typeService
      .getall()
      .then((res) => {
        const result = res.data as Type[];
        setType(result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  /////////// grtting catagory data//////////
  useEffect(() => {
    catagoryService
      .getall()
      .then((res) => {
        const result = res.data as Category[];
        setCatagory(result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // mapping type data  ////
  const typeOptions = type.map((x, index) => (
    <option key={index} value={x._id}>
      {x.method}
    </option>
  ));

  //////mapping catagory data/////////////

  const catagoryoptions = catagory.map((x, index) => (
    <option key={index} value={x._id}>
      {x.catname}
    </option>
  ));

  /////////////post data ////////////

  const handleformsubmit = (data: IFormValues) => {
    console.log(data);
    productService
      .create(data)
      .then((res) => {
        window.alert("added " + " " + res.data.productname);
        navigate("/table");
      })
      .catch((err) => {
        window.alert(err.message);
      });
    reset();
  };

  return (
    <div className="container mt-2">
      <div className="text-center">
        <h1>Add new product</h1>
      </div>
      <form onSubmit={handleSubmit(handleformsubmit)} className="form-floating">
        <Input
          label="productname"
          placeholder="enter product name"
          register={register}
          error={errors.productname}
          required
          minlen={2}
          
        />

        <Input
          type="number"
          label="price"
          placeholder="enter product price"
          register={register}
          error={errors.price}
          required
          minlen={1}
        />

        <div className="">
          <select
            className="form-select py-3"
            {...register("typeid", {
              required: true,
            })}
          >
            <option value="">select type</option>
            {typeOptions}
          </select>
          {errors.typeid && <p className="text-danger">required</p>}
        </div>

        <div className="mt-3">
          <select
            className="form-select p-3"
            {...register("catid", {
              required: true,
            })}
          >
            <option value="">select catagory</option>
            {catagoryoptions}
          </select>
          {errors.catid && <p className="text-danger">required</p>}
        </div>
        {/* <div className="border pt-3 ps-3 rounded ">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              value="true"
              defaultChecked
              {...register("status")}
            />
            <label className="form-check-label">Active</label>
          </div>
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="radio"
              value="false"
              {...register("status")}
            />
            <label className="form-check-label">Not active</label>
          </div>
        </div> */}
        <div>
          <button type="submit" className="btn btn-primary mt-3 w-100">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
