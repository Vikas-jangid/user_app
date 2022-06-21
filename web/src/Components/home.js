import React from 'react';
// import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Slider from './Carousel.js';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function Home() {
  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

  return (
    <Container maxWidth="xl" sx={{mt: 12}}>
          <Slider />
    <Box sx={{ flexGrow: 2 }}>
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          <h4>Word of the Day</h4>
          </Typography>
          <Typography variant="h5" component="div">
          be{bull}nev{bull}o{bull}lent
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
          </Typography>
          <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
          </Typography>
        </CardContent>
      <CardActions>
      <Button size="small">Learn More</Button>
      </CardActions>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card sx={{ minWidth: 275,  }} >
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          <h4>Word of the Day</h4>
          </Typography>
          <Typography variant="h5" component="div">
          be{bull}nev{bull}o{bull}lent
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
          </Typography>
          <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
          </Typography>
        </CardContent>
      <CardActions>
      <Button size="small">Learn More</Button>
      </CardActions>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          <h4>Word of the Day</h4>
          </Typography>
          <Typography variant="h5" component="div">
          be{bull}nev{bull}o{bull}lent
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
          </Typography>
          <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
          </Typography>
        </CardContent>
      <CardActions>
      <Button size="small">Learn More</Button>
      </CardActions>
        </Card>
      </Grid>
    </Grid>
    
    </Box>
    </Container>
  );
}
