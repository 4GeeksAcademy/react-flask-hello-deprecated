import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { AreaChart, linearGradient, defs, LineChart, Line, Area, YAxis, Tooltip, XAxis, ResponsiveContainer } from "recharts";

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
    }, [store.walletReturnsData])

    return (
        <div id="overallHoldings">
            <h2 className="holdingsTitle">Overall Portfolio Performance</h2>
            <h3 className="holdingspct">Overall Return +{totalReturn}%</h3>
            <div className="holdingsGraph">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartdata} margin={{ top: 1, right: 1, left: 1, bottom: 1 }}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="65%" stopColor="#39ff14" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#39ff14" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <YAxis type="number" domain={['dataMin', 'dataMax']} width={0} />
                        <Area type="monotone" dataKey="price" stroke="#39ff14" strokeWidth={2} dot={false} fill="url(#colorUv)" />
                        <XAxis dataKey="date" height={0} />
                        <Tooltip />
                    </AreaChart>
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