import React from 'react';
import { LineChart, Line, YAxis } from 'recharts';

export const SparklineChart = ({ data, width, height}) => {
    const chartData = data.map((price, index) => ({ index, price }));

    return (
        <LineChart width={width} height={height} data={chartData}>
            <YAxis type="number" domain={['dataMin', 'dataMax']} width={0} />
            <Line type="monotone" dataKey="price" stroke="#39ff14" strokeWidth={2} dot={false} />
        </LineChart>
    );
};
