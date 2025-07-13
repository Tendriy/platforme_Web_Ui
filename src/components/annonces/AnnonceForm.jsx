import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import styled from 'styled-components';
import axiosClient from '~/config/axiosClient';
import Button from '~/components/ui/Button';
import Input from '~/components/ui/Input';
import TextArea from '~/components/ui/TextArea';
import me from '~/assets/images/me.jpeg'
import { Upload } from 'lucide-react';
import { exec } from '~/utils/exec';

const annonceSchema = z.object({
  titre: z.string().min(1, 'Le titre est requis').max(150, 'Maximum 150 caractères'),
  contenu: z.string().optional(),
  image: z
    .any()
    .optional()
    .refine(
      (files) =>
        !files ||
        files.length === 0 ||
        (files[0]?.size <= 5 * 1024 * 1024 &&
          ['image/jpeg', 'image/png', 'image/gif'].includes(files[0]?.type)),
      'Fichier image invalide (max 5Mo, jpeg/png/gif uniquement)'
    ),
});

function AnnonceForm({ onSuccess, onCancel }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(annonceSchema),
  });
  const fileInputRef = useRef(null);
  const imageFiles = watch('image');
  const [previewImage, setPreviewImage] = useState(me);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (imageFiles && imageFiles.length > 0) {
      const file = imageFiles[0];
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewImage(me);
    }
  }, [imageFiles]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('titre', data.titre);
    formData.append('contenu', data.contenu || '');
    if (data.image && data.image.length > 0) {
      formData.append('image', data.image[0]);
    }

    const res = await exec(() =>
      axiosClient.post('/annonces', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
      setLoading,
      setError
    );

    if (res) {
      onSuccess?.(res.data);
      reset();
      setPreviewImage(me);
    }
  };


  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Title>Création annonce</Title>

      <ImageUploadWrapper onClick={() => fileInputRef.current?.click()}>
        <PreviewImage src={previewImage} alt="Aperçu image sélectionnée" />
        <UploadIconWrapper>
          <Upload size={20} />
        </UploadIconWrapper>
      </ImageUploadWrapper>

      <Input
        placeholder="Saisissez le titre"
        $borderRadius="6px"
        $width="100%"
        {...register('titre')}
      />
      {errors.titre && <ErrorMessage>{errors.titre.message}</ErrorMessage>}

      <TextArea
        id="contenu"
        placeholder="Saisissez le contenu"
        $borderRadius="6px"
        $width="100%"
        {...register('contenu')}
      />
      {errors.contenu && <ErrorMessage>{errors.contenu.message}</ErrorMessage>}

      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        {...register('image')}
        ref={(e) => {
          register('image').ref(e);
          fileInputRef.current = e;
        }}
      />
      {errors.image && <ErrorMessage>{errors.image.message}</ErrorMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <ButtonRow>
        <Button
          type="button"
          onClick={() => {
            reset();
            onCancel?.();
            setPreviewImage('/defoult.jpeg');
          }}
          $bgColor="#6c757d"
        >
          Annuler
        </Button>
        <Button $bgColor="#007bff" type="submit" disabled={isSubmitting || loading}>
          {isSubmitting ? 'Création...' : 'Créer'}
        </Button>
      </ButtonRow>
    </Form>
  );
}

export default AnnonceForm;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 1rem;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #222;
  text-align: center;
`;


const ImageUploadWrapper = styled.div`
  position: relative;
  width: 128px;
  height: 128px;
  margin: 0 auto;
  cursor: pointer;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ccc;
`;

const UploadIconWrapper = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
  background: white;
  border-radius: 50%;
  padding: 4px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`;

