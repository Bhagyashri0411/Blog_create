import React, { Component } from "react";
import { Grid, Button } from "@mui/material";
import { EditDepModal } from './EditDepModal';
import './../Blog.css';
import { useSelector } from "react-redux";

export class UserBlog extends Component {
    constructor(props) {
        super(props);
        this.state = { blogInfo: [], editModalShow: false };
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
    deleteEmp(blogid) {
        if (window.confirm('Are you sure?')) {
            fetch("http://127.0.0.1:8000/api/user/delete/" + blogid, {
                method: 'DELETE',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }
    }
    render() {
        const { blogid, headline, description } = this.state;
        const { blogInfo } = this.state;

        let editModalClose = () => this.setState({ editModalShow: false });
        return (
            <>

                <Grid container justifyContent='center' className="mt-3 border py-4">
                    <Grid item sm={10}>
                        <h2 className="captilize"> All bog</h2>
                        <hr />
                        <table className="table table-bordered" >
                            <thead className="text-primary">
                                <tr>
                                    <th scope="col">Headline</th>
                                    <th scope="col">description</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                {blogInfo.map((info) => (
                                    <tr>
                                        <td>{info.name}</td>
                                        <td>{info.headline}</td>
                                        <td>{info.description}</td>
                                        <td >

                                            <Button variant='contained' color='success' size='small' sx={{ px: 3 }}
                                                onClick={() => this.setState({
                                                    editModalShow: true,
                                                    blogid: info.id, headline: info.headline, description: info.description
                                                })}>
                                                Edit
                                            </Button>
                                            <Button variant='contained' color='error' size='small' sx={{ px: 3 }} onClick={() => this.deleteEmp(info.id)}>Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <EditDepModal show={this.state.editModalShow}
                            onHide={editModalClose}
                            id={blogid}
                            headline={headline}
                            description={description}
                        />
                    </Grid>
                </Grid>
            </>
        );
    }
}