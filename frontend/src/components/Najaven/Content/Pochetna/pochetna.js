import React from "react";
import {withRouter} from "react-router";
import { Chart } from "react-google-charts";
import ProizvodiNaSmetki from "../ProizvodiNaSmetki/proizvodiNaSmetki";
import ProizvodiNaSmetkiService from "../../../../service/proizvodiNaSmetkaService";
import SmetkiService from "../../../../service/smetkiService";
import Loader from "react-loader-spinner";

class Pochetna extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            chartData : [],
            listProizvodiNaSmetki: [],
            loading: true
        }
    }

    componentDidMount() {
        this.loadDataForChart();
        this.loadProizvodiNaSmetki();
    }

    getDate = (days) => {
        let date = new Date();
        date.setDate(date.getDate()-days);
        return date.toDateString();
    };

    loadProizvodiNaSmetki() {
        this.setState({
           loading: true
        });
        let date = new Date();
        date.setDate(date.getDate()-7);
        ProizvodiNaSmetkiService.getStatsForProizvodiAll(0,1000000, date, new Date())
            .then(response => {
                this.setState({
                    listProizvodiNaSmetki: response.data,
                    loading: false
                });
                console.log(response.data);
                console.log("response.data all");

            })
            .catch(err => console.log("eror"))
    }

    loadDataForChart() {
        this.setState({
            loading: true
        });
        SmetkiService.getInfoZaPoslednaNedela()
            .then(response => {
                this.setState({
                    chartData: response.data,
                    loading: false
                });
            })
            .catch();
    }

    render() {

        if(this.state.loading)
            return <div style={{marginTop:"40vh"}}><Loader
                type="TailSpin"
                color="#00BFFF"
                height={150}
                width={500}
                timeout={100000} //3 secs

            /></div>;

        return (<>
            <div className={"container "}>
                <Chart
                    height={"50vh"}
                    chartType="ColumnChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Датум', 'Потрошувачка во денари'],
                        [this.getDate(6), this.state.chartData[6]],
                        [this.getDate(5), this.state.chartData[5]],
                        [this.getDate(4), this.state.chartData[4]],
                        [this.getDate(3), this.state.chartData[3]],
                        [this.getDate(2), this.state.chartData[2]],
                        [this.getDate(1), this.state.chartData[1]],
                        [this.getDate(0), this.state.chartData[0]],
                    ]}
                    options={{
                        // Material design options
                        title: 'Потрошувачка во последните 7 денови',
                        subtitle: 'Скенирани фискални',
                    }}
                    // For tests
                    rootProps={{ 'data-testid': '2' }}
                />
            </div>
            <br/>
            <br/>
            <ProizvodiNaSmetki proizvodi={this.state.listProizvodiNaSmetki}
                               imeTabela="Производи купени во последните 7 дена"
                               dismissible={"true"}
                               errMessage={"Нема скенирани фискални сметки во последните 7 дена!"}/>
            </>
        );

    }


}


export default withRouter(Pochetna);
