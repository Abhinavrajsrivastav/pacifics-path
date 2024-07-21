import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import UserAuth from '../Api/AuthFunction_Call';
import { AppBar, Toolbar, IconButton, Typography, Button, Drawer, List, ListItem, ListItemText, Avatar } from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon, Leaderboard, Logout } from '@mui/icons-material';
import './Navbar.css';

function NavBar() {
    const [menuActive, setMenuActive] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const authContext = useContext(AuthContext); 
    const { setUser, user, auth, data, setData } = useContext(AuthContext);
    const navigate = useNavigate();
    const { handleGoogleSignIn, handleEmailSignup, EmailSignin, handleForgotPassword, handleLogout } = UserAuth();
    const email = authContext.user?.email;

    const logout = () => {
        handleLogout();
    }

    const toggleDrawer = (open) => () => {
        setMenuActive(open);
    };

    return (
        <AppBar position="fixed" className="nav-container" style={{ backgroundColor: 'var(--bg-color)' }}>
            <Toolbar className="nav-elements">
                <div className="nav-brand">
                    <div className='navbrand'>
                        <img src="./Icons/google (1).png" alt="" style={{ height: '30px', width: '30px' }} className='m-3' />
                        <Typography variant="h6" className="nav-brand-name">
                            Educome
                        </Typography>
                    </div>
                    <div>
                        {window.innerWidth <= 1005 ? (
                            <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                                <MenuIcon />
                            </IconButton>
                        ) : null}
                    </div>
                </div>
                <div className="nav-links">
                    {window.innerWidth > 1005 && 
                        <>
                            <Link to="/pacifics-path"><a href="#" className="nav-link">Home</a></Link>
                            <a href="#" className="nav-link">About</a>
                            <a href="#Testemonials" className="nav-link">Testimonials</a>
                            <a href="#dev" className="nav-link">Us</a>
                            <div className="nav-dropdown" >
                                <button className="nav-dropdown-button nav-link" onClick={() => setDropdownOpen(!dropdownOpen)}>
                                    Explore
                                </button>
                                <div className={`nav-dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
                                    <Link to="/github-profile" className="nav-dropdown-item">GitHub</Link>
                                    <Link to="/projects" className="nav-dropdown-item">Projects</Link>
                                    <Link to="/read-books" className="nav-dropdown-item">Read Books</Link>
                                    <Link to="/git-mate" className="nav-dropdown-item">Find Mates</Link>
                                    <Link to="/read-books" className="nav-dropdown-item">LeaderBoard</Link>
                                    <Link to="/selfLearn" className="nav-dropdown-item">Learn With Ai</Link>
                                </div>
                            </div>
                            {email == null ? (
                                <>
                                    <Link to="/login"><button className="nav-login-btn">login</button></Link>
                                    {/* <Link to="/signup"><button className="nav-login-btn">SignUp</button></Link> */}
                                </>
                            ) : (
                                <div className='log-out-btns' style={{display:"flex", gap: "8px"}}>
                                    <Link to="Compare"><a className='nav-compare-btn'><Leaderboard /></a></Link>
                                    <a onClick={() => logout()} className='nav-logout-btn'><Logout /></a>
                                </div>
                            )}
                        </>
                    }
                    {email == null ? (
                        <Link to="/signup"><button className="nav-login-btn">SignUp</button></Link>
                    ) : (
                        <img src={data.photoURL} style={{height: "30px", width: "30px", marginRight: "20px", borderRadius: "50%" }} onClick={() => navigate("/profile")} alt="Profile" />
                    )}
                </div>
            </Toolbar>
            <Drawer
                anchor="right"
                open={menuActive}
                onClose={toggleDrawer(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        backgroundColor: 'black',
                        color: 'white',
                        textAlign: 'end',
                        
                    },
                }}
            >
                <div className="drawer-header">
                    <IconButton onClick={toggleDrawer(false)}>
                        <CloseIcon style={{ color: 'white' }} />
                    </IconButton>
                </div>
                <List style={{justifyContent: 'end', textAlign:'end',alignItems: 'end'}}>
                    <ListItem button component="a" href="#dev">
                        <ListItemText primary="Us" />
                    </ListItem>
                    {email &&<>
                    <ListItem button component={Link} to="/profile">
                        <ListItemText primary="Profile" />
                    </ListItem>
                    <ListItem button component={Link} to="/github-profile">
                        <ListItemText primary="GitHub" />
                    </ListItem>
                     <ListItem button component={Link} to="/projects">
                        <ListItemText primary="Projects" />
                    </ListItem>
                     <ListItem button component={Link} to="/read-books">
                        <ListItemText primary="Read Books" />
                    </ListItem>
                     <ListItem button component={Link} to="/git-mate">
                        <ListItemText primary="Finds Mates" />
                    </ListItem>
                     <ListItem button component={Link} to="/Leader-board">
                        <ListItemText primary="Learder Board" />
                    </ListItem>
                    <ListItem button component={Link} to="/selfLearn">
                        <ListItemText primary="Learn With Ai" />
                    </ListItem>
                    </> 
                    }
                    <ListItem button component={Link} to="/pacifics-path">
                        <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button component="a" href="#">
                        <ListItemText primary="About" />
                    </ListItem>
                    <ListItem button component="a" href="#Testemonials">
                        <ListItemText primary="Testimonials" />
                    </ListItem>
                    {email == null ? (
                        <>
                            <ListItem button component={Link} to="/login">
                                <ListItemText primary="Login" />
                            </ListItem>
                            <ListItem button component={Link} to="/signup">
                                <ListItemText primary="SignUp" />
                            </ListItem>
                        </>
                    ) : (
                        <>
                            <ListItem button component={Link} to="Compare">
                                <ListItemText primary="Compare" />
                            </ListItem>
                            <ListItem button onClick={() => logout()}>
                                <Logout />
                            </ListItem>
                            {/* <ListItem>
                                <Avatar src={data.photoURL} onClick={() => navigate("/profile")} alt="Profile" />
                            </ListItem> */}
                        </>
                    )}
                </List>
            </Drawer>
        </AppBar>
    );
}

export default NavBar;
