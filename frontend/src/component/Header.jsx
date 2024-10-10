import { Link } from "react-router-dom";



const Header = () => {
  return (
    <>
      <nav class="navbar navbar-light bg-light">
        <div class="container-fluid d-flex justify-content-between">
          <Link to='/' class="navbar-brand mb-0 h1">ESM</Link>
          <Link to='/tableview' className="fw-bold text-decoration-none">view</Link>
        </div>
      </nav>
    </>
  );
};
export default Header;
