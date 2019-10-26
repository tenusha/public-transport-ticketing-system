import React from "react"
import {Button, Col, Container, Form, FormGroup, Input, Label, Row} from "reactstrap";
import config from "../config";

class Reports extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            yearOne: '',
            yearTwo: '',
            month: ''
        }

    }

    componentDidMount() {

    }

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({[name]: value})
    }

    handleSubmitOne = (event) => {
        event.stopPropagation()
        event.preventDefault()

        const body = {}
        body.year = this.state.yearOne

        const option = {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        }

        fetch(config.baseUrl + "/railway/reservations/yearly", option).then(res => res.json()).then(data => {
            this.props.history.push("/reportCharts", {res: data})
        })

    }

    handleSubmitTwo = (event) => {
        event.stopPropagation()
        event.preventDefault()

        const body = {}
        body.year = this.state.yearTwo
        body.month = this.state.month

        const option = {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        }

        fetch(config.baseUrl + "/railway/reservations/monthly", option).then(res => res.json()).then(data => {
            this.props.history.push("/reportCharts", {res: data})
        })

    }


    render() {
        //console.log(this.state)
        return (
            <div>
                <Container style={{width: "80%", marginTop: "1%", marginBottom: "1%"}}>
                    <Row style={{
                        width: '100%',
                        borderBottom: '1px solid rgb(200,200,200)',
                        marginBottom: 20,
                        paddingTop: 5
                    }}>
                        <h4>Report&nbsp;Generation</h4>
                    </Row>
                    <Row>
                        <Col sm style={{marginTop: "2%", paddingRight: "10%"}}>
                            <h6 style={{
                                width: '75%',
                                textDecoration: 'underline',
                                marginBottom: 20,
                                fontWeight: "bold"
                            }}>
                                Annual Reports Filter by Trains
                            </h6>
                            <Form onSubmit={this.handleSubmitOne}>
                                <FormGroup>
                                    <Label for="reportYearOne">Year</Label>
                                    <Input type="text" name="yearOne" id="reportYearOne"
                                           placeholder="2019" value={this.state.yearOne}
                                           onChange={this.handleChange}/>
                                </FormGroup>
                                {this.state.yearOne !== '' &&
                                <FormGroup>
                                    <Button color="primary">Generate Report</Button>
                                </FormGroup>
                                }
                            </Form>
                        </Col>
                        <Col sm style={{marginTop: "2%", paddingRight: "10%"}}>
                            <h6 style={{
                                width: '75%',
                                textDecoration: 'underline',
                                marginBottom: 20,
                                fontWeight: "bold"
                            }}>
                                Monthly Reports Filter by Trains
                            </h6>
                            <Form onSubmit={this.handleSubmitTwo}>
                                <FormGroup>
                                    <Label for="reportYearTwo">Year</Label>
                                    <Input type="text" name="yearTwo" id="reportYearTwo"
                                           placeholder="2019" value={this.state.yearTwo}
                                           onChange={this.handleChange}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="reportMonth">Month</Label>
                                    <Input type="text" name="month" id="reportMonth"
                                           placeholder="01" value={this.state.month}
                                           onChange={this.handleChange}/>
                                </FormGroup>
                                {(this.state.yearTwo !== '' && this.state.month !== '') &&
                                <FormGroup>
                                    <Button color="primary">Generate Report</Button>
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

export default Reports;