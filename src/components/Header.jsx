import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");

    alert("Logged Out Successfully");

    navigate("/");
  }

  return (
    <nav>
      <Link to="/home">Home</Link>{" "}
      <Link to="/todo">Todo-List</Link>{" "}
      <Link to="/profile">Profile</Link>{" "}
      
      <button onClick={logout}>
        Logout
      </button>
    </nav>
  );
}

export default Header;