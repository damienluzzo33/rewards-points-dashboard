import React, {useState} from "react";
import ChartData from "./ChartData";

import { convertToPoints, getMonth, dateConverter } from "../utils/converters";

const chartColors = [
    'rgb(143, 0, 242)',
    'rgb(0, 207, 251)',
    'rgb(92, 255, 0)',
    'rgb(253, 251, 0)',
    'rgb(253, 174, 50)',
    'rgb(255, 12, 18)',
    '#5C30BD',
    '#1293C5',
    '#33CA00',
    '#FFC400',
    '#FF6700',
    '#A80000',
    '#3342C4'
];


export default function Data(props) {

    const { pointCount, querySelection, dataset, monthlyArr } = props;
    console.log({monthlyArr, querySelection, dataset})

    //* chart labels and options for chartJS
    const labels = ["January", "February", "March"];

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: querySelection.customer,
                data: [...monthlyArr],
                backgroundColor: chartColors[0],
                borderColor: chartColors[0]
            }
        ]
    };

    console.log(chartData);

    return (
        <React.Fragment>
            <div className="display-box">
                <div className="display-title-box">
                    <h2 className="customer-name">{querySelection.customer}</h2>
                    {querySelection.period === "Total" ? (
                        <h2>Total</h2>
                    ) : (
                        <h2>{getMonth(querySelection.period)} 2022</h2>
                    )}
                    <h2 className="balance">Balance: <span>{pointCount}</span></h2>
                </div>
                <div className="chart-display">
                    <ChartData 
                        chartData={chartData}
                    />
                </div>
            </div>
        </React.Fragment>
        
    )
}