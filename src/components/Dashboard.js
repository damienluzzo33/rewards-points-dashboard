import React, { useState } from "react";
import Form from "./Form";

export default function Dashboard() {

    return (
        <main>
            <section>
                <h2>Data</h2>
                <div>
                    <div>
                        <h2>... Rewards For ...</h2>
                    </div>
                    <div>
                        <h2>Points</h2>
                    </div>
                </div>
            </section>
            <section>
                <Form />
                <div>
                    {/* <p>Error Message</p> */}
                </div>
            </section>
        </main>
    )
}