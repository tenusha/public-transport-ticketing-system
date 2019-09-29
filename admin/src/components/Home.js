import React, { Component } from 'react'

import { Image, Form, Col, Row, Table } from 'react-bootstrap'
import Select from 'react-select'
import DatePicker from "react-datepicker"
import moment from 'moment'

class Home extends Component {


    componentDidMount() {

    }


    render() {
        return (
            <div style={{ width: '100%' }}>
                <Image style={{ width: '100%' }} src={require("../images/railway2.jpg")} />
            </div>
        );
    }
}

export default Home;