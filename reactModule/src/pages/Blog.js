import React, { Component } from "react";
import { Box, Avatar, Stack, Typography, Button } from "@mui/material";
import moment from "moment"
import './Blog.css';
import { Link } from "react-router-dom";

export class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = { blogInfo: [] };
    }
    refreshList() {
        fetch('http://127.0.0.1:8000/api/user/getblog/')
            .then((response) => response.json())
            .then((data) => {
                this.setState({ blogInfo: data });
            });
    };

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }

    render() {
        const { blogInfo } = this.state;
        return (
            <>
                <div className="u-repeater">
                    {blogInfo.map((info) => (
                        <Box className=" u-container-style" key={info.id}>

                            <div className="u-container-layout ">
                                <div className="u-align-center ">
                                    <div className=" u-valign-middle-xl">
                                        <h5 className="u-custom-font mb-2">{info.headline}</h5>
                                        <p className="fs-6 mb-0">{info.description}</p>
                                    </div>
                                </div>
                                <hr />

                                <Box className="d-flex justice-content-between align-items-center">


                                    <Avatar variant="rounded" src="avatar1.jpg" spacing={1} />
                                    <Stack style={{ marginLeft: "20px" }}>
                                        <Typography fontWeight={700}>{info.name}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <h6 fontWeight={500} className="fs-6">
                                                {moment(info.dateAddBlog).format('Do MMM YYYY')}</h6>

                                        </Typography>
                                    </Stack>
                                    <Stack style={{ marginLeft: "235px" }} variant="rounded">
                                        <Button style={{ backgroundColor: '#6a8eb3' , color:'white'}} >
                                            <Link style={{color:"white"}} to="/blog" state={{ id: info.id, name: info.name }} sx={{ color: 'white', textTransform: 'none' }}>
                                                Read more....
                                            </Link>
                                        </Button>


                                    </Stack>
                                </Box>
                            </div>

                        </Box>
                    ))}
                </div>
            </>
        );
    }
}