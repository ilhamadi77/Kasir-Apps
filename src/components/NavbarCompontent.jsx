import React from 'react'
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap'
import { Link } from "react-router-dom"

const NavbarCompontent = () => {
    return (
        <Navbar variant='dark' expand="lg">
            <Container>
                <Navbar.Brand href="#"><strong>Kasir</strong> App</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link href="#action2">Link</Nav.Link>
                        <NavDropdown title="Link" id="navbarScrollingDropdown">
                            <NavDropdown.Item as={Link} to='/sukses' >Sukses</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default NavbarCompontent;
