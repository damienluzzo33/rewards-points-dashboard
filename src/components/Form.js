import React from "react";

export default function Form(props) {

    const { handleChange, handleSubmit, customerNames } = props;

    console.log(typeof handleChange);
    console.log(typeof handleSubmit);
    console.log(customerNames);

    return (
        <form id="admin-form" onSubmit={handleSubmit}>
            <div className="input-container">
            <div className="entry-box">
                <label htmlFor="customer">Select a customer</label>
                <select onChange={handleChange} name="customer" id="customer">
                    <option value="">Customer</option>
                    {customerNames.map((customer) => (
                        <option key={customer} value={customer}>{customer}</option>
                    ))}
                </select>
            </div>
            <div className="entry-box">
                <label htmlFor="period">Select a time period</label>
                <select onChange={handleChange} name="period" id="period">
                    <option value="">Time Period</option>
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
            </div>
            <button id="submit-btn" type="submit">
                <img src="../../assets/search_icon.svg" alt="search button icon" />
            </button>
        </form>
    )
}