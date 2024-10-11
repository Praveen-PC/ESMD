import { Link } from "react-router-dom";



const Header = () => {
  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid d-flex justify-content-between p-2">
          <Link to='/' class="navbar-brand mb-0 h1  fw-bold">EMPLOYEE MANAGEMENT</Link>
          <Link to='/tableview' className="fw-bold text-decoration-none">view</Link>
        </div>
      </nav>
    </>
  );
};
export default Header;
