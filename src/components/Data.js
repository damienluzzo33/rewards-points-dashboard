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

    const { pointCount, querySelection, monthlyArr, customerNames } = props;

    //* chart labels and options for chartJS
    const labels = ["January", "February", "March"];

    let chartData;

    if (typeof pointCount === "number") {
        chartData = {
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
    } else {
        chartData = {
            labels: labels,
            datasets: []
        }
        for (let i = 0; i < customerNames.length; i++) {
            let newObj = {
                label: customerNames[i],
                data: monthlyArr[i],
                backgroundColor: chartColors[i],
                borderColor: chartColors[i]
            }
            chartData.datasets.push(newObj);
        }
    }

    return (
        <React.Fragment>
            <div className="display-box">
                {typeof pointCount === "number" && (
                    <div className="display-title-box">
                        <h2 className="customer-name">{querySelection.customer}</h2>
                        {querySelection.period === "Total" ? (
                            <h2>Total Points</h2>
                        ) : (
                            <h2>{getMonth(querySelection.period)} 2022</h2>
                        )}
                        <h2 className="balance">Balance: <span>{pointCount}</span></h2>
                    </div>
                )}
                <div className="display-title-box wrapper">
                
                {pointCount.length > 0 &&   
                    customerNames.map((customer, index) => {
                        return <div key={`${customer}`} className="customer-small-div">
                            <h2 className="customer-name-small">{customer}</h2>
                            {querySelection.period === "Total" ? (
                                <h2>Total Points</h2>
                            ) : (
                                <h2>{getMonth(querySelection.period)} 2022</h2>
                            )}
                            <h2 className="balance">Balance: <span>{pointCount[index]}</span></h2>
                        </div>
                    })
                } 
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