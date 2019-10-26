import React from "react"
import {Button, Col, Container, Form, FormGroup, Input, Label, Row} from "reactstrap";
import config from "../config";
import {toast} from "react-toastify";

class TrainManage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            route: 'Select a Route',
            classes: [
                {
                    name: '1st class',
                    seats: 0
                },
                {
                    name: '2nd class',
                    seats: 0
                },
                {
                    name: '3rd class',
                    seats: 0
                }
            ],
            firstClass: 0,
            secondClass: 0,
            thirdClass: 0,
            delName: 'Select a Train',
            selectRoutes: [],
            selectTrains: []
        }

    }

    componentDidMount() {
        fetch(config.baseUrl + "/railway/routes").then(res => res.json()).then(data => {
            this.setState({selectRoutes: data})
        })
        fetch(config.baseUrl + "/railway/trains").then(res => res.json()).then(data => {
            this.setState({selectTrains: data})
        })
    }

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({[name]: value})

        if (name === 'firstClass' || name === 'secondClass' || name === 'thirdClass') {
            this.handleClass(name, value)
        }
    }

    handleClass = (name, value) => {
        const tempClasses = this.state.classes
        if (name === 'firstClass') {
            tempClasses[0].seats = parseInt(value)
            this.setState({
                classes: tempClasses
            })
        } else if (name === 'secondClass') {
            tempClasses[1].seats = parseInt(value)
            this.setState({
                classes: tempClasses
            })
        } else if (name === 'thirdClass') {
            tempClasses[2].seats = parseInt(value)
            this.setState({
                classes: tempClasses
            })
        }
    }

    handleSubmitOne = (event) => {
        event.preventDefault()
        event.stopPropagation()

        if (this.state.name !== '') {
            const body = {
                name: this.state.name,
                route: this.state.route,
                classes: this.state.classes
            }

            const option = {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json"
                }
            }

            fetch(config.baseUrl + "/railway/train", option).then(res => res.json()).then(res => {
                if (res.trainExist) {
                    toast.error("Train Already Exist")
                } else {
                    toast.success("Train Created Successfully")
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000)
                }
            });
        } else {
            toast.error("Train Name is Empty")
        }

    }


    handleSubmitTwo = (event) => {
        event.preventDefault()
        event.stopPropagation()

        const body = {
            name: this.state.delName
        }

        const option = {
            method: "DELETE",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        }

        fetch(config.baseUrl + "/railway/train", option).then(res => res.json()).then(res => {
            if (res.status) {
                toast.success("Train Deleted Successfully")
                setTimeout(() => {
                    window.location.reload();
                }, 2000)
            } else {
                toast.error("Error Deleting the Train")
            }
        });

    }

    render() {
        console.log(this.state)
        const routeSelect = this.state.selectRoutes.map(route => {
            return <option key={route._id} value={route.name}>{route.name}</option>
        })

        const trainSelect = this.state.selectTrains.map(train => {
            return <option key={train._id} value={train.name}>{train.name}</option>
        })

        return (
            <div>
                <Container style={{width: "80%", marginTop: "1%", marginBottom: "1%"}}>
                    <Row style={{
                        width: '100%',
                        borderBottom: '1px solid rgb(200,200,200)',
                        marginBottom: 20,
                        paddingTop: 5
                    }}>
                        <h4>Manage&nbsp;Trains</h4>
                    </Row>
                    <Row>
                        <Col sm style={{marginTop: "2%", paddingRight: "10%"}}>
                            <h6 style={{
                                width: '75%',
                                textDecoration: 'underline',
                                marginBottom: 20,
                                fontWeight: "bold"
                            }}>
                                Add New Train
                            </h6>
                            <Form onSubmit={this.handleSubmitOne}>
                                <FormGroup>
                                    <Label for="trainName">Train Name</Label>
                                    <Input type="text" name="name" id="trainName"
                                           placeholder="New Train Name" value={this.state.name}
                                           onChange={this.handleChange}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="routeName">Route Name</Label>
                                    <Input type="select" name="route" id="routeName"
                                           value={this.state.route} onChange={this.handleChange}>
                                        <option>Select a Route</option>
                                        {routeSelect}
                                    </Input>
                                </FormGroup>
                                {this.state.route !== "Select a Route" && (
                                    <div>
                                        <FormGroup>
                                            <Label for="fc">First Class Seats</Label>
                                            <Input type="number" name="firstClass" id="fc"
                                                   value={this.state.firstClass} min={0}
                                                   onChange={this.handleChange}/>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="sc">Second Class Seats</Label>
                                            <Input type="number" name="secondClass" id="sc"
                                                   value={this.state.secondClass} min={0}
                                                   onChange={this.handleChange}/>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="tc">Third Class Seats</Label>
                                            <Input type="number" name="thirdClass" id="tc"
                                                   value={this.state.thirdClass} min={0}
                                                   onChange={this.handleChange}/>
                                        </FormGroup>
                                        <FormGroup>
                                            <Button color="primary">Create Train</Button>
                                        </FormGroup>
                                    </div>
                                )}
                            </Form>
                        </Col>
                        <Col sm style={{marginTop: "2%", paddingRight: "10%"}}>
                            <h6 style={{
                                width: '75%',
                                textDecoration: 'underline',
                                marginBottom: 20,
                                fontWeight: "bold"
                            }}>
                                Delete Trains
                            </h6>
                            <Form onSubmit={this.handleSubmitTwo}>
                                <FormGroup>
                                    <Label for="deleteTrainName">Route Name</Label>
                                    <Input type="select" name="delName" id="deleteTrainName"
                                           value={this.state.delName} onChange={this.handleChange}>
                                        <option>Select a Train</option>
                                        {trainSelect}
                                    </Input>
                                </FormGroup>
                                {this.state.delName !== "Select a Train" &&
                                <FormGroup>
                                    <Button color="danger">Delete Train</Button>
                                </FormGroup>
                                }
                            </Form>
                        </Col>
                    </Row>
                    <br/>
                </Container>
            </div>
        );
    }

}

export default TrainManage;