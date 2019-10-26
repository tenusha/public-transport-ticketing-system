import React from "react"
import {Col, Container, Row, Button} from "reactstrap";

class ReportCharts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            label: []
        }
    }

    componentDidMount() {
        console.log(this.props.location.state.res)
        const reservations = this.props.location.state.res
        const reservations_ = this.props.location.state.res
        var nameArr = []
        var reportArr = []
        reservations.forEach(res => {
            var trainName = res.train
            var total = 0
            reservations_.forEach(res => {
                if (res.train === trainName) {
                    total += res.total
                }
            })

            var reportDetails = new Object()
            reportDetails.name = trainName
            reportDetails.total = total

            if (!nameArr.includes(trainName)) {
                nameArr.push(trainName)
                reportArr.push(reportDetails)
                reportArr.sort((a, b) => {
                    return (b.total - a.total)
                })
            }
        })
        reportArr.map(data => {
            this.setState(prevState => ({
                data: [...prevState.data, data.total],
                label: [...prevState.label, data.name]
            }))
        })
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <Container style={{width: "80%", marginTop: "1%", marginBottom: "1%"}}>
                    <Row style={{
                        width: '75%',
                        borderBottom: '1px solid rgb(200,200,200)',
                        marginBottom: 20,
                        paddingTop: 5
                    }}>
                        <h4>Report&nbsp;Deatils</h4>
                    </Row>
                    <Row>
                        <Col sm style={{marginTop: "2%", paddingRight: "10%"}}>
                            <Button color="primary" onClick={() => {
                                this.props.history.push("/pieChart", {res: this.state})
                            }}>Pie Chart View</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm style={{marginTop: "2%", paddingRight: "10%"}}>
                            <Button color="primary" onClick={() => {
                                this.props.history.push("/barChart", {res: this.state})
                            }}>Bar Chart View</Button>
                        </Col>
                    </Row>
                    <br/>
                </Container>
            </div>
        );
    }

}

export default ReportCharts;