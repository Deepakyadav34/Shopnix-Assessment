import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardContent, CardMedia, CardActionArea, CardActions, Grid, Typography, Box } from '@mui/material';

const cardsData = [
  {
    title: 'Bags theme',
    image: 'https://admin.shopnix.io/static/images/themes/layout3/l3-bags.webp',
    backgroundImage: 'https://admin.shopnix.io/static/images/themes/layout3/l3-bags.webp',
    id: 'bags',
  },
  {
    title: 'Chic theme',
    image: 'https://admin.shopnix.io/static/images/themes/layout3/l3-chic.webp',
    backgroundImage: 'https://admin.shopnix.io/static/images/themes/layout3/l3-chic.jpg',
    id: 'chic',
  },
  {
    title: 'Shoes theme',
    image: 'https://admin.shopnix.io/static/images/themes/layout3/l3-shoes.webp',
    backgroundImage: 'https://admin.shopnix.io/static/images/themes/layout3/l3-shoes.jpg',
    id: 'shoes',
  },
  {
    title: 'Flex theme',
    image: 'https://admin.shopnix.io/static/images/themes/layout3/l3-flex.webp',
    backgroundImage: 'https://admin.shopnix.io/static/images/themes/layout3/l3-flex.jpg',
    id: 'flex',
  },
];

export default function Cards() {
  const [scrollingIndex, setScrollingIndex] = React.useState(null);
  const [selectedTheme, setSelectedTheme] = React.useState(null);

  const handleMouseEnter = (index) => {
    setScrollingIndex(index);
  };

  const handleMouseLeave = () => {
    setScrollingIndex(null);
  };

  const handleThemeSelect = (themeId) => {
    setSelectedTheme(themeId === selectedTheme ? null : themeId);
  };

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', mt: 4, fontFamily: 'Montserrat, sans-serif' }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}>
        Apply a theme
      </Typography>
      <Grid container spacing={3}>
        {cardsData.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                maxWidth: 345,
                height: 350,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                mt: 4,
                fontFamily: 'Montserrat, sans-serif',
              }}
            >
              <CardActionArea
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                sx={{ overflow: 'hidden', height: '100%' }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    ml: '50px',
                    mr: '50px',
                    mt: '10px',
                    height: 600,
                    backgroundImage: `url(${card.backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'transform 0.7s ease-in-out',
                    transform: scrollingIndex === index ? 'translateY(-50%)' : 'translateY(0)',
                  }}
                />
              </CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                  {card.title}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', mt: 'auto' }}>
                <Button
                  size="small"
                  color="primary"
                  variant={selectedTheme === card.id ? 'contained' : 'outlined'}
                  onClick={() => handleThemeSelect(card.id)}
                  sx={{
                    border: '2px solid',
                    borderColor: selectedTheme === card.id ? 'green' : 'rgba(0, 0, 0, 0.23)',
                    backgroundColor: selectedTheme === card.id ? 'green' : undefined,
                    color: selectedTheme === card.id ? '#fff' : undefined,
                    fontFamily: 'Montserrat, sans-serif',
                    '&:hover': {
                      borderColor: selectedTheme === card.id ? 'green' : 'rgba(0, 0, 0, 0.53)',
                      backgroundColor: selectedTheme === card.id ? 'green' : 'primary.main',
                      color: '#fff',
                      transform: 'translateY(-2px)',
                      boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
                    },
                    '&:active': {
                      transform: 'translateY(0)',
                      boxShadow: 'none',
                    },
                  }}
                >
                  {selectedTheme === card.id ? '✔' : 'Apply'}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Box sx={{ mt: 2, mr: 2 }}>
            <Button
              component={Link}
              to="/customizeStore"
              variant="contained"
              color="primary"
              disabled={!selectedTheme} // Disable button if no theme is selected
              sx={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Next
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
