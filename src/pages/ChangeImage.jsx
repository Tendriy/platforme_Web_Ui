import React, { useState } from 'react';
import styled from 'styled-components';

function ChangeImage() {
  const [currentImage, setCurrentImage] = useState('/default-profile.jpg'); // Image initiale
  const [previewImage, setPreviewImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    if (previewImage) {
      setCurrentImage(previewImage);
      setPreviewImage(null);
    }
  };

  return (
    <Container>
      <Title>Changer votre photo de profil</Title>

      <ImageWrapper>
        <ProfileImage src={previewImage || currentImage} alt="Image de profil" />
        <FileLabel htmlFor="fileInput">📷 Modifier</FileLabel>
        <FileInput type="file" id="fileInput" accept="image/*" onChange={handleFileChange} />
      </ImageWrapper>

      {previewImage && (
        <SaveButton onClick={handleSave}>✅ Enregistrer</SaveButton>
      )}
    </Container>
  );
};

export default ChangeImage;


const Container = styled.div`
  text-align: center;
  padding: 2rem;
  font-family: sans-serif;
`;

const Title = styled.h2`
  font-size: 20px;
  margin-bottom: 1rem;
`;

const ImageWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const ProfileImage = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #1877f2;
`;

const FileLabel = styled.label`
  position: absolute;
  bottom: 5px;
  right: 5px;
  background: #1877f2;
  color: white;
  padding: 10px 15px;
  border-radius: 15px;
  cursor: pointer;
  font-size: 14px;
`;

const FileInput = styled.input`
  display: none;
`;

const SaveButton = styled.button`
  margin-top: 1rem;
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;
