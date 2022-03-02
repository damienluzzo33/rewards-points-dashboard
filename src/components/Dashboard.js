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
    const [ pointCount, setPointCount ] = useState([]);
    const [ monthlyArr, setMonthlyArr ] = useState([]);

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

        //* once admin submits requests, if they choose to do another, the current data should disappear for a better user experience
        setQuerySelection({
            customer: "",
            period: ""
        });
        setPointCount([]);
        setErrorMsg("");
        setMonthlyArr([]);

        const { value, name } = event.target;

        setQuerySelection({
            ...querySelection,
            [name]: value
        })
    }

    //* first check if any fields are missing, if so set up error message and return out of function completely (will need to set up display of message under form to alert user)
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (querySelection.customer === "") {
            setErrorMsg("Please select a customer");
            return;
        }
        if (querySelection.period === "") {
            setErrorMsg("Please select a time period");
            return;
        }

        //* initiate simulated API/database call
        const customerData = await fetchData(dataset);

        if (querySelection.customer === "All Customers") {
            for (let i = 0; i < customerNames.length; i++) {
                let selectedCustomer = customerData[customerNames[i]];
                let targetMonth = querySelection.period;
                let monthlyDataArr = [0,0,0];
                let newCount = 0;

                //* loop over all transactions from chosen customer and aggregate total according to specified target month (or total)
                for (let i = 0; i < selectedCustomer.transactions.length; i++) {
                    let transaction = selectedCustomer.transactions[i];
                    //* only try to add if target month is Total of if it matches the month of the transaction date
                    let newPointsStr = parseInt(transaction.total);
                    let newPoints = convertToPoints(newPointsStr);
                    if (targetMonth === "Total" || targetMonth === dateConverter(transaction.date)) {
                        newCount = newCount + newPoints;
                    }
                    monthlyDataArr[dateConverter(transaction.date) - 1] += newPoints;
                }
                setPointCount(pointCount => [...pointCount, newCount]);
                setMonthlyArr(monthlyArr => [...monthlyArr, monthlyDataArr]);
            }
        } else {
            //* get chosen customer object from fetched json data
            let selectedCustomer = customerData[querySelection.customer];
            //* store targeted time range in easier to use variable in initiate new point counter
            let targetMonth = querySelection.period;
            let monthlyDataArr = [0,0,0];
            let newCount = 0;
            //* loop over all transactions from chosen customer and aggregate total according to specified target month (or total)
            for (let i = 0; i < selectedCustomer.transactions.length; i++) {
                let transaction = selectedCustomer.transactions[i];
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
    }

    return (
        <main aria-describedby="dashboard">
            <div id="customer-form" aria-describedby="customer rewards data search form">
                <Form 
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    customerNames={customerNames}
                />
                <div className="error-msg" aria-describedby="error message">
                    {errorMsg !== "" ? (
                    <p>
                        {errorMsg}
                    </p> 
                    ) : <React.Fragment />}
                </div>
            </div>
            <section id="points-display" aria-describedby="rewards points display">
                {pointCount.length === 0 ? (
                    <div aria-describedby="piggy banks">
                        <div className="display-box img-box piggy" style={{minHeight: "359px"}}>
                            <div>
                            <img className="placeholder-img" src="../../assets/piggy_bank2.png" alt="piggy bank"/>
                            <img className="placeholder-img no-large" src="../../assets/piggy_bank2.png" alt="piggy bank"/>
                            <img className="placeholder-img no-large" src="../../assets/piggy_bank2.png" alt="piggy bank"/>
                            </div>
                            <p>To see the rewards balances of your customers, use the drop down options above!</p>
                        </div>
                    </div>
                ) : (
                    <Data 
                        pointCount={pointCount}
                        querySelection={querySelection}
                        dataset={dataset}
                        monthlyArr={monthlyArr}
                        customerNames={customerNames}
                    />
                )}
            </section>
        </main>
    )
}