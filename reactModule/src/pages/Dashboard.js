import { Button, CssBaseline, Grid, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { unSetUserToken } from '../features/authSlice';
import { getToken, removeToken } from '../services/LocalStorageService';
import ChangePassword from './auth/ChangePassword';
import AddBlog from "./auth/AddBlog"
import { useGetLoggedUserQuery } from '../services/userAuthApi';
import { useEffect, useState } from 'react';
import { setUserInfo, unsetUserInfo } from '../features/userSlice';

const Dashboard = () => {
  const handleLogout = () => {
    dispatch(unsetUserInfo({ name: "", email: "" }))
    dispatch(unSetUserToken({ access_token: null }))
    removeToken()
    navigate('/login')
  }

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { access_token } = getToken()
  const { data, isSuccess } = useGetLoggedUserQuery(access_token)

  const [userData, setUserData] = useState({
    id: "",
    email: "",
    name: ""
  })

  // Store User Data in Local State
  useEffect(() => {
    if (data && isSuccess) {
      setUserData({
        id: data.id,
        email: data.email,
        name: data.name,
      })
    }
  }, [data, isSuccess])

  // Store User Data in Redux Store
  useEffect(() => {
    if (data && isSuccess) {
      dispatch(setUserInfo({
        id: data.id,
        email: data.email,
        name: data.name
      }))
    }
  }, [data, isSuccess, dispatch])
  // console.log(data.name, "username");

  const seemyblog =() =>{
    navigate('/myblog')
  }

  return <>
    <CssBaseline />
    <Grid container>
      <Grid item sm={12} sx={{ backgroundColor: 'gray', p: 5, color: 'white' }}>
        <div className='d-flex justify-content-between'>

          <h1>User Details</h1>
        <Button variant='contained' color='success' size='small'sx={{px:5}} onClick={seemyblog}> My Blog</Button>
        </div>

        <hr />
        <span>Hello {userData.name}</span>
        <Typography variant='h5'>Email: {userData.email}</Typography>
        <Typography variant='h6'>Name: {userData.name}</Typography>
        <Button variant='contained' color='warning' size='large' onClick={handleLogout} sx={{ mt: 8 }}>Logout</Button>
      </Grid>
      <Grid container className='mt-5'>
        <Grid item sm={6}>
          <ChangePassword />
        </Grid>
        <Grid item sm={6}>
          <AddBlog name={userData.name} id={userData.id} />
        </Grid>
      </Grid>

    </Grid>

  </>;
};

export default Dashboard;
