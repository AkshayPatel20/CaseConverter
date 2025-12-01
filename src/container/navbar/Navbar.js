import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ThemeProvider } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';

//Theme
import darkTheme from '../../features/custom_theme';

//REDUX
import { useDispatch } from 'react-redux';
import { changeTheme } from '../../features/theme';
import { login, logout } from '../../features/user';
import { useSelector } from 'react-redux';

//Auth
import { auth, provider } from '../../config/firebase.ts';
import { signInWithPopup } from 'firebase/auth';


const pages = ['CASE CONVERTER', 'News Room','Pricing', 'Blog'];
const pages_links = ['/CaseConvertor', '/NewsRoom','/Pricing', '/'];


const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

export const Navbar = () => {
    const user = useSelector((state) => state.user.value);

    // console.log(user);

    const dispatch = useDispatch();

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [darkMode, setDarkMode] = React.useState(true);
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    const handleDarkMode = () => {
        setDarkMode(!darkMode);
        dispatch(changeTheme(darkMode))
    };

    
    const signInWithGoogle = async () => {
      const result = await signInWithPopup(auth, provider);
      if(result.user.emailVerified){
        dispatch(login({username: result.user.displayName, email: result.user.email, photoURL: result.user.photoURL, mobile_no: result.user.phoneNumber, user_id: result.user.email }))
      }
    };

    const userLogout = () => {
      dispatch(logout({user_id: ''}))
    };
  
    
    // console.log(user.photoURL);
  return <>

<ThemeProvider theme={darkTheme}>
    <AppBar position="static" color="primary" enableColorOnDark={darkMode}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <Link to='/' style={{textDecoration: 'none', color: '#FFFFFF'}}><Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            CASE CONVERTER
          </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Link to='/' style={{textDecoration: 'none', color: '#FFFFFF'}}><Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            CASE CONVERTER
          </Typography></Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {/* {pages.map((page, index = 0) => (
              <Link to={pages_links[index]} style={{textDecoration: 'none'}} key={index}><Button 
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button></Link>
            ))} */}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton sx={{ ml: 1 }}  color="inherit"  onClick={handleDarkMode}>
                {darkMode ? <Tooltip title="Dark Mode"><Brightness4Icon /></Tooltip> : <Tooltip title="Light Mode"><Brightness7Icon /></Tooltip>}
            </IconButton>
            </Box>

          {
            
          
          (user.user_id === undefined || user.user_id === '') ? <Button style={{ display: 'none' }} color="inherit"  onClick={signInWithGoogle}>Login</Button> : <Box sx={  { flexGrow: 0 }}>
              <Tooltip title="Open settings">
            
              
                <StyledBadge  onClick={handleOpenUserMenu}
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
                >
                  <Avatar alt={user.username} src={user.photoURL} sx={{ bgcolor: deepOrange[500] }} 
                  style={{backgroundColor: '#EC407A', color: '#FFFFFF'}}
                  />
                </StyledBadge>

              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
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
              
                  <MenuItem>
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography textAlign="center">Account</Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography textAlign="center">Dashboard</Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography textAlign="center" onClick={userLogout}>Logout</Typography>
                  </MenuItem>
              
              </Menu>
          </Box> }
        </Toolbar>
      </Container>
    </AppBar>
</ThemeProvider>

  
  </>;
};


export default Navbar;

