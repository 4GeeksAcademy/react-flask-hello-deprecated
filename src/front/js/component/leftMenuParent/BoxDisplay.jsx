import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
const StyledDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 20px auto;
  border-radius: 28px;
  background-image: linear-gradient(
    to right,
    rgba(31, 118, 146, 0.8),
    rgba(67, 56, 135, 0.8)
  );
  box-shadow: 5px 5px 10px #c1ced7, -5px -5px 10px #ffffff;
  height: 90%;
`;

const BoxDisplay = ({
  width = "100%",
  children,
  aspect = "9 / 16",
  flex = "column",
  classname = "",
}) => {
  return (
    <StyledDiv
      className={classname}
      style={{ width: width, flexDirection: flex }}>
      {children}
    </StyledDiv>
  );
};

export default BoxDisplay;

BoxDisplay.propTypes = {
  width: PropTypes.string,
  children: PropTypes.node,
  aspect: PropTypes.string,
  flex: PropTypes.string,
};
