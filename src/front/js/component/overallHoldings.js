import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { LineChart, Line, YAxis, Tooltip, XAxis, ResponsiveContainer } from "recharts";

export const OverallHoldings = () => {
    const { store, actions } = useContext(Context);
    const [chartdata, setChartData] = useState([])
    const timestamp = Date.now()
    const [totalReturn, setTotalReturn] = useState()

    useEffect(() => {
        setChartData(store.walletReturnsData.map((day) => ({
            ...day,
            date: new Date(day.date).toDateString()
        }
        )))
        setTotalReturn((((store.walletReturnsData[store.walletReturnsData.length - 1].price - store.walletReturnsData[0].price) / store.walletReturnsData[0].price) * 100).toFixed(2))
    }, [])

    return (
        <div id="overallHoldings">
            <h2 className="holdingsTitle">Overall Portfolio Performance</h2>
            <h3 className="holdingspct">Overall Return {totalReturn}%</h3>
            <div className="holdingsGraph">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartdata} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                        <YAxis type="number" domain={['dataMin', 'dataMax']} width={0} />
                        <Line type="monotone" dataKey="price" stroke="#39ff14" strokeWidth={2} dot={false} />
                        <XAxis dataKey="date" height={0} />
                        <Tooltip />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className="factBox">
                <div>Highest Return Date: Nov 10th 2024</div>
                <div>Highest Loss Date: Nov 24th 2024</div>
                <div>Average ROI per day: .31%</div>
                <div>Expected EOY Total Returns: 61.62%</div>
            </div>
        </div>
    )

}