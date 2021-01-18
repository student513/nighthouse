import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Collapse = styled.div.attrs({
  className: "collpase navbar-collapse",
})``;

const List = styled.div.attrs({
  className: "navbar-nav mr-auto",
})``;

const Item = styled.div.attrs({
  className: "collpase navbar-collapse",
})``;

const Links = () => {
  return (
    <React.Fragment>
      <Link to="/" className="navbar-brand">
        My first MERN Application
      </Link>
      <Collapse>
        <List>
          <Item>
            <Link to="/url/list" className="nav-link">
              List url
            </Link>
          </Item>
          <Item>
            <Link to="/url/create" className="nav-link">
              Create url
            </Link>
          </Item>
        </List>
      </Collapse>
    </React.Fragment>
  );
};

export default Links;
