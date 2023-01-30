import React, { Component } from 'react';
import { Modal, Row, Col, Form } from 'react-bootstrap';
import { Button } from "@mui/material";

export class EditDepModal extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch("http://127.0.0.1:8000/api/user/changeinfo/"+this.props.id,{
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                headline: event.target.headline.value,
                description: event.target.description.value
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert("Updated succeccfully......!");
            },
                (error) => {
                    alert('Failed');
                })
    }
    render() {
        return (
            <div className="container">

                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header clooseButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit Blog
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={12}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="headline">
                                        <Form.Label>headline</Form.Label>
                                        <Form.Control type="text" name="headline" required
                                            defaultValue={this.props.headline}
                                            placeholder="Enter your headline" />
                                    </Form.Group>

                                    <Form.Group controlId="description" className='mt-3'>
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control type="text" name="description" required
                                            defaultValue={this.props.description}
                                            placeholder="Enter your description" />
                                    </Form.Group>

                                    <Form.Group className='mt-3'>
                                        <Button variant='contained' size='small' sx={{ px: 3 }} type="submit">
                                            Update blog
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant='contained' color='error' size='small' onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>

                </Modal>

            </div>
        )
    }

}