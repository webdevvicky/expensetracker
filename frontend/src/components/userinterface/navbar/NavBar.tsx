import { Link } from "react-router-dom";
const NavHome = () => {
  return (
    <div className="py-3 border-bottom ">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <h1 className="navbar-brand">Expense Tracker</h1>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav justify-content-end">
              <li className="nav-item">
                <Link to="/" className="nav-link text-white">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/table" className="nav-link text-white">
                  Expence table
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/addproduct" className="nav-link text-white">
                  Add product
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/addcategory" className="nav-link text-white">
                  Add category
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/adduser" className="nav-link text-white">
                  Add user
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavHome;
