import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import './Footer.css';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: 'var(--footer-color)',
    color: 'white',
    padding: theme.spacing(6),
    marginTop: 'auto',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  logoImg: {
    width: 40, // Adjust as needed
    marginRight: theme.spacing(1),
  },
  linkColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer} >
      <Grid container spacing={3} justify="space-between">
        <Grid item xs={12} sm={3} justify="space-evenly" style={{position: "relative", right: "15px"}}>
          <div className={classes.logo}>
            <img src="./Icons/Cat.png" alt="Logo" className={classes.logoImg} />
            <Typography variant="h6">Edukom</Typography>
          </div>
          <Typography variant="body2">
            A Modern Right Dev Partner Finding Platform.
          </Typography>
        </Grid>
        <div className="footer">
          <Grid item xs={12} sm={3} className={classes.linkColumn}>
          <Typography variant="h6" gutterBottom>
            Generals
          </Typography>
          <Link href="#" color="inherit" underline="none" gutterBottom>
             Sources
          </Link>
          <Link href="#" color="inherit" underline="none" gutterBottom>
            Features
          </Link>
          <Link href="#" color="inherit" underline="none" gutterBottom>
            Developers
          </Link>
          <Link href="#" color="inherit" underline="none" gutterBottom>
            
          </Link>
        </Grid>
        <Grid item xs={12} sm={3} className={classes.linkColumn}>
          <Typography variant="h6" gutterBottom>
            Profiles
          </Typography>
          <Link href="#" color="inherit" underline="none" gutterBottom>
            LinkedIn
          </Link>
          <Link href="#" color="inherit" underline="none" gutterBottom>
            GitHub
          </Link>
          <Link href="#" color="inherit" underline="none" gutterBottom>
            Coding
          </Link>
          <Link href="#" color="inherit" underline="none" gutterBottom>
            Instagram
          </Link>
        </Grid>
        </div>
        <Grid item xs={12} sm={3} style={{position: "relative", right: "15px"}}>
          <Typography variant="h6" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body2">
            Email: contact@Edukom.com
          </Typography>
          <Typography variant="body2">
            Phone: +1-123-456-7890
          </Typography>
        </Grid>
      </Grid>
      <Typography variant="body2" align="center" style={{ marginTop: 50, marginBottom: -30 }}className="footer-bottom">
        &copy; {new Date().getFullYear()} Edukom. All rights reserved. developed by Abhinav
      </Typography>
    </footer>
  );
};

export default Footer;
