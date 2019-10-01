import React, {Component} from 'react';

import {Row, Col, Button, Card, Pagination} from 'react-bootstrap'
import {getReservations, deleteReservation} from '../Services'
import {toast} from 'react-toastify'
import configs from '../config.json'
import * as PropTypes from "prop-types";

var QRCode = require('qrcode.react')

class Reservations extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reservations: [],
            items: [],
            offset: 1,
            lastPage: 1,
            paginateItems: []
        };
    }

    componentDidMount() {
        this.updateReservations()
    }

    componentWillUpdate() {
        var user = localStorage.getItem('user')
        if (!user) {
            this.props.history.push('/')
        }
    }

    updateReservations = () => {
        var user = localStorage.getItem('user')
        if (!user) {
            this.props.history.push('/')
        } else {
            user = JSON.parse(user)
            getReservations(user._id)
                .then(res => {
                    this.setState({reservations: res.reverse()}, () => this.paginateReservations())
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    cancelReservation = id => {
        var c = window.confirm("The reservation " + id + " will be deleted")
        if (c) {
            deleteReservation(id)
                .then(res => {
                    toast.success("Successfully removed reservation " + id)
                    this.updateReservations()
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    render() {
        const PaginatedReservations = this.getPagination(this.state.paginateItems)
        return (
            <Row style={{alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                <ReservationList reservations={this.state.reservations}/>
                {this.state.reservations.length > 0 &&
                <>
                    <Row style={{width: '75%', paddingTop: 20, paddingLeft: 15}}>
                        {PaginatedReservations}
                    </Row>
                    {this.state.items.map((reservation, i) => {
                        return (
                            reservation
                        )
                    })}
                    <Row style={{width: '75%', paddingTop: 20, paddingLeft: 15}}>
                        {PaginatedReservations}
                    </Row>
                </>
                }
            </Row>
        );
    }

    getPagination(paginateItems) {
        return <Pagination>
            <Pagination.First onClick={() => this.pageChange(1)}/>
            {paginateItems}
            <Pagination.Last onClick={() => this.pageChange(this.state.lastPage)}/>
        </Pagination>;
    }

    paginateReservations = () => {
        let items = [];
        const offset = (this.state.offset - 1) * 5

        for (let number = offset; number < offset + 5; number++) {
            const reservation = this.state.reservations[number]
            if (reservation) {

                var tempDate = new Date(reservation.date)
                var bookingDate = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate(), reservation.time.slice(0, 2), reservation.time.slice(3, 5), 0, 0)
                bookingDate.setHours(bookingDate.getHours() - 12)
                const disabled = bookingDate < new Date()

                const url = configs.frontendURL + "/ticket/" + reservation._id

                items.push(
                    <Row style={{width: '75%'}} key={number}>
                        <Col>
                            <Card style={{padding: 10, marginTop: 10}}>
                                <Row>
                                    <Col>Reference No : {reservation._id}</Col>
                                    <Col align='right'>{reservation.date} {reservation.time}</Col>
                                </Row>
                                <hr/>
                                <Row>
                                    <Col>
                                        <Row>
                                            <Col>From <b>{reservation.from}</b> to <b>{reservation.to}</b></Col>
                                        </Row>
                                        <Row>
                                            <Col>Train : {reservation.train}</Col>
                                        </Row>
                                        <Row>
                                            <Col>Class : {reservation.trainClass}</Col>
                                        </Row>
                                        <Row>
                                            <Col>Quantity : {reservation.qty}</Col>
                                        </Row>
                                    </Col>
                                    <Col align='right'><QRCode value={url}/></Col>
                                </Row>
                                <hr/>
                                <Row>
                                    <Col>Payment Method : <b>{reservation.paymentMethod}</b></Col>
                                </Row>
                                <Row>
                                    <br/>
                                    <Col>Amount : {reservation.amount.toFixed(2)}</Col>
                                    <Col>Discount : {reservation.discount.toFixed(2)}</Col>
                                    <Col align='right'><b>Total :</b> {reservation.total.toFixed(2)}</Col>
                                </Row>
                                <Row>
                                    <Col style={{paddingTop: 10}} align='right'>
                                        <Button disabled={disabled} variant="danger" size="sm"
                                                onClick={() => this.cancelReservation(reservation._id)}>Cancel</Button>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                )
            }
        }
        let paginateItems = [];
        const lastPage = Math.ceil(this.state.reservations.length / 5)
        for (let number = 1; number <= lastPage; number++) {
            paginateItems.push(
                <Pagination.Item key={number} active={number === this.state.offset}
                                 onClick={() => this.pageChange(number)}>
                    {number}
                </Pagination.Item>,
            );
        }
        this.setState({paginateItems: paginateItems, items: items, lastPage: lastPage})
    }

    pageChange = n => {
        console.log(n)
        this.setState({offset: n}, () => this.paginateReservations())
    }

}

export default Reservations;

function ReservationList(props) {
    return <>
        {props.reservations.length <= 0 &&
        <Row style={{width: "75%", padding: 10}}>
            <Col>
                <Card>
                    <Card.Body>You don't have any reservations yet!!!</Card.Body>
                </Card>
            </Col>
        </Row>
        }
    </>;
}

ReservationList.propTypes = {reservations: PropTypes.any};