import React from "react";
import {Bar, Pie} from "react-chartjs-2";
import {MDBContainer} from "mdbreact";
import {Jumbotron, Row} from "reactstrap";

class BarChart extends React.Component {
    state = {
        dataBar: {
            labels: this.props.location.state.res.label,
            datasets: [
                {
                    label: "% of Votes",
                    data: this.props.location.state.res.data,
                    backgroundColor: [
                        "rgba(255, 134,159,0.4)",
                        "rgba(98,  182, 239,0.4)",
                        "rgba(255, 218, 128,0.4)",
                        "rgba(113, 205, 205,0.4)",
                        "rgba(170, 128, 252,0.4)",
                        "rgba(255, 177, 101,0.4)"
                    ],
                    borderWidth: 2,
                    borderColor: [
                        "rgba(255, 134, 159, 1)",
                        "rgba(98,  182, 239, 1)",
                        "rgba(255, 218, 128, 1)",
                        "rgba(113, 205, 205, 1)",
                        "rgba(170, 128, 252, 1)",
                        "rgba(255, 177, 101, 1)"
                    ]
                }
            ]
        },
        barChartOptions: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                xAxes: [
                    {
                        barPercentage: 1,
                        gridLines: {
                            display: true,
                            color: "rgba(0, 0, 0, 0.1)"
                        }
                    }
                ],
                yAxes: [
                    {
                        barPercentage: 1,
                        gridLines: {
                            display: true,
                            color: "rgba(0, 0, 0, 0.1)"
                        },
                        ticks: {
                            beginAtZero: true
                        }
                    }
                ]
            }
        }
    }


    render() {
        return (
            <MDBContainer>

                <Row style={{
                    width: '100%',
                    borderBottom: '1px solid rgb(200,200,200)',
                    marginBottom: 20,
                    marginTop: "1%"
                }}>
                    <h4>Bar&nbsp;Chart&nbsp;View</h4>
                </Row>
                {this.props.location.state.res.data.length === 0 ?
                    <div>
                        <Jumbotron>
                            <h1>No Records Found</h1>
                            <hr className="my-2"/>
                            <p className="lead">* No Records Exists for the Entered Time Period.</p>
                            <p className="lead">* Enter a valid Time Period.</p>
                        </Jumbotron>
                    </div>
                    :
                    <Bar data={this.state.dataBar} options={this.state.barChartOptions}/>
                }

            </MDBContainer>
        );
    }
}

export default BarChart;