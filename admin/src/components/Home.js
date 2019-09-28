import React, {Component} from 'react'
import {routes, route, trainsByRoute, classes, schedules, getBookedSeatsCount} from '../Services'

import {Button, Form, Col, Row, Table} from 'react-bootstrap'
import Select from 'react-select'
import DatePicker from "react-datepicker"
import moment from 'moment'

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            qty: '',
            fromOptions: [],
            toOptions: [],
            trains: [],
            errMsg: 'Required fields empty or invalid!!!',
            showErr: false,
        };
    }

    componentDidMount() {
        var options = []
        routes()
            .then(res => {
                res.map((item, i) => {
                    return item.route.map((station, i) => {
                        return options.push({
                            value: station.name,
                            label: station.name,
                            route: item._id,
                            id: i,
                            fair: station.fair
                        })
                    })
                })
                this.setState({fromOptions: options})
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleChange = type => async selectedOption => {
        await this.setState({[type]: selectedOption, showErr: false}, () => {
            this.calculateFair()
        });
        if (type === 'from') {
            this.setState({to: '', train: ''})
            route(selectedOption.route)
                .then(res => {
                    var options = [];
                    res.route.map((station, i) => {
                        if (selectedOption.value !== station.name) {
                            return options.push({
                                value: station.name,
                                label: station.name,
                                route: res._id,
                                id: i,
                                fair: station.fair
                            })
                        } else {
                            return null
                        }
                    })
                    this.setState({toOptions: options})
                })
                .catch(err => {
                    console.log(err)
                })
            trainsByRoute(selectedOption.route)
                .then(res => {
                    var options = [];
                    res.map((train, i) => {
                        return options.push({
                            value: train.name,
                            label: train.name,
                            id: train._id,
                            classes: train.classes
                        })
                    })
                    this.setState({trains: options})
                })
                .catch(err => {
                    console.log(err)
                })
        }
        if (type === 'train') {
            classes()
                .then(res => {
                    var classes = []
                    res.map((trainClass, i) => {
                        return classes.push({
                            value: trainClass.name,
                            label: trainClass.name,
                            id: trainClass._id,
                            fairRatio: trainClass.fairRatio
                        })
                    })
                    this.setState({classes: classes})
                })
                .catch(err => {
                    console.log(err)
                })
            schedules()
                .then(res => {
                    var schedules = []
                    res.map((schedule, i) => {
                        return schedules.push({value: schedule.time, label: schedule.time, id: schedule._id})
                    })
                    this.setState({schedules: schedules})
                })
                .catch(err => {
                    console.log(err)
                })
        }
        this.updateAvailableSeats()
    }

    updateAvailableSeats = () => {
        if (this.state.date && this.state.time && this.state.trainClass) {
            const tc = this.state.trains.find(item => item.value === this.state.train.value)
            const seats = tc.classes.find(item => item.name === this.state.trainClass.value).seats
            const state = this.state
            getBookedSeatsCount(state.train.value, state.trainClass.value, state.date, state.time.value).then(res => {
                const bookings = res.bookings
                const availableSeats = seats - bookings
                this.setState({availableSeats})
            })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    handleQtyChange = () => event => {
        if (event.target.value === "") {
            this.setState({qty: 0}, () => this.calculateFair())
        }
        if (Number.isInteger(parseInt(event.target.value))) {
            this.setState({qty: parseInt(event.target.value)}, () => this.calculateFair())
        }
    }

    calculateFair = () => {
        var user = localStorage.getItem('user')
        if (user) {
            user = JSON.parse(user)
        }
        if (this.state.to && this.state.from && this.state.trainClass && this.state.qty) {
            var amount = Math.abs(this.state.to.fair - this.state.from.fair) * this.state.trainClass.fairRatio * this.state.qty
            amount = amount.toFixed(2)
            var discount = (user && user.discount ? 0.1 * amount : 0).toFixed(2)
            var total = (amount - discount).toFixed(2)
            this.setState({amount: amount, discount: discount, total: total})
        }
    }

    handleSubmit = event => {
        this.setState({showErr: false})
        const state = this.state
        var user = localStorage.getItem('user')
        if (!user) {
            alert("Please Sign In Before Make a Reservation!!!")
            this.props.history.push('/')
        } else if (state.from && state.to && state.train && state.trainClass && state.time && state.qty && state.qty !== 0 && state.date) {
            this.props.history.push("/payment", {...this.state})
        } else {
            this.setState({showErr: true})
        }
        event.preventDefault()
        event.stopPropagation()

    }

    handleDateChange = async dt => {
        const date = moment(dt).format('YYYY-MM-DD')
        await this.setState({date: date})
        this.updateAvailableSeats()
    }

    render() {
        const asColor = this.state.availableSeats < this.state.qty ? "red" : "black"
        const bookingDisable = this.state.availableSeats < this.state.qty
        return (
            <Form style={{padding: 20}} onSubmit={(e) => this.handleSubmit(e)}>
                <Row style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Form.Row style={{width: '75%', borderBottom: '1px solid rgb(200,200,200)', marginBottom: 20}}>
                        <h4>Book Train Tickets</h4>
                    </Form.Row>
                    <Form.Row style={{width: '75%'}}>
                        <Form.Group as={Col} controlId="from">
                            <Form.Label>From</Form.Label>
                            <Select options={this.state.fromOptions} onChange={this.handleChange("from")}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="to">
                            <Form.Label>To</Form.Label>
                            <Select options={this.state.toOptions} onChange={this.handleChange("to")}
                                    value={this.state.to}/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row style={{width: '75%'}}>
                        <Form.Group as={Col} controlId="from">
                            <Form.Label>Train</Form.Label>
                            <Select options={this.state.trains} onChange={this.handleChange("train")}
                                    value={this.state.train}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="to">
                            <Form.Label>Class</Form.Label>
                            <Select options={this.state.classes} onChange={this.handleChange("trainClass")}
                                    value={this.state.trainClass}/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row style={{width: '75%'}}>
                        <Col md={6} lg={6} xl={6}>
                            <Form.Label>Date</Form.Label>
                            <DatePicker
                                className="form-control"
                                onChange={this.handleDateChange}
                                minDate={new Date()}
                                value={this.state.date}
                                placeholderText="YYYY-MM-DD"
                            />
                        </Col>
                        <Form.Group as={Col} controlId="time">
                            <Form.Label>Time</Form.Label>
                            <Select options={this.state.schedules} onChange={this.handleChange("time")}
                                    value={this.state.time}/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row style={{width: '75%', paddingBottom: 20}}>
                        <Col md={6} lg={6} xl={6}>
                            <Form.Label>No of Tickets</Form.Label>
                            <Form.Control placeholder="qty" value={this.state.qty} onChange={this.handleQtyChange()}/>
                        </Col>
                    </Form.Row>
                    <Form.Row style={{width: '75%', paddingLeft: 5, align: 'right'}}>
                        {this.state.amount &&
                        <Table striped size="sm">
                            <tbody>
                            <tr>
                                <td align='right' style={{border: "1px solid #dee2e6"}}>Available Seats</td>
                                <td align='right' style={{
                                    border: "1px solid #dee2e6",
                                    color: asColor
                                }}>{this.state.availableSeats}</td>
                            </tr>
                            <tr style={{border: "none"}}>
                                <td style={{border: "none"}} height="40"/>
                            </tr>
                            <tr>
                                <td align='right' style={{border: "1px solid #dee2e6"}}>Amount</td>
                                <td align='right' style={{border: "1px solid #dee2e6"}}>{this.state.amount} LKR</td>
                            </tr>
                            <tr>
                                <td align='right' style={{border: "1px solid #dee2e6"}}>Discount</td>
                                <td align='right' style={{border: "1px solid #dee2e6"}}>{this.state.discount} LKR</td>
                            </tr>
                            <tr>
                                <td align='right' style={{border: "1px solid #dee2e6"}}>Total</td>
                                <td align='right' style={{border: "1px solid #dee2e6"}}>{this.state.total} LKR</td>
                            </tr>
                            </tbody>
                        </Table>
                        }
                    </Form.Row>
                    <Form.Row style={{width: '75%'}}>
                        {this.state.showErr && <p style={{color: 'red'}}>{this.state.errMsg}</p>}
                    </Form.Row>
                    <Form.Row style={{width: '75%', padding: 5}}>
                        <Button variant="primary" type="submit" disabled={bookingDisable}>
                            Make Reservation
                        </Button>
                    </Form.Row>
                </Row>
            </Form>
        );
    }
}

export default Home;