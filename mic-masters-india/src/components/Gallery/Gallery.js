import React from 'react';
import { Container, Typography, Card, CardMedia } from '@mui/material';
import './Gallery.css';

// Dynamic import of all images inside images2 folder
const importAll = (r) => r.keys().map(r);
const galleryImages = importAll(
  require.context('./images2', false, /\.(png|jpe?g|svg)$/)
);

const Gallery = () => {
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
          Previous Events
        </Typography>

        <div className="gallery-grid">
          {galleryImages.map((image, index) => (
            <Card key={index} className="gallery-card">
              <CardMedia
                component="img"
                className="gallery-image"
                image={image}
                alt={`Gallery image ${index + 1}`}
                loading="lazy"
                decoding="async"
              />
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Gallery;
