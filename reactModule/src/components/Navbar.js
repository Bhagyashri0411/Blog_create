import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { getToken } from '../services/LocalStorageService';
const Navbar = () => {
  const { access_token } = getToken()
  return <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant='h5' component="div" sx={{ flexGrow: 1 }}>
            <Button component={NavLink} to='/' style={({ isActive }) => { return { backgroundColor: isActive ? '#6a8eb3' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Home</Button>

          </Typography>

          {access_token ? <Button component={NavLink} to='/dashboard' style={({ isActive }) => 
          { return { backgroundColor: isActive ? '#6a8eb3' : '' } }}
           sx={{ color: 'white', textTransform: 'none' }}>
            Dashboard</Button> 
            : <Button component={NavLink} to='/login' 
            style={({ isActive }) => { return { backgroundColor: isActive ? '#6a8eb3' : '' } }}
             sx={{ color: 'white', textTransform: 'none' }}>Login and Registration</Button>}



        </Toolbar>
      </AppBar>
    </Box>
  </>;
};

export default Navbar;
