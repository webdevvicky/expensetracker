import { Path, UseFormRegister } from "react-hook-form";
import { Category, Type } from "./AddProduct";

interface IFormValues {
  productname: string;
  price: number;
  typeid: Type[];
  catid: Category[];
}

type InputProps = {
  label: Path<IFormValues>;
  register: UseFormRegister<IFormValues>;
  required: boolean;
  placeholder: string;
  error?: any;
  type?: string;
  minlen?: number;
};

const Input = ({
  label,
  register,
  required,
  placeholder,
  type,
  minlen,
  error,
}: InputProps) => {
  return (
    <div>
      <div className="form-floating mb-3">
        <input
          type={type || "text"}
          className="form-control"
          placeholder={placeholder}
          {...register(label, {
            required,
            minLength: minlen,
          })}
        />
        <label>{placeholder}</label>
        {error && error.type === "required" && (
          <p className="text-danger">this field required</p>
        )}
        {error && error.type === "minLength" && (
          <p className="text-danger">
            this field required minimum {minlen} charecters
          </p>
        )}
      </div>
    </div>
  );
};

export default Input;
