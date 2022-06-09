import React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';


export default function Home() {


  return (
    <Container maxWidth="xl">
      <Box sx={{ flexGrow: 2 }}>
        <Paper sx={{ width: '100%', overflow: 'hidden', mt: 10 }}>
          <h1>Home</h1>
        </Paper>
      </Box>
    </Container>
  );
}
