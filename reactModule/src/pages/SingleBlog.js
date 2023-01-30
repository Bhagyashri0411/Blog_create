import React, { useEffect, useState } from "react";
import { Box, Avatar, Stack, Typography, Grid } from "@mui/material";
import './Blog.css';
import CommentExampleComment from "./CommentBlog";
import { Comment } from 'semantic-ui-react'
import { useLocation } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";


const SingleBlog = (props) => {
    const [singleData, setSingleData] = useState([])
    const [comment, setComment] = useState([])
    const location = useLocation();

    const { access_token } = useSelector(state => state.auth)


    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/user/getblog/" + location.state.id, {
            method: 'GET',
        }).then((res) => res.json())
            .then((data) => setSingleData(data))
    }, [])

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/user/getcomment/", {
            method: 'GET',
        }).then((res) => res.json())
            .then((data) => setComment(data))
    }, [])
    console.log(comment);

    return (
        <>

            <div className="mt-3 container d-flex gap-4">
                <Grid item sm={6}>

                    <Box className=" u-container-style" >

                        <div className="u-container-layout ">
                            <div className="u-align-center ">
                                <div className=" u-valign-middle-xl">
                                    <h5 className="u-custom-font mb-2">{singleData.headline}</h5>
                                    <p className="fs-6 mb-0">{singleData.description}</p>
                                </div>
                            </div>
                            <hr />

                            <Box className="d-flex justice-content-between align-items-center">


                                <Avatar variant="rounded" src="avatar1.jpg" spacing={1} />
                                <Stack style={{ marginLeft: "20px" }}>
                                    <Typography fontWeight={700}>{singleData.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <h6 fontWeight={500} className="fs-6">
                                            {moment(singleData.dateAddBlog).format('Do MMM YYYY')}</h6>

                                    </Typography>
                                </Stack>

                            </Box>
                        </div>

                    </Box>

                    <Comment.Group className='mx-auto mt-5'>
                        {
                            comment.map((singlecomment) => (

                                <Comment className="mt-3 p-2 border">
                                    <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                                    <Comment.Content>
                                        <Comment.Author as='a'>{singlecomment.coment_user_name}</Comment.Author>
                                        <Comment.Metadata>
                                            <div>{moment(singlecomment.dateAddcomment).format('Do MMM YYYY')}</div>
                                        </Comment.Metadata>
                                        <Comment.Text>{singlecomment.message}</Comment.Text>
                                    </Comment.Content>
                                </Comment>
                            ))
                        }

                    </Comment.Group>
                </Grid>
                <Grid item sm={6}>
                    {
                        !access_token ? "Please Login First" :
                        <CommentExampleComment blogId={location.state.id} />
                           
                    }
                </Grid>
            </div>

        </>
    );

}

export default SingleBlog