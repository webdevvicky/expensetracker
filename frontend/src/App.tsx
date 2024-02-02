import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Login from "./components/userinterface/Login";
import ExpenceTable from "./components/userinterface/ExpenceTable";
import NavBar from "./components/userinterface/navbar/NavBar";
import { Route, Routes } from "react-router-dom";
import AddProduct from "./components/add_new/AddProduct";

import AddCatagory from "./components/add_new/AddCatagory";
import Adduser from "./components/add_new/Adduser";

function App() {
  return (
    <>
      <div className="">
        <NavBar />
      </div>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/table" element={<ExpenceTable />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/addcategory" element={<AddCatagory />} />
        <Route path="/adduser" element={<Adduser />} />
      </Routes>
    </>
  );
}

export default App;
