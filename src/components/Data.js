import React from "react";

export default function Data(props) {

    const { pointCount, querySelection, getMonth } = props;

    console.log(pointCount);
    console.log(querySelection);
    console.log(typeof getMonth)

    return (
        <div>
            <div>
                <h2>... Rewards For ...</h2>
            </div>
            <div>
                <h2>Points</h2>
            </div>
        </div>
    )
}