import React from "react";
import {Pie} from "react-chartjs-2";
import {MDBContainer} from "mdbreact";
import {Row} from "reactstrap";

class PieChart extends React.Component {
    state = {
        dataPie: {
            labels: this.props.location.state.res.label,
            datasets: [
                {
                    data: this.props.location.state.res.data,
                    backgroundColor: [
                        "#F7464A",
                        "#46BFBD",
                        "#FDB45C",
                        "#949FB1",
                        "#4D5360",
                        "#AC64AD"
                    ],
                    hoverBackgroundColor: [
                        "#FF5A5E",
                        "#5AD3D1",
                        "#FFC870",
                        "#A8B3C5",
                        "#616774",
                        "#DA92DB"
                    ]
                }
            ]
        }
    }

    render() {
        return (
            <MDBContainer>
                <Row style={{
                    width: '100%',
                    borderBottom: '1px solid rgb(200,200,200)',
                    marginBottom: 20,
                    paddingTop: 5
                }}>
                    <h4>Pie&nbsp;Chart&nbsp;View</h4>
                </Row>
                <Pie style={{marginBottom: "10%"}} data={this.state.dataPie} options={{responsive: true}}/>

            </MDBContainer>
        );
    }
}

export default PieChart;