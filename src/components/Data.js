import React from "react";
import ChartData from "./ChartData";
import { getMonth } from "../utils/converters";

const chartColors = [
    'rgb(0, 207, 251)',
    '#707070',
    '#1293C5',
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
                    <div className="display-title-box single-cust">
                        <h2 className="customer-name">{querySelection.customer}</h2>
                        {querySelection.period === "Total" ? (
                            <h2 className="time-period">Total Points</h2>
                        ) : (
                            <h2 className="time-period">{getMonth(querySelection.period)} 2022</h2>
                        )}
                        <h2 className="balance">Balance: <span>{pointCount}</span></h2>
                    </div>
                )}
                {pointCount.length > 0 && 
                <div className="display-title-box wrapper">  
                    {customerNames.map((customer, index) => {
                        return <div key={`${customer}`} className="customer-small-div">
                            <h2 className="customer-name-small">{customer}</h2>
                            {querySelection.period === "Total" ? (
                                <h2>Total Points</h2>
                            ) : (
                                <h2>{getMonth(querySelection.period)} 2022</h2>
                            )}
                            <h2 className="balance">Balance: <span>{pointCount[index]}</span></h2>
                        </div>
                    })}
                    </div>
                }
                <div className="chart-display">
                    <ChartData 
                        chartData={chartData}
                    />
                </div>
                
            </div>
        </React.Fragment>
    )
}