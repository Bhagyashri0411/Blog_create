import { Alert, Typography } from '@mui/material'
import React, {  useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Comment, Form, Header, Dropdown, Input } from 'semantic-ui-react'
import { getToken } from '../services/LocalStorageService'
import { useCommentpostUserMutation } from '../services/userAuthApi'




const reviewData = [
  {
    text: 'Not Good',
    value: '1',
  },
  {
    text: 'Good',
    value: '2',
  },
  {
    text: 'Better',
    value: '3',
  },
  {
    text: 'Best',
    value: '4',
  },
  {
    text: 'Excelent',
    value: '5',
  }
]



const CommentExampleComment = (props) => {

  const main_user = localStorage.getItem('name')
  const [server_error, setServerError] = useState({})
  const [server_msg, setServerMsg] = useState({})
  const [commentpostUser] = useCommentpostUserMutation()
  const { access_token } = getToken()


  const handleSumit = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const actualData = {
      post_id: props.blogId,
      user_comment: "1", //.......id user
      rating: "2",
      message: formdata.get('message'),
      coment_user_name: main_user
    }
    const res = await commentpostUser({actualData, access_token})
    if (res.error) {
      setServerMsg({})
      setServerError(res.error.data.errors)
    }
    if (res.data) {
      setServerError({})
      setServerMsg(res.data)
    }
    console.log(res);
  }
  return <>

    <Comment.Group className='mx-auto'>
      <Header as='h3' dividing>
        Comments
      </Header>
      <Form reply onSubmit={handleSumit}>
        <Input className='text-capitilize' focus fluid icon='user' iconPosition='left' value={main_user} disabled name="user_name" />
        
        <Dropdown name="rating" id="rating" className='mt-3'
          placeholder='Select the Rating'
          fluid
          selection
          options={reviewData}
        />
        {server_error.rating ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.rating[0]}</Typography> : ""}

        <Form.TextArea className='mt-3' name="message" id="message" />
        {server_error.message ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.message[0]}</Typography> : ""}
        
        <Button type='submit' content='Add Reply' labelPosition='left' icon='edit' primary />
        {server_msg.msg ? <Alert severity='success' className='mt-3'>{server_msg.msg}</Alert> : ''}
        
      </Form>
    </Comment.Group>
  </>
}


export default CommentExampleComment