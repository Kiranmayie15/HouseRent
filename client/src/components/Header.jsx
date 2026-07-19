import { Navbar, Container } from "react-bootstrap";

const Header = () => {

  const user = JSON.parse(localStorage.getItem("user"));

  return (

    <Navbar bg="light" className="shadow-sm">

      <Container>

        <Navbar.Brand>

          Welcome, {user?.name}

        </Navbar.Brand>

      </Container>

    </Navbar>

  );
};

export default Header;