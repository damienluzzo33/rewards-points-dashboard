import React from "react";

export default function Data(props) {

    const { pointCount, querySelection, getMonth } = props;

    console.log(pointCount);
    console.log(querySelection);
    console.log(typeof getMonth)

    return (
        <div className="display-box">
            <div className="display-title-box">
                {querySelection.period === "Total" ? (
                    <h2>Total Rewards Points</h2>
                ) : (
                    <h2>{getMonth(querySelection.period)} Rewards Points</h2>
                )}
            </div>
            <div className="counter-box">
                <h2>{pointCount}</h2>
            </div>
        </div>
    )
}