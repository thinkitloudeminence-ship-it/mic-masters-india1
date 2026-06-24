import React from 'react';
import { Container, Typography, Card, CardMedia } from '@mui/material';
import './Gallery.css';

<<<<<<< HEAD
// Dynamic import of all images inside images2 folder
const importAll = (r) => r.keys().map(r);
const galleryImages = importAll(
  require.context('./images2', false, /\.(png|jpe?g|svg)$/)
);

const Gallery = () => {
=======
// Import images from local folder
import img1 from './images/1.jpg';
import img2 from './images/2.jpg';
import img3 from './images/3.jpg';
import img4 from './images/4.jpg';
import img5 from './images/5.jpg';

const Gallery = () => {
  const galleryImages = [img1, img2, img3, img4, img5];

>>>>>>> 79ba03530b485e4de951769054c6cd23c386abf5
  return (
    <div className="section">
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          align="center"
          className="white-text"
        >
<<<<<<< HEAD
          Previous Events
        </Typography>

        <div className="gallery-grid">
=======
          Gallery
        </Typography>

        <div className="gallery-row">
>>>>>>> 79ba03530b485e4de951769054c6cd23c386abf5
          {galleryImages.map((image, index) => (
            <Card key={index} className="gallery-card">
              <CardMedia
                component="img"
                className="gallery-image"
                image={image}
                alt={`Gallery image ${index + 1}`}
<<<<<<< HEAD
                loading="lazy"
                decoding="async"
=======
>>>>>>> 79ba03530b485e4de951769054c6cd23c386abf5
              />
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Gallery;
