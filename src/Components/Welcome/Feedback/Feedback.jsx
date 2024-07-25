import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Snackbar, Alert } from '@mui/material';
import './Feedback.css';

const Feedback = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Feedback submitted:', { name, email, message });
    setSubmitted(true);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div className='feedback-box'>
      <Container maxWidth="sm" className="feedback-container">
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" component="h2" gutterBottom>
          We value your feedback
        </Typography>
        <Typography variant="body1" gutterBottom>
          Please share your thoughts about our service
        </Typography>
      </Box>
      {submitted ? (
        <Box textAlign="center">
          <Typography variant="h5" gutterBottom>
            Thank you for your feedback!
          </Typography>
          <Typography variant="body1">
            We appreciate your time and effort in helping us improve our services.
          </Typography>
        </Box>
      ) : (
        <form onSubmit={handleSubmit} className="feedback-form">
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Message"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <Box textAlign="center" mt={2}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </form>
      )}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Feedback submitted successfully!
        </Alert>
      </Snackbar>
    </Container>
    </div>
  );
};

export default Feedback;
