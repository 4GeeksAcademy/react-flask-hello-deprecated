import React from "react";
import styled from "styled-components";

const AvatarWrapper = styled.div`
  border-radius: 50%;
  overflow: hidden;
  display: inline-block;
  margin: auto;
  aspect-ratio: 1/1;
`;
const StyledAvatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const Avatar = ({
  src,
  alt = "Avatar",
  height = "60px",
  name = "",
  onClick = () => { },
  className = "",
}) => {
  return (
    <div className="container-fluid d-flex flex-column align-items-center text-center">
      <AvatarWrapper
        className={className}
        style={{ height: height }}
        onClick={onClick}>
        <StyledAvatar src={src} alt={alt} />
      </AvatarWrapper>
      <h6 className="text-light">{name}</h6>
    </div>
  );
};

export default Avatar;
