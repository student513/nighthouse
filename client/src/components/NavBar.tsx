import React from "react";
import { Navbar } from "react-bootstrap";

import Links from "./Links";

const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Links />
    </Navbar>
  );
};

export default NavBar;
