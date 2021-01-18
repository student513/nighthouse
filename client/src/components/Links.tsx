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
        Night House
      </Link>
      <Collapse>
        <List>
          <Item>
            <Link to="/url/create" className="nav-link">
              Create Analysis
            </Link>
          </Item>
          <Item>
            <Link to="/url/list" className="nav-link">
              Analysis List
            </Link>
          </Item>
          <Item>
            <Link to="/url/real-device/create" className="nav-link">
              Create Real Device
            </Link>
          </Item>
          <Item>
            <Link to="/url/real-device/list" className="nav-link">
              Real Device List
            </Link>
          </Item>
          {/* <Item>
            <Link to="/url/headless/create" className="nav-link">
              Create Headless
            </Link>
          </Item>
          <Item>
            <Link to="/url/headless/list" className="nav-link">
              Headless List
            </Link>
          </Item> */}
        </List>
      </Collapse>
    </React.Fragment>
  );
};

export default Links;
