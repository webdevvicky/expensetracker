import { useState, useEffect } from "react";
import allproductService from "../services/allproduct-service";
import productService from "../services/product-service";
import Loader from "./Loader";

export interface Props {
  _id: string;
  catid: string;
  productname: string;
  price: number;
  typeid: string;
  status: boolean;
  catname: string;
  type: string;
}

const ExpenceTable = () => {
  const [datalist, setDatalist] = useState<Props[]>([]);

  useEffect(() => {
    allproductService
      .getall()
      .then((res) => {
        const result = res.data as Props[];
        console.log(result);
        setDatalist(result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  ////// delete product data ///////////
  const handledelete = (data: Props) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${data.productname}?`
    );
    if (confirmDelete) {
      productService
        .delete(data._id)
        .then(() => {
          setDatalist((predata) =>
            predata.filter((item) => item._id !== data._id)
          );
        })
        .catch((err) => {
          window.alert(err.message);
        });
    }
  };

  const handleupdatestatus = (data: Props) => {
    const updatedstatus = { _id: data._id, status: !data.status };
    productService
      .update(updatedstatus)
      .then((res) => {
        setDatalist((predata) =>
          predata.map((item) =>
            item._id == data._id
              ? { ...item, status: updatedstatus.status }
              : item
          )
        );
      })
      .catch((err) => {
        window.alert("error");
      });
    console.log(updatedstatus);
  };

  return (
    <div className="pt-5">
      <div className="container text-center pt-3">
        {datalist.length < 1 ? (
          <Loader />
        ) : (
          <table className="table table-bordered border-primary">
            <thead>
              <tr>
                <th scope="col">S.NO</th>
                <th scope="col"> Product</th>
                <th scope="col"> Price</th>
                <th scope="col"> Catagory</th>
                <th scope="col">Type</th>
                <th scope="col"> status</th>
                <th scope="col"> delete</th>
              </tr>
            </thead>
            <tbody>
              {datalist.map((data, i) => (
                <tr key={data._id}>
                  <td>{i + 1}</td>
                  <td>{data.productname}</td>
                  <td>{data.price}</td>
                  <td>{data.catname}</td>
                  <td>{data.type}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleupdatestatus(data)}
                    >
                      {data.status ? "true" : "false"}
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handledelete(data)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ExpenceTable;
