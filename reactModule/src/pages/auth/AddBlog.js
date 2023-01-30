import { Box, TextField, Button, Alert, Typography } from '@mui/material';
import { useState } from 'react';
import { usePostbloguserMutation } from '../../services/userAuthApi';
import { getToken } from '../../services/LocalStorageService'

const AddBlog = (props) => {
  const [server_error, setServerError] = useState({})
  const [server_msg, setServerMsg] = useState({})
  const [postbloguser] = usePostbloguserMutation()
  const { access_token } = getToken()

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const actualData = {
      username: props.id,
      name: props.name,
      headline: data.get('headline'),
      description: data.get('description'),
    }
    const res = await postbloguser({ actualData, access_token })
    if (res.error) {
      setServerMsg({})
      setServerError(res.error.data.errors)
    }
    if (res.data) {
      console.log(res.data)
      setServerError({})
      setServerMsg(res.data)
      document.getElementById("addblog-form").reset();
    }

  };
  //   const myData = useSelector(state => state.user)

  return <>

    <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', maxWidth: 600, mx: 4 }}>
      <h4>Add a Post</h4>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} id="addblog-form">
        <TextField margin="normal" required fullWidth name="name" label="Your Name" type="text" id="name" value={props.name} disabled />
      
        <TextField margin="normal" required fullWidth name="headline" label="Enter Headline" type="headline" id="headline" />
        {server_error.headline ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.headline[0]}</Typography> : ""}

        <TextField margin="normal" required fullWidth name="description" label="write something about...." type="text" id="description" />
        {server_error.description ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.description[0]}</Typography> : ""}

        <Box textAlign='center'>
          <Button type="submit" variant="contained" color='success' sx={{ mt: 3, mb: 2, px: 5 }}> Add blog </Button>
        </Box>
        {server_error.non_field_errors ? <Alert severity='error'>{server_error.non_field_errors[0]}</Alert> : ''}
        {server_msg.msg ? <Alert severity='success'>{server_msg.msg}</Alert> : ''}
      </Box>
    </Box>
  </>;
};

export default AddBlog;
