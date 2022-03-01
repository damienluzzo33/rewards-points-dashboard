import React from "react";
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


export default function ChartData({ chartData }) {

    return (
        <div>
            {chartData.datasets[0].data &&
            <Line 
                data={chartData} 
                height={300}
                width={100}
                options={{
                    maintainAspectRatio: false,
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
                            labels: {
                                color: "white"
                            }
                        },
                        decimation: {
                            labels: {
                                color: "white"
                            }
                        }
                    }
                }} 
            />
            }
            
        </div>
        
    )
}