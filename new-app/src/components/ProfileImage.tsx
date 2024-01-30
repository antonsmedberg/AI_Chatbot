import React from 'react';
import styled from 'styled-components';

// Define the type for props
interface ProfileImageProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  fallbackSrc?: string;
}

const StyledImage = styled.img<ProfileImageProps>`
  width: ${(props) => props.width || '40px'};
  height: ${(props) => props.height || '40px'};
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
  // ...other styles
`;

const ProfileImage: React.FC<ProfileImageProps> = ({
  src,
  alt,
  width,
  height,
  fallbackSrc,
}) => {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (fallbackSrc) {
      e.currentTarget.src = fallbackSrc; // Set fallback image if provided
    }
  };

  return (
    <StyledImage
      src={src}
      alt={alt}
      onError={handleError}
      width={width} // Optional width prop
      height={height} // Optional height prop
    />
  );
};

export default ProfileImage;


