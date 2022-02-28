import React from "react";

export default function Form(props) {

    const { handleChange, handleSubmit, customerNames } = props;

    console.log(typeof handleChange);
    console.log(typeof handleSubmit);
    console.log(customerNames);

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="customer">Customer:</label>
                <select onChange={handleChange} name="customer" id="customer">
                    <option value="">--Select Option--</option>
                    {customerNames.map((customer) => (
                        <option key={customer} value={customer}>{customer}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="period">Points Period:</label>
                <select onChange={handleChange} name="period" id="period">
                    <option value="">--Select Period--</option>
                    <option value="Total">Total</option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>
            </div>
            <button id="submit-btn" type="submit">Get Rewards</button>
        </form>
    )
}