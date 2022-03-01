import React from "react";

export default function Form(props) {

    const { handleChange, handleSubmit, customerNames } = props;

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
                    <option value="Total">All Time</option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                </select>
            </div>
            </div>
            <button id="submit-btn" type="submit">
                <img src="../../assets/search-02.png" alt="search button icon" />
            </button>
        </form>
    )
}