import React, { useState } from "react";

import Form from "./Form";
import Data from "./Data";

import dataset from "../data/dataset.json";
import { fetchData } from "../utils/API";
import { convertToPoints, getMonth, dateConverter } from "../utils/converters";

export default function Dashboard() {

    //* for displaying names in dropdowns
    const customerNames = Object.keys(dataset);

    //* set up point count state
    const [ pointCount, setPointCount ] = useState(null);
    const [ monthlyArr, setMonthlyArr ] = useState([0,0,0]);

    //* gather customer and time period data from user inputs
    const [ querySelection, setQuerySelection ] = useState(
        {
            customer: "",
            period: ""
        }
    );

    //* set up error messages for invalid inputs so admin knows what they did wrong
    const [errorMsg, setErrorMsg] = useState("");

    //* update query selection when option inputs change
    const handleChange = (event) => {
        // console.log(event.target);

        //* once admin submits requests, if they choose to do another, the current data should disappear for a better user experience
        setQuerySelection({
            customer: "",
            period: ""
        });
        setPointCount(null);
        setErrorMsg("");
        setMonthlyArr([0,0,0]);

        const { value, name } = event.target;

        setQuerySelection({
            ...querySelection,
            [name]: value
        })
    }

    //* first check if any fields are missing, if so set up error message and return out of function completely (will need to set up display of message under form to alert user)
    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log(querySelection);
        if (querySelection.customer === "") {
            setErrorMsg("You forgot to select a customer");
            return;
        }
        if (querySelection.period === "") {
            setErrorMsg("You forgot to select a time period");
            return;
        }

        //* initiate simulated API/database call
        const customerData = await fetchData(dataset);

        //* get chosen customer object from fetched json data
        const selectedCustomer = customerData[querySelection.customer];

        //* store targeted time range in easier to use variable in initiate new point counter
        let targetMonth = querySelection.period;
        let monthlyDataArr = [0,0,0];
        let newCount = 0;

        //* loop over all transactions from chosen customer and aggregate total according to specified target month (or total)
        for (let i = 0; i < selectedCustomer.transactions.length; i++) {
            let transaction = selectedCustomer.transactions[i];
            console.log(transaction);
            //* only try to add if target month is Total of if it matches the month of the transaction date
            let newPointsStr = parseInt(transaction.total);
            let newPoints = convertToPoints(newPointsStr);

            if (targetMonth === "Total" || targetMonth === dateConverter(transaction.date)) {
                newCount = newCount + newPoints;
            }

            monthlyDataArr[dateConverter(transaction.date) - 1] += newPoints;

        }
        //* update the point count state to newly aggregated count
        setPointCount(newCount);
        setMonthlyArr(monthlyDataArr);
    }


    return (
        <main aria-describedby="dashboard">
            <section id="customer-form" aria-describedby="customer rewards data search form">
                <Form 
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    customerNames={customerNames}
                />
                <div className="error-msg">
                    {errorMsg !== "" ? (
                    <p>
                        {errorMsg}
                    </p> 
                    ) : <React.Fragment />}
                </div>
            </section>
            <section id="points-display" aria-describedby="rewards points display">
                {pointCount === null ? (
                    <div className="display-box img-box" style={{minHeight: "359px"}}>
                        <img className="placeholder-img" src="../../assets/piggy_bank2.png" alt="piggy bank"/>
                        <img className="placeholder-img" src="../../assets/piggy_bank2.png" alt="piggy bank"/>
                        <img className="placeholder-img" src="../../assets/piggy_bank2.png" alt="piggy bank"/>
                    </div>
                ) : (
                    <Data 
                        pointCount={pointCount}
                        querySelection={querySelection}
                        fetchData={fetchData}
                        dataset={dataset}
                        monthlyArr={monthlyArr}
                    />
                )}
                
            </section>
        </main>
    )
}