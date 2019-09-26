import React, { Component } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { getReservation } from '../Services'

class Ticket extends Component {

    state = {}

    componentDidMount() {
        if (this.props.match && this.props.match.params) {
            getReservation(this.props.match.params.rid).then(res => {
                this.setState({ data: res })
            }).catch(err => {
                console.log(err)
            })
        }
    }

    render() {
        const reservation = this.state.data
        return (
            <Row style={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                {reservation &&
                    <Row style={{ width: '75%' }}>
                        <Col>
                            <Card style={{ padding: 10, marginTop: 10 }}>
                                <Row>
                                    <Col>Reference No : {reservation._id}</Col>
                                    <Col align='right'>{reservation.date} {reservation.time}</Col>
                                </Row>
                                <hr />
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
                                <hr />
								<Row>
                                    <Col>Payment Method : <b>{reservation.paymentMethod}</b></Col>
                                </Row>
                                <Row>
                                    <Col>Amount : {reservation.amount.toFixed(2)}</Col>
                                    <Col>Discount : {reservation.discount.toFixed(2)}</Col>
                                    <Col align='right'><b>Total :</b> {reservation.total.toFixed(2)}</Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                }
            </Row>
        )
    }
}

export default Ticket