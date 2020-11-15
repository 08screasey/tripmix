import React from "react"
import { Link } from "gatsby"

import { Navbar } from "react-bootstrap"

const CustomNavbar = ({ pageInfo }) => {
  console.log(pageInfo)
  return (
    <>
     <Navbar variant="dark" expand="lg" id="site-navbar">
        {/* <Container> */}
        <Link to="/" className="link-no-style">
          <Navbar.Brand as="span">Gatsby React Bootstrap</Navbar.Brand>
        </Link>
        {/* </Container> */}
      </Navbar>
    </>
  )
}

export default CustomNavbar
