import React from 'react';
import PropTypes from 'prop-types';
import {
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Line
} from 'recharts';

export class WeightChart extends React.Component {
    static propTypes = {
        data: PropTypes.array.isRequired
    };
    renderTooltip(prop) {
        const {
            active,
            label,
            payload
        } = prop;

        if (active) {
            return (
                <div className="chart-tooltip">
                    <div>{`Weight date: ${label}`}</div>
                    <div>{`Child weight: ${payload[0].value} kg`}</div>
                </div>
            );
        }
    }
    render() {
        const {
            data
        } = this.props;
        const chartWidth = Math.floor(window.innerWidth * (5/6));
        const dataCopy = data.slice().reverse();

        return data.length ? (
                <LineChart
                    width={chartWidth}
                    height={chartWidth < 400 ? 200 : 300}
                    data={dataCopy}
                    margin={{left: 0, right: 5}}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="weightDate"/>
                    <YAxis dataKey="childWeight"/>
                    <Tooltip content={this.renderTooltip}/>
                    <Line type="monotone" dataKey="childWeight" stroke="#000"/>
                </LineChart>
            ) :
                null
    }
}