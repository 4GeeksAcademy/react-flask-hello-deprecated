import React from "react";
import { Nav } from "react-bootstrap";
import styled from "styled-components";
import Avatar from "./Avatar.jsx";

const ListMenuItem = styled.span`
  color: #ffffff;
  font-size: 1.4vw;
  text-decoration: none;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  margin: 0 5px;
  position: relative;
  overflow: hidden;

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    background: #ffffff;
    transition: all 0.5s;
  }

  &::before {
    top: 0;
    left: 0;
  }

  &::after {
    bottom: 0;
    right: 0;
  }

  &:hover::before {
    width: 100%;
    transition: width 0.25s ease-in-out;
  }

  &:hover::after {
    width: 100%;
    transition: width 0.25s ease-in-out 0.25s;
  }
`;

const SidebarWrapper = styled.div`
  height: 100%;
  width: 17vw;
  min-width: 100px;

  @media (max-width: 786px) {
    width: 16vw;
  }
`;

const ResponsiveNavLink = styled(Nav.Link)`
  display: flex;
  align-items: center;

  @media (max-width: 786px) {
    justify-content: center;
    .list-menu-item-text {
      display: none;
    }
  }
`;

const StyledICon = styled.i`
  font-size: 150%;
  min-width: 40px;

  @media (max-width: 786px) {
    font-size: 5vw;

    &:hover {
      color: black;
    }
  }
`;

const StyledNav = styled(Nav)`
  height: 100%;
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    180deg,
    rgba(43, 45, 66, 1) 0%,
    rgba(28, 124, 153, 1) 63%,
    rgba(0, 212, 255, 1) 100%
  );
`;

const ParentSideBar = ({
  items,
  activeKey,
  onSelect,
  src = "https://placehold.co/100",
  name = "Sample Name",
  className = {}
}) => {
  return (
    <SidebarWrapper className={"d-none d-sm-block"}>
      <StyledNav
        variant="tab"
        className="gap-3"
        activeKey={activeKey}
        onSelect={onSelect}>
        {items.map((item, index) => (
          <Nav.Item key={index}>
            <ResponsiveNavLink
              eventKey={item.key}
              className="text-light fw-bold m-1">
              {item.icon && (
                <span className="me-2">
                  <StyledICon>{item.icon}</StyledICon>
                </span>
              )}
              <ListMenuItem className="list-menu-item-text">
                {item.label}
              </ListMenuItem>
            </ResponsiveNavLink>
          </Nav.Item>
        ))}
      </StyledNav>
    </SidebarWrapper>
  );
};

export default ParentSideBar;
