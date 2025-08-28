import React from 'react';
import { Container, Typography, Card, CardMedia } from '@mui/material';
import './Gallery.css';

// Import images from local folder
import img1 from './images/1.jpg';
import img2 from './images/2.jpg';
import img3 from './images/3.jpg';
import img4 from './images/4.jpg';
import img5 from './images/5.jpg';

const Gallery = () => {
  const galleryImages = [img1, img2, img3, img4, img5];

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
          Gallery
        </Typography>

        <div className="gallery-row">
          {galleryImages.map((image, index) => (
            <Card key={index} className="gallery-card">
              <CardMedia
                component="img"
                className="gallery-image"
                image={image}
                alt={`Gallery image ${index + 1}`}
              />
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Gallery;
