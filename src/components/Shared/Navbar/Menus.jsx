import { Link, useLocation, useNavigate } from "react-router-dom";
import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import LoginIcon from '@mui/icons-material/Login';
import Button from '@mui/material/Button';
import './Menus.css';
import useAuth from "../../../hooks/useAuth";

const Menus = () => {
    const navigate = useNavigate();
    const { user, logOut, loading } = useAuth();
    const location = useLocation();
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleLogout = () => {
        console.log('logout clicked');
        logOut()
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <>
            <li className={`${location.pathname == '/' ? 'selected' : ''}`}>
                <Link to="/">Home</Link>
            </li>
            <li className={`${location.pathname == '/all-products' ? 'selected' : ''}`}>
                <Link to="/all-products">Products</Link>
            </li>
            {
                !user ? <div>
                    {
                        loading ? <span className="loading loading-spinner text-info loading-lg"></span>
                        : <Button onClick={() => navigate('/login')} variant="contained" size="large">
                        <LoginIcon></LoginIcon>
                        <span className="ml-1 font-bold">Login</span>
                    </Button>
                    }

                </div> :
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open Options">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Profile" src={user?.photoURL} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px', textAlign: 'center' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {/* <MenuItem onClick={handleCloseUserMenu}> */}
                            <Typography textAlign="center" sx={{ backgroundColor: '#edf7ed', padding: '5px', fontSize: '14px', color: '#1d4620', fontWeight: 'bold', paddingX: '16px', textTransform: 'uppercase' }}>
                                {user?.displayName}
                            </Typography>
                            {/* </MenuItem> */}
                            <MenuItem onClick={() => {
                                handleCloseUserMenu()
                                navigate('/dashboard')
                            }}>
                                <Typography textAlign="center">Dashboard</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => {
                                handleCloseUserMenu()
                                handleLogout()
                            }}>
                                <Typography textAlign="center">Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
            }
        </>
    );
};

export default Menus;