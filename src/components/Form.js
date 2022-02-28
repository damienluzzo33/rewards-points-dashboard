import React from "react";

export default function Form(props) {

    const { handleChange, handleSubmit, customerNames } = props;

    console.log(typeof handleChange);
    console.log(typeof handleSubmit);
    console.log(customerNames);
    

    return (
        <form>
            <div>
                <label>Customer</label>
                <select>
                    <option>customer_1</option>
                    <option>customer_2</option>
                </select>
            </div>
            <div>
                <label>Time Period</label>
                <select>
                    <option>period_1</option>
                    <option>period_2</option>
                    <option>period_3</option>
                </select>
            </div>
            <button type="submit" >Search</button>
        </form>
    )
}